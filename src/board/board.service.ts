import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserRole } from '../user/user.entity';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardQueryDto } from './dto/board-query.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardNotFoundException } from './errors/board-not-found.exception';

@Injectable()
export class BoardService {
  constructor(
    private boardRepo: BoardRepository,
    private userService: UserService,
  ) {}
  public async createBoard(
    { usersIds, ...dto }: CreateBoardDto,
    userId: string,
  ): Promise<Board> {
    const board = await this.boardRepo.createBoard(dto, userId);

    await this.userService.saveUserOwnBoard(userId, board);

    for (const id of usersIds) {
      await this.userService.saveUserBoard(id, board);
    }

    return board;
  }

  public async updateBoard(
    { usersIds, ...dto }: UpdateBoardDto,
    user: User,
    boardId: string,
  ): Promise<void> {
    const board = await this.findOneByOrFail({ id: boardId });

    if (board.ownerId !== user.id && user.role !== UserRole.Admin) {
      throw new ForbiddenException('Not enough rights');
    }

    const assignedUsersIds = await this.boardRepo.getBoardAssignedUsers(
      boardId,
    );

    for (const userId of usersIds) {
      if (!assignedUsersIds.includes(userId)) {
        await this.userService.saveUserBoard(userId, board);
      }
    }

    for (const userId of assignedUsersIds) {
      if (!usersIds.includes(userId)) {
        await this.userService.removeUserBoard(userId, board);
      }
    }

    await this.boardRepo.updateBoard(dto, boardId);
  }

  public getBoards(dto: BoardQueryDto): Promise<Board[]> {
    return this.boardRepo.find(dto);
  }

  public getBoardById(id: string): Promise<Board> {
    return this.boardRepo.findOneByIdWithUsers(id);
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
