import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './core/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitmqTransport } from './core/transports/rabbitmq.transport';

async function bootstrap() {
  const logger = new Logger('ProductsMicroservice');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  logger.log(
    `Products Microservice running on port ${envs.backendContainerPort}`,
  );

  await app.listen(envs.backendContainerPort);

  const microservice =
    app.connectMicroservice<MicroserviceOptions>(rabbitmqTransport);

  await microservice.listen();
  console.log('Products-Service connected to RabbitMQ');
}
bootstrap();
