import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ type: 'string', example: 'Create Module' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: 'Create auth module' })
  public description: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public boardId: string;
}
