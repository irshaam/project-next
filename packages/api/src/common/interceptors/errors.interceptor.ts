import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.name === 'QueryFailedError') {
          throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: [error.message, error.code, error.detail],
            timestamp: new Date().toISOString(),
          });
        }
        if (error.name === 'ForbiddenError') {
          throw new ForbiddenException();
        }
        if (error.name === ' No auth token') {
          throw new ForbiddenException();
          console.log('13313', error.name);
        }

        throw error;
      }),
    );
  }
}
