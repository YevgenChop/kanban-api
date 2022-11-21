import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentDto } from '../dto/comment.dto';

export const GetCommentsDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: `Get a task's comments` }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: `The task's comments`,
      type: CommentDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiBadRequestResponse({ description: 'Invalid request body' }),
    ApiNotFoundResponse({ description: 'Task or user not found' }),
  );
};
