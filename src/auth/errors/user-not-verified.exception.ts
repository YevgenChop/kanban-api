import { UnauthorizedException } from '@nestjs/common';

export class UserNotVerifiedException extends UnauthorizedException {
  constructor() {
    super('Forbidden: user not verified');
  }
}
