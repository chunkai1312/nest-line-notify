import { createParamDecorator, ExecutionContext, Inject, UseGuards } from '@nestjs/common';
import { LineNotifyAuthenticateGuard, LineNotifyCallbackGuard } from '../guards';
import { LINE_NOTIFY_INSTANCE } from '../line-notify.constants';

export const InjectLineNotify = (): ParameterDecorator => {
  return Inject(LINE_NOTIFY_INSTANCE);
};

export function LineNotifyAuthenticate(): ClassDecorator & MethodDecorator {
  return UseGuards(LineNotifyAuthenticateGuard);
}

export function LineNotifyCallback(): ClassDecorator & MethodDecorator {
  return UseGuards(LineNotifyCallbackGuard);
}

export const LineNotifyAccessToken = createParamDecorator((data: unknown, context: ExecutionContext) =>
  context.switchToHttp().getResponse().locals.accessToken,
);
