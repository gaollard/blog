---
title: 009 nodejs 链路追踪
toc: true
tags: NodeJS
categories: 前端开发
---

## 1、研究背景
链路追踪是后台服务开发的一个很重要工具，它可以将所有的调用串联起来，形成一个有先后顺序的链路图。本文研究如何在 nodejs 中实现链路追踪。

## 2、链路信息获取
对于多线程语言如 Java 、 Python 来说，做全链路信息获取有线程上下文如 ThreadLocal 这种利器相助。而对于 Node.js 来说，由于单线程和基于IO回调的方式来完成异步操作，所以在全链路信息获取上存在天然获取难度大的问题。那么如何解决这个问题呢？

## 3、业界方案
由于 Node.js 单线程，非阻塞 IO 的设计思想。在全链路信息获取上，到目前为止，主要有以下 2 种方案：

- 显式传递：手动传递、中间件挂载；
- Async Hooks：node api；

方案1显式传递过于繁琐和具有侵入性。<br />效果最好的方案就是第2种方案，这种方案有如下优点：

- nodejs 原生支持的模块，具有可靠性性保证
- 隐式的链路跟踪，入侵小，目前隐式跟踪的最优解；
- 提供了 API 来追踪 node 中异步资源的生命周期；
- 借助 async_hook 实现上下文的关联关系；

## 4、Async Hooks
### 4.1  Async Hooks 概念
Async Hooks 是 Node.js v8.x 版本新增加的一个核心模块，它提供了 API 用来追踪 Node.js 中异步资源的生命周期，可帮助我们正确追踪异步调用的处理逻辑及关系。

### 4.2 Async Hooks 核心
![image__1](http://s3.airtlab.com/blog/image__1.png)
```typescript
import async_hooks from 'node:async_hooks';

// Return the ID of the current execution context.
// 返回当前异步资源的执行上下文 id
const eid = async_hooks.executionAsyncId();

// Return the ID of the handle responsible for triggering the callback of the
// current execution scope to call.
// 返回当前异步资源执 execution scope 的 trigger ID
const tid = async_hooks.triggerAsyncId();

// Create a new AsyncHook instance. All of these callbacks are optional.
// 创建实例
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// Allow callbacks of this AsyncHook instance to call. This is not an implicit
// action after running the constructor, and must be explicitly run to begin
// executing callbacks.
// 启用
asyncHook.enable();

// Disable listening for new asynchronous events.
// 禁用
asyncHook.disable();

//
// The following are the callbacks that can be passed to createHook().
//

// init() is called during object construction. The resource may not have
// completed construction when this callback runs. Therefore, all fields of the
// resource referenced by "asyncId" may not have been populated.
// 初始化(不一定完成)
function init(asyncId, type, triggerAsyncId, resource) { }

// before() is called just before the resource's callback is called. It can be
// called 0-N times for handles (such as TCPWrap), and will be called exactly 1
// time for requests (such as FSReqCallback).
function before(asyncId) { }

// after() is called just after the resource's callback has finished.
function after(asyncId) { }

// destroy() is called when the resource is destroyed.
function destroy(asyncId) { }

// promiseResolve() is called only for promise resources, when the
// resolve() function passed to the Promise constructor is invoked
// (either directly or through other means of resolving a promise).
function promiseResolve(asyncId) { }
```
通过 async_hooks 钩子，我们可以探测异步资源执行的全生命周期，从 创建 -> 执行前 -> 执行后 -> 销毁。
```javascript
const asyncHooks = require('async_hooks');
const fs = require('fs');

const hooks = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    fs.writeFileSync(2, `init asyncId: ${asyncId}, type: ${type}, triggerAsyncId: ${triggerAsyncId}\n`)
  },
  destroy (asyncId) {
    fs.writeFileSync(2, `destroy: ${asyncId}\n`)
  },
  before (asyncId) {
    fs.writeFileSync(2, `before: ${asyncId}\n`)
  },
  after (asyncId) {
    fs.writeFileSync(2, `after: ${asyncId}\n`)
  }
});
hooks.enable();

setTimeout(() => {
  setTimeout(() => {
  })
})
```
打印顺序如下：
```javascript
init asyncId: 2, type: Timeout, triggerAsyncId: 1
before: 2
init asyncId: 3, type: Timeout, triggerAsyncId: 2
after: 2
destroy: 2
before: 3
after: 3
destroy: 3
```

### 4.3 AsyncResource 异步资源
AsyncResource 用于创建异步资源 context，可以让很多个异步资源共享上下文。
```typescript
const asyncHook = require("async_hooks");
const fs = require("fs");
const list = []

asyncHook
  .createHook({
    init(asyncId, type, triggerAsyncId) {
      const content = `asyncId: ${asyncId}, type: ${type}, triggerAsyncId: ${triggerAsyncId}`
      fs.writeSync(1, content);
      fs.writeSync(1, "\n");
    },
  })
  .enable();

const asyncResource = new asyncHook.AsyncResource("ZeroContext");
fs.writeSync(1, asyncResource.asyncId().toString());
fs.writeSync(1, "\n");

// 在此异步资源的执行上下文中调用的函数
asyncResource.runInAsyncScope(() => {
  setTimeout(() => {})
});

// asyncId: 2, type: ZeroContext, triggerAsyncId: 1
// 2
// asyncId: 3, type: Timeout, triggerAsyncId: 2
```
```javascript
const http = require('http');
const { AsyncLocalStorage } = require('async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;

http.createServer((req, res) => {
  // 每一个请求都有一个唯一的id
  // 每一个请求的处理逻辑都放到 asyncLocalStorage.run 中，并且传入 id

  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    setImmediate(() => {
      logWithId('processing...');
      setTimeout(() => {
        logWithId('finish');
        res.end("hello");
      }, 2000)
    });
  });
}).listen(8080);
```

## 5、http-context 的实现
http context 是指请求上下文，对于 server 来说，每一个请求都有独立的请求上下文。
### 5.1 通过 hooks 实现
简化后的代码，ns 对象有3个关键的属性: 

- active 当前的 context
- _contexts context 和 asyncId 的映射
- _set context 栈
```javascript
function Context() {
  this._map = {};
}

Context.prototype.set = function (key, val) {
  this._map[key] = val;
};

Context.prototype.get = function (key, val) {
  return this._map[key];
};

const ns = new Namespace();
let currentUid = -1;

function createNamespace(name) {
  let namespace = new Namespace(name);
  namespace.id = currentUid;
}

const hooks = asyncHooks.createHook({
  // 当 int 被触发时说明，正在创建一个异步资源，
  // 我们需要将该异步资源和当前的 context 关联起来
  init(asyncId, type, triggerAsyncId, resource) {
    currentUid = async_hooks.executionAsyncId();
    if (namespace.active) {
      namespace._contexts.set(asyncId, namespace.active);
    } else if (currentUid === 0) {
      const triggerId = async_hooks.triggerAsyncId();
      const triggerIdContext = namespace._contexts.get(triggerId);
      if (triggerIdContext) {
        namespace._contexts.set(asyncId, triggerIdContext);
      }
    }
  },
  // 当 before 被调用时，说明马上要执行该异步资源的回调
  // 我们需要更新该 active 为 _map[asyncId]
  // 而且 push 到 context stack 中
  before(asyncId) {
    const context = this._map[asyncId];
    ns.enter(context);
  },
  // 当 after 被调用时，说明马上要执行该异步资源的回调已经执行完毕
  // 我们需要更新该 active 为 stack 中的倒数第二个
  after(asyncId) {
    const context = this._map[asyncId];
    ns.exit(context);
  },
  // 异步资源销毁，释放资源
  destroy(asyncId) {
    ns._contexts[asyncId] = null;
  },
});

hooks.enabled();

function Namespace() {
  this.active = null;
  this._set = [];
  this._contexts = new Map();
}

Namespace.prototype.run = function (fn) {
  const context = new createContext();
  this.enter(context);
  fn(context);
};

Namespace.prototype.runPromise = function (fn) {
  const context = new createContext();
  const promise = this.enter(context);

  return promise
    .then((result) => {
      this.exit(context);
      return result;
    })
    .catch((err) => {
      this.exit(context);
      throw err;
    });
};

Namespace.prototype.enter = function (context) {
  this.active = context;
  this.stack.push(this.active);
};

Namespace.prototype.exit = function (context) {
  if (this.active === context) {
    this.active = this._set.pop();
    return;
  }
};

// 提供 express middleware
function contextMiddleware(req, res, next) {
  ns.run(() => next());
}
```
### 5.2 cls-hookd
[npm cls]([https://www.npmjs.com/package/cls](https://www.npmjs.com/package/cls)) 的工作方式类似于 tls。[cls-hooked]([https://www.npmjs.com/package/cls-hooked](https://www.npmjs.com/package/cls-hooked)) 这个包从 cls fork 而来，cls-hooked 采用新的 api [async_hooks](https://link.juejin.cn/?target=https%3A%2F%2Fnodejs.org%2Fapi%2Fasync_hooks.html) 对核心逻辑进行了重写。
### 5.3 express-http-context
基于 cls-hookd 封装为 express 中间件的形式
## 6、参考资料

- VIVO 技术团队《 Node.js 应用全链路追踪技术》—— [全链路信息获取](https://mp.weixin.qq.com/s/SpC50ZqbKnKjlGBTSPMd9w?scene=25#wechat_redirect)