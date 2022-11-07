import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  public createUser(dto: CreateUserDto): Promise<User> {
    return this.userRepo.save(this.userRepo.create(dto));
  }

  public async updateUser(id: number, dto: UpdateUserDto): Promise<void> {
    await this.userRepo.update({ id }, { ...dto });
  }

  public async softDeleteUser(id: number): Promise<void> {
    await this.userRepo.softDelete({ id });
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

  public findOneWithPassword(login: string): Promise<User> {
    return this.userRepo
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.login = :login', { login })
      .getOne();
  }
}
