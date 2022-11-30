import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { WrongCredentialsException } from './errors/wrong-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exeption';
import { User } from '../user/user.entity';
import { UserNotVerifiedException } from './errors/user-not-verified.exception';
import { InvalidJWTException } from './errors/invalid-jwt.exception';
import { UserWithTokensDto } from 'src/user/dto/user.dto';
import { EmailService } from './email.service';
import { UserAlreadyVerifiedException } from './errors/user-already-verified.exception';
import { ConfigService } from '@nestjs/config';
import { AccessAndRefreshTokensDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  public async validateUser(
    login: string,
    pass: string,
  ): Promise<UserWithTokensDto> {
    const user = await this.userService.findOneWithPassword(login);
    if (!user) throw new UserNotFoundException();
    if (!user.verified) throw new UserNotVerifiedException();
    if (!bcrypt.compareSync(pass, user.password)) {
      throw new WrongCredentialsException();
    }

    const [accessToken, refreshToken, hashedRefreshToken] =
      await this.getTokens(user.id);

    await this.userService.updateUser(user.id, {
      refreshToken: hashedRefreshToken,
    });

    const { password, verified, ...rest } = user;

    return { ...rest, token: accessToken, refreshToken };
  }

  public async verifyUser(token: string): Promise<void> {
    const decoded = this.jwtService.decode(token) as { email: string };
    if (!decoded) throw new InvalidJWTException();
    let user: User;

    try {
      user = await this.userService.findOneByEmailWithVerificationToken(
        decoded.email,
      );
    } catch (error) {
      throw new UserNotFoundException();
    }

    if (user.verificationToken !== token) {
      throw new InvalidJWTException();
    }

    await this.userService.updateVerifiedUser(user.id);
  }

  public async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.userService.findOneByEmailWithVerificationToken(
      email,
    );
    if (!user) throw new UserNotFoundException();
    if (user.verified) throw new UserAlreadyVerifiedException();

    const verificationToken = this.jwtService.sign({ email });
    this.userService.updateUser(user.id, { verificationToken });

    await this.emailService.sendVerificationEmail(email, verificationToken);
  }

  public async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<AccessAndRefreshTokensDto> {
    const user = await this.userService.findOneByIdWithRefreshToken(userId);
    if (!bcrypt.compareSync(refreshToken, user.refreshToken)) {
      throw new InvalidJWTException();
    }

    const [token, newRefreshToken, hashedRefreshToken] = await this.getTokens(
      user.id,
    );

    await this.userService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });

    return { token, refreshToken: newRefreshToken };
  }

  public async logout(userId: string): Promise<void> {
    await this.userService.updateUser(userId, {
      refreshToken: null,
    });
  }

  private async getTokens(userId: string): Promise<string[]> {
    const accessToken = this.jwtService.sign(
      { id: userId },
      { secret: this.configService.get('JWT_SECRET'), expiresIn: 60 * 15 },
    );

    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: 60 * 60 * 24 * 7,
      },
    );

    const hashedRefreshToken = await bcrypt.hashSync(refreshToken, 10);

    return [accessToken, refreshToken, hashedRefreshToken];
  }
}
