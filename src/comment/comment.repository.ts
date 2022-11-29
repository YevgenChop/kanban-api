import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  public async createComment(
    dto: CreateCommentDto,
    userId: string,
  ): Promise<void> {
    await this.commentRepo.save(this.commentRepo.create({ ...dto, userId }));
  }

  public async updateComment(id: string, commentText: string): Promise<void> {
    await this.commentRepo.update({ id }, { commentText });
  }

  public async getCommentsByTaskId(taskId: string): Promise<CommentDto[]> {
    return this.commentRepo
      .createQueryBuilder('c')
      .leftJoin('c.user', 'cu')
      .select([
        'c.id as id',
        'c.createdDate as "createdDate"',
        'c.updatedDate as "updatedDate"',
        'c.taskId as "taskId"',
        'c.commentText as "commentText"',
        'c.userId as "userId"',
        'cu.name as username',
      ])
      .where('c.taskId = :taskId', { taskId })
      .orderBy('c.createdDate', 'ASC')
      .getRawMany();
  }

  public findOneByIdOrFail(id: string): Promise<Comment> {
    return this.commentRepo.findOneByOrFail({ id });
  }

  public async deleteComment(id: string): Promise<void> {
    await this.commentRepo.delete({ id });
  }
}
