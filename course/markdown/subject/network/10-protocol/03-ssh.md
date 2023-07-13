---
tags: network
---

SSH 为 [Secure Shell](https://baike.baidu.com/item/Secure%20Shell) 的缩写，安全外壳协议，专为 [远程登录](https://baike.baidu.com/item/%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95/1071998) 会话和其他网络服务提供安全性的协议。
### 1. SSH 存在的意义

- 数据压缩
- 数据加密

传统的网络服务程序，如：[ftp](https://baike.baidu.com/item/ftp)、pop 和 [telnet](https://baike.baidu.com/item/telnet) 在本质上都是不安全的，因为它们在网络上用[明文](https://baike.baidu.com/item/%E6%98%8E%E6%96%87)传送口令和数据，别有用心的人非常容易就可以截获这些口令和数据。容易受到中间人攻击，所谓“中间人”的攻击方式， 就是“中间人”冒充真正的[服务器](https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8)接收你传给服务器的数据，然后再冒充你把数据传给真正的服务器。

通过使用SSH，你可以把所有传输的数据进行加密，这样"中间人"这种攻击方式就不可能实现了，而且也能够防止DNS欺骗和IP欺骗。使用SSH，还有一个额外的好处就是传输的数据是经过压缩的，所以可以加快传输的[速度](https://baike.baidu.com/item/%E9%80%9F%E5%BA%A6/5456)。SSH有很多功能，它既可以代替 [Telnet](https://baike.baidu.com/item/Telnet)，又可以为[FTP](https://baike.baidu.com/item/FTP)、[PoP](https://baike.baidu.com/item/PoP)、甚至为[PPP](https://baike.baidu.com/item/PPP)提供一个安全的"通道" [1]  。

### 2. SSH 组成结构

- 传输层协议 [SSH-TRANS]：通常运行在[TCP/IP](https://baike.baidu.com/item/TCP%2FIP)连接上
- 用户认证协议 [SSH-USERAUTH]：用于向服务器提供客户端用户鉴别功能。
- 连接协议 [SSH-CONNECT]：将多个加密隧道分成逻辑通道。它运行在用户认证协议上。它提供了交互式登录话路、远程命令执行、转发 TCP/IP 连接和转发 X11 连接。

### 3. 用户认证方式

- 第一种级别（基于口令的安全验证）
- 第二种级别（基于密匙的安全验证）