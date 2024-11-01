import { Module } from '@nestjs/common';
import { ClientsModule, NatsOptions, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/core/config';

export const natsTransport: NatsOptions & {name: string} = {
  name: NATS_SERVICE,
  transport: Transport.NATS,
  options: {
    servers: envs.natsServers,
  }
};

@Module({
  imports: [ClientsModule.register([natsTransport])],
  exports: [ClientsModule.register([natsTransport])],
})
export class NatsModule {}
