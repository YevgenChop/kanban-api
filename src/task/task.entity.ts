import { Board } from '../board/board.entity';
import { User } from '../user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Status } from '../status/status.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../shared/base.entity';
import { Comment } from '../comment/comment.entity';

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

  @ManyToOne(() => Status, (status) => status.tasks)
  status: Status;

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.tasks)
  users: User[];

  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @ApiProperty()
  @Column()
  boardId: string;

  @ApiProperty()
  @Column()
  statusId: string;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
