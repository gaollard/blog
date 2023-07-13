---
title: 011 stream 的使用
toc: true
tags: NodeJS
categories: 前端开发
---

## 1、stream 介绍

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对 http 服务器发起请求的 request 对象就是一个 Stream，还有 stdout（标准输出）。

**Node.js Stream 有四种流类型**:
- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。

**常用的事件有**：
- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。

## 2、stream 优势

相对于使用其他的数据处理方法，流基本上提供了两个主要优点：
- 内存效率: 无需加载大量的数据到内存中即可进行处理。
- 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始

## 3、内存占用测试

```js
const fs = require("fs");
const v8 = require("v8");

const getData = (start) => {
  const list = [];
  return new Promise((resolve) => {
    setTimeout(() => {
      const a = {};
      a;
      for (let i = 0; i < 50; i++) {
        const index = start + i;
        list.push({
          name: "姓名" + index,
          age: `${index}`,
          content: `这是一个掩演示，哈哈哈 ${index}`,
          name2: "姓名" + index,
          age2: `${index}`,
          content2: `这是一个掩演示，哈哈哈 ${index}`,
          id: `大冰哥 ${index}`,
          address: `深圳市 ${index}`,
        });
      }
      resolve(list);
    });
  });
};

async function testNormal() {
  const list = [];
  let i = 0;

  // setInterval(() => {
  //   console.log(v8.getHeapStatistics().used_heap_size);
  // }, 2000);

  while (i < 100 * 10000) {
    const data = await getData(i);
    list.push(...data);
    i += 50;
  }

  console.log("case normal", v8.getHeapStatistics().used_heap_size);

  setTimeout(() => {
    fs.writeFileSync("out.json", JSON.stringify(list));
  });
}

function write(stream, chunk) {
  return new Promise((resolve) => {
    stream.write(chunk, (err) => {
      if (!err) {
        resolve();
      }
    });
  });
}

async function testStream() {
  const stream = fs.createWriteStream("stream.json");

  stream.on('drain', () => {
    console.log(`drain`)
  })

  let i = 0;

  setInterval(() => {
    console.log(v8.getHeapStatistics().used_heap_size);
  }, 2000);

  while (i < 100 * 10000) {
    const data = await getData(i);
    await write(stream, JSON.stringify(data));
    i += 50;
  }

  console.log(`case stream`);
  console.log(v8.getHeapStatistics().used_heap_size);

  setTimeout(() => {
    stream.close();
  });
}

async function start() {
  console.log(process.pid);
  await testStream()
  // setTimeout(() => {
  //   testNormal();
  // }, 1000)
}

start()
```

通过对比发现，使用 stream 方式进行写文件时，内存占用比较稳定，而令另一种方式，内存会持续上升，直到文件写入完成。

## 5、常见问题

### 5.1 什么是 stream

stream 是基于事件EventEmitter的数据管理模式．由各种不同的抽象接口组成，主要包括可写，可读，可读写，可转换等几种类型．

### 5.2 stream 好处

非阻塞式数据处理提升效率，片断处理节省内存，管道处理方便可扩展等.

### 5.3 stream 典型应用

文件，网络，数据转换，音频视频等.

### 5.4 怎么捕获 stream 错误

监听 error 事件，方法同 EventEmitter.

### 5.5 有哪些常用 stream
- Readable 为可被读流，在作为输入数据源时使用；
- Writable 为可被写流,在作为输出源时使用；
- Duplex 为可读写流,它作为输出源接受被写入，同时又作为输入源被后面的流读出．
- Transform 机制和 Duplex 一样，都是双向流，区别是 Transform 只需要实现一个函数 `_transfrom(chunk, encoding, callback)` 而 Duplex 需要分别实现`_read(size)` 函数和 `_write(chunk, encoding, callback)` 函数。

### 5.6 实现一个 writable stream

三步走:
- 1) 构造函数 call Writable 
- 2) 继承 Writable
- 3) 实现 `_write(chunk, encoding, callback)` 函数

```js
var Writable = require('stream').Writable;
var util = require('util');

function MyWritable(options) {
	Writable.call(this, options);
}

util.inherits(MyWritable, Writable); // 继承自Writable

MyWritable.prototype._write = function(chunk, encoding, callback) {
	console.log("被写入的数据是:", chunk.toString()); // 此处可对写入的数据进行处理
	callback();
};

process.stdin.pipe(new MyWritable()); // stdin作为输入源，MyWritable作为输出源   
```

## 6、参考文档

- [深入理解 Node Stream 内部机制](https://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/)
- [想学Node.js，stream先有必要搞清楚](https://juejin.cn/post/6844903891083984910)
- [可写流 - nodejs stream总结](https://www.cnblogs.com/walkermag/p/13579990.html)