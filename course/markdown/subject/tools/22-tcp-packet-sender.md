---
tags: tools
---

有时候我们要测试TCP服务器， 写个客户端当然可以， 不过如果你不能改客户端又想改发送的内容， 用 Packet sender 就很方便。
首先用客户端发送TCP包到 Packet Sender, 然后用 Packet Sender 保存一下， 就可以在Packet Sender 中发送这个包到别的地方了， 还可以改包值。

![20230612140520](http://s3.airtlab.com/blog/20230612140520.png)