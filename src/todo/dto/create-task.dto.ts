import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Task should not be empty' })
  // @IsString({ message: 'Task should be a string' })
  @Transform(({ value }: TransformFnParams) => console.log('value :>> ', value))
  name: string;
}
