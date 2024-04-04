import { ApiProperty } from "@nestjs/swagger";

export class RegistrationDto
{
    @ApiProperty()
    public username: string;
    @ApiProperty()
    public password: string;
}