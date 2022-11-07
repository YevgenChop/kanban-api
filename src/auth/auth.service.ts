import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { WrongCredentialsException } from './errors/wrong-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exeption';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.userService.findOneWithPassword(login);
    if (!user) throw new UserNotFoundException();

    this.validatePasswordOrFail(user.password, pass);

    const { password, ...result } = user;

    return { ...result, token: this.jwtService.sign({ id: user.id }) };
  }

  private validatePasswordOrFail(encoded: string, decoded: string): void {
    if (!bcrypt.compareSync(decoded, encoded)) {
      throw new WrongCredentialsException();
    }
  }
}
