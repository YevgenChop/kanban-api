import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/board.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    dto: UpdateUserDto | { verificationToken: string },
  ): Promise<void> {
    await this.userRepo.update({ id }, { ...dto });
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

  public findOneByEmailWithToken(email: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('u')
      .where('u.email = :email', { email })
      .select(['u.verificationToken', 'u.verified', 'u.id'])
      .getOne();
  }

  public find(): Promise<User[]> {
    // TO DISCUSS: Should there be pagination and/or any sort of filters?
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
}
