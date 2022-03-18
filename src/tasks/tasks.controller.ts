import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';


@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }


    @Get()
    async getTasks(@Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User): Promise<Task[]> {
        return await this.taskService.getTasks(filterDto, user);
    }

    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User): Promise<Task> {
        return await this.taskService.createTask(createTaskDto, user);
    }

    @Get('/:id')
    async getTaskById(@Param('id') id: string,
        @GetUser() user: User): Promise<Task> {
        return await this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    async deleteTask(@Param('id') id: string,
        @GetUser() user: User): Promise<void> {
        return await this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    async updateTask(@Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto, @GetUser() user: User): Promise<Task> {
        return await this.taskService.updateTask(id, updateTaskDto, user);
    }

}
