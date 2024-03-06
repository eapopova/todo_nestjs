import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  create(task: Partial<CreateTaskDto>): Promise<Task> {
    return this.taskRepository.create(task);
  }
}
