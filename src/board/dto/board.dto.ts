import { ApiProperty } from '@nestjs/swagger';
import { TaskDto } from '../../task/dto/task.dto';
import { CreateBoardDto } from './create-board.dto';

export class BoardDto extends CreateBoardDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  ownerId: string;
}

export class BoardWithTasksDto extends BoardDto {
  @ApiProperty({
    type: TaskDto,
    isArray: true,
  })
  tasks: TaskDto[];
}
