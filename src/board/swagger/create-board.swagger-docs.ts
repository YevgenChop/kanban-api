import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BoardDto } from '../dto/board.dto';

export const CreateBoardDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a board' }),
    ApiBearerAuth(),
    ApiOkResponse({
      type: BoardDto,
      description: 'The board has been created',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
  );
};
