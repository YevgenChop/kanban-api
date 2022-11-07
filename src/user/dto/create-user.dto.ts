import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  /**
   * A user's login
   * @example johndoe
   */
  @ApiProperty({ type: 'string', example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public login: string;

  /**
   * A user's name
   * @example John
   */
  @ApiProperty({ type: 'string', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  public name: string;

  /**
   * A user's password
   * @example password
   */
  @ApiProperty({ type: 'string', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  public password: string;

  /**
   * A user's email
   * @example doe@gmail.com
   */
  @ApiProperty({ type: 'string', example: 'doe@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  public email: string;
}
