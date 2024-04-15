import { BadRequestException, Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "src/auth/authService";
import { UserService } from "src/user/userService";
import { UserPayload } from "src/user/dto/userPayload";
import { RegistrationDto } from "./dto/registrationDto";
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/loginResponseDto";

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

    @ApiResponse({status: 201, type: LoginResponseDto})
    @ApiResponse({status: 400, "description": "User already exists"})
    @Post("/register")
    async register(@Body() userDto: RegistrationDto, @Res() response: Response)
    {
      if (userDto.username == null || userDto.password == null) 
      {
        throw new BadRequestException("User already exists");
      }
      const exists = await this.userService.checkIfExists(userDto.username);
      if (exists)
      {
        throw new BadRequestException("User already exists");
      }
  
      const createdUser = await this.userService.create(userDto);
      const userPayload = new UserPayload();
      userPayload.id = createdUser.id;
      userPayload.username = createdUser.username;
      const token = await this.jwtService.generateToken(userPayload);

      response.json(new LoginResponseDto(userPayload.id, token));
    }

    @ApiResponse({status: 201, type: LoginResponseDto})
    @ApiResponse({status: 404, description: "This user doesn't exists"})
    @Post("/login")
    async login(@Body() userDto: RegistrationDto, @Res() response: Response)
    {
      const {username, password} = userDto;
      if (username == null || password == null || !(await this.userService.checkPassword(username, password))) 
      {
        throw new NotFoundException("This user doesn't exists")
      }
      const user = await this.userService.getByUsername(username);
      if (user == null)
      {
        throw new NotFoundException("This user doesn't exists")
      }

      const userPayload = new UserPayload();
      userPayload.id = user.id;
      userPayload.username = user.username;

      const token = await this.jwtService.generateToken(userPayload);

      response.json(new LoginResponseDto(userPayload.id, token));
    }
    @ApiQuery({name: "token", type: "string"})
    @Get("/check")
    async check(@Query() query, @Res() response: Response)
    {
      const token = query.token;
      if (!token)
      {
        throw new BadRequestException();
      }
      const user = await this.jwtService.verifyAsync(token);
      response.json(user);
    }
}