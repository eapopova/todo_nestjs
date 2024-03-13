import { IsBoolean } from 'class-validator';

export class UpdateTasksDto {
  @IsBoolean()
  isAllTasksChecked: boolean;
}
