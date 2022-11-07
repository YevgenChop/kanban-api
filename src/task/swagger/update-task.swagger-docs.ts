import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const UpdateTaskDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a task' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The task has been updated' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
  );
};
