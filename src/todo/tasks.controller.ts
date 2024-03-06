import { Body, Controller, Get, Post } from '@nestjs/common';

import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.create(task);
  }
}
