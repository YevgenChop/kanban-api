import { BaseEntity } from '../shared/base.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Board extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.boards)
  owner: User;

  // @ManyToMany(() => User, (user) => user.boards)
  // users: User[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @Column()
  ownerId: string;

  @Exclude()
  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
