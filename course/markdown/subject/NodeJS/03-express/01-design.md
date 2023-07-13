---
title: 01 整体介绍
toc: true
tags: 
  - NodeJS
  - ExpressJS
categories: 前端开发
---

## 1、初识 express
[express.js](https://link.juejin.cn/?target=https%3A%2F%2Fwww.expressjs.com.cn%2F) 是一款基于 Node.js 平台，极简的 Web 开发框架。本文将基于 4.18.2 版本，详细讲解 Express 核心原理的实现，包括主体架构 以及 核心的中间件架构模型讲解。

Express 在使用上非常较简单：

- （1）初始化一个应用
- （2）注册中间件调用
- （3）最后监听端口启动服务

```typescript
const express = require('express')

// 初始化一个应用
const app = express()
const port = 3000

// 注册中间件调用
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 监听端口启动服务
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
 
这个例子很简单，在更进一步之前，我们需要理解 express.js 的中间件模型，它可以帮助我们理解源码。

## 2、中间件模型
express.js 本质上是一个中间件模型，比如对于如下代码：
```cpp
const express = require('express')
const app = express()
const port = 3000

// 注册中间件: 响应请求，打印1，并且调用 next() 进入下一个中间件
app.get('/', (req, res, next) => {
  console.log(1)
  res.send('Hello World!')
  next()
})

// 注册中间件: 打印2，并且调用 next() 进入下一个中间件
app.get('/', (req, res, next) => {
  console.log(2)
  next()
})

// 注册中间: 打印3
app.get('/', (req, res, next) => {
  console.log(3)
  next()
})

// 注册中间件: 打印4
app.get('/hello', (req, res) => {
  console.log(4)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
在这里我们注册了4个中间件，当访问 [http://localhost:3000/](http://localhost:3000/) 会命中前3个中间件，从而打印 1 2 3，其命中规则主要依靠 HTTP 请求方法 和 请求路径来判断。

![图1](http://s3.airtlab.com/blog/20230228221626.png)

在 express.js 内部，当监听到一个请求时，会遍历所有中间件，如果某个中间件命中，则会进入该中间件，否则跳过，直到所有中间件遍历结束。 

## 3、核心概念介绍
以下的内容，只需要大体清楚留个印象即可，在后面的章节中，我们会详细的介绍。

### 3.1 application 对象
该对象由 express() 创建，app 本质是一个函数(也是中间件)，用于接受请求并下发，同时挂载了很多方法。
```typescript
var app = function(req, res, nest) {}

/**
 * Initialize the server.
 *
 *   - setup default configuration
 *   - setup default middleware
 *   - setup route reflection methods
 *
 * @private
 */
// 入口
app.init = function init() {}

/**
 * Initialize application configuration.
 * @private
 */
// 初始化配置
app.defaultConfiguration = function defaultConfiguration() {}

// 创建 router
app.lazyrouter = function lazyrouter() {}
```
### 3.2 middleware 中间件
middleware 本质上是一个 Function，存在3种定义：
```cpp
// 正常中间件：你对数据进行处理，然后调用 next 调用下一个中间件
fn1(req, res, next) {}

// 异常中间件: 你出错口才调用它，而且必须是四个参数，不能多也不能少
fn2(err, req, res, next) {}

// 终止中间件：没有 next 说明数据到里结束
fn3(req, res) {}
```
中间件可以绑定路由，也可以不用绑定路由：
```cpp
// 全局, 不绑定路由
app.use(function(req, res, next){});

// 路由中间件, 绑定路由 get 方法
app.get("/ping", function(req, res, next){})

// 路由中间件, 绑定路由 所有方法
app.all("/ping", function(req, res, next){})
```
中间件的更多演示 [Middleware callback function examples]([https://expressjs.com/en/4x/api.html#app.use](https://expressjs.com/en/4x/api.html#app.use))

### 3.3 Router 对象
每一个 application 中都只有一个 router 路由对像，这个对像管理这个 application 下面有所有的 subApplication, middleware 和 route。

### 3.4 Route 对象
```cpp
function Route(path) {
  this.path = path;
  this.stack = [];

  debug('new %o', path)

  // route handlers for various http methods
  this.methods = {};
}
```
用于管理路由对象，比如：
```cpp
app.get("/ping", function fn1(req, res, next){})
```
这时，就会创建一个 Route 实例:
```cpp
{
	"path": "/ping", // 请求路径
    "stack": [fn1],  // 回掉函数
    "methods": {     // 该 route 绑定了的请求方法
        "get": true
    }
}
```

### 3.5 Layer 对象
Layer 是一个连接器，用于串联 router route 以及 middleware，也是 express.js 中间件的核心

### 3.6 sub application 子应用
application 指一个 express 实例，这个实例可以有自己环境变量等，而 subApplication 是指的 application 下面又会嵌套 一个 express 实例对像。
```cpp
// An Express app is valid middleware.
var subApp = express()
subApp.get('/', function (req, res, next) {
  next()
})
app.use(subApp)
```