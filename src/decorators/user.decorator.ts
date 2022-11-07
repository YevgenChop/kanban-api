import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../user/user.entity';

export const User = createParamDecorator(
  (prop: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return prop ? request.user[prop] : request.user;
  },
);
