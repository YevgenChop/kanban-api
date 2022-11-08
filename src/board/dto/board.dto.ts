import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../task/task.entity';
import { CreateBoardDto } from './create-board.dto';

export class BoardDto extends CreateBoardDto {
  @ApiProperty({ type: 'string', example: 1 })
  public id: string;

  @ApiProperty({ type: 'string', example: 1 })
  public ownerId: string;

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
