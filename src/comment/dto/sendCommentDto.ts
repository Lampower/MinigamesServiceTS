import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Comments } from "src/database/models/comments";


export class SendCommentDto {
    @ApiProperty()
    public recieverId: number;

    @ApiProperty()
    public message: string;
}