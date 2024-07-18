import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

import { GeneralHelper } from '../helpers/general.helper';

@Injectable()
@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.getStatus ? exception.getStatus() : 500;
    const errorType = exception?.name ?? exception.message;
    const messages = exception.getResponse
      ? exception.getResponse()?.['message']
      : exception.message;
    const message = messages
      ? GeneralHelper.isArray(messages)
        ? messages[0]
        : messages
      : errorType;
    const error = { statusCode: status, error: errorType, message };

    response.status(status).json(error);
  }
}
