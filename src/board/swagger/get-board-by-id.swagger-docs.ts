import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BoardWithUsersDto } from '../dto/board.dto';

export const GetBoardByIdDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get a board by id' }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'The board object',
      type: BoardWithUsersDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters' }),
  );
};
