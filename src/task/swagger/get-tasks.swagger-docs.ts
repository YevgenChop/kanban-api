import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskWithUsersAndCommentsDto } from '../dto/task.dto';

export const GetTasksDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Get a board's tasks` }),
    ApiBearerAuth(),
    ApiNotFoundResponse({ description: 'Board not found' }),
    ApiOkResponse({
      description: `Board's tasks`,
      type: TaskWithUsersAndCommentsDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
  );
};
