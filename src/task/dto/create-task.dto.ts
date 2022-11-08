import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

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
  @IsPositive()
  @ApiProperty({ type: 'string', example: 1 })
  public boardId: string;
}
