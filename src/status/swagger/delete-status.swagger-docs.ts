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

export const DeleteStatusDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a status' }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The status has been deleted',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({
      description: 'Invalid id parameter',
    }),
    ApiNotFoundResponse({
      description: 'Status not found',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
