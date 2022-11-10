import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from './errors/user-already-exists.exeption';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './errors/user-not-found.exeption';
import { EmailService } from 'src/auth/email.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  public async createUser({
    password: plainTextPassword,
    ...userData
  }: CreateUserDto): Promise<void> {
    const userExists = !!(await this.userRepo.findOneByEmail(userData.email));
    if (userExists) throw new UserAlreadyExistsException();

    const hashedPassword = await bcrypt.hashSync(plainTextPassword, 10);
    const verificationToken = this.jwtService.sign({ email: userData.email });

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

  public async updateUser(id: string, dto: UpdateUserDto): Promise<void> {
    if (dto.password) {
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
}
