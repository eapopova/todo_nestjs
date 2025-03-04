import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { Task } from './task.model';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { ApiResponse } from '../types';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  fetchTasks(): Promise<Task[]> {
    return this.taskService.findAllTasks();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.addNewTask(task);
  }

  @Delete('checked')
  deleteCompletedTasks(): Promise<ApiResponse> {
    return this.taskService.deleteTasks();
  }

  @Delete(':id')
  deleteOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<ApiResponse> {
    return this.taskService.deleteOneTask(id);
  }

  @Patch()
  updateAllTasks(@Body() updateTasks: UpdateTasksDto) {
    return this.taskService.updateTasks(updateTasks);
  }

  @Patch(':id')
  updateOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateOneTask(id, task);
  }
}
