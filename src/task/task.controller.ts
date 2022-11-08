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
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDocs } from './swagger/create-task.swagger-docs';
import { DeleteTaskDocs } from './swagger/delete-task.swagger-docs';
import { GetTasksDocs } from './swagger/get-tasks.swagger-docs';
import { UpdateTaskDocs } from './swagger/update-task.swagger-docs';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @CreateTaskDocs()
  @Post()
  public createTask(@Body() dto: CreateTaskDto): Promise<TaskDto> {
    return this.taskService.createTask(dto) as Promise<TaskDto>;
  }

  @UpdateTaskDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  public updateTask(
    @Body() dto: UpdateTaskDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.taskService.updateTask(dto, id);
  }

  @DeleteTaskDocs()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  public deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @GetTasksDocs()
  @Get()
  public getTasksByBoardId(
    @Query('boardId') boardId: string,
  ): Promise<TaskDto[]> {
    return this.taskService.getTasks(boardId);
  }
}
