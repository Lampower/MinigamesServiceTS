import { ApiProperty } from "@nestjs/swagger";


export class AddAmountDto {
    @ApiProperty()
    public amount: number
}