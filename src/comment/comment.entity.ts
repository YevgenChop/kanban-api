import { BaseEntity } from '../shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  commentText: string;

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  task: Task;

  @Column()
  taskId: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  userId: string;
}
