import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, UserRole } from '../user/user.entity';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardQueryDto } from './dto/board-query.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './errors/board-not-found.exception';

@Injectable()
export class BoardService {
  constructor(private boardRepo: BoardRepository) {}
  public createBoard(dto: CreateBoardDto, userId: string): Promise<Board> {
    return this.boardRepo.createBoard(dto, userId);
  }

  public async updateBoard(
    dto: UpdateBoardDto,
    user: User,
    boardId: string,
  ): Promise<void> {
    const board = await this.findOneByOrFail({ id: boardId });

    if (board.ownerId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Not enough rights');
    }

    await this.boardRepo.updateBoard(dto, boardId);
  }

  public getBoards(dto: BoardQueryDto): Promise<Board[]> {
    return this.boardRepo.find(dto);
  }

  public async deleteBoard(boardId: string, user: User): Promise<void> {
    const board = await this.findOneByOrFail({ id: boardId });

    if (board.ownerId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Not enough rights');
    }

    await this.boardRepo.deleteBoard(boardId);
  }

  public async findOneByOrFail(options: Partial<Board>): Promise<Board> {
    try {
      return await this.boardRepo.findOneByOrFail(options);
    } catch (error) {
      throw new BoardNotFoundException();
    }
  }
}
