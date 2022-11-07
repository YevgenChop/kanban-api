import { Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { User } from 'src/decorators/user.decorator';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginDocs } from './swagger/login.swagger-docs';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Public()
  @LoginDocs()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@User() user: UserDto): UserDto {
    return user;
  }
}
