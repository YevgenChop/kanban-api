import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ type: 'string', example: 'New Board' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  public title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ type: 'string', example: 'This is a new board' })
  public description?: string;
}
