一个 C 端 API 快速开发模板，源代码见 https://github.com/fiiai/nestjs-template

## 1. 项目介绍

使用 NestJS 进行 API 通用业务框架最佳实践方案，笔者会定期的更新，欢迎指正。API 文档 👉 https://www.apifox.cn/web/project/2299100
包含如下特性：

- 【规范】工程目录
- 【规范】代码风格
- 【监控】异常监控
- 【特性】日志打印
- 【特性】配置管理
- 【特性】唯一 ID
- 【特性】socket.io 集成
- 【特性】redis 封装
- 【特性】mysql 封装
- 【特性】mongoose 封装
- 【特性】mailer 封装
- 【特性】rabbitmq 封装
- 【特性】qiniu 集成
- 【特性】API 文档方案
- 【特性】代码文档方案

## 2. 内置模块

- [x] 账户模块
- [x] 图文列表
- [x] 评论模块
- [x] 上传模块
- [x] 数据采集
- [x] 地址管理
- [x] 钱包功能
- [x] 授权登录
  - [x] 微信登录
- [x] 支付能力
  - [x] 支付宝支付
  - [x] 微信支付
- [x] 权限管理
- [x] 短信推送
- [ ] 站内消息


## 3. 技术选型

| 名称     | 方案                                                        |
| -------- | ----------------------------------------------------------- |
| 框架     | [nestjs](https://nestjs.com/)                               |
| 时间处理 | [dayjs](https://day.js.org/docs/en/installation/typescript) |
| 长连接   | [socket.io](https://socket.io/) & nestjs platform           |
| 日志     | [pino](https://github.com/pinojs/pino)                      |
| 大数处理 | [bignumber.js](https://mikemcl.github.io/bignumber.js/)     |

## 4. 技术方案

### 4.0 请求生命周期

![20230301191226](http://s3.airtlab.com/blog/20230301191226.png)

### 4.1 工程目录

```text
├── config
│   ├── dev.config.yaml
│   ├── live.config.yaml
│   └── local.config.yaml
├── libs
│   ├── common
│   │   ├── filters
│   │   ├── guard
│   │   ├── interceptor
│   │   └── middleware
│   ├── config
│   ├── constant
│   ├── logger
│   ├── mailer
│   ├── mongo
│   ├── redis
│   ├── request
│   ├── s3
│   └── utils
├── src
│   ├── app.module.ts
│   ├── domain-admin
│   │   ├── admin.module.ts
│   │   ├── common
│   │   ├── module
│   │   └── shared
│   ├── domain-app
│   │   ├── app.module.ts
│   │   ├── common
│   │   ├── module
│   │   └── shared
│   ├── exception.ts
│   ├── global.d.ts
│   ├── main.ts
│   ├── modules
│       ├── common
│       │   ├── db
│       │   ├── entity
│       │   ├── filters
│       │   ├── middleware
│       │   ├── pipes
│       │   ├── prom
│       │   └── validate
│       ├── enums
│       ├── feature
│       ├── mock
│       ├── types
│       ├── utils
│       └── vos
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock
```

### 4.2 代码风格

[Angular 代码风格指南](https://angular.io/guide/styleguide)

### 4.3 异常监控

数据采集 & 展示采用 Prom + Grafana，监控指标设计 TODO。

### 4.4 日志打印

[winston](https://github.com/winstonjs/winston)


### 4.5 项目文档
```shell
npx @compodoc/compodoc -p tsconfig.json -s
```