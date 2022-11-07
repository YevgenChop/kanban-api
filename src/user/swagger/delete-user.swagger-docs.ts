import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const DeleteUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The user has been deleted' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
    ApiParam({ name: 'id', type: 'string' }),
  );
};
