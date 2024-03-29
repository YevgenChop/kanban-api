import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusDto } from './dto/status.dto';
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

  public async createStatus(dto: CreateStatusDto): Promise<StatusDto> {
    const status = await this.statusRepo.findOneBy({
      title: dto.title,
      boardId: dto.boardId,
    });

    if (status) throw new StatusAlreadyExistsException();

    return this.statusRepo.createStatus(dto);
  }

  public async deleteStatus(id: string): Promise<void> {
    await this.findOneByIdOrFail(id);

    return this.statusRepo.deleteStatus(id);
  }

  public async updateStatus(id: string, title: string): Promise<void> {
    try {
      return await this.statusRepo.updateStatus(id, title);
    } catch (error) {
      throw new StatusAlreadyExistsException();
    }
  }

  public async findOneByIdOrFail(id: string): Promise<Status> {
    try {
      return await this.statusRepo.findOneByIdOrFail(id);
    } catch (error) {
      throw new StatusNotFoundException();
    }
  }
}
