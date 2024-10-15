import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Services } from 'src/core/constants';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    @Inject(Services.AUTH)
    private readonly authService: AuthService,
  ) {}
  
  @MessagePattern({ cmd: 'auth-validate' })
  async checkAdmin({ token }: { token: string }): Promise<Partial<User> | boolean> {
    return await this.authService.authValidate(token);
  }
}
