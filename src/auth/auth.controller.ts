import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserWithTokenDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { LoginDocs } from './swagger/login.swagger-docs';
import { VerifyDocs } from './swagger/verify.swagger-docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @LoginDocs()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@User() user: UserWithTokenDto): UserWithTokenDto {
    return user;
  }

  @VerifyDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Get('verify')
  public verifyUser(@Query() { token }: TokenDto): Promise<void> {
    return this.authService.verifyUser(token);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Post('resend-email')
  public resendVerificationEmail(
    @Body() { email }: { email: string },
  ): Promise<void> {
    return this.authService.resendVerificationEmail(email);
  }
}
