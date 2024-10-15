import { Resolver, Query, Args } from '@nestjs/graphql';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';
import { Inject, UseGuards } from '@nestjs/common';
import { Services } from 'src/core/constants';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject(Services.USERS) private usersService: UsersService) {}

  @Query(() => User, { name: 'getUser' })
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Args('id') id: string,
    @CurrentUser([UserRole.ADMINISTRATOR]) user: User,
  ): Promise<User> {
    return await this.usersService.findOne({ where: { id } });
  }

  @Query(() => [User], { name: 'getUsers' })
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @CurrentUser([UserRole.ADMINISTRATOR]) user: User,
  ): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
