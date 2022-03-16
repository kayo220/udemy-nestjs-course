import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository) { }

    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id, user } });

        if (!task) {
            throw new NotFoundException(`Task withg ID ${id} not found`);
        }

        return task;
    }

    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
        if (!result.affected) {//if has no affacted rows send a not found exception
            throw new NotFoundException(`Task withg ID ${id} not found`);
        }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task> {
        const { title, description, status } = updateTaskDto;
        const task = await this.getTaskById(id, user);
        task.title = title == undefined ? task.title : title;
        task.description = description == undefined ? task.description : description;
        task.status = status == undefined ? task.status : status;
        this.tasksRepository.save(task);
        return task;
    }

}
