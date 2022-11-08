import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../task/task.entity';
import { CreateBoardDto } from './create-board.dto';

export class BoardDto extends CreateBoardDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public id: string;

  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public ownerId: string;

  @ApiProperty({
    type: [Task],
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Create Module',
      desription: 'Create the auth module',
      boardId: '123e4567-e89b-12d3-a456-426614174000',
      users: [
        { id: '123e4567-e89b-12d3-a456-426614174000' },
        { id: '123e4567-e89b-12d3-a456-426614174001' },
      ],
    },
  })
  public tasks: Task[];
}
