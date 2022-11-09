import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from '../board/board.service';
import { Board } from '../board/board.entity';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { StatusService } from '../status/status.service';
import { BoardRepository } from '../board/board.repository';
import { StatusRepository } from '../status/status.repository';
import { Status } from '../status/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board, Status])],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepository,
    BoardService,
    BoardRepository,
    StatusService,
    StatusRepository,
  ],
})
export class TaskModule {}
