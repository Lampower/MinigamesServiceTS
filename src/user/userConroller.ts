import { Controller, Req, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Request, response, Response } from 'express';
import { UserService } from './userService';
import { UserPayload } from './dto/userPayload';

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
    const payload = request["user"] as UserPayload;
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
  @Get()
  async getAll(@Res() response: Response)
  {
    const users = await this.userService.getAll();
    response.json(users);
  }
}