import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Board } from './board.entity';
import { BoardQueryDto, OwnBoardQueryDto } from './dto/board-query.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardRepository {
  constructor(@InjectRepository(Board) private boardRepo: Repository<Board>) {}

  public createBoard(
    dto: Omit<CreateBoardDto, 'usersIds'>,
    userId: string,
  ): Promise<Board> {
    const board = this.boardRepo.create({ ...dto, ownerId: userId });

    return this.boardRepo.save(board);
  }

  public findOneByOrFail(options: Partial<Board>): Promise<Board> {
    return this.boardRepo.findOneByOrFail(options);
  }

  public findOneByIdWithUsers(id: string): Promise<Board> {
    return this.boardRepo
      .createQueryBuilder('b')
      .leftJoin('b.users', 'bu')
      .addSelect(['bu.id', 'bu.name', 'bu.email'])
      .where('b.id = :id', { id })
      .getOne();
  }

  public async updateBoard(
    dto: Omit<UpdateBoardDto, 'usersIds'>,
    boardId: string,
  ): Promise<void> {
    await this.boardRepo.update({ id: boardId }, dto);
  }

  public async getBoardAssignedUsers(boardId: string): Promise<string[]> {
    const board = await this.boardRepo
      .createQueryBuilder('b')
      .innerJoin('b.users', 'bu')
      .addSelect('bu.id')
      .where('b.id = :boardId', { boardId })
      .getOne();

    if (!board) {
      return [];
    }

    return board.users.map(({ id }) => id);
  }

  public findBy(options: Partial<Board>): Promise<Board[]> {
    return this.boardRepo.findBy(options);
  }

  public find(dto: BoardQueryDto | OwnBoardQueryDto): Promise<Board[]> {
    let query = this.boardRepo
      .createQueryBuilder('b')
      .leftJoin('b.tasks', 'bt')
      .leftJoin('bt.users', 'btu')
      .addSelect(['bt.id', 'bt.description', 'bt.title', 'bt.statusId']);
    query = this.addOptionalParamsToQuery(query, dto);

    return query.getMany();
  }

  public async deleteBoard(id: string): Promise<void> {
    await this.boardRepo.softDelete({ id });
  }

  private addOptionalParamsToQuery(
    qb: SelectQueryBuilder<Board>,
    dto: BoardQueryDto | OwnBoardQueryDto,
  ): SelectQueryBuilder<Board> {
    if ('ownerId' in dto) {
      qb.andWhere('b.ownerId = :ownerId', { ownerId: dto.ownerId });
    }

    if ('userId' in dto) {
      qb.innerJoin('b.users', 'bu', 'bu.id = :userId', {
        userId: dto.userId,
      });
    }

    if (dto.limit && dto.offset) {
      qb.skip(dto.offset).take(dto.limit);
    }

    return qb;
  }
}
