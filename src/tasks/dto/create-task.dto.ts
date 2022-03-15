import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    tittle: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}