import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Board } from './board.entity';
import { BoardQueryDto } from './dto/board-query.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardRepository {
  constructor(@InjectRepository(Board) private boardRepo: Repository<Board>) {}

  public createBoard(dto: CreateBoardDto, userId: string): Promise<Board> {
    const board = this.boardRepo.create({ ...dto, ownerId: userId });

    return this.boardRepo.save(board);
  }

  public findOneByOrFail(options: Partial<Board>): Promise<Board> {
    return this.boardRepo.findOneByOrFail(options);
  }

  public async updateBoard(
    dto: UpdateBoardDto,
    boardId: string,
  ): Promise<void> {
    await this.boardRepo.update({ id: boardId }, dto);
  }

  public findBy(options: Partial<Board>): Promise<Board[]> {
    return this.boardRepo.findBy(options);
  }

  public find(dto: BoardQueryDto): Promise<Board[]> {
    let query = this.boardRepo
      .createQueryBuilder('b')
      .leftJoin('b.tasks', 'bt')
      .addSelect(['bt.id', 'bt.description', 'bt.title', 'bt.statusId']);
    query = this.addOptionalParamsToQuery(query, dto);

    return query.getMany();
  }

  public async deleteBoard(id: string): Promise<void> {
    await this.boardRepo.softDelete({ id });
  }

  private addOptionalParamsToQuery(
    qb: SelectQueryBuilder<Board>,
    dto: BoardQueryDto,
  ): SelectQueryBuilder<Board> {
    if (dto.ownerId) {
      qb.andWhere('b.ownerId = :ownerId', { ownerId: dto.ownerId });
    }

    if (dto.limit && dto.offset) {
      qb.skip(dto.offset).take(dto.limit);
    }

    return qb;
  }
}
