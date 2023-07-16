---
tags: nodejs-nestjs
categories: NodeJS
---

通过 ModuleRef 来查找 provider 而不需要在构造函数中依赖注入

```typescript
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { CommonService } from "./common.service";

@Injectable()
export class CatsService {
  constructor(
    // @Inject(forwardRef(() => CommonService))
    // private commonService: CommonService,

    private moduleRef: ModuleRef,
  ) {
    
  }

  test () {
    const s = this.moduleRef.get(CommonService)
    s.test()
  }
}
```

```typescript
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CatsService } from "./cats.service";

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private catsService: CatsService,
  ) {}

  test () {
    console.log('common')
  }
}
```
