import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { ApiResponse } from '../types';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  findAllTasks(): Promise<Task[]> {
    try {
      return this.taskRepository.findAll({
        order: ['createdAt'],
        attributes: ['id', 'title', 'checked', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching tasks');
    }
  }

  addNewTask(task: Partial<CreateTaskDto>): Promise<Task> {
    try {
      return this.taskRepository.create(task);
    } catch (error) {
      throw new InternalServerErrorException('Error creating task');
    }
  }

  async deleteOneTask(id: number): Promise<ApiResponse> {
    try {
      const deletedRows = await this.taskRepository.destroy({
        where: { id },
      });
      if (!deletedRows) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Task does not exist',
        });
      }
      return {
        status: HttpStatus.OK,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      throw error || new InternalServerErrorException('Error deleting task');
    }
  }

  async updateOneTask(id: number, updatedTask: UpdateTaskDto): Promise<Task> {
    try {
      const [countUpdatedTasks, updatedTasks] =
        await this.taskRepository.update(updatedTask, {
          returning: true,
          where: { id },
        });
      if (countUpdatedTasks === 0) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Task does not exist',
        });
      }
      return updatedTasks[0];
    } catch (error) {
      throw error || new InternalServerErrorException('Error updating task');
    }
  }

  async deleteTasks(): Promise<ApiResponse> {
    try {
      const tasks = await this.taskRepository.findAll();
      const checkedTaskIds = tasks
        .filter(({ dataValues }) => dataValues.checked)
        .map(({ dataValues }) => dataValues.id);
      if (checkedTaskIds.length) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'No completed tasks',
        });
      }
      await this.taskRepository.destroy({ where: { id: checkedTaskIds } });
      return {
        status: HttpStatus.OK,
        message: 'Tasks deleted successfully',
      };
    } catch (error) {
      throw error || new InternalServerErrorException('Error deleting tasks');
    }
  }

  async updateTasks(updateTasks: UpdateTasksDto): Promise<ApiResponse> {
    try {
      const [count] = await this.taskRepository.update(
        { checked: updateTasks.isAllTasksChecked },
        {
          where: { checked: !updateTasks.isAllTasksChecked },
        },
      );
      if (!count) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: 'No tasks changed',
        });
      }
      return {
        status: HttpStatus.OK,
        message: 'Tasks updated successfully',
      };
    } catch (error) {
      throw error || new InternalServerErrorException('Error updating tasks');
    }
  }
}
