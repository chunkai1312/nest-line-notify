import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { LINE_NOTIFY_INSTANCE, LINE_NOTIFY_OPTIONS } from './line-notify.constants';
import { LineNotify } from './line-notify';
import { LineNotifyModuleOptions, LineNotifyModuleAsyncOptions, LineNotifyModuleOptionsFactory } from './interfaces';

@Global()
@Module({})
export class LineNotifyModule {
  static forRoot(options: LineNotifyModuleOptions): DynamicModule {
    return {
      module: LineNotifyModule,
      providers: [
        {
          provide: LINE_NOTIFY_INSTANCE,
          useValue: new LineNotify(options),
        },
      ],
      exports: [LINE_NOTIFY_INSTANCE],
    };
  }

  static forRootAsync(options: LineNotifyModuleAsyncOptions): DynamicModule {
    return {
      module: LineNotifyModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: LINE_NOTIFY_INSTANCE,
          useFactory: (options: LineNotifyModuleOptions) => new LineNotify(options),
          inject: [LINE_NOTIFY_OPTIONS],
        },
      ],
      exports: [LINE_NOTIFY_INSTANCE],
    };
  }

  private static createAsyncProviders(options: LineNotifyModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: LineNotifyModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: LINE_NOTIFY_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: LINE_NOTIFY_OPTIONS,
      useFactory: async (optionsFactory: LineNotifyModuleOptionsFactory) =>
        optionsFactory.createLineNotifyOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
