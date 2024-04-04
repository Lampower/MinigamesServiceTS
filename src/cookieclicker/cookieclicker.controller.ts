import { BadRequestException, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CookieClickerService } from './cookieclicker.service';
import { Request, Response } from 'express';
import { UserPayload } from 'src/user/dto/userPayload';
import { ApiAcceptedResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiUnauthorizedResponse({description: "Unauthorized"})
@ApiBearerAuth()
@ApiTags("CookieClicker")
@Controller('cookieclicker')
export class CookieClickerController 
{
    constructor(private readonly cookieClickerService: CookieClickerService) {}

    @ApiResponse({status: 201, description: "Connection with user created"})
    @ApiResponse({status: 404, description: "Already Exists"})
    @Post("create")
    async createUser(@Req() request: Request, @Res() response: Response)
    {
        const userPayload = request["user"] as UserPayload;

        const isExist = await this.cookieClickerService.getByUserId(userPayload.id);
        if (isExist) throw new BadRequestException("Already Exists");

        const cookieData = await this.cookieClickerService.create(userPayload.id);

        response.json(cookieData);
    }
    @Get()
    async getAll(@Res() response: Response)
    {
        const cookies = await this.cookieClickerService.getAll();
        response.json(cookies)
    }
    @Get('me')
    async get(@Req() request: Request, @Res() response: Response)
    {
        // const cookies = await this.cookieClickerService.getAll() 
        // response.json(cookies);

        const userPayload = request["user"] as UserPayload;
        if (userPayload == null) throw new BadRequestException("Auth Problem");

        const cookieData = await this.cookieClickerService.getByUserId(userPayload.id);
        if (cookieData == null) throw new BadRequestException("No data found");

        response.json(cookieData);
    }
    @Post('addAmount')
    async addAmount(@Req() request: Request, @Res() response: Response)
    {
        const {amount } = request.body;
        const userPayload = request["user"] as UserPayload;
        
        const cookieData = await this.cookieClickerService.getByUserId(userPayload.id);

        this.cookieClickerService.addAmount(cookieData.id, amount)

        response.json("Success");
    }
    
}
