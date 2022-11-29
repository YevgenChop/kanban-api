import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusDto } from './dto/status.dto';
import { Status } from './status.entity';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectRepository(Status) private statusRepo: Repository<Status>,
  ) {}

  public find(boardId: string): Promise<Status[]> {
    let query = this.statusRepo
      .createQueryBuilder('s')
      .where('s.custom IS FALSE');

    if (boardId) {
      query = query.orWhere('s.boardId = :boardId', { boardId });
    }

    return query.getMany();
  }

  public findOneByIdOrFail(id: string): Promise<Status> {
    return this.statusRepo.findOneByOrFail({ id });
  }

  public findOneBy(options: Partial<Status>): Promise<Status> {
    return this.statusRepo.findOneBy(options);
  }

  public async createStatus(dto: CreateStatusDto): Promise<StatusDto> {
    return this.statusRepo.save(
      this.statusRepo.create({ ...dto, custom: true }),
    );
  }

  public async updateStatus(id: string, title: string): Promise<void> {
    await this.statusRepo.update({ id }, { title });
  }

  public async deleteStatus(id: string): Promise<void> {
    await this.statusRepo.delete({ id });
  }
}
