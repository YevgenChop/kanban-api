import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
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

  public findOneByIdOrFail(id: string): Promise<Comment> {
    return this.commentRepo.findOneByOrFail({ id });
  }

  public async deleteComment(id: string): Promise<void> {
    await this.commentRepo.delete({ id });
  }
}
