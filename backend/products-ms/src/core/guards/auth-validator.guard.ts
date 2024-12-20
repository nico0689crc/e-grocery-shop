import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { VALID_ROLES_KEY } from '../decorators/valid-roles.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { UserRole, User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthValidatorGuard implements CanActivate {
  constructor(
    @Inject(NATS_SERVICE) private readonly authClient: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const validRoles = this.reflector.get<UserRole[]>(
      VALID_ROLES_KEY,
      context.getHandler(),
    );

    const request = GqlExecutionContext.create(context).getContext().req;
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new Error('Token not provided');
    }

    const validationResponse = await lastValueFrom(
      this.authClient.send<User | boolean>({ cmd: 'auth-validate' }, { token }),
    );

    if (
      !(validationResponse instanceof User) &&
      typeof validationResponse === 'boolean'
    ) {
      return false;
    }

    const { role: userRoles } = validationResponse as User & { role: UserRole };

    if (validRoles && validRoles.length > 0) {
      const hasValidRole = validRoles.some(
        (role: UserRole) => userRoles === role,
      );
      if (!hasValidRole) {
        return false;
      }
    }

    request.user = validationResponse;

    return true;
  }
}
