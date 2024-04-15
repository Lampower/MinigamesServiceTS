import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Put, Req, Res } from '@nestjs/common';
import { CookieClickerService } from './cookieclicker.service';
import { Request, Response } from 'express';
import { UserPayload } from 'src/user/dto/userPayload';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AddAmountDto } from './dto/AddAmountDto';
import { CookieData } from 'src/database/models/cookieData';
import { CookieResponseDto } from './dto/CookieResponseDto';

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
    @ApiResponse({status: 200, type: CookieData, isArray: true})
    @Get()
    async getAll(@Res() response: Response)
    {
        const cookies = await this.cookieClickerService.getAll();
        response.json(cookies)
    }
    @ApiResponse({status: 200, type: CookieResponseDto})
    @ApiResponse({status: 400})
    @ApiResponse({status: 404})
    @Get('me')
    async get(@Req() request: Request, @Res() response: Response)
    {
        // const cookies = await this.cookieClickerService.getAll() 
        // response.json(cookies);

        const userPayload = request["user"] as UserPayload;
        if (userPayload == null) throw new BadRequestException("Auth problem");

        const cookieData = await this.cookieClickerService.getByUserId(userPayload.id);
        if (cookieData == null) throw new NotFoundException("No data found");
        const cookieDataResponse = new CookieResponseDto();
        cookieDataResponse.id = cookieData.id;
        cookieDataResponse.amount = cookieData.amount;
        cookieDataResponse.user = cookieData.user;
        
        response.json(cookieDataResponse);
    }
    @ApiBody({type: AddAmountDto})
    @ApiResponse({status: 200, description: "Success", type: CookieResponseDto})
    @ApiResponse({status: 404, description: "Cookie data not found"})
    @Put('addAmount')
    async addAmount(@Req() request: Request, @Body() data: AddAmountDto, @Res() response: Response)
    {
        const userPayload = request["user"] as UserPayload;
        
        const cookieData = await this.cookieClickerService.getByUserId(userPayload.id);
        if (!cookieData) throw new NotFoundException("Cookie data not found");
        const updatedCookieData = await this.cookieClickerService.addAmount(cookieData.id, data.amount)

        response.json(updatedCookieData);
    }
    
}
