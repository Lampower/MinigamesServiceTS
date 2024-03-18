import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/models/user";
import { AuthService } from "src/auth/authService";
import { UserService } from "src/user/userService";


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
    async register(@Req() request: Request, @Res() response: Response) 
    {
      const {username, password} = request.body
      if (username == null || password == null) 
      {
        response.status(404);
        response.json("Error");
      }
  
      const user = new User(); 
      user.id = 0;
      user.username = username;
      user.password = password;
  
      const createdUser = await this.userService.create(user);
      console.log(createdUser);
      const token = await this.jwtService.generateToken(createdUser);

      response.json({token: token});
    }
  
    @Post("/login")
    async login(@Req() request: Request, @Res() response: Response)
    {
      const {username, password} = request.body
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
      console.log(user);
      const token = await this.jwtService.generateToken(user[0]);

      response.json({token: token});
    }
}