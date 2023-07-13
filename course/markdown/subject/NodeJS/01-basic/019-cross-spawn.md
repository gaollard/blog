---
title: 019 cross-spawn 跨平台进程
toc: true
tags: NodeJS
categories: 前端开发
---

npm cross-spawn 是一个 Node.js 模块，主要用于在跨平台环境中，安全地运行 shell 命令和子进程。
在 Windows 和 Linux 等操作系统上，shell 命令和子进程的实现方式可能存在差异，例如 Windows 下的子进程可能需要使用 cmd.exe 来执行，而 Linux 下的子进程则需要使用 sh。

这就会导致在跨平台开发中，使用 child_process 模块执行 shell 命令和子进程时，可能会出现一些兼容性问题。

而 npm cross-spawn 利用了 Node.js 的 child_process 模块，提供了一个跨平台的解决方案，可以在不同的平台上安全地执行 shell 命令和子进程，并且能够自动识别当前所处的操作系统环境，从而选择正确的实现方式。这样可以有效避免因不同平台实现方式差异而导致的问题，提高跨平台开发的效率和可靠性。


```js
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  (x) => x === "build" || x === "eject" || x === "start" || x === "test"
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

const result = spawn.sync(
    process.execPath, // node path
    nodeArgs
      .concat(require.resolve("../lib/" + script))
      .concat(args.slice(scriptIndex + 1)),
    { stdio: "inherit" }
  );
console.log(result)
```

```js
// work
process.exit(10)
```


```json
{
  status: 10,
  signal: null,
  output: [ null, null, null ],
  pid: 43229,
  stdout: null,
  stderr: null,
  error: null
}
```
