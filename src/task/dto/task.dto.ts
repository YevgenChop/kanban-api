import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../status.entity';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty({ type: 'number', example: '1' })
  public id: number;

  @ApiProperty({ type: Status, example: 'backlog' })
  public status: Status;

  @ApiProperty({ isArray: true, example: 1 })
  public users: { id: number }[];
}
