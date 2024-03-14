import { Controller, Req, Get, Post, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { JwtService } from "../services/jwtService"

@Controller('user')
export class UserController {
  /**
   *
   */
  constructor(readonly jwtService: JwtService) 
  {

  }

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

  @Post("/login")
  login(@Req() request: Request, @Res() response: Response)
  {
    const {username, password} = request.body
    if (username == null || password == null) 
    {
      response.status(404);
      response.json("Error");
    }
    const claims = {username};
    
    this.jwtService.generateToken(claims);
  }
}