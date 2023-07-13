---
tags: network
---

> [关于TCP粘包问题的终结] https://zhuanlan.zhihu.com/p/157887818

## 1、TCP packet fragmentation

TCP packet fragmentation 是指在TCP/IP 协议中，由于网络传输的延迟，导致多个数据包粘在一起，被一次性接收。 这就会导致应用层程序无法正确解析数据包，从而出现问题。这被国人发明为 “TCP 粘包问题”，实际上这压根就不是问题，只是有些人不清楚本质罢了。

TCP粘包指的是在TCP协议通信过程中，发送端连续发送的多个数据包，在接收端接收时会粘合在一起形成一个大数据包的现象。

TCP协议是面向流的传输协议，发送端把待发送的数据划分为多个数据段来发送，每个数据段有自己的TCP头部信息。当发送端在短时间内向接收端连续发送多个小数据包时，由于TCP协议是IP层面上的数据报文服务，它只负责数据的分包和组包，不做处理。这会导致在接收端，多个小数据包在接收缓冲区中紧密的排列在一起，由于没有明确的边界标志表示哪些数据属于一个消息，所以在应用层对数据进行解析时，可能将多个小数据包误解为一个大的数据包，此现象就是TCP粘包。

TCP粘包会导致传输的数据包出现混淆，特别是在数据包中包含了命令信息时，可能会影响系统的正常运行。解决TCP粘包问题的方式，一般都是在应用层进行拆包和封包处理，以便应用程序能正确处理多个小数据包。

## 2、特性演示

**client.js**
```js
const net = require('net');

const client = net.createConnection({ port: 8080 }, () => {
  console.log('connected to server!');
});

let data = '';
client.on('data', (chunk) => {
  // 这里只触发了一次 hello_world
  console.log('data', chunk.toString());
});

client.on('end', () => {
  console.log('disconnected from server');
});
```

**server.js**
```javascript
const net = require('net');

const server = net.createServer((socket) => {
  console.log('client connected');
  socket.write('hello_');
  socket.write('world');
});

server.listen(8080, () => {
  console.log('server started');
});
```

## 3、解决方案

解决这个问题的方法有很多, 包括：
- 使用消息头来指示数据包的长度
- 在服务端写入分隔符来表示数据包的边界

### 1. 使用消息头来指示数据包的长度

### 2. 写入分隔符来表示数据包的边界