import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Inject } from '@nestjs/common';
import { Services } from 'src/core/constants';

@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject(Services.USERS) private usersService: UsersService) {}

  @Query(() => User)
  getUser(@Args('id') id: number): User {
    const user = new User();
    return user;
  }

  @Query(() => [User], { name: 'getUsers' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
