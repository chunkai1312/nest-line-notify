import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LineNotifyAccessToken = createParamDecorator((data: unknown, context: ExecutionContext) =>
  context.switchToHttp().getResponse().locals.accessToken,
);
