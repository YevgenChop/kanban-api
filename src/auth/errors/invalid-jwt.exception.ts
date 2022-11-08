import { UnauthorizedException } from '@nestjs/common';

export class InvalidJWTException extends UnauthorizedException {
  constructor() {
    super('Forbidden: invalid JWT');
  }
}
