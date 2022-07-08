import { UseGuards } from '@nestjs/common';
import { LineNotifyAuthenticateGuard } from '../guards';

export function LineNotifyAuthenticate(): ClassDecorator & MethodDecorator {
  return UseGuards(LineNotifyAuthenticateGuard);
}
