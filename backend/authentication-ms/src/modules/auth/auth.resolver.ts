import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginInput } from './dto/inputs/LoginInput';
import { Services } from 'src/core/constants';
import { Inject } from '@nestjs/common';
import { AuthPayload } from './entity/auth.entity';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(
    @Inject(Services.AUTH) private readonly authService: AuthService
  ) {}

  @Mutation(() => AuthPayload)
  @MessagePattern('auth.login')
  login(@Args('login') loginInput: LoginInput) : AuthPayload {
    return this.authService.login(loginInput);
  }

  // @ResolveReference()
  // resolveReference(reference: { __typename: string; id: number }): User {
  //   return this.authService.findUserById(reference.id);
  // }
}
