import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    title?: string;

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