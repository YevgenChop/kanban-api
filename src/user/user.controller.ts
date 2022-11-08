import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Public } from '../decorators/public.decorator';
import { User } from '../decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDocs } from './swagger/create-user.swagger-docs';
import { DeleteUserDocs } from './swagger/delete-user.swagger-docs';
import { UpdateUserDocs } from './swagger/update-user.swagger-docs';
import { UserService } from './user.service';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @CreateUserDocs()
  @Post()
  public createUser(@Body() dto: CreateUserDto): Promise<void> {
    return this.userService.createUser(dto);
  }

  @UpdateUserDocs()
  @Put()
  public updateUser(
    @User('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, dto);
  }

  @DeleteUserDocs()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles('admin')
  @Delete('/:id')
  public deleteUpdate(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
