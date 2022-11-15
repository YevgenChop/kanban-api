import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { WrongCredentialsException } from './errors/wrong-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exeption';
import { User } from '../user/user.entity';
import { UserNotVerifiedException } from './errors/user-not-verified.exception';
import { InvalidJWTException } from './errors/invalid-jwt.exception';
import { UserWithTokenDto } from 'src/user/dto/user.dto';
import { EmailService } from './email.service';
import { UserAlreadyVerifiedException } from './errors/user-already-verified.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  public async validateUser(
    login: string,
    pass: string,
  ): Promise<UserWithTokenDto> {
    const user = await this.userService.findOneWithPassword(login);
    if (!user) throw new UserNotFoundException();
    if (!user.verified) throw new UserNotVerifiedException();

    this.validatePasswordOrFail(user.password, pass);

    const { password, verified, ...result } = user;
    return { ...result, token: this.jwtService.sign({ id: user.id }) };
  }

  private validatePasswordOrFail(encoded: string, decoded: string): void {
    if (!bcrypt.compareSync(decoded, encoded)) {
      throw new WrongCredentialsException();
    }
  }

  public async verifyUser(token: string): Promise<void> {
    const decoded = this.jwtService.decode(token) as { email: string };

    if (!decoded) throw new InvalidJWTException();

    let user: User;

    try {
      user = await this.userService.findOneByOrFail({ email: decoded.email });
    } catch (error) {
      throw new UserNotFoundException();
    }

    await this.userService.updateVerifiedUser(user.id);
  }

  public async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findOneByEmailWithToken(email);
    if (!user) throw new UserNotFoundException();
    if (user.verified) throw new UserAlreadyVerifiedException();

    await this.emailService.sendVerificationEmail(
      email,
      user.verificationToken,
    );
  }
}
