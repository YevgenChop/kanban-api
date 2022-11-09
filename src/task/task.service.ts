import { Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { BoardNotFoundException } from 'src/board/errors/board-not-found.exception';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './errors/task-not-found.exception';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { StatusService } from '../status/status.service';
import { StatusNotFoundException } from 'src/status/errors/status-not-found.exception';

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private boardService: BoardService,
    private statusService: StatusService,
  ) {}

  public async createTask(dto: CreateTaskDto): Promise<Task> {
    await this.checkIfStatusExistsOrFail(dto.statusId);
    await this.checkIfBoardExistsOrFail(dto.boardId);

    return this.taskRepo.createTask(dto);
  }

  public async updateTask(dto: UpdateTaskDto, id: string): Promise<void> {
    await this.findOneByOrFail({ id });
    await this.checkIfStatusExistsOrFail(dto.statusId);

    return this.taskRepo.updateTask(dto, id);
  }

  public async deleteTask(id: string): Promise<void> {
    await this.findOneByOrFail({ id });

    await this.taskRepo.deleteTask(id);
  }

  public async getTasks(boardId: string): Promise<Task[]> {
    await this.checkIfBoardExistsOrFail(boardId);

    return this.taskRepo.findByBoardId(boardId);
  }

  public async findOneByOrFail(options: Partial<Task>): Promise<Task> {
    try {
      return await this.taskRepo.findOneByOrFail(options);
    } catch (error) {
      throw new TaskNotFoundException();
    }
  }

  private async checkIfStatusExistsOrFail(statusId: string): Promise<void> {
    try {
      await this.statusService.findOneByIdOrFail(statusId);
    } catch (error) {
      throw new StatusNotFoundException();
    }
  }

  private async checkIfBoardExistsOrFail(boardId: string): Promise<void> {
    try {
      await this.boardService.findOneByOrFail({ id: boardId });
    } catch (error) {
      throw new BoardNotFoundException();
    }
  }
}
