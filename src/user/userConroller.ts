import { Controller, Req, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/models/user';
import { UserService } from './userService';

@Controller('user')
export class UserController {
  constructor(
    readonly userService: UserService
    ) 
  {

  }

  @Get("me")
  async get(@Req() request: Request,@Res() respone: Response) 
  {
    const {payload, iat} = request["user"];
    const userId = Number(payload.id)
    if (!userId)
    {
      respone.status(HttpStatus.BAD_GATEWAY).json("Server problem");
      return;
    }
    const user = await this.userService.getById(userId)
    if (!user)
    {
      respone.status(200).json("User doesnt exist");
      return;
    }
    respone.json(user);
  }
}