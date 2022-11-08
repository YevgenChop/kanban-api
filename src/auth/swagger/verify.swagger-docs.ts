import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const VerifyDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Verify a user's email` }),
    ApiNoContentResponse({
      description: `The user's email has been verified`,
    }),
    ApiNotFoundResponse({
      description: `The user with the given email doesn't exist`,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden: invalid JWT' }),
    ApiBadRequestResponse({ description: 'Invalid token query parameter' }),
    ApiQuery({
      name: 'token',
      type: 'string',
      description: `The token sent to the user's email`,
    }),
  );
};
