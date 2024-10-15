import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Services } from 'src/core/constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthResponse } from './types/auth-response.types';
import { SignUpInput } from './dto/inputs/signup.input';
import { JwtService } from '@nestjs/jwt';
import { SignInInput } from './dto/inputs/signin.input';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.create(signUpInput);

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async signIn({ email, password }: SignInInput): Promise<AuthResponse> {
    const user = await this.userService.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UserNotFoundException();
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  async getProfile(user: User): Promise<AuthResponse> {
    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  async authValidate(token: string): Promise<Partial<User> | boolean> {
    try {
      const { id } = this.jwtService.verify(token);

      const {firstName, lastName, email, role} =  await this.validateUser(id);

      return {id, firstName, lastName, email, role};
    } catch (error) {
      return false;
    }
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.userService.findOne({ where: { id } });

    if (!user.emailVerified) {
      throw new UnauthorizedException(`User email is not verified`);
    }

    delete user.password;

    return user;
  }

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }
}
