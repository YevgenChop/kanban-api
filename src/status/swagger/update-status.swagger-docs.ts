import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const UpdateStatusDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update a status' }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The status has been updated',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiConflictResponse({
      description: 'Status already exists',
    }),
    ApiNotFoundResponse({
      description: 'Status not found',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
