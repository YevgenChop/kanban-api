import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { TaskDto } from 'src/task/dto/task.dto';
import { UserRole } from '../user.entity';

export class UserDto {
  /**
   * An access token
   * @example access_token
   */
  @ApiProperty({ type: 'string', example: 'access_token' })
  @IsString()
  @IsNotEmpty()
  token: string;

  /**
   * A user's name
   * @example John
   */
  @ApiProperty({ type: 'string', example: 'John' })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * A user's email
   * @example doe@gmail.com
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'doe@gmail.com' })
  email: string;

  /**
   * A user's role
   * @example admin
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: UserRole, examples: [UserRole.Admin, UserRole.User] })
  role: string;

  /**
   * A user's id
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;
}

export class UserWithTasksDto extends UserDto {
  @ApiProperty({ type: TaskDto, isArray: true })
  tasks: TaskDto[];
}
