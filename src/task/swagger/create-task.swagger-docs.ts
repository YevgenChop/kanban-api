import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskDto } from '../dto/task.dto';

export const CreateTaskDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a task' }),
    ApiBearerAuth(),
    ApiOkResponse({ type: TaskDto, description: 'The task has been created' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
  );
};
