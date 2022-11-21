import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, UserRole } from '../user/user.entity';
import { TaskService } from '../task/task.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comment.entity';
import { CommentNotFoundException } from './errors/comment-not-found.exception';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private commentRepo: CommentRepository,
    private taskService: TaskService,
  ) {}

  public async createComment(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<void> {
    await this.taskService.findOneByOrFail({ id: dto.taskId });

    return this.commentRepo.createComment(dto, userId);
  }

  public async deleteComment(id: string, user: User): Promise<void> {
    const comment = await this.findOneByIdOrFail(id);

    if (comment.userId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Forbidden: not enough rights');
    }

    return this.commentRepo.deleteComment(id);
  }

  public getCommentsByTaskId(taskId: string): Promise<CommentDto[]> {
    return this.commentRepo.getCommentsByTaskId(taskId);
  }

  public async updateComment(
    id: string,
    commentText: string,
    user: User,
  ): Promise<void> {
    const comment = await this.findOneByIdOrFail(id);

    if (comment.userId !== user.id) {
      throw new ForbiddenException('Forbidden: not enough rights');
    }

    return this.commentRepo.updateComment(id, commentText);
  }

  public async findOneByIdOrFail(id: string): Promise<Comment> {
    try {
      return await this.commentRepo.findOneByIdOrFail(id);
    } catch (error) {
      throw new CommentNotFoundException();
    }
  }
}
