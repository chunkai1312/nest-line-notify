import { ModuleMetadata, Type } from '@nestjs/common';
import { LineNotifyOptions } from './line-notify-options.interface';

export interface LineNotifyModuleOptions extends LineNotifyOptions {}

export interface LineNotifyModuleOptionsFactory {
  createLineNotifyOptions(): Promise<LineNotifyModuleOptions> | LineNotifyModuleOptions;
}

export interface LineNotifyModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<LineNotifyModuleOptionsFactory>;
  useClass?: Type<LineNotifyModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<LineNotifyModuleOptions> | LineNotifyModuleOptions;
  inject?: any[];
}
