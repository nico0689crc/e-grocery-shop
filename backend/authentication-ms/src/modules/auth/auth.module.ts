import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { Services } from 'src/core/constants';

@Module({
  imports: [UsersModule],
  providers: [
    AuthResolver, 
    {
      provide: Services.AUTH,
      useClass: AuthService
    }
  ],
})
export class AuthModule {}
