---
title: 018 如何重启服务
toc: true
tags: NodeJS
categories: 前端开发
---

当 node 进程挂了，如何自动重启？supervisor nodemon 等重启原理。。

在 Node.js 应用运行时，可以通过一些第三方的 Node.js 模块或者工具来实现应用挂了之后自动重。

## 1. PM2
PM2（process manager 2）是一个开源的 Node.js 进程管理器，它可以启动、停止、重启和监视 Node.js 应用。PM2 可以自动监控应用程序的运行状态，并且在应用程序退出或奔溃时自动重启。使用 PM2 启动应用程序后，可以使用一些基本的命令来管理应用程序，例如：

```
pm2 start /path/to/app.js       // 启动应用程序
pm2 stop app                    // 停止应用程序
pm2 restart app                 // 重启应用程序
pm2 list                        // 列出当前运行的所有应用程序
```

## 2. Forever
Forever 是一个简单的命令行工具，它可以启动和管理 Node.js 应用程序，类似于 PM2。使用 Forever 启动应用程序后，Forever 会监视应用程序的运行状态，当应用程序奔溃时会自动重启应用程序。Forever 的命令行使用方式如下：

```
forever start /path/to/app.js   // 启动应用程序
forever stop app                // 停止应用程序
forever restart app             // 重启应用程序
forever list                    // 列出当前运行的所有应用程序
```

总之，使用这些工具，可以方便地实现应用挂了之后自动重启的功能，减少应用程序奔溃对业务造成的影响。

如果您不想使用第三方库，也可以编写一些代码来实现自动重启的功能。下面介绍两种方法。

## 3. 增加监控程序
1. 使用 child_process 模块启动子进程，并监听其 exit 事件。如果子进程退出，就重新启动新的子进程。示例代码如下：

```
const { spawn } = require('child_process');

function startApp() {
  const app = spawn('node', ['/path/to/app.js']);

  app.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  app.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  app.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
    setTimeout(startApp, 5000); // 重新启动子进程
  });
}

startApp();
```

2. 使用 try-catch 装饰器来捕获应用程序中的异常，并进行重启操作。示例代码如下：

```
function restartOnCrash(target) {
  const originalMethod = target.prototype.run;

  target.prototype.run = function() {
    try {
      originalMethod.apply(this, arguments);
    } catch (err) {
      console.error(`application crashed: ${err}`);
      setTimeout(() => {
        console.log(`restarting application...`);
        this.run();
      }, 5000);
    }
  };
}

class MyApp {
  run() {
    // your application code goes here
  }
}

restartOnCrash(MyApp);
const app = new MyApp();
app.run();
```

这里使用了装饰器 `restartOnCrash` 对 `MyApp` 类中的 `run` 方法进行装饰，当 `run` 方法中抛出异常时，会在 5 秒钟后重新调用 `run` 方法。
