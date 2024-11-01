import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './core/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { natsTransport } from './core/transports/nats.transport';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const logger = new Logger('ProductsMicroservice');
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  logger.log(
    `Products Microservice running on port ${envs.backendContainerPort}`,
  );

  await app.listen(envs.backendContainerPort);

  const microservice =
    app.connectMicroservice<MicroserviceOptions>(natsTransport);

  await microservice.listen();
  console.log('Products-Service connected to RabbitMQ');
}
bootstrap();
