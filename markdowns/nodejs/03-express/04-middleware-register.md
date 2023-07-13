---
title: 04 中间件注册流程
toc: true
tags: ExpressJS
categories: 前端开发
---

创建 app 以及 app 接收请求 我们已经阐述过了，并且在《app 接收请求》这一小节中，我们介绍了 router.handle 中间件宏观的执行流程。现在我们需要详细的理解 中间件的注册流程 以及 中间件的执行流程。

这一小节先介绍注册流程（如果你希望快速了解 middleware 的模型，请看文章末尾的 layer 模型图）

## 1. 从 `app[method]()` 开始
`app[method](path, fn)` 注册中间件:
```js
// 注册中间件: 响应请求，打印1，并且调用 next() 进入下一个中间件
app.get('/', (req, res, next) => {
  console.log(1)
  res.send('Hello World!')
  next()
})
```

我们需要知道 `app.get` 是如何定义的：
```js
// lib/application.js
// 遍历所有 http method
methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    // 创建 router, 内部有判断，只会全局创建一个 router
    this.lazyrouter();
      
    // 创建 Route 实例
    var route = this._router.route(path);

    // 这个调用了 route.method 方法
    // 本质上给该 route 创建了一个 layer
    // route 绑定了 handle
    route[method].apply(route, slice.call(arguments, 1));

    return this;
  };
});
```
处理逻辑包括：

- 创建 Router 实例 (内部有判断，只会全局创建一个 router)
- 创建 Route 实例，每次调用 app[method] 都会创建一个 Route
  - 创建 route
  - 创建 router layer
- 执行 route[method] 方法，参数为 handle
  - 创建 route layer

下面分别详细介绍。

## 2. new Router
### app.lazyrouter [创建 router]
```js
app.lazyrouter = function lazyrouter() {
  if (!this._router) {
    this._router = new Router({
      caseSensitive: this.enabled('case sensitive routing'),
      strict: this.enabled('strict routing')
    });

    // query parser: 解析 url 参数
    this._router.use(query(this.get('query parser fn')));

    // 完成 req 和 res 互相引用，以及按照国际惯例增加 "X-Powered-By" 😁
    this._router.use(middleware.init(this));
  }
};
```
lazyrouter 内部决定是否执行 new Router，只会创建一个实例，这里可以理解为两步：

- 创建 Router 实例
- 注册两个内置的 middleware

### Router 的定义
lib/router/index.js
```js
var proto = module.exports = function(options) {
  var opts = options || {};

  // 有趣的是 router 本身也是一个充当 middlewaren handle 的函数
  // 这个会很有用, 比如路由分组  
  function router(req, res, next) {
    router.handle(req, res, next);
  }

  // mixin Router class functions
  setPrototypeOf(router, proto)

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;

  // 用于保存所有的 middleware
  router.stack = [];

  return router;
};
```

## 3. new Route
### router.route() [创建 Route & router layer]
注册中间件时:

- (1) 创建一个 route
- (2) 创建一个 layer
- (3) layer.route = route
- (4) 将 layer 添加到 router.stack 中

```js
/**
 * Create a new Route for the given path.
 *
 * Each route contains a separate middleware stack and VERB handlers.
 *
 * See the Route api documentation for details on adding handlers
 * and middleware to routes.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */
proto.route = function route(path) {
  var route = new Route(path);

  // layer 的 handle 为 route.dispatch 这个很重要
  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};
```

### route[method] [创建 route layer]
lib/router/route.js
```js
methods.forEach(function(method){
  Route.prototype[method] = function(){
      // handles 就是 app.method(path, fn1, fn2) 中的 [fn1, fn2]
    var handles = flatten(slice.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== 'function') {
        var type = toString.call(handle);
        var msg = 'Route.' + method + '() requires a callback function but got a ' + type
        throw new Error(msg);
      }

      debug('%s %o', method, this.path)

      // 创建 Layer
      // 将 layer 添加到 layer.stack 中
      var layer = Layer('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

```

## 4. new Layer
Layer 是对 middleware 的封装，先看 Layer 的定义。

### Layer 的定义
```js

var pathRegexp = require('path-to-regexp');
var debug = require('debug')('express:router:layer');

var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = Layer;

function Layer(path, options, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, options, fn);
  }

  debug('new %o', path)
  var opts = options || {};

  // 关键属性
  this.handle = fn;

  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
  this.regexp = pathRegexp(path, this.keys = [], opts);

  // set fast path flags
  this.regexp.fast_star = path === '*'
  this.regexp.fast_slash = path === '/' && opts.end === false
}

/**
 * Handle the error for the layer.
 *
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */
Layer.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  if (fn.length !== 4) {
    // not a standard error handler
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Handle the request for the layer.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */
Layer.prototype.handle_request = function handle(req, res, next) {
  var fn = this.handle;

    // 如果 handle 参数只有2个时
    // 内部会帮助 next() 避免 pipe 中断
  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */
Layer.prototype.match = function match(path) {
  var match

  if (path != null) {
    // fast path non-ending match for / (any path matches)
    if (this.regexp.fast_slash) {
      this.params = {}
      this.path = ''
      return true
    }

    // fast path for * (everything matched in a param)
    if (this.regexp.fast_star) {
      this.params = {'0': decode_param(path)}
      this.path = path
      return true
    }

    // match the path
    match = this.regexp.exec(path)
  }

  if (!match) {
    this.params = undefined;
    this.path = undefined;
    return false;
  }

  // store values
  this.params = {};
  this.path = match[0]

  var keys = this.keys;
  var params = this.params;

  for (var i = 1; i < match.length; i++) {
    var key = keys[i - 1];
    var prop = key.name;
    var val = decode_param(match[i])

    if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
      params[prop] = val;
    }
  }

  return true;
};

/**
 * Decode param value.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function decode_param(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = err.statusCode = 400;
    }

    throw err;
  }
}

```

从 2 和 3 中可以看到, route 和 router 实例都有 stack 属性，都用于保存 Layer 实例，它们之间有什么区别呢？主要 handle function 的差异。

### route layer 和 route layer
前面我们已经讲过，router layer 是在调用 router.route 方法时创建的：
```js
router.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};
```
注意 router layer 的 handle 实际上是  route.dispatch，而 route layer 是在调用 route[method]() 创建的:
```js
methods.forEach(function(method){
  Route.prototype[method] = function(){
    var handles = flatten(slice.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== 'function') {
        var type = toString.call(handle);
        var msg = 'Route.' + method + '() requires a callback function but got a ' + type
        throw new Error(msg);
      }

      debug('%s %o', method, this.path)

      var layer = Layer('/', {}, handle);
      layer.method = method;
      // route layer 必须绑定 method, 因为一个 route 既可以绑定 post 也可以绑定 get...
      // post 对应 post layer, get 对应 get layer

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});
```
对比差异：
```js
// router layer
new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));
layer.route = route;

// route layer
var layer = Layer('/', {}, handle);
layer.method = method;
```

### user handle 和 dispatch handle
概念区分，体现差异

### layer 测试
```js
const express = require('express')
const app = express()
const port = 3000

// 注册中间件
// 功能包含：响应请求，打印1，并且调用 next() 进入下一个中间件
app.get('/', (req, res, next) => {
  console.log(1)
  res.send('Hello World!')
  next()
})

// 注册中间件
// 功能包含：打印2，并且调用 next() 进入下一个中间件
app.get('/', (req, res, next) => {
  console.log(2)
  next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
debugger
```
针对上面代码，当执行到 debugger 时, app._router.stack 长度为 4:

![20230228234147](http://s3.airtlab.com/blog/20230228234147.png)

前两个是内置中间件，后面2个是自定义注册的。我们看看第三个 layer:

![20230228234130](http://s3.airtlab.com/blog/20230228234130.png)

该 layer 的 handle 是 route.dispatch 方法，而且该 layer 有一个 route 属性。route 也有 一个 layer, 其 handle 就是我们注册的 callback function。route.stack 是一个数组，这表示一个route可以拥有多layer，比如：
```js
// route.all 或者 route.get 支持链式写法
// 给一个 route 注册了两个layer
router.route('/users/:user_id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
```

### layer 模型图
到此为止我们画出 Layer 的模型图:

![20230228234105](http://s3.airtlab.com/blog/20230228234105.png)

### route 多 layer
```js
app.route('/user') 
.get((req, res, next) => { 
    res.send('GET request called'); 
}) 
.post((req, res, next) => { 
	res.send('POST request called'); 
}) 
.all((req, res, next) => { 
	res.send('Other requests called'); 
}) 
  
```