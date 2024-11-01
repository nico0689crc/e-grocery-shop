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
