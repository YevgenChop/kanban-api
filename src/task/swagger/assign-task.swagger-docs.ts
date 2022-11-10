import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const AssignTaskDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Assign a task to a user' }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The task has been assigned to the user',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({
      description: 'Invalid request body or parameters',
    }),
    ApiNotFoundResponse({ description: 'Task or user not found' }),
    ApiBody({
      schema: {
        type: 'object',
        description: 'The id of the user the task will be assigned to',
        properties: {
          userId: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        },
      },
    }),
    ApiParam({
      name: 'id',
      description: `The task's id`,
      schema: {
        type: 'string',
      },
    }),
  );
};
