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

@Entity()
export class Board extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.boards)
  owner: User;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @Column()
  ownerId: string;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
