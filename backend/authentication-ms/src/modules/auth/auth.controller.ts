import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @MessagePattern("check-admin")
  checkAdmin(data: { userId: string }): boolean {
    console.log('Received message:', data);
    return true;
  }
}
