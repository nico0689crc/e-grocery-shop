import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, RABBITMQ_SERVICE } from 'src/core/config';

export const rabbitmqTransport = {
  name: RABBITMQ_SERVICE,
  transport: Transport.RMQ as Transport.RMQ,
  options: {
    urls: [
      `amqp://${envs.rabbitMqDefaultUser}:${envs.rabbitMqDefaultPass}@${envs.rabbitMqTransportHost}:${envs.rabbitMqTransportHostPort}`,
    ],
    queue: envs.rabbitMqQueueName,
    queueOptions: {
      durable: false,
    },
  },
};

@Module({
  imports: [ClientsModule.register([rabbitmqTransport])],
  exports: [ClientsModule.register([rabbitmqTransport])],
})
export class RabbitMQModule {}
