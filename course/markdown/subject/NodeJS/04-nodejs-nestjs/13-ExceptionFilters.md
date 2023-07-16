---
title: 13 异常过滤器 ExceptionFilter
tags: nodejs-nestjs
categories: NodeJS
---

内置的异常层负责处理整个应用程序中的所有抛出的异常。当捕获到未处理的异常时，最终用户将收到友好的响应。
```typescript
logger1-middleware before...
logger2-middleware before...
AuthGuard
logger2-middleware after...
logger1-middleware after...

LoggingInterceptor Before...
ValidationPipe
AllExceptionsFilter

# LoggingInterceptor After... 未执行
```

## 1、默认异常过滤器 
开箱即用，此操作由内置的全局异常过滤器执行，该过滤器处理类型 HttpException（及其子类）的异常。每个发生的异常都由全局异常过滤器处理, 当这个异常无法被识别时 (既不是 HttpException 也不是继承的类 HttpException ) , 用户将收到以下 JSON 响应:
```typescript
{
    "statusCode": 500,
    "message": "Internal server error"
}
```

## 2、内置HTTP异常
为了减少样板代码，Nest 提供了一系列继承自核心异常 HttpException 的可用异常。所有这些都可以在 @nestjs/common包中找到：

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableException
- InternalServerErrorException
- NotImplementedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
  
## 3、自定义异常过滤器
虽然基本（内置）异常过滤器可以为您自动处理许多情况，但有时您可能希望对异常层拥有**完全控制权**，例如，您可能要添加日志记录或基于一些动态因素使用其他 JSON模式。 **异常过滤器**正是为此目的而设计的。 它们使您可以控制精确的控制流以及将响应的内容发送回客户端。

让我们创建一个异常过滤器，它负责捕获作为HttpException类实例的异常，并为它们设置自定义响应逻辑。为此，我们需要访问底层平台 Request和 Response。我们将访问Request对象，以便提取原始 url并将其包含在日志信息中。我们将使用 Response.json()方法，使用 Response对象直接控制发送的响应。

```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
```
@Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找 HttpException 而不是其他的。在实践中，@Catch() 可以传递多个参数，所以你可以通过逗号分隔来为多个类型的异常设置过滤器。

## 4、捕获任意异常
```typescript
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```
