import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {

  @Query(() => User)
  getUser(@Args('id') id: number): User {
    const user = new User();
    return user;
  }

  @Query(() => [User])
  getUsers(): User[] {
    const user_1 = new User();
    const user_2 = new User();
    return [user_1, user_2];
  }
}
