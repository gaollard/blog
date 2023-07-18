---
tags: nodejs-nestjs
categories: NodeJS
---

参考文档：[https://docs.nestjs.cn/7/controllers?id=request](https://docs.nestjs.cn/7/controllers?id=request)

- 路由：常用是指 uri
- 控制器：用于处理特定路由
- 

## 1、请求方法

### @GET
```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/home')
  getHome(): string {
    return 'hello home';
  }
}

```

### @Post

```typescript
import { Controller, Get, Query, Request, Response, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  getTest(@Request() req): string {
    console.log(req.body)
    return 'test'
  }
}
```

## 2、请求参数

### @Query 获取 query 参数

```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/home')
  getHome(@Query() query): string {
    console.log(query)
    return 'hello home';
  }
}
```
```typescript
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home')
  getHome(@Query('name') query): string {
    console.log(query)
    return 'hello home';
  }
}

```

### @Params 获取 path 参数

```typescript
import { Controller, Header, Headers, Get, Query, Request, Response, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getTest(@Headers() headers, @Param() params): string {
    console.log(params)
    return 'test'
  }
}
```

### @Body 获取 body 参数

```typescript
import { Controller, Get, Query, Request, Response, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  getTest(@Body() body): string {
    console.log(body)
    return 'test'
  }
}
```

## 3、请求对象&响应对象

### @Request 请求对象

```typescript
import { Controller, Get, Query, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getTest(@Request() req): string {
    console.log(req.query)
    return 'test'
  }
}
```

### @Response 响应对象

## 4、请求头获取和设置

### @Headers 获取请求头
```typescript
import { Controller, Header, Headers, Get, Query, Request, Response, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  getTest(@Headers() headers): string {
    console.log(headers)
    return 'test'
  }
}
```

### @Header 设置头
```typescript
import { Controller, Header, Headers, Get, Query, Request, Response, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('test')
  @Header('x-s', 'ddd')
  getTest(@Headers() headers): string {
    console.log(headers)
    return 'test'
  }
}
```

## 5、路由分组
```typescript
import { Module } from '@nestjs/common';
import { RouterModule, Routes } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user.module';

const routes: Routes = [
  {
    path: '/v1',
    module: UserModule,
  },
];

@Module({
  imports: [
    UserModule,
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```
## 6、路由重定向
```typescript
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'supertest';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private service: PingService) {}

  @Get('test')
  test(): string {
    return this.service.getHello();
  }

  @Get()
  getHello(): string {
    return this.service.getHello();
  }

  @Get('redirect')
  redirect(
    @Res() res: Response & { redirect: (uri: string, status?: number) => void },
  ) {
    // (1) 重定向到 http 协议的站点
    // res.redirect('https://nestjs.com', 301)
    // (2) 重定向到站点
    // (property) request.Response.redirect: boolean
    // redirect 居然是个 boolean 类型，好奇怪
    res.redirect('/ping/test', 302)
  }
}

```
