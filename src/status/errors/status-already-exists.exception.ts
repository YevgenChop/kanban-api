import { ConflictException } from '@nestjs/common';

export class StatusAlreadyExistsException extends ConflictException {
  constructor() {
    super('Status already exists');
  }
}
