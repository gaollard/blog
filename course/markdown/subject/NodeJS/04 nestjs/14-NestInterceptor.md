---
title: 14 拦截器 (NestInterceptor)
tags: nodejs-nestjs
categories: NodeJS
---

拦截器是一个用 @Injectable() 装饰器注解并实现 NestInterceptor 接口的类。

![20230606154845](http://s3.airtlab.com/blog/20230606154845.png)

```typescript
logger1-middleware before...
logger2-middleware before...
AuthGuard
logger2-middleware after...
logger1-middleware after...

LoggingInterceptor Before...
ValidationPipe
LoggingInterceptor After... 1ms
```

[拦截器具有一组受面向方面编程](https://en.wikipedia.org/wiki/Aspect-oriented_programming)(AOP) 技术启发的有用功能。它们可以：

- 在方法执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换函数抛出的异常
- 扩展基本功能行为
- 根据特定条件完全覆盖函数（例如，出于缓存目的）

## 1、拦截器三部分
### intercept 方法
每个拦截器都实现该intercept()方法，该方法接受两个参数。第一个是实例（与[guards](https://docs.nestjs.com/guards)ExecutionContext完全相同的对象）。继承自. 我们之前在异常过滤器章节中看到过。在那里，我们看到它是传递给原始处理程序的参数的包装器，并且包含基于应用程序类型的不同参数数组。您可以参考[异常过滤器](https://docs.nestjs.com/exception-filters#arguments-host)以获取有关此主题的更多信息。ExecutionContextArgumentsHostArgumentsHost

### 执行上下文
通过扩展ArgumentsHost，ExecutionContext还添加了几个新的辅助方法，这些方法提供了有关当前执行过程的更多详细信息。这些细节有助于构建更通用的拦截器，这些拦截器可以跨广泛的控制器、方法和执行上下文工作。ExecutionContext[在此处](https://docs.nestjs.com/fundamentals/execution-context)了解更多信息。

### 调用处理程序
第二个参数是一个CallHandler。该CallHandler接口实现了该handle()方法，您可以使用该方法在拦截器中的某个位置调用路由处理程序方法。handle()如果您在方法的实现中不调用该方法intercept()，则根本不会执行路由处理程序方法。
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

### 绑定拦截器
为了设置拦截器，我们使用从包中@UseInterceptors()导入的装饰器。@nestjs/common像[管道](https://docs.nestjs.com/pipes)和[守卫](https://docs.nestjs.com/guards)一样，拦截器可以是控制器范围的、方法范围的或全局范围的。

```typescript
@UseInterceptors(LoggingInterceptor)
export class CatsController {}
```

```typescript
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());
```

## 2、使用场景
### Response mapping
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
```
### Exception mapping
```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err => throwError(() => new BadGatewayException())),
      );
  }
}
```

### More operators
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException } from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  };
};
```
