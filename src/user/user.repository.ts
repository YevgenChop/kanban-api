import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokensDto } from '../auth/dto/token.dto';
import { Board } from '../board/board.entity';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSearchQueryDto } from './dto/user-search-query.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public createUser(
    dto: CreateUserDto,
    verificationToken: string,
  ): Promise<User> {
    return this.userRepo.save(
      this.userRepo.create({ ...dto, verificationToken }),
    );
  }

  public async updateUser(
    id: string,
    dto: UpdateUserDto | Partial<TokensDto>,
  ): Promise<void> {
    await this.userRepo.update({ id }, dto);
  }

  public async softDeleteUser(id: string): Promise<void> {
    await this.userRepo.softDelete({ id });
  }

  public async updateVerifiedUser(id: string): Promise<void> {
    await this.userRepo.update(
      { id },
      { verified: true, verificationToken: null },
    );
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOneBy({ email });
  }

  public findOne(options: Partial<User>): Promise<User> {
    return this.userRepo.findOne({ where: options });
  }

  public findOneOrFail(options: Partial<User>): Promise<User> {
    return this.userRepo.findOneOrFail({ where: options });
  }

  public findOneByEmailWithVerificationToken(email: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .select(['u.verificationToken', 'u.verified', 'u.id'])
      .getOne();
  }

  public findOneByIdWithRefreshToken(id: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .select(['u.refreshToken'])
      .getOne();
  }

  public find(): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('u')
      .leftJoin('u.tasks', 't')
      .select(['u.id', 'u.login', 'u.name', 'u.email', 'u.role'])
      .addSelect([
        't.id',
        't.description',
        't.boardId',
        't.title',
        't.statusId',
      ])
      .getMany();
  }

  public findOneWithPassword(login: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.login = :login', { login })
      .getOne();
  }

  public findBySearchTerm(dto: UserSearchQueryDto): Promise<User[]> {
    const termBrackets = new Brackets((qb) => {
      const term = `%${dto.term}%`;
      qb.where('u.name ILIKE :term', { term })
        .orWhere('u.email ILIKE :term', { term })
        .orWhere('u.login ILIKE :term', { term });
    });

    let query = this.userRepo
      .createQueryBuilder('u')
      .where(termBrackets)
      .select(['u.name', 'u.email', 'u.id']);

    query = this.addOptionalSearchParams(dto, query);

    return query.getMany();
  }

  public async deleteVerificationTokens(): Promise<void> {
    await this.userRepo.update({}, { verificationToken: null });
  }

  public async saveUserOwnBoard(userId: string, board: Board): Promise<void> {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.ownBoards', 'uob')
      .where('u.id = :userId', { userId })
      .getOne();

    user.ownBoards.push(board);

    await this.userRepo.save(user);
  }

  public async saveUserBoard(userId: string, board: Board): Promise<void> {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.boards', 'ub')
      .where('u.id = :userId', { userId })
      .getOne();

    user.boards.push(board);

    await this.userRepo.save(user);
  }

  public async removeUserBoard(userId: string, board: Board): Promise<void> {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.boards', 'ub')
      .where('u.id = :userId', { userId })
      .getOne();

    user.boards = user.boards.filter((b) => b.id !== board.id);

    await this.userRepo.save(user);
  }

  private addOptionalSearchParams(
    dto: UserSearchQueryDto,
    qb: SelectQueryBuilder<User>,
  ): SelectQueryBuilder<User> {
    if ('boardId' in dto) {
      qb = qb.innerJoin('u.boards', 'ub').andWhere(
        new Brackets((qb) => {
          qb.where('ub.id = :boardId', {
            boardId: dto.boardId,
          });
        }),
      );
    }

    if ('skipUserIds' in dto) {
      qb = qb.andWhere('u.id NOT IN (:...skipUserIds)', {
        skipUserIds: dto.skipUserIds,
      });
    }

    return qb;
  }
}
