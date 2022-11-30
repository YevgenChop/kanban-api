import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccessAndRefreshTokensDto } from '../dto/token.dto';

export const RefreshDocs = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Refresh access token' }),
    ApiOkResponse({
      description: `New access and refresh tokens`,
      type: AccessAndRefreshTokensDto,
    }),
    ApiUnauthorizedResponse({ description: 'Forbidden: invalid JWT' }),
  );
};
