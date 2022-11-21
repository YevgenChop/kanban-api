import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ type: 'string', example: 'New Board', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({
    type: 'string',
    example: 'This is a new board',
    required: false,
  })
  description?: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: 'string',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  usersIds: string[];
}
