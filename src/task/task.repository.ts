import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  public createTask(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.save(this.taskRepo.create(dto));
  }

  public findOneByOrFail(options: Partial<Task>): Promise<Task> {
    return this.taskRepo.findOneByOrFail(options);
  }

  public async updateTask(dto: UpdateTaskDto, id: number): Promise<void> {
    await this.taskRepo.update({ id }, dto);
  }

  public async deleteTask(id: number): Promise<void> {
    await this.taskRepo.softDelete({ id });
  }

  public findBy(options: Partial<Task>): Promise<Task[]> {
    return this.taskRepo.findBy(options);
  }
}
