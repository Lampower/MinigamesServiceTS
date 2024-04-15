import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserPayload } from 'src/user/dto/userPayload';
import { SendCommentDto } from './dto/sendCommentDto';
import { UserService } from 'src/user/userService';
import { Comments } from 'src/database/models/comments';

@ApiBearerAuth()
@ApiTags("Comments")
@Controller('comments')
export class CommentController {
    constructor(private comments: CommentService, private users: UserService) {}

    @ApiResponse({status: 201, type: Comments})
    @ApiBadRequestResponse()
    @Post("send")
    async sendComment(@Req() request: Request, @Body() sendData: SendCommentDto, @Res() response: Response)
    {
        const senderPayload = request["user"] as UserPayload;
        const sender = await this.users.getById(senderPayload.id);
        const reciever = await this.users.getById(sendData.recieverId);
        if (!sender || !reciever) throw new BadRequestException();

        const comment = await this.comments.sendComment(sendData.message, sender, reciever);

        response.json(comment);
    }

    @ApiParam({name: "id"})
    @ApiResponse({status: 200, type: Comments, isArray: true})
    @Get(":id")
    async getCommentsOfUser(@Param() params, @Res() response: Response)
    {
        const id = Number(params.id);
        const comments = await this.comments.getCommentsRecievedByUserId(id);
        console.log(comments);
        response.json(comments)
    }
}
