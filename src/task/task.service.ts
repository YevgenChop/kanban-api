import { ForbiddenException, Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './errors/task-not-found.exception';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { StatusService } from '../status/status.service';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private boardService: BoardService,
    private statusService: StatusService,
    private userService: UserService,
  ) {}

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    await this.statusService.findOneByIdOrFail(dto.statusId);
    await this.boardService.findOneByOrFail({ id: dto.boardId });

    return this.taskRepo.createTask(dto);
  }

  public async updateTask(dto: UpdateTaskDto, id: string): Promise<void> {
    await this.findOneByOrFail({ id });

    if (dto.statusId) {
      await this.statusService.findOneByIdOrFail(dto.statusId);
    }

    return this.taskRepo.updateTask(dto, id);
  }

  public async deleteTask(id: string): Promise<void> {
    await this.findOneByOrFail({ id });

    await this.taskRepo.deleteTask(id);
  }

  public async assign(
    taskId: string,
    userId: string,
    authUser: User,
  ): Promise<void> {
    this.checkIfHasEnoughRigthsOrFail(userId, authUser);

    await this.findOneByOrFail({ id: taskId });
    const user = await this.userService.findOneByOrFail({ id: userId });

    await this.taskRepo.assign(taskId, user);
  }

  public async unassign(
    taskId: string,
    userId: string,
    authUser: User,
  ): Promise<void> {
    this.checkIfHasEnoughRigthsOrFail(userId, authUser);

    await this.findOneByOrFail({ id: taskId });
    const user = await this.userService.findOneByOrFail({ id: userId });

    await this.taskRepo.unassign(taskId, user);
  }

  public async getTasks(boardId: string): Promise<Task[]> {
    await this.boardService.findOneByOrFail({ id: boardId });
    return this.taskRepo.findByBoardId(boardId);
  }

  public async findOneByOrFail(options: Partial<Task>): Promise<Task> {
    try {
      return await this.taskRepo.findOneByOrFail(options);
    } catch (error) {
      throw new TaskNotFoundException();
    }
  }

  private checkIfHasEnoughRigthsOrFail(userId: string, authUser: User): void {
    if (userId !== authUser.id && authUser.role !== UserRole.Admin) {
      throw new ForbiddenException('Forbidden: not enough rights');
    }
  }
}
