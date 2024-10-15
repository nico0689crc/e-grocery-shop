import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './core/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitmqTransport } from './transports/rabbitmq.transport';

async function bootstrap() {
  const logger = new Logger('Authentication-Service');
  const app = await NestFactory.create(AppModule);

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

  const microservice = app.connectMicroservice<MicroserviceOptions>(rabbitmqTransport);

  await microservice.listen();
  console.log('Authentication-Service connected to RabbitMQ');
}
bootstrap();
