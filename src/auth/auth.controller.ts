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
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserWithTokensDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto, AccessAndRefreshTokensDto } from './dto/token.dto';
import { LoginDocs } from './swagger/login.swagger-docs';
import { LogoutDocs } from './swagger/logout.swagger-docs';
import { RefreshDocs } from './swagger/refresh.swagger-docs';
import { ResendEmailDocs } from './swagger/resend-email.swagger-docs';
import { VerifyDocs } from './swagger/verify.swagger-docs';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @LoginDocs()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@User() user: UserWithTokensDto): UserWithTokensDto {
    return user;
  }

  @VerifyDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Get('verify')
  public verifyUser(@Query() { token }: AccessTokenDto): Promise<void> {
    return this.authService.verifyUser(token);
  }

  @LogoutDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  public logout(@User() user: UserWithTokensDto): Promise<void> {
    return this.authService.logout(user.id);
  }

  @RefreshDocs()
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  public refreshToken(
    @User() user: UserWithTokensDto,
  ): Promise<AccessAndRefreshTokensDto> {
    return this.authService.refreshToken(user.id, user.refreshToken);
  }

  @ResendEmailDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Public()
  @Post('resend-email')
  public resendVerificationEmail(
    @Body() { email }: { email: string },
  ): Promise<void> {
    return this.authService.resendVerificationEmail(email);
  }
}
