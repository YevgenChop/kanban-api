import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, UserRole } from '../user/user.entity';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './errors/board-not-found.exception';

@Injectable()
export class BoardService {
  constructor(private boardRepo: BoardRepository) {}
  public createBoard(dto: CreateBoardDto, userId: number): Promise<Board> {
    return this.boardRepo.createBoard(dto, userId);
  }

  public async updateBoard(
    dto: UpdateBoardDto,
    user: User,
    boardId: number,
  ): Promise<void> {
    let board: Board;

    try {
      board = await this.boardRepo.findOneByOrFail({ id: boardId });
    } catch (error) {
      throw new BoardNotFoundException();
    }

    if (board.ownerId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Not enough rights');
    }

    await this.boardRepo.updateBoard(dto, boardId);
  }

  public getBoards(ownerId: number): Promise<Board[]> {
    return this.boardRepo.findBy({ ownerId });
  }

  public async deleteBoard(boardId: number, user: User): Promise<void> {
    let board: Board;

    try {
      board = await this.boardRepo.findOneByOrFail({ id: boardId });
    } catch (error) {
      throw new BoardNotFoundException();
    }

    if (board.ownerId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Not enough rights');
    }

    await this.boardRepo.deleteBoard(boardId);
  }
}
