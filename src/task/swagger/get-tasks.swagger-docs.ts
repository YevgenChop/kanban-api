import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskDto } from '../dto/task.dto';

export const GetTasksDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Get a board's tasks` }),
    ApiBearerAuth(),
    ApiNotFoundResponse({ description: 'Board not found' }),
    ApiOkResponse({
      description: `Board's tasks`,
      type: TaskDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
  );
};
