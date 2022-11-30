import {
  Entity,
  Column,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';
import { BaseEntity } from '../shared/base.entity';
import { Comment } from '../comment/comment.entity';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true, select: false })
  verificationToken: string | null;

  @Column({ nullable: true, select: false })
  refreshToken: string | null;

  @ManyToMany(() => Board, (board) => board.owner)
  @JoinTable()
  ownBoards: Board[];

  @ManyToMany(() => Board, (board) => board.users)
  @JoinTable()
  boards: Board[];

  @ManyToMany(() => Task, (task) => task.users, { onDelete: 'CASCADE' })
  @JoinTable()
  tasks: Task[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
