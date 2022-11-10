import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: 'string', example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  login: string;

  @ApiProperty({ type: 'string', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  password: string;
}
