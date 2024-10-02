import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Services } from 'src/core/constants';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  providers: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
    UsersResolver,
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UsersService,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
