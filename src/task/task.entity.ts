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
import { BaseEntity } from '../shared/base.entity';
import { Comment } from '../comment/comment.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  board: Board;

  @ManyToOne(() => Status, (status) => status.tasks, { onDelete: 'CASCADE' })
  status: Status;

  @ManyToMany(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments: Comment[];

  @Column()
  boardId: string;

  @Column()
  statusId: string;

  @Exclude()
  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
