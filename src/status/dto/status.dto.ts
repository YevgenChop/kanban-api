import { ApiProperty } from '@nestjs/swagger';

export class StatusDto {
  @ApiProperty({
    type: 'string',
    example: '5bdc250b-7862-44f3-a1b2-4799cbf32598',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    example: 'Backlog',
  })
  title: string;
}
