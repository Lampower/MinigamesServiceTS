import { Controller, Req, Get, Post, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';

@Controller('user')
export class UserController {
  /**
   *
   */
  constructor() {}

  @Get()
  getAll(@Res() respone: Response) 
  {
    return respone.json("All users");
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
    response.json(`user with name: ${username} and password: ${password} is created`);
  }
}