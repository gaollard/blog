---
title: 16 数据转换管道 PipeTransform
tags: nodejs-nestjs
categories: NodeJS
---

管道是具有 `@Injectable()` 装饰器的类。管道应实现 `PipeTransform` 接口，管道有两个类型:

- 转换：管道将输入数据转换为所需的数据输出
- 验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

在这两种情况下, 管道 `参数(arguments)` 会由 [控制器(controllers)的路由处理程序](https://docs.nestjs.cn/7/controllers?id=%e8%b7%af%e7%94%b1%e5%8f%82%e6%95%b0) 进行处理. Nest 会在调用这个方法之前插入一个管道，管道会先拦截方法的调用参数，进行转换或是验证处理，然后用转换好或是验证好的参数调用原方法。

> 管道在异常区域内运行。这意味着当抛出异常时，它们由核心异常处理程序和应用于当前上下文的 [异常过滤器](https://docs.nestjs.cn/7/exceptionfilters) 处理。当在 Pipe 中发生异常，controller 不会继续执行任何方法。

```typescript
import { Type } from '../type.interface';
import { Paramtype } from './paramtype.interface';
export declare type Transform<T = any> = (value: T, metadata: ArgumentMetadata) => any;
/**
 * Interface describing a pipe implementation's `transform()` method metadata argument.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 *
 * @publicApi
 */
export interface ArgumentMetadata {
    /**
     * Indicates whether argument is a body, query, param, or custom parameter
     */
    readonly type: Paramtype;
    /**
     * Underlying base type (e.g., `String`) of the parameter, based on the type
     * definition in the route handler.
     */
    readonly metatype?: Type<any> | undefined;
    /**
     * String passed as an argument to the decorator.
     * Example: `@Body('userId')` would yield `userId`
     */
    readonly data?: string | undefined;
}

/**
 * Interface describing implementation of a pipe.
 *
 * @see [Pipes](https://docs.nestjs.com/pipes)
 *
 * @publicApi
 */
export interface PipeTransform<T = any, R = any> {
  /**
   * Method to implement a custom pipe.  Called with two parameters
   *
   * @param value argument before it is received by route handler method
   * @param metadata contains metadata about the value
   */
  transform(value: T, metadata: ArgumentMetadata): R;
}
```

## 1、内置管道
Nest 有九个开箱即用的管道：
- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe

它们是从@nestjs/common包中导出的。让我们快速浏览一下使用 ParseIntPipe. 这是转换用例的示例，其中管道确保将方法处理程序参数转换为 JavaScript 整数（或在转换失败时引发异常）。

## 2、绑定管道
要使用管道，我们需要将管道类的实例绑定到适当的上下文。在我们的 ParseIntPipe 示例中，我们希望将管道与特定的路由处理程序方法相关联，并确保它在调用该方法之前运行。

### 2.1 方法参数级别绑定管道
```typescript
@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

### 2.2 方法调用级别绑定管道
这样会校验每个参数
```typescript
@Get()
@UsePipes(ParseIntPipe)
async findOne(@Query('id') id: number, @Query('age') age: number) {
  return this.catsService.findOne(id);
}
```

## 3、同步和异步管道
Nest 同时支持同步和异步管道，提升程序的灵活性。

## 4、自定义管道
```typescript
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(222)
    return value;
  }
}
```

```typescript
@Get(':id')
async findOne(@Param('id', ValidationPipe) id: number) {
  console.log(id)
}
```

## 5、模式验证
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
```

```typescript
@Get('user')
@UsePipes(new JoiValidationPipe(createCatSchema))
async queryUser(@Query() query: any) {
  console.log(query)
}
```

## 6、class-validator
```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(value, metatype)
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    console.log(object)
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

```typescript
import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './ValidationPipe';
import { IsString, IsInt } from 'class-validator';

class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async create(@Query(new ValidationPipe()) createCatDto: CreateCatDto) {
    console.log(createCatDto)
  }
}
```

## 7、全局范围的管道
由于 ValidationPipe 创建的尽可能通用，我们可以通过将其设置为 **全局范围的** 管道来实现它的完整实用程序，以便将其应用于整个应用程序中的每个路由处理程序。
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
```

## 8、内置的 ValidationPipe
提醒一下，您不必自己构建通用验证管道，因为它 ValidationPipe 是由 Nest 开箱即用提供的。内置 ValidationPipe 提供了比我们在本章中构建的示例更多的选项，为了说明定制管道的机制，我们一直保持基本。[您可以在此处](https://docs.nestjs.com/techniques/validation)找到完整的详细信息以及大量示例。