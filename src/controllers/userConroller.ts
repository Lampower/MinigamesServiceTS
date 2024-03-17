import { Controller, Req, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from "../services/authService"
import { UserService } from 'src/services/userService';
import { User } from 'src/models/user';

@Controller('user')
export class UserController {
  constructor(readonly jwtService: AuthService, readonly userService: UserService) 
  {

  }

  @Get(":id")
  async get(@Req() request: Request,@Res() respone: Response) 
  {
    const {id} = request.params;
    const userId = Number(id);

    const user = await this.userService.getById(userId);

    respone.json(user);
    
  }
  @Get()
  async getMany(@Req() request: Request, @Res() response: Response)
  {
    const {username} = request.query;
    let users = [];
    if (!username)
    {
      users = await this.userService.getAll();
    }
    if (username)
    {
      users = await this.userService.getByUsername();
    }
    response.json(users);
  }

 
  @Get("hello")
  async hello(@Req() request: Request, @Res() response: Response)
  {
    response.json("Hello world only for auth");
  }
}