import { Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { User } from "src/models/user";
import { AuthService } from "src/services/authService";
import { UserService } from "src/services/userService";


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
      console.log(this.jwtService)
      const token = await this.jwtService.generateToken(createdUser);

      response.json(token);
    }
  
    @Post("/login")
    async login(@Req() request: Request, @Res() response: Response)
    {
      const {username, password} = request.body
      if (username == null || password == null) 
      {
        response.status(HttpStatus.BAD_REQUEST);
        response.json("Error");
      }
      if (!this.userService.check(username, password))
      {
        response.status(HttpStatus.BAD_REQUEST);
        response.json("Wrong username or password");
      }
      const user = this.userService.getByUsername(username);
      
      this.jwtService.generateToken(user);
    }
}