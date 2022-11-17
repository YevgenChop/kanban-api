import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class StatusQueryDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: 'string',
    example: '5bdc250b-7862-44f3-a1b2-4799cbf32598',
  })
  boardId: string;
}
