---
tags: nodejs-nestjs
categories: NodeJS
---

## 1、使用模版引擎

```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // 配置模板引擎(安装ejs: yarn add ejs)
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  await app.listen(7000);
}

bootstrap();
```

```typescript
import { Controller, Header, Headers, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  @Render('home')
  getTest(@Headers() headers, @Param() params) {
    console.log(headers)
    return {
      name: "XManba",
      headers: headers
    }
  }
}
```

![20230606150205](http://s3.airtlab.com/blog/20230606150205.png)

## 2、静态资源服务设置
```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 配置静态资源(设置虚拟目录是更好的做法)
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', // 设置虚拟路径
  });

  await app.listen(7000);
}

bootstrap();
```