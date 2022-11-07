import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './errors/user-already-exists.exeption';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './errors/user-not-found.exeption';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async createUser({
    password: plainTextPassword,
    ...userData
  }: CreateUserDto): Promise<UserDto> {
    const userExists = !!(await this.userRepo.findOneByEmail(userData.email));
    if (userExists) throw new UserAlreadyExistsException();

    const hashedPassword = await bcrypt.hashSync(plainTextPassword, 10);

    const { password, ...user } = await this.userRepo.createUser({
      ...userData,
      password: hashedPassword,
    });

    return { ...user, token: this.jwtService.sign({ id: user.id }) };
  }

  public async updateUser(user: User, dto: UpdateUserDto): Promise<void> {
    if (dto.password) {
      const { password, ...rest } = dto;
      const hashedPassword = await bcrypt.hashSync(password, 10);

      return this.userRepo.updateUser(user.id, {
        ...rest,
        password: hashedPassword,
      });
    }

    return this.userRepo.updateUser(user.id, dto);
  }

  public async deleteUser(id: number): Promise<void> {
    try {
      await this.userRepo.findOneOrFail({ id });
    } catch (error) {
      throw new UserNotFoundException();
    }

    return this.userRepo.softDeleteUser(id);
  }

  public findOne(options: Partial<User>): Promise<User> {
    return this.userRepo.findOne(options);
  }

  public findOneWithPassword(login: string): Promise<User> {
    return this.userRepo.findOneWithPassword(login);
  }
}
