import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks(): Task[] {
        return this.tasks
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status && search) {//both filters on
            return tasks.filter(task => (task.status == status && (task.tittle.includes(search) || task.description.includes(search))))
        }

        else if (status) {
            return tasks.filter(task => task.status == status)
        }
        else if (search) {
            return tasks.filter(task => task.tittle.includes(search) || task.description.includes(search))
        }

        return tasks;//no filter on
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { tittle, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            tittle,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id == id)
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id != id)
    }
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
        const { tittle, description, status } = updateTaskDto;
        const task = this.getTaskById(id);
        task.tittle = tittle == undefined ? task.tittle : tittle;
        task.description = description == undefined ? task.description : description;
        task.status = status == undefined ? task.status : status;
        return task;
    }

}
