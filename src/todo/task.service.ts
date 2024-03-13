import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { HttpStatusOk } from 'src/types';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.findAll({
      order: ['createdAt'],
    });
  }

  create(task: Partial<CreateTaskDto>): Promise<Task> {
    return this.taskRepository.create(task);
  }

  async deleteOneTask(id: number): Promise<HttpStatusOk> {
    const task = await this.taskRepository.destroy({ where: { id: id } });
    if (!task) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Task does not exist',
      });
    }
    return {
      status: HttpStatus.OK,
      message: 'Task deleted successfully',
    };
  }

  async updateOneTask(
    taskIdToUpdate: number,
    updatedTask: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.update(updatedTask, {
      returning: true,
      where: { id: taskIdToUpdate },
    });
    if (!task[1][0]) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Task does not exist',
      });
    }
    return task[1][0];
  }

  async deleteTasks(): Promise<HttpStatusOk> {
    const tasks = await this.taskRepository.findAll();
    const deletedTasksIds = tasks
      .filter(({ dataValues }) => dataValues.isChecked)
      .map(({ dataValues }) => dataValues.id);
    if (deletedTasksIds.length === 0) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'No completed tasks',
      });
    }
    this.taskRepository.destroy({ where: { id: deletedTasksIds } });
    return {
      status: HttpStatus.OK,
      message: 'Tasks deleted successfully',
    };
  }

  async updateTasks(updateTasks: UpdateTasksDto): Promise<HttpStatusOk> {
    const updatedTasks = await this.taskRepository.update(
      { isChecked: updateTasks.isAllTasksChecked },
      {
        where: { isChecked: !updateTasks.isAllTasksChecked },
      },
    );
    if (!updatedTasks.pop()) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'No tasks changed',
      });
    }
    return {
      status: HttpStatus.OK,
      message: 'Tasks deleted successfully',
    };
  }
}
