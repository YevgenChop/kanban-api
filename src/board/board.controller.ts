import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../decorators/user.decorator';
import { BoardService } from './board.service';
import { BoardDto, BoardWithTasksDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDocs } from './swagger/create-board.swagger-docs';
import { UpdateBoardDocs } from './swagger/update-board.swagger-docs';
import { GetBoardsDocs } from './swagger/get-boards.swagger-docs';
import { DeleteBoardDocs } from './swagger/delete-board.swagger-docs';
import { BoardQueryDto } from './dto/board-query.dto';

@ApiTags('board')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @CreateBoardDocs()
  @Post()
  public createBoard(
    @Body() dto: CreateBoardDto,
    @User('id') id: string,
  ): Promise<BoardDto> {
    return this.boardService.createBoard(dto, id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateBoardDocs()
  @Patch(':id')
  public updateBoard(
    @Body() dto: UpdateBoardDto,
    @User() user: UserEntity,
    @Param('id', ParseUUIDPipe) boardId: string,
  ): Promise<void> {
    return this.boardService.updateBoard(dto, user, boardId);
  }

  @GetBoardsDocs()
  @Get()
  public getBoards(@Query() dto: BoardQueryDto): Promise<BoardWithTasksDto[]> {
    return this.boardService.getBoards(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteBoardDocs()
  @Delete(':id')
  public deleteBoard(
    @Param('id', ParseUUIDPipe) boardId: string,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.boardService.deleteBoard(boardId, user);
  }
}
