import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpCode,
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
import { UserDto } from './dto/user.dto';
import { CreateUserDocs } from './swagger/create-user.swagger-docs';
import { DeleteUserDocs } from './swagger/delete-user.swagger-docs';
import { UpdateUserDocs } from './swagger/update-user.swagger-docs';
import { User as UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @CreateUserDocs()
  @Post()
  public createUser(@Body() dto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(dto);
  }

  @UpdateUserDocs()
  @Put()
  public updateUser(
    @User() user: UserEntity,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(user, dto);
  }

  @DeleteUserDocs()
  @HttpCode(204)
  @Roles('admin')
  @Delete('/:id')
  public deleteUpdate(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
