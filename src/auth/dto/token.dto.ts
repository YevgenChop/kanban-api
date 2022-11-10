import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({ type: 'string', example: 'access_token' })
  @IsNotEmpty()
  @IsString()
  token: string;
}
