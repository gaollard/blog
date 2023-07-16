---
title: 15 守卫 Guard
tags: nodejs-nestjs
categories: NodeJS
---

守卫是一个使用 `@Injectable()` 装饰器的类。 守卫应该实现 `CanActivate` 接口。

![20230606155201](http://s3.airtlab.com/blog/20230606155201.png)

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。 这通常称为授权。在传统的 `Express` 应用程序中，通常由中间件处理授权。中间件是身份验证的良好选择。到目前为止，访问限制逻辑大多在中间件内。这样很好，因为诸如 `token` 验证或将 `request` 对象附加属性与特定路由没有强关联。

中间件不知道调用 `next()` 函数后会执行哪个处理程序。另一方面，警卫可以访问 `ExecutionContext` 实例，因此确切地知道接下来要执行什么。它们的设计与异常过滤器、管道和拦截器非常相似，目的是让您在请求/响应周期的正确位置插入处理逻辑，并以声明的方式进行插入。这有助于保持代码的简洁和声明性。

## 1、执行时机
守卫在所有中间件之后执行，但在任何拦截器或管道之前。
```
logger1-middleware before...
logger2-middleware before...
AuthGuard
logger2-middleware after...
logger1-middleware after...
ValidationPipe 
```

## 2、执行上下文
该canActivate()函数接受一个参数，即ExecutionContext实例。ExecutionContext继承自ArgumentsHost. ArgumentsHost我们之前在异常过滤器章节中看到过。在上面的示例中，我们只是使用ArgumentsHost之前定义的相同帮助方法来获取对Request对象的引用。有关此主题的更多信息，您可以参考[异常过滤器一章的](https://docs.nestjs.com/exception-filters#arguments-host)参数主机部分。

通过扩展ArgumentsHost，ExecutionContext还添加了几个新的辅助方法，这些方法提供了有关当前执行过程的更多详细信息。这些细节有助于构建更通用的防护，这些防护可以在广泛的控制器、方法和执行上下文中工作。ExecutionContext[在此处](https://docs.nestjs.com/fundamentals/execution-context)了解更多信息。

## 3、绑定守卫
像管道和异常过滤器一样，守卫可以是**控制器范围的**、方法范围的或全局范围的。

## 4、基于角色的身份验证
```typescript
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

```typescript
@Post()
@Roles('admin')
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}
```
