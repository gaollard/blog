假如代码为：

```js
const m1 = (ctx, next) => {
  console.log(1)
  next()
  console.log(2)
}
app.use(m1);

const m2 = (ctx, next) => {
  console.log(3)
  next()
  console.log(4)
  ctx.body = 'Hello Koa';
}
app.use(m2);
```

// 1
// 3
// 4
// 2

```js
const middleware = [
  m1,
  m2
]

const fn = compose(middleware);

fn = () => {
  return () => {
    return  Promise.resolve(m1(context, () => {
      return Promise.resolve(m2(context, () => {
        return respond(ctx);
      }))
    }));
  }
}
```