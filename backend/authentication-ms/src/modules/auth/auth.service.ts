import { Inject, Injectable } from '@nestjs/common';
import { LoginInput } from './dto/inputs/LoginInput';
import { Services } from 'src/core/constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthPayload } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: UsersService
  ) {}

  login(loginInput: LoginInput): AuthPayload {
    return {
      token: "F9Aj65cTjwaRxJtuDPPY",
      userId: "1773bead-c539-5e4c-ab27-086cf54b5b73"
    };
  }
}
