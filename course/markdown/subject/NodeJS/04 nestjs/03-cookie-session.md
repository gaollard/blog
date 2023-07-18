---
tags: nodejs-nestjs
categories: NodeJS
---

## 1、使用 cookie

### cookie-parser(express平台)

```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  await app.listen(7000);
}


bootstrap();
```

**设置cookie**

```typescript
import {Controller, Get, Response } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNewsList(@Response() res) {
    res.cookie('username', 'XManba', {
      maxAge: 24 * 60 * 60
    })
    // 这里只能用 res.send
    res.send(this.newsService.findAll())
    // return this.newsService.findAll()
  }
}
```

**获取cookie**

```typescript
import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTest(@Request() req) {
    return req.cookies;
  }
}
```

### cookie 配置参数

![20230606150407](http://s3.airtlab.com/blog/20230606150407.png)


### cookie 加密

![20230606150419](http://s3.airtlab.com/blog/20230606150419.png)

**设置**
```typescript
import {Controller, Get, Response } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getNewsList(@Response() res) {
    res.cookie('username', '1XManba', {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      signed: true
    })
    // 这里只能用 res.send
    res.send(this.newsService.findAll())
    // return this.newsService.findAll()
  }
}
```

**获取**

```typescript
import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTest(@Request() req) {
    return {
      ...req.signedCookies,
      ...req.cookies
    }
  }
}
```

## 2、使用 session

![20230606150519](http://s3.airtlab.com/blog/20230606150519.png)

![20230606150532](http://s3.airtlab.com/blog/20230606150532.png)

**配置**
```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // cookie
  app.use(cookieParser('user123.'));

  // session
  app.use(session({
    secret: 'user123.',
    cookie: {
      maxAge: 1000 * 10
    }
  }))

  await app.listen(7000);
}


bootstrap();
```

**使用**
```typescript
import { Controller, Get, Response, Request } from '@nestjs/common';

@Controller('session')
export class SessionController {
  @Get('set')
  getSession(@Request() req) {
    console.log(req.session)
    req.session.token = "zxczxcxzc"
    return req.session.token
  }

  @Get('get')
  setSession(@Request() req) {
    return req.session.token ? req.session.token : 'none';
  }
}
```

### 常用参数

![20230606150628](http://s3.airtlab.com/blog/20230606150628.png)

![20230606150635](http://s3.airtlab.com/blog/20230606150635.png)					

### 常用方法

![20230606150646](http://s3.airtlab.com/blog/20230606150646.png)