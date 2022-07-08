import { Inject, CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LineNotify } from '../line-notify';
import { LINE_NOTIFY_INSTANCE } from '../line-notify.constants';

@Injectable()
export class LineNotifyCallbackGuard implements CanActivate {
  @Inject(LINE_NOTIFY_INSTANCE) protected readonly lineNotify: LineNotify;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      const code = req.query.code;
      const accessToken = await this.lineNotify.requestAccessToken(code);
      res.locals.accessToken = accessToken;
      return true;
    } catch(err) {
      throw new InternalServerErrorException();
    }
  }
}
