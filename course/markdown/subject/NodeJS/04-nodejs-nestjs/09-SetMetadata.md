---
tags: nodejs-nestjs
categories: NodeJS
---

**设置元数据**

```typescript
import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './auth.guard';
import { CatsService } from './cats.service';

@SetMetadata('roles', ['admin'])
@Controller()
export class AppController {
  constructor(
    private catService: CatsService
  ) {}

  @UseGuards(RolesGuard)
  @Get()
  async findOne() {
    this.catService.test()
  }
}
```

**获取元数据**

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles)
    return true;
  }
}
```

**元数据合并策略**

- getAllAndOverride
```typescript
const roles = this.reflector.getAllAndOverride<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```

- getAllAndMerge
```typescript
const roles = this.reflector.getAllAndMerge<string[]>('roles', [
  context.getHandler(),
  context.getClass(),
]);
```
