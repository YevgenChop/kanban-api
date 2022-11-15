import { ConflictException } from '@nestjs/common';

export class UserAlreadyVerifiedException extends ConflictException {
  constructor() {
    super('User has already been verified');
  }
}
