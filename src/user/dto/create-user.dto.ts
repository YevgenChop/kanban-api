import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: 'string', example: 'johndoe' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  login: string;

  @ApiProperty({ type: 'string', example: 'John' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: 'string', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  password: string;

  @ApiProperty({ type: 'string', example: 'doe@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  email: string;
}
