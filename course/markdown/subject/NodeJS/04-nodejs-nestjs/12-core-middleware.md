---
tags: nodejs-nestjs
categories: NodeJS
title: 12 中间件 Middleware
---

中间件是在路由处理程序 **之前** 调用的函数。 中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 `next()` 中间件函数。 `next()` 中间件函数通常由名为 `next` 的变量表示。

![20230606154242](http://s3.airtlab.com/blog/20230606154242.png)

Nest 中间件实际上等价于 [express](http://expressjs.com/en/guide/using-middleware.html) 中间件。 下面是Express官方文档中所述的中间件功能：
中间件函数可以执行以下任务:

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求-响应周期。
- 调用堆栈中的下一个中间件函数。
- 如果当前的中间件函数没有结束请求-响应周期, 它必须调用 `next()` 将控制传递给下一个中间件函数。否则, 请求将被挂起。

## 类中间件

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { SessionController } from './session/session.controller';
import { UploadController } from './upload/upload.controller';

import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [],
  controllers: [AppController, ProductController, NewsController, SessionController, UploadController],
  providers: [AppService, NewsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(UserMiddleware)
      .forRoutes('product')
  }
}
```

**中间件代码**

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    console.log('logger start ' + Date.now());
    await next();
    console.log('logger end ' + Date.now());
  }
}
```

## 函数式中间件
```typescript
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
```

## 全局中间件 (只能是函数中间件)
全局中间件只能是函数中间件，不能是类中间件。如果我们想一次性将中间件绑定到每个注册路由，我们可以使用由`INestApplication`实例提供的 `use()`方法：

```typescript
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```
