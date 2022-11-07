import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BoardDto } from '../dto/board.dto';

export const GetBoardsDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Get a user's boards` }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: `User's boards`,
      type: BoardDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
  );
};
