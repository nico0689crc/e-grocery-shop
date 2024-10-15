import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: UserRole;
}
