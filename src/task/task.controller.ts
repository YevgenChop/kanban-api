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
import { User } from '../decorators/user.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDocs } from './swagger/create-task.swagger-docs';
import { DeleteTaskDocs } from './swagger/delete-task.swagger-docs';
import { GetTasksDocs } from './swagger/get-tasks.swagger-docs';
import { UpdateTaskDocs } from './swagger/update-task.swagger-docs';
import { TaskService } from './task.service';
import { User as UserEntity } from '../user/user.entity';
import { AssignTaskDocs } from './swagger/assign-task.swagger-docs';
import { UnassignTaskDocs } from './swagger/unassign-task.swagger-docs';

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
  @HttpCode(HttpStatus.NO_CONTENT)
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

  @AssignTaskDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/assign/:id')
  public assign(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body('userId', ParseUUIDPipe) userId: string,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskService.assign(taskId, userId, user);
  }

  @UnassignTaskDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/unassign/:id')
  public unassign(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body('userId', ParseUUIDPipe) userId: string,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.taskService.unassign(taskId, userId, user);
  }
}
