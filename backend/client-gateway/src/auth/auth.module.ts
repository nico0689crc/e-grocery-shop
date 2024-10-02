import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver],
  imports: []
})
export class AuthModule {}
