import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const DeleteBoardDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a board' }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The board has been deleted' }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
