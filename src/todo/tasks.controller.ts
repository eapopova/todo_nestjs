import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

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

  @Delete(':id')
  async deleteOneTask(@Param('id') id: string) {
    try {
      const deletedTask = await this.taskService.deleteOne(Number(id));
      if (deletedTask) {
        return {
          status: HttpStatus.OK,
          message: 'Task deleted successfully',
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
