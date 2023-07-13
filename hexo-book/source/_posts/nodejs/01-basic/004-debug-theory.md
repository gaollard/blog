---
title: 004 nodejs 调试原理
---

> 原文 神光《JavaScript Debugger 原理揭秘》 https://zhuanlan.zhihu.com/p/372135871

> 这篇文章首先对我是有帮助的，了解一些概念，但是作者在介绍 “解释型语言的 debugger” 原理时明显是有纰漏的，没有讲到解释器是如何支持中断的。比如我可以简单理解为死循环？这明显是错误的。其中可以参考雪碧大佬的回答：

> doodlewind: 这个有点跑偏了吧……感觉这方面内容主要应该涉及 step over、step in 的时候会发生的事？（或者说引擎是如何支持调试协议的。）至于类似 INT3 中断的机制，这对解释器来说确实是必要的（比如引擎跑进死循环 JS 代码的时候，也可以响应 ctrl-c 的信号跳出 main loop），但我不太觉得这个概念就是调试器的「底层原理」……[捂脸]

### 1、CPU 中断

cpu 只会不断地执行下一条指令，但程序运行过程中难免要处理一些外部的消息，比如 io、网络、异常等等，所以设计了中断的机制，cpu 每执行完一条指令，就会去看下中断标记，是否需要中断了。就像 event loop 每次 loop 完都要检查下是否需要渲染一样。

### 2、INT 指令

cpu 支持 INT 指令来触发中断，中断有编号，不同的编号有不同的处理程序，记录编号和中断处理程序的表叫做中断向量表。其中 INT 3 (3 号中断)可以触发 debugger，这是一种约定。

那么可执行文件是怎么利用这个 3 号中断来 debugger 的呢?其实就是运行时替换执行的内容，debugger 程序会在需要设置断点的位置把指令内容换成 INT 3，也就是 0xCC，这就断住了。就可以获取这时候的环境数据来做调试。

![20230226204200](http://s3.airtlab.com/blog/20230226204200.png)

通过机器码替换成 0xcc (INT 3)是把程序断住了，可是怎么恢复执行呢?其实也比较简单，把当时替换的机器码记录下来，需要释放断点的时候再换回去就行了。

这就是可执行文件的 debugger 的原理了，最终还是靠 cpu 支持的中断机制来实现的。

### 3、中断寄存器

上面说的 debugger 实现方式是修改内存中的机器码的方式，但有的时候修改不了代码，比如 ROM，这种情况就要通过 cpu 提供的 4 个中断寄存器(DR0 - DR3)来做了。这种叫做硬中断。

总之，INT 3 的软中断，还有中断寄存器的硬中断，是可执行文件实现 debugger 的两种方式。

### 4、解释型语言的 debugger

编译型语言因为直接在操作系统之上执行，所以要利用 cpu 和操作系统的中断机制和系统调用来实现 debugger。但是解释型语言是自己实现代码的解释执行的，所以不需要那一套，但是实现思路还是一样的，就是插入一段代码来断住，支持环境数据的查看和代码的执行，当释放断点的时候就继续往下执行。

比如 javascript 中支持 debugger 语句，当解释器执行到这一条语句的时候就会断住。

解释型语言的 debugger 相对简单一些，不需要了解 cpu 的 INT 3 中断。

> 这个有点跑偏了吧……感觉这方面内容主要应该涉及 step over、step in 的时候会发生的事？（或者说引擎是如何支持调试协议的。）至于类似 INT3 中断的机制，这对解释器来说确实是必要的（比如引擎跑进死循环 JS 代码的时候，也可以响应 ctrl-c 的信号跳出 main loop），但我不太觉得这个概念就是调试器的「底层原理」……[捂脸]

### 5、debugger 客户端

上面我们了解了直接执行和解释执行的代码的 debugger 分别是怎么实现的。我们知道了代码是怎么断住的，那么断住之后呢?怎么把环境数据暴露出去，怎么执行外部代码?

这就需要 debugger 客户端了。比如 v8 引擎会把设置断点、获取环境信息、执行脚本的能力通过 socket 暴露出去，socket 传递的信息格式就是 v8 debug protocol 。

设置断点：

```json
{
  "seq": 117,
  "type": "request",
  "command": "setbreakpoint",
  "arguments": {
    "type": "function",
    "target": "f"
  }
}
```

去掉断点：

```json
{
  "seq": 117,
  "type": "request",
  "command": "clearbreakpoint",
  "arguments": {
    "type": "function",
    "breakpoint": 1
  }
}
```

继续：

```json
{
  "seq": 117,
  "type": "request",
  "command": "continue"
}
```

执行代码：

```json
{
  "seq": 117,
  "type": "request",
  "command": "evaluate",
  "arguments": { "expression": "1+2" }
}
```
感兴趣的同学可以去 v8 debug protocol 的文档中去查看全部的协议。

基于这些协议就可以控制 v8 的 debugger 了，所有的能够实现 debugger 的都是对接了这个协议，比如 chrome devtools、vscode debugger 还有其他各种 ide 的 debugger。

### 6、nodejs 代码的调试

nodejs 可以通过添加 --inspect 的 option 来做调试(也可以是 --inspect-brk，这个会在首行就断住)。

它会起一个 debugger 的 websocket 服务端，我们可以用 vscode 来调试 nodejs 代码，也可以用 chrome devtools 来调试(见 nodejs debugger 文档)。

```bash
node --inspect test.js
Debugger listening on ws://127.0.0.1:9229/db309268-623a-4abe-b19a-c4407ed8998d
For help see https://nodejs.org/en/docs/inspector
```

原理就是实现了 v8 debug protocol。
我们如果自己做调试工具、做 ide，那就要对接这个协议。

### 7、debugger adaptor protocol
上面介绍的 v8 debug protocol 可以实现 js 代码的调试，那么 python、c# 等肯定也有自己的调试协议，如果要实现 ide，都要对接一遍太过麻烦。所以后来出现了一个中间层协议，DAP(debugger adaptor protocol)。

debugger adaptor protocol， 顾名思义，就是适配的，一端适配各种 debugger 协议，一端提供给客户端统一的协议。这是适配器模式的一个很好的应用。

![20230226205040](http://s3.airtlab.com/blog/20230226205040.png)

### 8、总结

本文我们学习了 debugger 的实现原理和暴露出的调试协议。

首先我们了解了代码两种运行方式：直接执行和解释执行，然后分析了下为什么需要 debugger。

之后探索了直接执行的代码通过 INT 3 的中断的方式来实现 debugger 和解释型语言自己实现的 debugger。

然后 debugger 的能力会通过 socket 暴露给客户端，提供调试协议，比如 v8 debug protocol，各种客户端包括 chrome devtools、ide 等都实现了这个协议。

但是每种语言都要实现一次的话太过麻烦，所以后来出现了一个适配层协议，屏蔽了不同协议的区别，提供统一的协议接口给客户端用。

希望这篇文章能够让你理解 debugger 的原理，如果要实现调试工具也知道怎么该怎么去对接协议。能够知道 chrome devtools、vscode 为啥都可以调试 nodejs 代码。

### 9、文章纠错
其中涉及一些错误参考原文评论 -> https://zhuanlan.zhihu.com/p/372135871·