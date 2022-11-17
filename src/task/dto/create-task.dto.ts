import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: 'string', example: 'Create Module' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: 'Create auth module' })
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  boardId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  statusId: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: 'string',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  usersIds: string[];
}
