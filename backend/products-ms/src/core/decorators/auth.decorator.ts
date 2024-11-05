import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from './valid-roles.decorator';
import { AuthValidatorGuard } from '../guards/auth-validator.guard';
import { UserRole } from 'src/modules/users/entities/user.entity';

export const Auth = (...roles: UserRole[]) => {
  return applyDecorators(ValidRoles(...roles), UseGuards(AuthValidatorGuard));
};
