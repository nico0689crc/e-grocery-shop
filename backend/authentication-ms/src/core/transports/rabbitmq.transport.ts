import { Module } from '@nestjs/common';
import { ClientsModule, NatsOptions, Transport } from '@nestjs/microservices';
import { envs, RABBITMQ_SERVICE } from 'src/core/config';

// export const rabbitmqTransport = {
//   name: RABBITMQ_SERVICE,
//   transport: Transport.RMQ as Transport.RMQ,
//   options: {
//     urls: [
//       `amqp://${envs.rabbitMqDefaultUser}:${envs.rabbitMqDefaultPass}@${envs.rabbitMqTransportHost}:${envs.rabbitMqTransportHostPort}`,
//     ],
//     queue: envs.rabbitMqQueueName,
//     queueOptions: {
//       durable: true,
//     },
//   },
// };
export const rabbitmqTransport: NatsOptions & {name: string} = {
  name: RABBITMQ_SERVICE,
  transport: Transport.NATS,
  options: {
    servers: ["nats://nats-server:4222"]
  }
};

@Module({
  imports: [ClientsModule.register([rabbitmqTransport])],
  exports: [ClientsModule.register([rabbitmqTransport])],
})
export class RabbitMQModule {}
