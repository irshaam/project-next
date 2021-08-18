import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        const message = exception.message.replace(/\n/g, '');
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;

      case 'P2025':
        console.log('message', exception.message.replace(/\n/g, ''));
        console.log('message', exception.meta);
        // const status = HttpStatus.CONFLICT;
        // const message =
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: exception.meta,
        });
        break;
      // TODO catch other error codes (e.g. 'P2000' or 'P2025')

      // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
      default:
        // default 500 error code
        super.catch(exception, host);
        break;
    }
  }
}
