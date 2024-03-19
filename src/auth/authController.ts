import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/models/user";
import { AuthService } from "src/auth/authService";
import { UserService } from "src/user/userService";
import { UserCreateDto } from "src/user/dto/userCreateDto";


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
        response.status(404);
        response.json("Error");
      }
  
 
  
      const createdUser = await this.userService.create(userDto);
      const token = await this.jwtService.generateToken(createdUser);

      response.json({token: token});
    }
  
    @Post("/login")
    async login(@Body() userDto: UserCreateDto, @Res() response: Response)
    {
      const {username, password} = userDto;
      if (username == null || password == null || !this.userService.check(username, password)) 
      {
        response.status(HttpStatus.BAD_REQUEST);
        response.json("Error");
      }
      const user = await this.userService.getByUsername(username);
      if (!user)
      {
        response.status(HttpStatus.BAD_GATEWAY).json("Server Error");
      }
      const token = await this.jwtService.generateToken(user);

      response.json({token: token});
    }
}