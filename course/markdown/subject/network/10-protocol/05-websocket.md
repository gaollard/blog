---
tags: network
---

通过 HTTP 协议来建立连接

### 1. WebSocket 通过HTTP协议连接
WebSocket协议在建立连接时会使用HTTP协议，意味着 WebSocket 协议是基于HTTP协议实现的

### 2. WebSocket是应用层协议
WebSocket是基于TCP的应用层协议，用于在C/S架构的应用中实现双向通信，关于WebSocket协议的详细规范和定义参见 [rfc6455](https://tools.ietf.org/html/rfc6455)。

![20230619112051](http://s3.airtlab.com/blog/20230619112051.png)


### 3. 连接过程

![20230619112102](http://s3.airtlab.com/blog/20230619112102.png)

- Connection: Connection 必须设置为Upgrade，表示客户端希望连接升级
- Upgrade: Upgrade 必须设置为 WebSocket，表示在取得服务器响应之后，使用HTTP升级将HTTP协议转换(升级)为WebSocket协议。
- Sec-WebSocket-key: 随机字符串，用于验证协议是否为WebSocket协议而非HTTP协议
- Sec-WebSocket-Version: 表示使用WebSocket的哪一个版本。
- Sec-WebSocket-Accept: 根据Sec-WebSocket-Accept和特殊字符串计算。验证协议是否为WebSocket协议。
- Sec-WebSocket-Location: 与Host字段对应，表示请求WebSocket协议的地址。
- HTTP/1.1 101 Switching Protocols:101 状态码表示升级协议，在返回101状态码后，HTTP协议完成工作，转换为WebSocket协议。此时就可以进行全双工双向通信了。