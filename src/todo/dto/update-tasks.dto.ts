import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateTasksDto {
  @ApiProperty({ example: true, description: 'Все задачи выполнены' })
  @IsBoolean()
  isAllTasksChecked: boolean;
}
