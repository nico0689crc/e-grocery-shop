import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Services } from 'src/core/constants';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.types';
import { DoesUserExist } from 'src/core/guards/does-user-exist';
import { SignUpInput } from './dto/inputs/signup.input';
import { SignInInput } from './dto/inputs/signin.input';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(Services.AUTH)
    private readonly authService: AuthService,
  ) {}

  @UseGuards(DoesUserExist)
  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<AuthResponse> {
    return await this.authService.signIn(signInInput);
  }

  @Query(() => AuthResponse, { name: 'getProfile' })
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User): Promise<AuthResponse> {
    return await this.authService.getProfile(user);
  }
}
