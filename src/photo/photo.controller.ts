import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('photo')
export class PhotoController {
    constructor() {}

    @Get()
    async get(@Res() response: Response)
    {
        response.download("photo.jpg")
        response.send('<img src="photo.jpg">')
    }
}
