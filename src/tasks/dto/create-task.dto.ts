import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    @ApiProperty()
    tittle: string;

    @ApiProperty()
    description: string;
}