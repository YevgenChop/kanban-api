import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  /**
   * A user's login
   * @example johndoe
   */
  @ApiProperty({ required: false, type: 'string', example: 'johndoe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public login?: string;

  /**
   * A user's name
   * @example John
   */
  @ApiProperty({ required: false, type: 'string', example: 'John' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public name?: string;

  /**
   * A user's password
   * @example password
   */
  @ApiProperty({ required: false, type: 'string', example: 'password' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  public password?: string;

  /**
   * A user's email
   * @example doe@gmail.com
   */
  @ApiProperty({ required: false, type: 'string', example: 'doe@gmail.com' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  public email?: string;

  /**
   * A user's role
   * @example user
   */
  @ApiProperty({ required: false, enum: UserRole, example: UserRole.User })
  @IsOptional()
  @IsEnum(UserRole)
  public role?: UserRole;
}
