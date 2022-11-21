import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, IsUUID, Min } from 'class-validator';

export class BaseQueryDto {
  @ApiProperty({
    type: 'string',
    example: '51c58fb7-a1e2-45f9-9bbb-1a0988d53e17',
  })
  @IsOptional()
  @IsUUID()
  ownerId?: string;

  @ApiProperty({ type: 'number', example: 5 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsPositive()
  limit?: number;

  @ApiProperty({ type: 'number', example: 5 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @Min(0)
  offset?: number;
}

export class OwnBoardQueryDto extends BaseQueryDto {
  @ApiProperty({
    type: 'string',
    example: '51c58fb7-a1e2-45f9-9bbb-1a0988d53e17',
  })
  @IsOptional()
  @IsUUID()
  ownerId?: string;
}

export class BoardQueryDto extends BaseQueryDto {
  @ApiProperty({
    type: 'string',
    example: '51c58fb7-a1e2-45f9-9bbb-1a0988d53e17',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
