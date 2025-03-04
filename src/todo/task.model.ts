import { Table, Model, Column } from 'sequelize-typescript';

@Table({ tableName: 'tasks', timestamps: true, underscored: true })
export class Task extends Model {
  @Column({ allowNull: false })
  title: string;

  @Column({ defaultValue: false })
  checked: boolean;
}
