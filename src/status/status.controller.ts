import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusDto } from './dto/status.dto';
import { StatusService } from './status.service';
import { GetStatusesDocs } from './swagger/get-statuses.swagger-docs';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @GetStatusesDocs()
  @Get()
  public getStatuses(): Promise<StatusDto[]> {
    return this.statusService.getStatuses();
  }
}
