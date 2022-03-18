import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing'
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),

});
const mockUser = {
    username: 'someusername',
    id: 'someid',
    password: 'somepassword',
    task: []
}
describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository }
            ],
        }).compile();

        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository)
    });

    describe('getTasks', () => {
        it('calls TaskRepository.getTasks and returns the result', async () => {
            tasksRepository.getTasks.mockResolvedValue('someValue')//returnValue (sincrono) resolved (assincrono)
            const result = await tasksService.getTasks(null, mockUser)
            expect(result).toEqual('someValue')
        })
    });

    describe('getTasksById', () => {
        it('calls TaskRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: 'Some task',
                description: 'Some description',
                id: 'someid',
                status: TaskStatus.OPEN
            };
            tasksRepository.findOne.mockResolvedValue(mockTask)
            const result = await tasksService.getTaskById('someid', mockUser)
            expect(result).toEqual(mockTask)
        })

        it('calls TaskRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someid', mockUser)).rejects.toThrow(NotFoundException)
        })

    });


});