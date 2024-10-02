import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Services } from 'src/core/constants';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [{
    provide: Services.USERS,
    useClass: UsersService
  }, UsersResolver],
  exports: [{
    provide: Services.USERS,
    useClass: UsersService
  }]
})
export class UsersModule {}
