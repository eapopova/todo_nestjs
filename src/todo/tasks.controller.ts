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
import { CustomApiResponse } from '../types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: HttpStatus.OK, type: [Task] })
  @Get()
  @HttpCode(HttpStatus.OK)
  fetchTasks(): Promise<Task[]> {
    return this.taskService.findAllTasks();
  }

  @ApiOperation({ summary: 'Добавить задачу' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Task })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.addNewTask(task);
  }

  @ApiOperation({ summary: 'Удалить все задачи' })
  @ApiResponse({ status: HttpStatus.OK, type: CustomApiResponse })
  @Delete('checked')
  deleteCompletedTasks(): Promise<CustomApiResponse> {
    return this.taskService.deleteTasks();
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiResponse({ status: HttpStatus.OK, type: CustomApiResponse })
  @Delete(':id')
  deleteOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<CustomApiResponse> {
    return this.taskService.deleteOneTask(id);
  }

  @ApiOperation({ summary: 'Обновить все задачи' })
  @ApiResponse({ status: HttpStatus.OK, type: CustomApiResponse })
  @Patch()
  updateAllTasks(@Body() updateTasks: UpdateTasksDto) {
    return this.taskService.updateTasks(updateTasks);
  }

  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: HttpStatus.OK, type: Task })
  @Patch(':id')
  updateOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateOneTask(id, task);
  }
}
