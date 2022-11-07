import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
}
