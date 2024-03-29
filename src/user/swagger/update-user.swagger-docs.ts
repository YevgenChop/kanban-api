import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const UpdateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Update a user's properties` }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The user has been updated' }),
    ApiBadRequestResponse({ description: 'Request body is invalid' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
  );
};
