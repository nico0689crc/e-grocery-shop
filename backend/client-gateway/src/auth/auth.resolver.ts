import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { NATS_SERVICE } from 'src/config';
import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { LoginInput } from './dto/inputs/LoginInput';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Query(() => Auth, { name: 'login' })
  login(
    @Args('loginInput') loginInput: LoginInput
  ) {
    return this.client.send('auth.login', loginInput).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
