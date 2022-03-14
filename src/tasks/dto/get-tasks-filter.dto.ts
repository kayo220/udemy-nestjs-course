import { TaskStatus } from "../task.model";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetTasksFilterDto {
    @ApiProperty({ enum: TaskStatus })
    @ApiPropertyOptional()
    status?: TaskStatus;

    @ApiProperty()
    @ApiPropertyOptional()
    search?: string;
}