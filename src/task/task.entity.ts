import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @ApiProperty()
  @ManyToOne(() => Status, (status) => status.tasks)
  status: Status;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];

  @ApiProperty()
  @Column()
  boardId: number;
}
