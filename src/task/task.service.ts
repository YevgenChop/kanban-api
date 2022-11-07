import { Injectable } from '@nestjs/common';
import { BoardNotFoundException } from 'src/board/errors/board-not-found.exception';
import { BoardRepository } from '../board/board.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskNotFoundException } from './errors/task-not-found.exception';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private boardRepo: BoardRepository,
  ) {}

  public createTask(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepo.createTask(dto);
  }

  public async updateTask(dto: UpdateTaskDto, id: number): Promise<void> {
    try {
      await this.taskRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new TaskNotFoundException();
    }

    return this.taskRepo.updateTask(dto, id);
  }

  public async deleteTask(id: number): Promise<void> {
    try {
      await this.taskRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new TaskNotFoundException();
    }
    await this.taskRepo.deleteTask(id);
  }

  public async getTasks(boardId: number): Promise<Task[]> {
    try {
      await this.boardRepo.findOneByOrFail({ id: boardId });
    } catch (error) {
      throw new BoardNotFoundException();
    }

    return this.taskRepo.findBy({ boardId });
  }
}
