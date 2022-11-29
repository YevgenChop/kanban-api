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

  public async createTask(
    dto: Omit<CreateTaskDto, 'usersIds'>,
    assignedUsers: User[],
  ): Promise<Task> {
    const task = await this.taskRepo.save(this.taskRepo.create(dto));

    if (assignedUsers.length) {
      task.users = assignedUsers;
      await this.taskRepo.save(task);
    }

    return this.taskRepo
      .createQueryBuilder('t')
      .leftJoin('t.users', 'tu')
      .addSelect(['tu.id', 'tu.name'])
      .where('t.id = :id', { id: task.id })
      .getOne();
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
      .leftJoin('t.users', 'tu')
      .addSelect('t.createdDate')
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
