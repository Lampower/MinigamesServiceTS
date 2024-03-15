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
  async get(@Req() request: Request,@Res() respone: Response) 
  {
    const {id} = request.query;
    if (id == null)
    {
      const users = await this.userService.getAll();
      return respone.json(users);
    }

    const userId = Number(id);
    const user = await this.userService.get(userId);
    if (user == null)
    {
      respone.status(HttpStatus.NOT_FOUND);
      return respone.json("Not Found"); 
    }

    respone.json(user);
    
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
    response.json(`created: \n ${createdUser}`);
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
    const claims = {username};
    
    this.jwtService.generateToken(claims);
  }
}