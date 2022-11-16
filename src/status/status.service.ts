import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusAlreadyExistsException } from './errors/status-already-exists.exception';
import { StatusNotFoundException } from './errors/status-not-found.exception';
import { Status } from './status.entity';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(private statusRepo: StatusRepository) {}

  public getStatuses(boardId: string): Promise<Status[]> {
    return this.statusRepo.find(boardId);
  }

  public async createStatus(dto: CreateStatusDto): Promise<void> {
    const status = await this.statusRepo.findOneByTitle(dto.title);

    if (status) throw new StatusAlreadyExistsException();

    return this.statusRepo.createStatus(dto);
  }

  public async deleteStatus(id: string): Promise<void> {
    await this.findOneByIdOrFail(id);

    return this.statusRepo.deleteStatus(id);
  }

  public async updateStatus(id: string, title: string): Promise<void> {
    await this.findOneByIdOrFail(id);

    const status = await this.statusRepo.findOneByTitle(title);
    if (status) throw new StatusAlreadyExistsException();

    return this.statusRepo.updateStatus(id, title);
  }

  public async findOneByIdOrFail(id: string): Promise<Status> {
    try {
      return await this.statusRepo.findOneByIdOrFail(id);
    } catch (error) {
      throw new StatusNotFoundException();
    }
  }
}
