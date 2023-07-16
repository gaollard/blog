---
title: 11 提供者 Provider
tags: nodejs-nestjs
categories: NodeJS
---

## 1、@Injectable() 标记

依赖注入是一种 [控制反转 (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control) 技术，您可以将依赖项的实例化委托给 IoC 容器（在我们的例子中是 NestJS 运行时系统），而不是在您自己的代码中强制执行。`@Injectable() 装饰器将类标记为 Provider`

```typescript
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```

```typescript
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

## 2、简写模式 (useClass)

```typescript
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
class MyModule {}
```

该 providers 属性需要一个数组 providers，他是更完整语法的简写：
```typescript
@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useClass: CatsService,
    },
  ],
})
class MyModule {}
```

简写符号只是为了简化最常见的用例，其中令牌用于请求具有相同名称的类的实例。

## 3、理解 useValue
该 useValue 语法对于注入常量值、将外部库放入 Nest 容器或用模拟对象替换真实实现很有用。假设您想强制 Nest 使用模拟 CatsService 来进行测试

```typescript
import { CatsService } from './cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
```

在此示例中，CatsService 令牌将解析为 mockCatsService 模拟对象。需要一个值 - 在这种情况下，一个文字对象与它正在替换 useValue 的类具有相同的接口。CatsService 由于 TypeScript 的[结构类型](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)，您可以使用任何具有兼容接口的对象，包括文字对象或用 实例化的类实例 new。

## 4、非基于类的提供者令牌
到目前为止，我们使用类名作为我们的提供者标记（数组provide中列出的提供者中的属性值）。[这与基于构造函数的注入](https://docs.nestjs.com/providers#dependency-injection)providers 使用的标准模式相匹配，其中标记也是类名。

```typescript
import { connection } from './connection';

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class AppModule {}
```

```typescript
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}
```

在此示例中，我们将字符串值标记 ( ) 与我们从外部文件导入'CONNECTION'的预先存在的对象相关联。connection。除了使用字符串作为标记值之外，您还可以使用 JavaScript [符号](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 或 TypeScript[枚举](https://www.typescriptlang.org/docs/handbook/enums.html)。

## 5、class provider: useClass
假设我们有一个抽象的 ConfigService 类。根据当前环境，我们希望 Nest 提供不同的配置服务实现。下面的代码实现了这样的策略。

```typescript
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```

## 6、factory provider: useFactory
该语法允许**动态**创建提供程序。实际的提供者将由工厂函数返回的值提供，工厂本身可以注入其他提供程序。对于后一种情况，工厂提供者语法有一对相关的机制：

1. 工厂函数可以接受（可选）参数。
2. inject 属性接受一组提供者，Nest 将在实例化过程中解析并作为参数传递给工厂函数。此外，这些提供程序可以标记为可选。这两个列表应该是相关的：Nest 会将inject列表中的实例作为参数以相同的顺序传递给工厂函数。下面的示例演示了这一点。
```typescript
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \_____________/            \__________________/
  //        This provider              The provider with this
  //        is mandatory.              token can resolves to `undefined`.
};

@Module({
  providers: [
    connectionFactory,
    OptionsProvider,
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
```

## 7、alias provider：useExisting
该useExisting语法允许您为现有提供程序创建别名。这创建了两种访问同一提供程序的方法。在下面的示例中，（基于字符串的）标记'AliasedLoggerService'是（基于类的）标记的别名LoggerService。假设我们有两个不同的依赖项，一个 for'AliasedLoggerService'和一个 for LoggerService。如果两个依赖项都指定了SINGLETON范围，它们都将解析为同一个实例。

```typescript
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
```

## 8、非服务提供商
虽然供应商经常提供服务，但他们并不局限于这种用途。提供者可以提供**任何**价值。例如，提供者可能会根据当前环境提供一组配置对象，如下所示：

```typescript
const configFactory = {
  provide: 'CONFIG',
  useFactory: () => {
    return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```

## 9、导出自定义提供程序
与任何提供者一样，自定义提供者的范围仅限于其声明模块。要使其对其他模块可见，必须将其导出。要导出自定义提供者，我们可以使用其令牌或完整的提供者对象。以下示例显示使用令牌导出：
```typescript
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class AppModule {}
```

或者，使用完整的提供者对象导出：
```typescript
const connectionFactory = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class AppModule {}
```

## 10、异步提供者
有时，应延迟应用程序启动，直到完成一个或多个**异步任务**。例如，您可能不想在与数据库的连接建立之前开始接受请求。您可以使用异步提供程序来实现这一点。
```typescript
{
  provide: 'ASYNC_CONNECTION',
  useFactory: async () => {
    const connection = await createConnection(options);
    return connection;
  },
}
```
