import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './core/config';
import { Injectable, Logger, NestMiddleware, ValidationPipe } from '@nestjs/common';
import { NextFunction } from 'express';
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Headers:', req.headers);
    
    next();
  }
}

async function bootstrap() {
  const logger = new Logger('Authentication-Service');
  const app = await NestFactory.create(AppModule);

  // app.use(new LoggingMiddleware().use);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  logger.log(
    `Authentication-Service running on port ${envs.backendContainerPort}`,
  );
  await app.listen(envs.backendContainerPort);
}
bootstrap();
