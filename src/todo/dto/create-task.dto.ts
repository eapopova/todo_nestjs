import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task 1', description: 'Задача 1' })
  @IsNotEmpty({ message: 'Task should not be empty' })
  @IsString({ message: 'Task should be a string' })
  @Transform(({ value }: TransformFnParams) => value.trim())
  title: string;
}
