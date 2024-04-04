import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "src/auth/authService";
import { UserService } from "src/user/userService";
import { UserPayload } from "src/user/dto/userPayload";
import { RegistrationDto } from "./dto/registrationDto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("Authorization")
@Controller("auth")
export class AuthController 
{

    private readonly userService: UserService;
    private readonly jwtService: AuthService;

    constructor(userService: UserService, jwtService: AuthService)
    {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Post("/register")
    async register(@Body() userDto: RegistrationDto, @Res() response: Response) 
    {
      if (userDto.username == null || userDto.password == null) 
      {
        throw new BadRequestException("user already exists");
      }
      const exists = await this.userService.checkIfExists(userDto.username);
      if (exists)
      {
        throw new BadRequestException("user already exists");
      }
  
      const createdUser = await this.userService.create(userDto);
      const userPayload = new UserPayload();
      userPayload.id = createdUser.id;
      userPayload.username = createdUser.username;
      const token = await this.jwtService.generateToken(userPayload);

      response.json({id: userPayload.id, token: token});
    }

    @Post("/login")
    async login(@Body() userDto: RegistrationDto, @Res() response: Response)
    {
      const {username, password} = userDto;
      if (username == null || password == null || !this.userService.checkPassword(username, password)) 
      {
        throw new BadRequestException("wrong username or password");
      }
      const user = await this.userService.getByUsername(username);
      if (!user)
      {
        response.status(HttpStatus.BAD_GATEWAY).json("Server Error");
      }

      const userPayload = new UserPayload();
      userPayload.id = user.id;
      userPayload.username = user.username;

      const token = await this.jwtService.generateToken(userPayload);

      response.json({id: userPayload.id, token: token});
    }
}