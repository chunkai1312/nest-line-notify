# nest-line-notify

[![NPM version][npm-image]][npm-url]

> LINE Notify module for Nest

## Installation

To begin using it, we first install the required dependency.

```bash
$ npm install --save nest-line-notify
```

## Getting started

Once the installation is complete, import the `LineNotifyModule` into the root `AppModule` and run the `forRoot()` static method as shown below:

```typescript
import { Module } from '@nestjs/common';
import { LineNotifyModule } from 'nest-line-notify';

@Module({
  imports: [
    LineNotifyModule.forRoot({
      accessToken: 'LINE_NOTIFY_ACCESS_TOKEN',
    }),
  ],
})
export class AppModule {}
```

Next, inject the `LineNotify` instance using the `@InjectLineNotify()` decorator.

```typescript
import { Injectable } from '@nestjs/common';
import { InjectLineNotify, LineNotify } from 'nest-line-notify';

@Injectable()
export class AppService {
  constructor(@InjectLineNotify() private readonly lineNotify: LineNotify) {}

  async sendNotification() {
    await this.lineNotify.send({ message: 'Hello, LINE Notify!' });
  }
}
```

## Authentication

The module supports LINE Notify's authentication. To request an access token, import the `LineNotifyModule` with `clientID`, `clientSecret`, and `callbackURL` options.

```typescript
import { Module } from '@nestjs/common';
import { LineNotifyModule } from 'nest-line-notify';

@Module({
  imports: [
    LineNotifyModule.forRoot({
      clientID: 'LINE_NOTIFY_CLIENT_ID',
      clientSecret: 'LINE_NOTIFY_CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/callback';
    }),
  ],
})
export class AppModule {}
```

Next, add an endpoint with the `@LineNotifyAuthenticate()` decorator for authentication and a callback endpoint with the `@LineNotifyCallback()` decorator in your controller.

For callback endpoint, you can use the `@LineNotifyAccessToken()` decorator to retrieve the issued access token.

```typescript
import { Controller, Get, Redirect } from '@nestjs/common';
import { LineNotifyAuthenticate, LineNotifyCallback, LineNotifyAccessToken } from 'nest-line-notify';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/authenticate')
  @LineNotifyAuthenticate()
  lineNotify() {}

  @Get('/callback')
  @LineNotifyCallback()
  @Redirect('/')
  callback(@LineNotifyAccessToken() accessToken: string) {
    console.log('Access Token:', accessToken);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
LineNotifyModule.forRootAsync({
  useFactory: () => ({
    accessToken: 'LINE_NOTIFY_ACCESS_TOKEN',
  }),
});
```

Like other factory providers, our factory function can be [async](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory) and can inject dependencies through `inject`.

```typescript
LineNotifyModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    accessToken: configService.get('LINE_NOTIFY_ACCESS_TOKEN'),
  }),
  inject: [ConfigService],
});
```

Alternatively, you can configure the `LineNotifyModule` using a class instead of a factory, as shown below.

```typescript
LineNotifyModule.forRootAsync({
  useClass: LineNotifyConfigService,
});
```

The construction above instantiates `LineNotifyConfigService` inside `LineNotifyModule`, using it to create an options object. Note that in this example, the `LineNotifyConfigService` has to implement `LineNotifyModuleOptionsFactory` interface as shown below. The `LineNotifyModule` will call the `createLineNotifyOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class LineNotifyConfigService implements LineNotifyModuleOptionsFactory {
  createLineNotifyOptions(): LineNotifyModuleOptions {
    return {
      accessToken: 'LINE_NOTIFY_ACCESS_TOKEN',
    };
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `LineNotifyModule`, use the `useExisting` syntax.

```typescript
LineNotifyModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: LineNotifyConfigService,
});
```

## Reference

[LINE Notify](https://notify-bot.line.me)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/nest-line-notify.svg
[npm-url]: https://npmjs.com/package/nest-line-notify
