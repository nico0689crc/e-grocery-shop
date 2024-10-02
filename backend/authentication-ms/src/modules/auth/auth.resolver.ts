import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Services } from 'src/core/constants';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.types';
import { DoesUserExist } from 'src/core/guards/does-user-exist';
import { SignUpInput } from './dto/inputs/signup.input';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject(Services.AUTH)
    private readonly authService: AuthService,
  ) {}

  @UseGuards(DoesUserExist)
  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signupInput') signupInput: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }
}
