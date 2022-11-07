import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Board } from '../board/board.entity';
import { Task } from '../task/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  login: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ default: false })
  verified: boolean;

  @ManyToMany(() => Board, (board) => board.owner)
  @JoinTable()
  boards: Board[];

  @ManyToMany(() => Task, (task) => task.users)
  @JoinTable()
  tasks: Task[];

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
