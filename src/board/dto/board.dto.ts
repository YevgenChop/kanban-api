import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from 'src/task/dto/task.dto';
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
    type: TaskDto,
    isArray: true,
  })
  public tasks: Task[];
}
