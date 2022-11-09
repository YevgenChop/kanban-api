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

export const DeleteCommentDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a comment' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The comment has been deleted' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid id parameter' }),
    ApiNotFoundResponse({ description: 'Comment not found' }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
