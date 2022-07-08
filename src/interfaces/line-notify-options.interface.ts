export interface LineNotifyOptions {
  clientID?: string;
  clientSecret?: string;
  callbackURL?: string;
  accessToken?: string;
}

export interface LineNotifySendOptions {
  accessToken?: string;
  message: string;
  imageThumbnail?: string;
  imageFullsize?: string;
  stickerPackageId?: string;
  stickerId?: string;
  notificationDisabled?: boolean;
}
