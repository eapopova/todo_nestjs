import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CustomApiResponse<T = any> {
  @ApiProperty({
    example: HttpStatus.OK,
    description: 'HTTP статус ответа',
  })
  status: HttpStatus;
  @ApiProperty({
    example: 'Success',
    description: 'Сообщение об ответе',
  })
  message: string;
  @ApiProperty({ description: 'Данные ответа', required: false })
  data?: T;
}
