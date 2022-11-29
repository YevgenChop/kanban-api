import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
@Unique(['title', 'boardId'])
export class Status extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.status, { cascade: true })
  tasks: Task[];

  @Column({ default: false })
  custom: boolean;

  @Column({ nullable: true })
  boardId: string;
}
