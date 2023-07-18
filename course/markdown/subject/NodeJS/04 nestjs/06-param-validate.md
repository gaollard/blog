---
tags: nodejs-nestjs
categories: NodeJS
---

---
title: 06 参数验证
---

参数验证主要是结合 NestJS pipe 来做

**安装**
```shell
yarn add class-transformer class-validator
```

**配置全局验证 pipe**

```typescript
import { appLogger } from '@libs/logger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

const app = await NestFactory.create<NestExpressApplication>(AppModule);

const exceptionFactory: ValidationPipe['exceptionFactory'] = (errors) => {
  appLogger.error(`validator error`, errors);
  const error = errors[0];
  return new BadRequestException(
    error.constraints[Object.keys(error.constraints)[0]],
  );
};

export const ParamsValidationPipe = new ValidationPipe({
  // transform: true,
  // whitelist: true, 开启 whitelist 会将不需要的字段都丢去
  // skipMissingProperties: true,
  exceptionFactory,
  // transformOptions: {
  //   excludeExtraneousValues: false,
  // },
});

app.useGlobalPipes(ParamsValidationPipe);	
```

**使用**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UserEntity } from '../entity/user.entity';
import { CodeTypeEnum } from '../enums/CodeTypeEnum';
import { LoginTypeEnum } from '../enums/LoginTypeEnum';

export class RegisterDto {
  @ApiProperty({ description: '账号'  })
  @IsOptional()
  @IsString()
  account?: string;

  @ApiProperty({ description: '密码', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: '验证码', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: '账号类型', enum:  RegisterType })
  @IsString()
  registerType: RegisterType;
}
```

```typescript
@ApiTags('账户')
@Controller('account')
export class AccountController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  // 注册
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.accountService.register(body);
  }
}
```
