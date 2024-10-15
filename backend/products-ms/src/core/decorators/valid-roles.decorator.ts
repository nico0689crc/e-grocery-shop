import { SetMetadata } from '@nestjs/common';

export const VALID_ROLES_KEY = 'valid-roles';

export const ValidRoles = (...args: string[]) =>
  SetMetadata(VALID_ROLES_KEY, args);
