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
  @ApiProperty({ required: false, type: 'string', example: 'johndoe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  login?: string;

  @ApiProperty({ required: false, type: 'string', example: 'John' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name?: string;

  @ApiProperty({ required: false, type: 'string', example: 'password' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(6)
  password?: string;

  @ApiProperty({ required: false, type: 'string', example: 'doe@gmail.com' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Invalid email',
  })
  email?: string;

  @ApiProperty({ required: false, enum: UserRole, example: UserRole.User })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
