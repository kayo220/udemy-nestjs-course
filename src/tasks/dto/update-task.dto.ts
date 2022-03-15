import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task.model";
import { IsOptional, IsEnum, isNotEmpty, IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    tittle?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @ApiProperty({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    @IsOptional()
    @IsNotEmpty()
    status?: TaskStatus
}