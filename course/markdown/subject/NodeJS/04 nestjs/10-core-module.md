---
tags: nodejs-nestjs
categories: NodeJS
---

---
title: 10 模块 Module
---

模块是具有 `@Module()` 装饰器的类。 `@Module()` 装饰器提供了元数据，Nest 用它来组织应用程序结构。

![20230606152347](http://s3.airtlab.com/blog/20230606152347.png)

每个 Nest 应用程序至少有一个模块，即根模块。根模块是 Nest 开始安排应用程序树的地方。事实上，根模块可能是应用程序中唯一的模块，特别是当应用程序很小时，但是对于大型程序来说这是没有意义的。在大多数情况下，您将拥有多个模块，每个模块都有一组紧密相关的功能。

`@module()` 装饰器接受一个描述模块属性的对象：

| 字段 | 介绍 |
| --- | --- |
| providers | 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享 |
| controllers | 必须创建的一组控制器 |
| imports | 导入模块的列表，这些模块导出了此模块中所需提供者 |
| exports | 由本模块提供并应在其他模块中可用的提供者的子集。 |

> 默认情况下，该模块封装提供程序。这意味着无法注入既不是当前模块的直接组成部分，也不是从导入的模块导出的提供程序。因此，您可以将从模块导出的提供程序视为模块的公共接口或API。

## 1、按功能组织模块

一个功能模块仅仅是将具有相同功能的 Service、Controller 已经其他信息封装在一个模块中，比如：

```typescript
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

## 2、模块是单例的
在 Nest 中，模块默认是单例的，因此您可以轻松地在多个模块之间共享任何提供程序的相同实例。

![20230606152549](http://s3.airtlab.com/blog/20230606152549.png)

每个模块一旦创建，它就可以被任何模块重用。假设我们想 CatsService 在其他几个模块之间共享一个实例。为此，我们首先需要通过将提供程序添加到模块的数组中来导出提供程序，如下所示：CatsService exports

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
```

现在任何导入 的模块 CatsModule 都可以访问 CatsService 并且将与导入它的所有其他模块共享相同的实例。

## 3、模块重新导出

如上所示，模块可以导出其内部提供者。此外，他们可以重新导出他们导入的模块。在下面的示例中，CommonModule 既可以导入也可以从 导出 CoreModule，使其可用于导入该模块的其他模块。

```typescript
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

## 4、模块类也可以注入提供者

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

[但是，由于循环依赖](https://docs.nestjs.com/fundamentals/circular-dependency)，模块类本身不能作为提供者注入。

## 5、全局模块

如果您必须在任何地方导入相同的模块集，这可能会变得乏味。与 Nest 不同，[Angular](https://angular.io/) providers 是在全局范围内注册的。一旦定义，它们在任何地方都可用。然而，Nest 将提供程序封装在模块范围内。如果不首先导入封装模块，您将无法在其他地方使用模块的提供程序。
当您想提供一组开箱即用的提供程序时（例如，帮助程序、数据库连接等），请使用装饰器使模块成为全局的，即 `@Global()`

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

@Global() 装饰器使模块具有全局范围。全局模块应该只注册 **一次**，通常由根模块或核心模块注册。在上面的示例中，CatsService 提供者将无处不在，希望注入服务的模块不需要 CatsModule 在其导入数组中导入。

让一切都全球化并不是一个好的设计决策。`全局模块可用于减少必要的样板数量`。imports数组通常是使模块的 API 可供消费者使用的首选方式 。

## 6、动态模块

Nest 模块系统包括一个称为 **动态模块** 的强大功能。此功能使您能够轻松创建可动态注册和配置提供程序的可定制模块。[动态模块在这里](https://docs.nestjs.com/fundamentals/dynamic-modules) 得到了广泛的介绍。在本章中，我们将简要概述以完成对模块的介绍。

以下是 a 的动态模块定义示例 DatabaseModule：

```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
```

```typescript
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
```

### 动态模块的意义
主要用于提供可定制功能

### forRoot() 方法可以是异步
forRoot 返回动态模块，即一个 Promise。

### 全局范围内注册动态模块
如果要在全局范围内注册动态模块，请将 global 属性设置为 true
```typescript
{
  global: true,
  module: DatabaseModule,
  providers: providers,
  exports: providers,
}
```