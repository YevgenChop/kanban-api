import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const SearchUsersDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Search users by term' }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'An array of user objects',
      isArray: true,
      schema: {
        example: [
          {
            id: '123e4567-e89b-12d3-a456-426614171233',
            name: 'John Doe',
            email: 'doe@email.com',
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Forbiden: invalid or missing JWT',
    }),
  );
};
