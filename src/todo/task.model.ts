import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'tasks', timestamps: true, underscored: true })
export class Task extends Model {
  @ApiProperty({ example: 'Task 1', description: 'Задача 1' })
  @Column({ allowNull: false })
  title: string;

  @ApiProperty({ example: true, description: 'Задача выполнена' })
  @Column({ defaultValue: false })
  checked: boolean;
}
