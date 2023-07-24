```js
const fn1 = async (req, res, next) => {
  console.log(1)
  await next();
  console.log(2)
};

const fn2 = async (req, res, next) => {
  console.log(1)
  await next();
  console.log(2)
};

app.use(fn1);
app.use(fn2);
```

在 koa 的执行流程为

```js
fn1().then(() => {
  f2().then(() => {
    console.log(2)
  })
})
```

在 express 的执行流程为

```js
fn1()
fn2()
```