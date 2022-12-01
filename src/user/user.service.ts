import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './errors/user-already-exists.exeption';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './errors/user-not-found.exeption';
import { EmailService } from '../auth/email.service';
import { UserDto } from './dto/user.dto';
import { Board } from '../board/board.entity';
import { UserSearchQueryDto } from './dto/user-search-query.dto';
import { TokensDto } from '../auth/dto/token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  public async createUser({
    password: plainTextPassword,
    ...userData
  }: CreateUserDto): Promise<void> {
    const userExists = !!(await this.userRepo.findOneByEmail(userData.email));
    if (userExists) throw new UserAlreadyExistsException();

    const hashedPassword = await bcrypt.hashSync(plainTextPassword, 10);
    const verificationToken = this.jwtService.sign(
      { email: userData.email },
      { secret: this.configService.get('JWT_SECRET') },
    );

    await this.userRepo.createUser(
      {
        ...userData,
        password: hashedPassword,
      },
      verificationToken,
    );

    await this.emailService.sendVerificationEmail(
      userData.email,
      verificationToken,
    );
  }

  public async updateUser(
    id: string,
    dto: UpdateUserDto | Partial<TokensDto>,
  ): Promise<void> {
    if ('password' in dto) {
      const { password, ...rest } = dto;
      const hashedPassword = await bcrypt.hashSync(password, 10);

      return this.userRepo.updateUser(id, {
        ...rest,
        password: hashedPassword,
      });
    }

    return this.userRepo.updateUser(id, dto);
  }

  public async getUserById(id: string): Promise<UserDto> {
    const { verified, ...user } = await this.findOneByOrFail({ id });

    return user;
  }

  public async getUsersBySearchTerm(
    dto: UserSearchQueryDto,
  ): Promise<UserDto[]> {
    return this.userRepo.findBySearchTerm(dto);
  }

  public async getUsers(): Promise<UserDto[]> {
    return this.userRepo.find();
  }

  public updateVerifiedUser(id: string): Promise<void> {
    return this.userRepo.updateVerifiedUser(id);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.findOneByOrFail({ id });

    return this.userRepo.softDeleteUser(id);
  }

  public findOne(options: Partial<User>): Promise<User> {
    return this.userRepo.findOne(options);
  }

  public findOneWithPassword(login: string): Promise<User> {
    return this.userRepo.findOneWithPassword(login);
  }

  public async findOneByOrFail(options: Partial<User>): Promise<User> {
    try {
      return await this.userRepo.findOneOrFail(options);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  public findOneByEmailWithVerificationToken(email: string): Promise<User> {
    return this.userRepo.findOneByEmailWithVerificationToken(email);
  }

  public findOneByIdWithRefreshToken(id: string): Promise<User> {
    return this.userRepo.findOneByIdWithRefreshToken(id);
  }

  public deleteVerificationTokens(): Promise<void> {
    return this.userRepo.deleteVerificationTokens();
  }

  public saveUserOwnBoard(userId: string, board: Board): Promise<void> {
    return this.userRepo.saveUserOwnBoard(userId, board);
  }

  public saveUserBoard(userId: string, board: Board): Promise<void> {
    return this.userRepo.saveUserBoard(userId, board);
  }

  public removeUserBoard(userId: string, board: Board): Promise<void> {
    return this.userRepo.removeUserBoard(userId, board);
  }
}
