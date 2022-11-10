import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
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

  public async updateTask(dto: UpdateTaskDto, id: string): Promise<void> {
    await this.taskRepo.update({ id }, dto);
  }

  public async deleteTask(id: string): Promise<void> {
    await this.taskRepo.softDelete({ id });
  }

  public async assign(taskId: string, user: User): Promise<void> {
    const task = await this.getTaskWithUsers(taskId);

    task.users.push(user);

    await this.taskRepo.save(task);
  }

  public async unassign(taskId: string, user: User): Promise<void> {
    const task = await this.getTaskWithUsers(taskId);

    task.users = task.users.filter((u) => u.id !== user.id);

    await this.taskRepo.save(task);
  }

  public findByBoardId(boardId: string): Promise<Task[]> {
    return this.taskRepo
      .createQueryBuilder('t')
      .leftJoin('t.comments', 'tc')
      .leftJoin('tc.user', 'tcu')
      .leftJoin('t.users', 'tu')
      .addSelect(['tc.id', 'tc.commentText', 'tcu.name', 'tcu.id'])
      .addSelect(['tu.id', 'tu.name'])
      .where('t.boardId = :boardId', { boardId })
      .getMany();
  }

  private getTaskWithUsers(taskId: string): Promise<Task> {
    return this.taskRepo
      .createQueryBuilder('t')
      .leftJoinAndSelect('t.users', 'tu')
      .where('t.id = :taskId', { taskId })
      .getOne();
  }
}
