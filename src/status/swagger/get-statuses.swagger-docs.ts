import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusDto } from '../dto/status.dto';

export const GetStatusesDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get task statuses' }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Array of task statuses',
      type: StatusDto,
      isArray: true,
    }),
    ApiUnauthorizedResponse({
      description: 'Forbidden: missing or invalid JWT',
    }),
  );
};
