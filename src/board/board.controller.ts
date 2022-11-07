import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../decorators/user.decorator';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDocs } from './swagger/create-board.swagger-docs';
import { UpdateBoardDocs } from './swagger/update-board.swagger-docs';
import { GetBoardsDocs } from './swagger/get-boards.swagger-docs';
import { DeleteBoardDocs } from './swagger/delete-board.swagger-docs';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @CreateBoardDocs()
  @Post()
  public createBoard(
    @Body() dto: CreateBoardDto,
    @User('id') id: number,
  ): Promise<BoardDto> {
    return this.boardService.createBoard(dto, id);
  }

  @HttpCode(204)
  @UpdateBoardDocs()
  @Patch(':id')
  public updateBoard(
    @Body() dto: UpdateBoardDto,
    @User() user: UserEntity,
    @Param('id', ParseIntPipe) boardId: number,
  ): Promise<void> {
    return this.boardService.updateBoard(dto, user, boardId);
  }

  @GetBoardsDocs()
  @Get()
  public getBoardsByOwnerId(
    @Query('ownerId', ParseIntPipe) ownerId: number,
  ): Promise<BoardDto[]> {
    return this.boardService.getBoards(ownerId);
  }

  @HttpCode(204)
  @DeleteBoardDocs()
  @Delete(':id')
  public deleteBoard(
    @Param('id', ParseIntPipe) boardId: number,
    @User() user: UserEntity,
  ): Promise<void> {
    return this.boardService.deleteBoard(boardId, user);
  }
}
