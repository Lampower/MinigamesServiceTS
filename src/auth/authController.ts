import { BadRequestException, Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "src/auth/authService";
import { UserService } from "src/user/userService";
import { UserCreateDto } from "src/user/dto/userCreateDto";
import { UserPayload } from "src/user/dto/userPayload";


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
    async register(@Body() userDto: UserCreateDto, @Res() response: Response) 
    {
      if (userDto.username == null || userDto.password == null) 
      {
        throw new BadRequestException();
      }
      const exists = await this.userService.check(userDto.username, userDto.password);
      console.log(exists);
      if (exists)
      {
        throw new BadRequestException();
      }
  
      const createdUser = await this.userService.create(userDto);
      const userPayload = new UserPayload();
      userPayload.id = createdUser.id;
      userPayload.username = createdUser.username;
      const token = await this.jwtService.generateToken(userPayload);

      response.json({token: token});
    }
  
    @Post("/login")
    async login(@Body() userDto: UserCreateDto, @Res() response: Response)
    {
      const {username, password} = userDto;
      if (username == null || password == null || !this.userService.check(username, password)) 
      {
        throw new BadRequestException();
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

      response.json({token: token});
    }
}