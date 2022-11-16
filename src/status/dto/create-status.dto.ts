import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    type: 'string',
    example: 'Backlog',
  })
  title: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '5bdc250b-7862-44f3-a1b2-4799cbf32598',
  })
  boardId: string;
}
