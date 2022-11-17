import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({ type: 'string', example: 'Create Module' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: 'Create auth module' })
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  boardId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  statusId: string;

  @ApiProperty({
    isArray: true,
    example: [{ id: '123e4567-e89b-12d3-a456-426614174000', name: 'John Doe' }],
  })
  users: { id: string; name: string }[];
}

export class TaskWithUsersAndCommentsDto extends TaskDto {
  @ApiProperty({
    isArray: true,
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        commentText: 'This is my comment',
        user: {
          id: '123e4567-e89b-12d3-a456-426614174335',
          name: 'John Doe',
        },
      },
    ],
  })
  comments: {
    id: string;
    commentText: string;
    user: { id: string; name: string };
  }[];
}
