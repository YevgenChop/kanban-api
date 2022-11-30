import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const LogoutDocs = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete hashed refresh token' }),
    ApiNoContentResponse({
      description: `The user's hashed refresh token has been deleted`,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden: invalid JWT' }),
  );
};
