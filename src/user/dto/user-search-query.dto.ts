import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
  IsArray,
} from 'class-validator';

export class UserSearchQueryDto {
  @ApiProperty({
    description: `User's name, email or login`,
    type: 'string',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  term: string;

  @ApiPropertyOptional({
    description: 'The id of the board the users are assigned to',
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  boardId?: string;

  @ApiPropertyOptional({
    description: `An array of users' id to be skipped`,
    name: 'skipUserIds[]',
    isArray: true,
    example: '123e4567-e89b-12d3-a456-426614171233',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  @IsNotEmpty()
  skipUserIds?: string[];
}
