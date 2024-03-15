import { Controller, Req, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from "../services/jwtService"
import { UserService } from 'src/services/userService';
import { User } from 'src/models/user';

@Controller('user')
export class UserController {
  /**
   *
   */
  constructor(readonly jwtService: JwtService, readonly userService: UserService) 
  {

  }

  @Get()
  get(@Req() request: Request,@Res() respone: Response) 
  {
    const {id} = request.query;
    if (id == null)
    {
      const users = this.userService.getAll();
      return respone.json(users);
    }

    const userId = Number(id);
    const user = this.userService.get(userId);
    if (user == null)
    {
      respone.status(HttpStatus.NOT_FOUND);
      return respone.json("Not Found"); 
    }

    respone.json(user);
    
  }

  @Post("/register")
  register(@Req() request: Request, @Res() response: Response) 
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

    this.userService.create(user);
    response.json(`user with name: ${username} and password: ${password} is created`);
  }

  @Post("/login")
  login(@Req() request: Request, @Res() response: Response)
  {
    const {username, password} = request.body
    if (username == null || password == null) 
    {
      response.status(HttpStatus.BAD_REQUEST);
      response.json("Error");
    }
    const claims = {username};
    
    this.jwtService.generateToken(claims);
  }
}