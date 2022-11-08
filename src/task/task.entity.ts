import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Status } from './status.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Task extends BaseEntity {
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
  boardId: string;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
