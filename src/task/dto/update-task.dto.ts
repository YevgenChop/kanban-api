import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ type: 'string', example: 'Create Module', required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public title?: string;

  @ApiProperty({
    type: 'string',
    example: 'Create auth module',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  public description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public statusId?: string;
}
