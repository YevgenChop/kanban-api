import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class TaskWithUsersAndCommentsDto extends TaskDto {
  @ApiProperty({
    isArray: true,
    example: [{ id: '123e4567-e89b-12d3-a456-426614174000', name: 'John Doe' }],
  })
  users: { id: string; name: string }[];

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
