import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User, UserRole } from 'src/modules/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (roles: UserRole[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        `No user inside the request - make sure that we used the AuthGuard`,
      );
    }

    if ( roles.length === 0 || roles.includes(user.role) ) return user;

    throw new ForbiddenException(`User need a valid role [${roles}]`);
  },
);
