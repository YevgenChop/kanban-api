import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const DeleteTaskDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a task' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The task has been deleted' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
    ApiNotFoundResponse({ description: 'Task not found' }),
  );
};
