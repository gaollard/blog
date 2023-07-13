---
title: 020 linux 进程信号
toc: true
tags: NodeJS
categories: 前端开发
---

- 参考 http://gityuan.com/2015/12/20/signal/
- https://blog.csdn.net/xiaobai_hellow/article/details/124673131


## 1、linux 信号
```bash
[root@localhost test6]# kill -l
```

```text

 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL

 5) SIGTRAP      6) SIGABRT      7) SIGBUS       8) SIGFPE

 9) SIGKILL     10) SIGUSR1     11) SIGSEGV     12) SIGUSR2

13) SIGPIPE     14) SIGALRM     15) SIGTERM     16) SIGSTKFLT

17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP

21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU

25) SIGXFSZ     26) SIGVTALRM   27) SIGPROF     28) SIGWINCH

29) SIGIO       30) SIGPWR      31) SIGSYS      34) SIGRTMIN

35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3  38) SIGRTMIN+4

39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8

43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12

47) SIGRTMIN+13 48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14

51) SIGRTMAX-13 52) SIGRTMAX-12 53) SIGRTMAX-11 54) SIGRTMAX-10

55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7  58) SIGRTMAX-6

59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2

63) SIGRTMAX-1  64) SIGRTMAX
```

只有第9种信号 (SIGKILL) 才可以无条件终止进程，其他信号进程都有权利忽略。下面是常用的信号：

```text
HUP　　1    终端断线

INT　　2    中断（同 Ctrl+C）

QUIT　 3    退出（同 Ctrl+\）

TERM   15   终止

KILL   9    强制终止

CONT   18   继续（与STOP相反， fg/bg命令）

STOP   19   暂停（同 Ctrl+Z）
```

## 2、演示给 node 进程发送信号

```js
const http = require("http");
console.log(process.pid)

const server = http.createServer((req, res) => {
  res.end('hello')
});

server.listen(3002, () => {
  console.log("服务启动成功");
});

process.on('exit', function (code) {
  // TODO 这里可以主动释放其他资源 如zookeeper连接等
  console.log(`exit-------------------------`);

  if (code === 1000) {
    console.error('process:uncaughtException');
  } else if (code === 1001) {
    console.error('process:SIGINT');
  } else if (code === 1002) {
    console.error('process:SIGTERM');
  } else {
    console.error('process:unknown');
  }
});

process.on('uncaughtException', function (e) {
  console.log(`uncaughtException`, e);
  // 异常可以选择不退出
  process.exit(1000);
});

process.on('SIGINT', function () {
  console.log(`SIGINT`);
  process.exit(1001);
});

process.on('SIGTERM', function () {
  console.log(`SIGTERM`);
  process.exit(1002);
});

process.on('SIGHUP', () => {
  console.log(`SIGHUP`);
  console.log('接收到退出指令');
});
```

假设进程 id 为 44525，执行：

```shell
kill -s SIGINTS 44525
```

会打印

```text
SIGINT
exit-------------------------
process:SIGINT
```

## 3、Node.js 捕获 Ctrl+C
Node 支持信号事件，要捕获 Ctrl+C ，只要注册SIGINT信号事件就可以捕获 Ctrl+C。需要注意的是SIGINT信号事件被注册后，在终端按下 Ctrl+C 就没法终止程序了，所以在事件回调函数内必须调用process.exit() 函数终止程序。

```js
process.on('SIGINT', function () {
    console.log('Exit now!');
    process.exit();
});
```

如果在退出之前需要做一些后续的处理，那么可以将 process.exit() 放在其它回调函数内调用。

```js
process.on('SIGINT', function () {
    console.log('Exit now!');
    port.write('ddd', function (){
        process.exit();
    });
});
```

## 4、关于 kill 命令
https://www.cnblogs.com/heracles-lau/articles/3392029.html
