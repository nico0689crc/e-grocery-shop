import { Resolver, Query, Args, ResolveReference } from '@nestjs/graphql';
import { User, UserRole } from './entities/user.entity';
import { UsersService } from './users.service';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Services } from 'src/core/constants';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(@Inject(Services.USERS) private usersService: UsersService) {}

  @Query(() => User, { name: 'getUser' })
  @UseGuards(JwtAuthGuard)
  async getUser(@Args('id') id: string): Promise<User> {
    const user = await this.usersService.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Query(() => [User], { name: 'getUsers' })
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @CurrentUser([UserRole.ADMINISTRATOR]) user: User,
  ): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<User> {
    return await this.usersService.findOne({ where: { id: reference.id } });
  }
}
