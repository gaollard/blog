---
title: 02 创建 application
toc: true
tags: ExpressJS
categories: 前端开发
---

express.js 第一步是创建 application 实例

```js
const express = require('express')

// 创建 application 实例
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

我们来看看 调用 express 函数后，背后的逻辑是什么。

## 1. createApplication()

源码：lib/express.js<br />express 函数就是 createApplication:

```js
/**
* Create an express application.
*
* @return {Function}
* @api public
*/

function createApplication() {
  // app 仅仅是一个函数
  // app 为什么这么定义，后续会讲到
  var app = function (req, res, next) {
    app.handle(req, res, next);
  };

  // 给 app 扩展 发布订阅
  mixin(app, EventEmitter.prototype, false);

  // 给 app 扩展 application 里面所定义对象
  // 比如 app.init 就在 proto 中定义的
  mixin(app, proto, false);

  // 将 request 挂载到 app.request
  // 并且 app 挂载到   request.app
  // expose the prototype that will get set on requests
  app.request = Object.create(req, {
    app: { configurable: true, enumerable: true, writable: true, value: app },
	});

  // 将 response 挂载到  app.response
  // 并且 app 挂载到 response.app
  // expose the prototype that will get set on responses
  app.response = Object.create(res, {
    app: { configurable: true, enumerable: true, writable: true, value: app },
  });

  // 初始化
  app.init();

  return app;
}
```

## 2. app.init()

源码：lib/application.js

```js
/**
* Initialize the server.
*
*   - setup default configuration
*   - setup default middleware
*   - setup route reflection methods
*
* @private
*/

app.init = function init() {
  this.cache = {};
  this.engines = {};
  this.settings = {};

  // 初始化 setting
  // setting 用于存储一些配置项
  this.defaultConfiguration();
};
```

## 3. app.defaultConfiguration()

源码：lib/application.js

```js
/**
* Initialize application configuration.
* @private
*/

app.defaultConfiguration = function defaultConfiguration() {
  var env = process.env.NODE_ENV || 'development';

  // default settings
  // this.set(key, value) 设置 settings
  this.enable('x-powered-by');
  this.set('etag', 'weak');
  this.set('env', env);
  this.set('query parser', 'extended');
  this.set('subdomain offset', 2);
  this.set('trust proxy', false);

  // trust proxy inherit back-compat
  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
    configurable: true,
    value: true
    });

  debug('booting in %s mode', env);

  // MARK TODO mount 事件什么时候 emit
  this.on('mount', function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
    && typeof parent.settings['trust proxy fn'] === 'function') {
    delete this.settings['trust proxy'];
    delete this.settings['trust proxy fn'];
  }

  // inherit protos
  setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  });

  // setup locals
  this.locals = Object.create(null);

  // top-most app is mounted at /
  this.mountpath = '/';

  // default locals
  this.locals.settings = this.settings;

  // default configuration
  this.set('view', View);
  this.set('views', resolve('views'));
  this.set('jsonp callback name', 'callback');

  if (env === 'production') {
    this.enable('view cache');
  }

  Object.defineProperty(this, 'router', {
    get: function() {
      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
    }
  });
};
```

## 4. 监听 mount 事件

当 express 实例是一个子应用时，该子应用注册成功后，就会收到 mount 事件

```js
  app.on('mount', function onmount(parent) {
    // inherit trust proxy
    if (this.settings[trustProxyDefaultSymbol] === true
      && typeof parent.settings['trust proxy fn'] === 'function') {
      delete this.settings['trust proxy'];
      delete this.settings['trust proxy fn'];
    }

    // inherit protos
    setPrototypeOf(this.request, parent.request)
    setPrototypeOf(this.response, parent.response)
    setPrototypeOf(this.engines, parent.engines)
    setPrototypeOf(this.settings, parent.settings)
  });
```

```js
// An Express app is valid middleware.
var subApp = express()
subApp.get('/', function (req, res, next) {
  next()
})
app.use(subApp)
```

app.use 源码

```js
app.use = function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate app.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var fns = flatten(slice.call(arguments, offset));

  if (fns.length === 0) {
    throw new TypeError('app.use() requires a middleware function')
  }

  // setup router
  this.lazyrouter();
  var router = this._router;

  fns.forEach(function (fn) {
    // non-express app
    if (!fn || !fn.handle || !fn.set) {
      return router.use(path, fn);
    }

    debug('.use app under %s', path);
    fn.mountpath = path;
    fn.parent = this;

    // restore .app property on req and res
    router.use(path, function mounted_app(req, res, next) {
      var orig = req.app;
      fn.handle(req, res, function (err) {
        setPrototypeOf(req, orig.request)
        setPrototypeOf(res, orig.response)
        next(err);
      });
    });

    // mounted an app
    fn.emit('mount', this);
  }, this);

  return this;
};
```
