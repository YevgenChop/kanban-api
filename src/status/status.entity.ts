import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class Status extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.status)
  tasks: Task[];

  @Column({ default: false })
  custom: boolean;

  @Column({ nullable: true })
  boardId: string;
}
