---
title: 003 nodejs 程序调试
---

## nodejs 程序调试
目标：掌握程序的调试技巧

## 1、开启调试模式
在调试之前我们先初始化一个工程：
```shell
$ npm init -y
$ npm install --save koa koa-route
```

```js
// app.js
const Koa = require('koa');
const router = require('koa-route');

const app = new Koa();

const main = ctx => {
  debugger
  ctx.response.body = 'Hello World';
};

const welcome = (ctx, name) => {
  ctx.response.body = 'Hello ' + name;
};

app.use(router.get('/', main));
app.use(router.get('/:name', welcome));

app.listen(3000);
console.log('listening on port 3000');
```

### 1) 9229 端口
端口 9229 是默认的 NodeJS 调试端口。它允许您将诸如Chrome 的 Inspector或 WebStorm 的远程调试之类的调试工具附加到使用特殊标志运行的 Node 进程

### 2) --inspect 选项参数
在运行 nodejs 程序时，可以通过 `--inspect` 开始调试模式：
```
node --inspect app.js
```

然后就可以通过 `浏览器` 和 `vscode` 以及 `webstorm` 等UI界面调试了。 

启动后提示：
```shell
# 这里提示调试通道的地址为 ws://127.0.0.1:9229/91a04b5e-67bd-4b1a-93c5-9260a75403d2
Debugger listening on ws://127.0.0.1:9229/91a04b5e-67bd-4b1a-93c5-9260a75403d2
For help, see: https://nodejs.org/en/docs/inspector
listening on port 3000
```

### 3) inspect-brk 选项参数
`--inspect-brk` 指定在第一行就设置断点。也就是说，一开始运行，就是暂停的状态。这对在 chrome 中调试非服务脚本会非常有用。否则在你设置断点之前程序就结束了。

## 2、使用浏览器调试
一共有两种打开调试工具的方法，第一种是在 Chrome 浏览器的地址栏，键入 `chrome://inspect` 或者 `about:inspect`，回车后就可以看到下面的界面：

![20230225085601](http://s3.airtlab.com/blog/20230225085601.png)

点击 inspect 链接，就能进入调试工具了。

第二种方法，是在 http://127.0.0.1:3000 的窗口打开"开发者工具"，顶部左上角有一个 Node 的绿色标志，点击就可以进入。

![20230225085741](http://s3.airtlab.com/blog/20230225085741.png)

点击后进入：
![20230225085820](http://s3.airtlab.com/blog/20230225085820.png)

当我们访问 `http://localhost:3000`，就会进入暂停在断点处：
![20230225090028](http://s3.airtlab.com/blog/20230225090028.png)

### 1) url 调试地址
假若 ws 地址为：ws://127.0.0.1:9229/8e951b59-b730-41dc-a4c0-15da52b71fd3，有两个很重要的页面地址：

- **js_app.html**: `devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/8e951b59-b730-41dc-a4c0-15da52b71fd3`

- **inspector.html**: `devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/8e951b59-b730-41dc-a4c0-15da52b71fd3` 访问该 url 即可进入调试页面

## 3、使用 vscode 调试
创建 `launch.json ` 文件, 格式如下：

```json
{
  "version": "0.2.0",
  "configurations": [
    // 配置1
    {},
    // 配置2
    {}
  ]
}
```

### 1) 调试 Node.js 程序
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Javascript Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/node_modules/@vue/cli-service/lib/Service.js"
    }
  ]
}
```

- type: 必填项，调试类型，当前为 node，如果是 PHP 调试，则在安装 PHP 调试插件后写 php；
- request: 必填项，有两种类型，分别是 launch 和 attach，前者的意思就是 VSCode 会打开这个程序然后进入调试，后者的意思是你已经打开了程序，然后接通 Node.js 的内部调试协议进行调试，如果你看过“Node.js 的调试原理”一文，应该可以大致理解；
- program: 程序的启动入口；

还可以使用另外的配置方式，打开 launch.json 找到 name 为 调试 Node.js 程序 - args 的文件：
```json
{
  "name": "调试 Node.js 程序 - args",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "node",
  "args": [
    "${workspaceFolder}/src/index.js"
  ]
}
```

这里并没有采用 program 来描述程序入口，而是通过 runtimeExecutable 和 args 组合的方式来启动程序:

- runtimeExecutable: 使用什么命令启动
- args: 启动时的参数

相当于：
```shell
node ${workspaceFolder}/src/index.js
```

### 2) 通过npm脚本启动
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "Npm Command",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "build"]
    }
  ]
}
```

runtimeArgs 是为 runtimeExecutable 环境提供的配置，而 args 是为程序提供的配置。这个 JSON 的意思是：
```shell
npm run build
```

### 3) 调试一个 TS Node 程序
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Typescript Program",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/main.ts"]
    }
  ]
}
```

等同于:
```shell
node --inspect-brk=DEBUG_PORT -r ts-node/register $workspaceFolder/main.ts
```

### 4) 调试已启动的程序

```json
{
  "type": "pwa-node",
  "request": "attach",
  "name": "Attach",
  "port": 9229
}
```
上面写死了 9229，你可以换种写法：

```json
{
  "type": "pwa-node",
  "request": "attach",
  "name": "Attach",
  "processId": "${command:PickProcess}"
}
```

`${command:PickProcess}` 作为 processId 的值，VSCode 会遍历所有的 Node PID 列出来让你选择，如下图所示：
![20230225094847](http://s3.airtlab.com/blog/20230225094847.png)


### 5) 调试网页的 JS 代码
大家应该十分熟悉在 Chrome 中调试 JS 代码，不过 VSCode 允许你在安装了 Debugger for Chrome 插件后，直接在 VSCode 调试 JS 代码，让你的代码和调试融为一体，提升开发体验：

![20230225095030](http://s3.airtlab.com/blog/20230225095030.png)

可以通过如下简单的配置进行调试：
```json
{
  "name": "调试网页的 JS 文件",
  "request": "launch",
  "type": "chrome",
  "file": "${workspaceFolder}/index.html"
}
```

注意，这里的 type 是 chrome，默认会启动一个 Chrome 浏览器（新用户）加载 file 字段对应的文件地址（通过 file:// 协议加载），文件中用到的 JS 都可以断点调试。当然你也可以起一个 Web Server 来调试 http:// 协议的文件，这里就需要设置 webRoot 和 url 参数了，可自行 Google。


## 3、参考文档
- [nodejs debugger](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
- [VSCode 调试中 launch.json 配置不完全指南](https://www.barretlee.com/blog/2019/03/18/debugging-in-vscode-tutorial/)
- [Node 调试工具入门教程](https://www.ruanyifeng.com/blog/2018/03/node-debugger.html)
- [让你 nodejs 水平暴增的 debugger 技巧](https://zhuanlan.zhihu.com/p/387270007?utm_source=wechat_session&utm_medium=social&utm_oi=635912988696121344)
- [如何在vscode里面调试js和node.js](https://www.cnblogs.com/both-eyes/p/10152142.html)
