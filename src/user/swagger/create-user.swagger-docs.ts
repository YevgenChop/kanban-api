import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

export const CreateUserDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a user' }),
    ApiOkResponse({
      description: 'The user has been created',
      type: UserDto,
    }),
    ApiConflictResponse({ description: 'User already exists' }),
    ApiBadRequestResponse({ description: 'Request body is invalid' }),
  );
};
