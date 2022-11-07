import { UnauthorizedException } from '@nestjs/common';

export class WrongCredentialsException extends UnauthorizedException {
  constructor() {
    super('Email or password is invalid');
  }
}
