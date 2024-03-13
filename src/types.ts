import { HttpStatus } from '@nestjs/common';

export type HttpStatusOk = {
  status: HttpStatus.OK;
  message: string;
};
