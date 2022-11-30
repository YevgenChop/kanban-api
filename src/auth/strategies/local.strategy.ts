import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserWithTokensDto } from '../../user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  validate(login: string, password: string): Promise<UserWithTokensDto> {
    return this.authService.validateUser(login, password);
  }
}
