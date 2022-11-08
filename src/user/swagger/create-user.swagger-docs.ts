import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const CreateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a user' }),
    ApiNoContentResponse({
      description: 'The user has been created',
    }),
    ApiConflictResponse({ description: 'User already exists' }),
    ApiBadRequestResponse({ description: 'Request body is invalid' }),
  );
};
