import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: 'string',
    example: 'Backlog',
  })
  title: string;
}
