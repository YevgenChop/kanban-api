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

  public findOneByTitle(title: string): Promise<Status> {
    return this.statusRepo.findOneBy({ title });
  }

  public async createStatus(title: string): Promise<void> {
    await this.statusRepo.save(this.statusRepo.create({ title }));
  }

  public async updateStatus(id: string, title: string): Promise<void> {
    await this.statusRepo.update({ id }, { title });
  }

  public async deleteStatus(id: string): Promise<void> {
    await this.statusRepo.delete({ id });
  }
}
