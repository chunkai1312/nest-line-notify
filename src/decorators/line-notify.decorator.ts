import { Inject } from '@nestjs/common';
import { LINE_NOTIFY_INSTANCE } from '../line-notify.constants';

export const InjectLineNotify = (): ParameterDecorator => {
  return Inject(LINE_NOTIFY_INSTANCE);
};
