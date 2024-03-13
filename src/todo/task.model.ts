import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column({ allowNull: false })
  title: string;

  @Column({ defaultValue: false })
  isChecked: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
