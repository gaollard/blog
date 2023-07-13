---
title: 03 app 接收请求
toc: true
tags: ExpressJS
categories: 前端开发
---

```js
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
然后 app.listen 内部封装 http.createServer，所以先看看 app.listen

## 1. app.listen()
```js
// lib/application.js
app.listen = function listen() {
  // this 就是
  // var app = function (req, res, next) {
  //   next 为 undefined  
  //   app.handle(req, res, next);
  // };

  var server = http.createServer(this);

  return server.listen.apply(server, arguments);
};
```
所以当监听到请求时会进入 app.handle

## 2. app.handle()
```cpp
// lib/application.js

// Dispatch a req, res pair into the application. Starts pipeline processing.
// If no callback is provided, then default error handlers will respond
// in the event of an error bubbling through the stack.
app.handle = function handle(req, res, callback) {
  var router = this._router;

  // final handler
  var done = callback || finalhandler(req, res, {
    env: this.get('env'),
    onerror: logerror.bind(this)
  });

  // no routes
  if (!router) {
    debug('no routes defined on app');
    done();
    // 如果没有注册任何的中间件，则 done()
    return;
  }

  router.handle(req, res, done);
};
```
 app.handle  用于下发请求到 router 进行处理，首先定义了 done Function，这个函数会在所有中间件都执行完了后执行。调用 router.handle 后，会进人流水线处理流程，我们先看看 finalhandler 的定义
```cpp
function finalhandler (req, res, options) {
  var opts = options || {}

  // get environment
  var env = opts.env || process.env.NODE_ENV || 'development'

  // get error callback
  var onerror = opts.onerror

  // 如果执行流水线执行完成，或者中途出现了错误
  // 则会调用这个函数，并且传入错误信息
  return function (err) {
    var headers
    var msg
    var status

    // ignore 404 on in-flight response
    // 如果没错误，但是已经响应请求了，则请求处理完成
    if (!err && headersSent(res)) {
      debug('cannot 404 after headers sent')
      return
    }

    // unhandled error
    if (err) {
      // respect status code from error
      status = getErrorStatusCode(err)

      if (status === undefined) {
        // fallback to status code on response
        status = getResponseStatusCode(res)
      } else {
        // respect headers from error
        headers = getErrorHeaders(err)
      }

      // get error message
      msg = getErrorMessage(err, status, env)
    } else {
      // not found
      status = 404
      msg = 'Cannot ' + req.method + ' ' + encodeUrl(getResourceName(req))
    }

    debug('default %s', status)

    // schedule onerror callback
    if (err && onerror) {
      defer(onerror, err, req, res)
    }

    // cannot actually respond
    if (headersSent(res)) {
      debug('cannot %d after headers sent', status)
      req.socket.destroy()
      return
    }

    // send response
    send(req, res, status, headers, msg)
  }
}
```
接下来，我们看看 router.handle 的逻辑

## 3. router.handle()
router.handle 是中间件执行调度的核心，我们后续会用单独的章节详细介绍，这里只做大概的阐述。<br />实际上，所有注册的中间件都会被 router 对象所管理，在 router.handle 内部封装了关键的 next 方法 以及 关键指针 idx，next 方法 + idx 指针来串联所有的中间件：

- 从 idx = 0 开始，进入 next 方法，取一个 matched 的中间件
- 当第一个中间件执行完成后，并且 next 被调用
- 则取下一个 matched，这样直到所有 middleware 都被处理
- 最后执行 done() 

下面是极简的代码（仅仅提供帮助理解，后续会详细介绍）
```js
proto.handle = function handle(req, res, out) {
  var self = this;

  var idx = 0;

  // middleware and routes
  var stack = self.stack;

  var done = restore(out, req, 'baseUrl', 'next', 'params');

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;

    if (idx >= stack.length) {
      setImmediate(done, layerError);
      return;
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    // find next matching layer
    var layer;
    var match;
    var route;

    // while 循环负责获取一个 matched 的中间件
    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer);
      if (match !== true) {
        continue;
      }
    }

    // 执行该中间件
	handle_request(req, res, next)
  }
};
```
然后整个请求就处理完成了
