import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../status.entity';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty({ type: 'string', example: '1' })
  public id: string;

  @ApiProperty({ type: Status, example: 'backlog' })
  public status: Status;

  @ApiProperty({ isArray: true, example: '1' })
  public users: { id: string }[];
}
