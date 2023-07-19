---
title: 04-canal 订阅 binlog
url: https://www.yuque.com/gaollard/utbbp1/aohf9s
---

- <https://zhuanlan.zhihu.com/p/424550462>
- <https://github.com/alibaba/canal/wiki>

![image.png](https://s3.airtlab.com/mysql/1663925660698-e1fb4e47-c8d1-44f4-9c16-15e3bb8ade0e.png)

### 工作原理

- canal 模拟 MySQL slave 的交互协议，伪装自己为 MySQL slave ，向 MySQL master 发送 dump 协议
- MySQL master 收到 dump 请求，开始推送 binary log 给 slave (即 canal )
- canal 解析 binary log 对象 (原始为 byte 流) 

### 客户端

canal 特别设计了 client-server 模式，交互协议使用 protobuf 3.0 , client 端可采用不同语言实现不同的消费逻辑，欢迎大家提交 pull request

- canal java 客户端: <https://github.com/alibaba/canal/wiki/ClientExample>
- canal c# 客户端: <https://github.com/dotnetcore/CanalSharp>
- canal go客户端: <https://github.com/CanalClient/canal-go>
- canal php客户端: <https://github.com/xingwenge/canal-php>
- canal Python客户端：<https://github.com/haozi3156666/canal-python>
- canal Rust客户端：<https://github.com/laohanlinux/canal-rs>
- canal Nodejs客户端：<https://github.com/marmot-z/canal-nodejs>
