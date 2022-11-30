import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { TaskDto } from '../../task/dto/task.dto';
import { UserRole } from '../user.entity';

export class UserDto {
  @ApiProperty({ type: 'string', example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'doe@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: UserRole, examples: [UserRole.Admin, UserRole.User] })
  role: string;

  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class UserWithTokensDto extends UserDto {
  @ApiProperty({ type: 'string', example: 'access_token' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: 'string', example: 'refresh_token' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class UserWithTasksDto extends UserDto {
  @ApiProperty({
    isArray: true,
    type: TaskDto,
  })
  tasks: TaskDto[];
}
