import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  public find(): Promise<Status[]> {
    return this.statusRepo.find();
  }

  public findOneByIdOrFail(id: string): Promise<Status> {
    return this.statusRepo.findOneByOrFail({ id });
  }
}
