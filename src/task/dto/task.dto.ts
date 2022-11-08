import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../status.entity';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public id: string;

  @ApiProperty({ type: Status, example: 'backlog' })
  public status: Status;

  @ApiProperty({
    isArray: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public users: { id: string }[];
}
