import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
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
   * @example 1
   */
  @IsPositive()
  @ApiProperty({ type: 'string', example: '1' })
  id: string;
}
