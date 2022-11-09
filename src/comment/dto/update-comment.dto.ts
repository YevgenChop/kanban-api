import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ type: 'string', example: 'This is my comment' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  commentText: string;
}
