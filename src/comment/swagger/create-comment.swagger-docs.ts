import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const CreateCommentDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a comment' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The comment has been created' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
    ApiNotFoundResponse({ description: 'Task or user not found' }),
  );
};
