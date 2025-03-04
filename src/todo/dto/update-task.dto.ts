import { Transform, TransformFnParams } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty({ message: 'Task should not be empty' })
  @IsString({ message: 'Task should be a string' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value.trim())
  title?: string;

  @IsBoolean()
  @IsOptional()
  checked?: boolean;
}
