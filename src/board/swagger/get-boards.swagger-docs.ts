import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BoardWithTasksDto } from '../dto/board.dto';

export const GetBoardsDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get boards' }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'An array of board objects',
      type: BoardWithTasksDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid query parameters' }),
  );
};
