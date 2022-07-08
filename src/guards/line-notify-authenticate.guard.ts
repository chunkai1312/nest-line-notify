import { Inject, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { LineNotify } from '../line-notify';
import { LINE_NOTIFY_INSTANCE } from '../line-notify.constants';

@Injectable()
export class LineNotifyAuthenticateGuard implements CanActivate {
  @Inject(LINE_NOTIFY_INSTANCE) protected readonly lineNotify: LineNotify;

  canActivate(context: ExecutionContext): boolean {
    const res = context.switchToHttp().getResponse();
    const url = this.lineNotify.generateAuthUrl();
    res.redirect(url);
    return true;
  }
}
