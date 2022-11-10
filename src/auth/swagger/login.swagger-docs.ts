import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserWithTokenDto } from 'src/user/dto/user.dto';
import { LoginDto } from '../dto/login.dto';

export const LoginDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Log in to get an access token' }),
    ApiOkResponse({
      description: `The user's data with an access token`,
      type: UserWithTokenDto,
    }),
    ApiNotFoundResponse({
      description: `The user with the given login doesn't exist`,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden: Wrong credentials' }),
    ApiBody({ type: LoginDto }),
  );
};
