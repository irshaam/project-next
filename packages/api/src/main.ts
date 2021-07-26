import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ErrorsInterceptor());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
