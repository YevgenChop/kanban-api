import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const UpdateCommentDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a comment' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The comment has been updated' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({
      description: 'Invalid request body or id parameter',
    }),
    ApiNotFoundResponse({ description: 'Comment not found' }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
