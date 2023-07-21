```js
const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());
```

## 1. Router constructor

```js
function Router(opts = {}) {
  if (!(this instanceof Router)) return new Router(opts);

  this.opts = opts;
  this.methods = this.opts.methods || [
    'HEAD',
    'OPTIONS',
    'GET',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
  ];
  this.exclusive = Boolean(this.opts.exclusive);

  this.params = {};
  this.stack = [];
  this.host = this.opts.host;
}
```

## 2. register handler

和 express 差不多

## 3. dispatch handler
依赖 koa compose，将 handler 串联起来，其他和 express 也差不多