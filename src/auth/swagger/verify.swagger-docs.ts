import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOperation,
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
  );
};
