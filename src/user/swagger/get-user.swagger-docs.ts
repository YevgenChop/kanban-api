import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

export const GetUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a user by id' }),
    ApiOkResponse({
      description: 'The user object',
      type: UserDto,
    }),
    ApiBadRequestResponse({ description: 'Invalid id parameter' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiUnauthorizedResponse({
      description: 'Forbiden: invalid or missing JWT',
    }),
  );
};
