import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) { }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Task withg ID ${id} not found`);
        }

        return task;
    }

    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (!result.affected) {//if has no affacted rows send a not found exception
            throw new NotFoundException(`Task withg ID ${id} not found`);
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const { title, description, status } = updateTaskDto;
        const task = await this.getTaskById(id);
        task.title = title == undefined ? task.title : title;
        task.description = description == undefined ? task.description : description;
        task.status = status == undefined ? task.status : status;
        this.tasksRepository.save(task);
        return task;
    }

}
