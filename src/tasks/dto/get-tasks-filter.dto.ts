import { TaskStatus } from "../task.model";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";

export class GetTasksFilterDto {
    @ApiProperty({ enum: TaskStatus })
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    search?: string;
}