import { HttpStatus } from '@nestjs/common';

export type ApiResponse<T = any> = {
  status: HttpStatus;
  message: string;
  data?: T;
};
