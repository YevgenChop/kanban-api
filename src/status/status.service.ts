import { Injectable } from '@nestjs/common';
import { Status } from './status.entity';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(private statusRepo: StatusRepository) {}

  public getStatuses(): Promise<Status[]> {
    return this.statusRepo.find();
  }

  public findOneByIdOrFail(id: string): Promise<Status> {
    return this.statusRepo.findOneByIdOrFail(id);
  }
}
