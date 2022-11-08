import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
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

  public async deleteBoard(id: string): Promise<void> {
    await this.boardRepo.softDelete({ id });
  }
}
