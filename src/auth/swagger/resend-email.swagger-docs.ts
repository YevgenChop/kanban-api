import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiConflictResponse,
} from '@nestjs/swagger';

export const ResendEmailDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Resend verification email` }),
    ApiNoContentResponse({
      description: `The verification email has been resent`,
    }),
    ApiNotFoundResponse({
      description: `The user with the given email doesn't exist`,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden: invalid JWT' }),
    ApiBadRequestResponse({ description: 'Invalid  email' }),
    ApiConflictResponse({ description: 'The user has already been verified' }),
    ApiBody({
      description: `The user's email address`,
      schema: { example: { email: 'johndoe@gmail.com' } },
    }),
  );
};
