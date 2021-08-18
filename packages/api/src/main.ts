import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './common/filter/prisma-client-exception.filter';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
// import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { app_port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // apply transforms to all responses
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter),
    new HttpExceptionFilter(),
  );

  await app.listen(app_port || 8000);
}
bootstrap();
