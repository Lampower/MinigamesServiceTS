import { Injectable } from '@nestjs/common';
import { Comments } from 'src/database/models/comments';
import { User } from 'src/database/models/user';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CommentService {
    
    private readonly comments: Repository<Comments>;
    /**
     *
     */
    constructor(dataSource: DataSource) {
        this.comments = dataSource.getRepository(Comments)
    }
    
    async sendComment(message: string, userSender: User, userRecieved: User)
    {
        const comment = new Comments()
        comment.message = message;
        comment.userSender = userSender;
        comment.userRecieved = userRecieved;

        const result = await this.comments.save(comment);

        return result;
    }
    async updateComment(commentId: number, text2change: string)
    {
        return await this.comments.update({id: commentId}, {message: text2change});
    }
    async deleteComment(commentId: number)
    {
        return await this.comments.delete({id: commentId});
    }
    async getCommentsRecievedByUserId(id: number)
    {
        return await this.comments.find({
            where: {
                userRecieved: {id}
            },
            relations: {userSender: true}
        });
    }
    async getCommentsSentByUserId(id: number)
    {
        return await this.comments.find({
            where: {
                userSender: {id}
            }
        });
    }
}
