---
tags: nodejs-nestjs
categories: NodeJS
---

---
title: 05 自定义装饰器
---

## 1、内置参数装饰器
Nest 提供了一组有用的 **参数装饰器**，您可以将它们与 HTTP 路由处理程序一起使用。下面是提供的装饰器和它们代表的普通 Express（或 Fastify）对象的列表

| @Request(), @Req() | req |
| --- | --- |
| @Response(), @Res() | res |
| @Next() | next |
| @Session() | req.session |
| @Param(param?: string) | req.params/req.params[param] |
| @Body(param?: string) | req.body/req.body[param] |
| @Query(param?: string) | req.query/req.query[param] |
| @Headers(param?: string) | req.headers/req.headers[param] |
| @Ip() | req.ip |
| @HostParam() | req.hosts |

## 2、自定义参数装饰器

在 node.js 世界中，将属性附加到 **请求** 对象是常见的做法。然后在每个路由处理程序中手动提取它们，使用如下代码：

```typescript
const user = req.user;
```

为了使您的代码更具可读性和透明性，您可以创建一个@User()装饰器并在所有控制器中重用它。

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

然后，您可以在适合您要求的任何地方简单地使用它

```typescript
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

### 返回值可以是 Promise

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return new Promise((resolve) => {
      resolve(1);
    });
  },
);
```

## 3、装饰器的参数

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return new Promise((resolve) => {
      resolve(`${data}_1`);
    });
  },
);
```

## 4、使用管道

在 @Query 和 @Body 等装饰器中，我们是可以使用 ValidationPipe 功能的，如何让你的装饰器具有同样的功能呢？

```typescript
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}
```

> 请注意，validateCustomDecorators 选项必须设置为 true。ValidationPipe 默认情况下，不验证使用自定义装饰器注释的参数。

## 5、装饰器组合
Nest 提供了一个辅助方法来组合多个装饰器。例如，假设您想将所有与身份验证相关的装饰器组合成一个装饰器。这可以通过以下结构来完成：

```typescript
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
```

然后，您可以@Auth()按如下方式使用此自定义装饰器：

```typescript
class MyController {
  @Get('users')
  @Auth('admin')
  findAllUsers() {}
}
```