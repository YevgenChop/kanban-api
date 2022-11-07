import { Task } from 'src/task/task.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.boards)
  owner: User;

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];

  @Column()
  ownerId: number;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;
}
