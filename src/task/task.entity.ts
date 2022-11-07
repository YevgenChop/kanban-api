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

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @ManyToOne(() => Status, (status) => status.tasks)
  status: Status;

  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];

  @Column()
  boardId: number;
}
