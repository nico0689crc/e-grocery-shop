import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      'Invalid credentials. Please check your username and password and try again.',
      HttpStatus.NOT_FOUND,
    );
  }
}
