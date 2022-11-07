import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../task/task.entity';
import { CreateBoardDto } from './create-board.dto';

export class BoardDto extends CreateBoardDto {
  @ApiProperty({ type: 'number', example: 1 })
  public id: number;

  @ApiProperty({ type: 'number', example: 1 })
  public ownerId: number;

  @ApiProperty({
    type: [Task],
    example: {
      id: 1,
      title: 'Create Module',
      desription: 'Create the auth module',
      boardId: 1,
      users: [{ id: 1 }, { id: 2 }],
    },
  })
  public tasks: Task[];
}
