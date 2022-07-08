// @ts-ignore
import * as notifySDK from 'line-notify-sdk';
import * as uid from 'uid2';
import { LineNotifyOptions, LineNotifySendOptions } from './interfaces';

export class LineNotify {
  private readonly sdk: notifySDK;

  constructor(private readonly options: LineNotifyOptions) {
    this.sdk = new notifySDK(options.clientID, options.clientSecret, options.callbackURL);
  }

  generateAuthUrl(state?: string, formPost?: boolean): string {
    return this.sdk.generateOauthURL(state || uid(24), formPost);
  }

  async requestAccessToken(code: string): Promise<string> {
    return this.sdk.getToken(code);
  }

  async revokeAccessToken(accessToken: string): Promise<Record<string, any>> {
    return this.sdk.revoke(accessToken);
  }

  async validateAccessToken(accessToken: string): Promise<Record<string, any>> {
    return this.sdk.getStatus(accessToken);
  }

  async send(options: LineNotifySendOptions): Promise<Record<string, any>> {
    const { accessToken } = this.options;

    return this.sdk.notify(
      options.accessToken || accessToken,
      options.message,
      options.imageThumbnail,
      options.imageFullsize,
      options.stickerPackageId,
      options.stickerId,
      options.notificationDisabled,
    );
  }
}
