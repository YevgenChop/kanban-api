import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';
import { User as UserEntity } from '../user/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDocs } from './swagger/create-comment.swagger-docs';
import { DeleteCommentDocs } from './swagger/delete-comment.swagger-docs';
import { UpdateCommentDocs } from './swagger/update-comment.swagger-docs copy';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @CreateCommentDocs()
  @Post()
  public createComment(
    @User('id') userId: string,
    @Body() dto: CreateCommentDto,
  ): Promise<void> {
    return this.commentService.createComment(dto, userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteCommentDocs()
  @Delete('/:id')
  public deleteComment(
    @User() user: UserEntity,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.commentService.deleteComment(id, user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateCommentDocs()
  @Patch('/:id')
  public updateComment(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserEntity,
    @Body() { commentText }: UpdateCommentDto,
  ): Promise<void> {
    return this.commentService.updateComment(id, commentText, user);
  }
}
