import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto
{

    @ApiProperty()
    public id: number;

    @ApiProperty()
    public token: string;

    constructor(id, token)
    {
        this.id = id;
        this.token = token;
    }
}