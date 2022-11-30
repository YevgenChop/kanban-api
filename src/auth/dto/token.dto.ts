import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty({ type: 'string', example: 'access_token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}

export class AccessAndRefreshTokensDto extends AccessTokenDto {
  @ApiProperty({ type: 'string', example: 'refresh_token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class TokensDto extends AccessAndRefreshTokensDto {
  @ApiProperty({ type: 'string', example: 'refresh_token' })
  @IsNotEmpty()
  @IsString()
  verificationToken: string;
}
