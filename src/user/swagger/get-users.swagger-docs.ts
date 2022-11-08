import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserWithTasksDto } from '../dto/user.dto';

export const GetUsersDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get users' }),
    ApiOkResponse({
      description: 'An array of user objects',
      type: UserWithTasksDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbiden: invalid or missing JWT',
    }),
  );
};
