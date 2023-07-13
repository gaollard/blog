---
title: 05 中间件执行流程
toc: true
tags: ExpressJS
categories: 前端开发
---

使用以下代码进行调试:
```cpp
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
  debugger
  console.log(`Example app listening on port ${port}`)
})
```

### 1. layer 执行流程
先了解 express.js 中 layer 的执行流程，再看代码会变得非常简单。<br />
![image](http://s3.airtlab.com/blog/image.png)

- 理解 router layer 递归
- 理解 route layer 递归

### 2. router.handle 接管请求
```cpp
/**
 * Dispatch a req, res into the router.
 * @private
 */
router.handle = function handle(req, res, out) {
  var self = this;

  debug('dispatching %s %s', req.method, req.url);

  var idx = 0;
  var protohost = getProtohost(req.url) || ''
  var removed = '';
  var slashAdded = false;
  var sync = 0
  var paramcalled = {};

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // manage inter-router variables
  var parentParams = req.params;
  var parentUrl = req.baseUrl || '';
  var done = restore(out, req, 'baseUrl', 'next', 'params');

  // setup next layer
  req.next = next;

  // for options requests, respond with a default if nothing else responds
  if (req.method === 'OPTIONS') {
    done = wrap(done, function(old, err) {
      if (err || options.length === 0) return old(err);
      sendOptionsResponse(res, options, old);
    });
  }

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {}
}
```
#### next() 递归函数
我们只看 next 的核心逻辑，就是递归的匹配 layer 并执行 handle，其他的可以先忽略。
```cpp
  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;

    // remove added slash
    if (slashAdded) {
      req.url = req.url.slice(1)
      slashAdded = false;
    }

    // restore altered req.url
    if (removed.length !== 0) {
      req.baseUrl = parentUrl;
      req.url = protohost + removed + req.url.slice(protohost.length)
      removed = '';
    }

    // signal to exit router
    if (layerError === 'router') {
      setImmediate(done, null)
      return
    }

    // no more matching layers
    if (idx >= stack.length) {
      setImmediate(done, layerError);
      return;
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    // get pathname of request
    var path = getPathname(req);

    if (path == null) {
      return done(layerError);
    }

    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {
        continue;
      }

      if (!route) {
        // process non-route handlers normally
        continue;
      }

      if (layerError) {
        // routes do not match with a pending error
        match = false;
        continue;
      }

      var method = req.method;
      var has_method = route._handles_method(method);

      // build up automatic options response
      if (!has_method && method === 'OPTIONS') {
        appendMethods(options, route._options());
      }

      // don't even bother matching route
      if (!has_method && method !== 'HEAD') {
        match = false;
      }
    }

    // no match
    if (match !== true) {
      return done(layerError);
    }

    // store route for dispatch on change
    if (route) {
      req.route = route;
    }

    // Capture one-time layer values
    req.params = self.mergeParams
      ? mergeParams(layer.params, parentParams)
      : layer.params;

    // layerPath 和 path 的区别
    var layerPath = layer.path;

    // this should be done for the layer
    self.process_params(layer, paramcalled, req, res, function (err) {
      if (err) {
        next(layerError || err)
      } else if (route) {
          // 如果是一个 route layer, 则执行 layer.handle, 也就是 route.dispatch
        layer.handle_request(req, res, next)
      } else {
          // 如果不是 route layer, 则要 trim_prefix
          // 后续在讲 trim_prefix 是干什么
        trim_prefix(layer, layerError, layerPath, path)
      }

      sync = 0
    });
  }

```
```cpp
Layer.prototype.handle_request = function handle(req, res, next) {
  var fn = this.handle;

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

// app.get('/', (req, res, next) => {
//   console.log(2)
//   next() => router next()
// })
```
#### trim_prefix 函数
```cpp
  function trim_prefix(layer, layerError, layerPath, path) {
    if (layerPath.length !== 0) {
      // Validate path is a prefix match
      if (layerPath !== path.slice(0, layerPath.length)) {
        next(layerError)
        return
      }

      // Validate path breaks on a path separator
      var c = path[layerPath.length]
      if (c && c !== '/' && c !== '.') return next(layerError)

      // Trim off the part of the url that matches the route
      // middleware (.use stuff) needs to have the path stripped
      debug('trim prefix (%s) from url %s', layerPath, req.url);
      removed = layerPath;
      req.url = protohost + req.url.slice(protohost.length + removed.length)

      // Ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }

      // Setup base URL (no trailing slash)
      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
        ? removed.substring(0, removed.length - 1)
        : removed);
    }

    debug('%s %s : %s', layer.name, layerPath, req.originalUrl);

    if (layerError) {
      layer.handle_error(layerError, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
```
#### layerPath 和 path 的区别
#### req.baseUrl & req.url 维护
`req.baseUrl` 表示当前 router instance 所挂载的路径
```cpp
const app = express()
const port = 3000

// 演示1
app.get('/test', function (req, res) {
  console.log(req.baseUrl) // ''
  console.log(req.path) // /test

  res.send('Konichiwa!')
})


// 演示2
var greet = express.Router()

greet.get('/jp', function (req, res) {
  console.log(req.baseUrl) // /greet
  console.log(req.path) // jp
  res.send('Konichiwa!')
})

app.use('/greet', greet) // load the router on '/greet'

// 演示3
greet.get('/:id', function (req, res) {
  console.log(req.baseUrl) // /greet
  console.log(req.path) // 12
  res.send('Konichiwa!')
})

app.use('/greet', greet) // load the router on '/greet'
// visit /greet/12
```
### 3. route.dispatch
```cpp
// 当 route 里面的 layer 执行完成之后，会执行 done
// 这个 done 实际就是 router layer next
Route.prototype.dispatch = function dispatch(req, res, done) {}
```
```cpp
Route.prototype.dispatch = function dispatch(req, res, done) {
  var idx = 0;
  var stack = this.stack;
  var sync = 0

  if (stack.length === 0) {
    return done();
  }

  var method = req.method.toLowerCase();
  if (method === 'head' && !this.methods['head']) {
    method = 'get';
  }

  req.route = this;

  next();

  function next(err) {
    // signal to exit route
    if (err && err === 'route') {
      return done();
    }

    // signal to exit router
    if (err && err === 'router') {
      return done(err)
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    var layer = stack[idx++]

    // end of layers
    if (!layer) {
      return done(err)
    }

    // layer 也绑定了 method  
    if (layer.method && layer.method !== method) {
      next(err)
    } else if (err) {
      layer.handle_error(err, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }

    sync = 0
  }
};
```