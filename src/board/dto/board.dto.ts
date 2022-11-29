import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../user/dto/user.dto';
import { TaskDto } from '../../task/dto/task.dto';

export class BoardDto {
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

  @ApiProperty({ type: 'string', example: 'New Board' })
  title: string;

  @ApiProperty({ type: 'string', example: 'This is a new board' })
  description: string;

  @ApiProperty({
    type: 'string',
    example: '2022-11-23T16:26:11.045Z',
  })
  createdDate: Date;
}

export class BoardWithTasksDto extends BoardDto {
  @ApiProperty({
    type: TaskDto,
    isArray: true,
  })
  tasks: TaskDto[];
}

export class BoardWithUsersDto extends BoardDto {
  @ApiProperty({
    type: UserDto,
    isArray: true,
  })
  users: UserDto[];
}
