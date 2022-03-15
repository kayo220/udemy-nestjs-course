import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        await this.save(task);

        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        const { status, search } = filterDto;


        if (status && search) {//both filters on
            query.andWhere('task.status = :status AND (LOWER(task.status) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { status, search: `%${search}%` })
        }

        else if (status) {
            query.andWhere('task.status = :status', { status })
        }

        else if (search) {
            query.andWhere('LOWER(task.status) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` })
        }

        const tasks = query.getMany()

        return tasks
    }
}