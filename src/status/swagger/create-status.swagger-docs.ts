import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusDto } from '../dto/status.dto';

export const CreateStatusDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create a status' }),
    ApiBearerAuth(),
    ApiOkResponse({
      type: StatusDto,
      description: 'The status has been created',
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
    ApiConflictResponse({
      description: 'Status already exists',
    }),
    ApiForbiddenResponse({ description: 'Forbidden: not enough rights' }),
  );
};
