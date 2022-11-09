import { ApiProperty } from '@nestjs/swagger';
import { CreateStatusDto } from './create-status.dto';

export class StatusDto extends CreateStatusDto {
  @ApiProperty({
    type: 'string',
    example: '5bdc250b-7862-44f3-a1b2-4799cbf32598',
  })
  id: string;
}
