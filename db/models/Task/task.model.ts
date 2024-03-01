import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

interface TaskAttributes {
  name: string;
  isChecked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Table
export class Task extends Model<TaskAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isChecked: boolean;

  @CreatedAt public createdAt: Date;
  @UpdatedAt public updatedAt: Date;
}
