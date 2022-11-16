import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusDto } from './dto/status.dto';
import { StatusService } from './status.service';
import { CreateStatusDocs } from './swagger/create-status.swagger-docs';
import { DeleteStatusDocs } from './swagger/delete-status.swagger-docs';
import { GetStatusesDocs } from './swagger/get-statuses.swagger-docs';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDocs } from './swagger/update-status.swagger-docs';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('status')
@UseGuards(RolesGuard)
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @GetStatusesDocs()
  @Get()
  public getStatuses(
    @Query('boardId', ParseUUIDPipe) boardId: string,
  ): Promise<StatusDto[]> {
    return this.statusService.getStatuses(boardId);
  }

  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @CreateStatusDocs()
  @Post()
  public createStatus(@Body() dto: CreateStatusDto): Promise<void> {
    return this.statusService.createStatus(dto);
  }

  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteStatusDocs()
  @Delete('/:id')
  public deleteStatus(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.statusService.deleteStatus(id);
  }

  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateStatusDocs()
  @Patch('/:id')
  public updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() { title }: UpdateStatusDto,
  ): Promise<void> {
    return this.statusService.updateStatus(id, title);
  }
}
