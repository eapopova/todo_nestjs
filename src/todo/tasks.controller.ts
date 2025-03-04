import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Delete('checked')
  deleteSelectedTasks() {
    return this.taskService.deleteTasks();
  }

  @Delete(':id')
  deleteOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    return this.taskService.deleteOneTask(id);
  }

  @Patch()
  toggleTasks(@Body() updateTasks: UpdateTasksDto) {
    return this.taskService.updateTasks(updateTasks);
  }

  @Patch(':id')
  updateOneTask(
    @Param('id', new ParseIntPipe())
    id: number,
    @Body() task: UpdateTaskDto,
  ) {
    return this.taskService.updateOneTask(id, task);
  }
}
