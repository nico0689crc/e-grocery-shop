import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Services } from 'src/core/constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthResponse } from './types/auth-response.types';
import { SignUpInput } from './dto/inputs/signup.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.create(signupInput);

    const token = this.getJwtToken(user);

    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOne({ where: { id } });

    if (!user.emailVerified) {
      throw new UnauthorizedException(`User email is not verified`);
    }

    delete user.password;

    return user;
  }

  private getJwtToken(user: User) {
    return this.jwtService.sign({ user });
  }
}
