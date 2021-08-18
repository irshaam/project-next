import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Returns the current authenticated user
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const {
      id,
      uuid,
      name,
      nameEn,
      slug,
      email,
      password,
      picture,
      coverPicture,
      permissions,
    } = request.user;

    return {
      id,
      uuid,
      name,
      nameEn,
      slug,
      email,
      password,
      picture,
      coverPicture,
      permissions,
    };
  },
);
