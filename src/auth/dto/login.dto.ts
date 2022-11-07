import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
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
   * A user's password
   * @example password
   */
  @ApiProperty({ type: 'string', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  public password: string;
}
