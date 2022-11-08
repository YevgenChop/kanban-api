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

  public async updateUser(id: number, dto: UpdateUserDto): Promise<void> {
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

  public verifyUser(id: number): Promise<void> {
    return this.userRepo.verifyUser(id);
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

  public findOneByOrFail(options: Partial<User>): Promise<User> {
    return this.userRepo.findOneOrFail(options);
  }
}
