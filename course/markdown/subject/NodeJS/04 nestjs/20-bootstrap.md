---
tags: nodejs-nestjs
categories: NodeJS
---

## 1、执行顺序
下图描述了关键应用程序生命周期事件的顺序，从应用程序启动到节点进程退出。我们可以将整个生命周期分为三个阶段：初始化、运行和终止。使用此生命周期，您可以计划模块和服务的适当初始化，管理活动连接，并在收到终止信号时正常关闭应用程序。

![20230606160440](http://s3.airtlab.com/blog/20230606160440.png)

## 2、钩子函数

在下表中 onModuleDestroy，beforeApplicationShutdown 和 onApplicationShutdown 仅在您显式调用app.close() 或 进程接收到特殊系统信号（例如 SIGTERM）并且您 enableShutdownHooks 在应用程序引导时正确调用时才会触发

| 生命周期钩子方法 | 触发钩子方法调用的生命周期事件 |
| --- | --- |
| onModuleInit() | 解析主机模块的依赖关系后调用。 |
| onApplicationBootstrap() | 一旦所有模块都被初始化，但在监听连接之前调用。 |
| onModuleDestroy()* | 在接收到终止信号（例如 ）后调用SIGTERM。 |
| beforeApplicationShutdown()* | onModuleDestroy()在所有处理程序完成后调用（承诺已解决或被拒绝）；
一旦完成（承诺解决或拒绝），所有现有连接将被关闭（app.close()调用）。 |
| onApplicationShutdown()* | 在连接关闭（app.close()解析）后调用。 |

### 使用钩子
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
```

### 异步逻辑
OnModuleInit和钩子都OnApplicationBootstrap允许您延迟应用程序初始化过程（在方法主体中返回Promise或标记方法async和await异步方法完成）。

```typescript
async onModuleInit(): Promise<void> {
  await this.fetch();
}
```