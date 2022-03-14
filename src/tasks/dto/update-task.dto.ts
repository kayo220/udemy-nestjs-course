import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "../task.model";

export class UpdateTaskDto {
    @ApiProperty()
    tittle?: string;

    @ApiProperty()
    description?: string;

    @ApiProperty({ enum: TaskStatus })
    status?: TaskStatus
}