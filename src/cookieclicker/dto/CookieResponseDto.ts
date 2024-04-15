import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/database/models/user";

export class CookieResponseDto {
    @ApiProperty()
    public id: number;

    @ApiProperty()
    public amount: number

    @ApiProperty()
    public user: User
}