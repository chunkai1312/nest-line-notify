import { UseGuards } from '@nestjs/common';
import { LineNotifyCallbackGuard } from '../guards';

export function LineNotifyCallback(): ClassDecorator & MethodDecorator {
  return UseGuards(LineNotifyCallbackGuard);
}
