import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const CreateStatusDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a status' }),
    ApiBearerAuth(),
    ApiNoContentResponse({
      description: 'The status has been created',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiConflictResponse({
      description: 'Status already exists',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
