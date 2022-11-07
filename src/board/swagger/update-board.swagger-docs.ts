import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const UpdateBoardDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a board' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The board has been updated' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
