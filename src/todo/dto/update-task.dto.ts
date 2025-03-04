import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Task 2', description: 'Задача 2' })
  @IsNotEmpty({ message: 'Task should not be empty' })
  @IsString({ message: 'Task should be a string' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value.trim())
  title?: string;

  @ApiProperty({ example: true, description: 'Задача выполнена' })
  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}
