import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/board.entity';
import { BoardRepository } from '../board/board.repository';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, BoardRepository],
})
export class TaskModule {}
