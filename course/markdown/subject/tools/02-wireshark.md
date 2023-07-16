---
title: 02 wireshark 抓包
tags: tools
date: 2022-06-10 00:00:00
---

**参考资料**

- https://zhuanlan.zhihu.com/p/82498482

## 1、过滤规则
### 1）IP 过滤
- ip.src == 192.168.1.104 显示源地址为192.168.1.104的数据包列表
- ip.dst == 192.168.1.104, 显示目标地址为192.168.1.104的数据包列表
- ip.addr == 192.168.1.104 显示源IP地址或目标IP地址为 192.168.1.104 的数据包列表

### 2）HTTP 模式过滤
http.request.method=="GET", 只显示HTTP GET方法的。

### 3）协议过滤
```
icmp
telnet
tcp
tcp.ack
```

### 4) 逻辑运算符为 and/or/not
过滤多个条件组合时，使用and/or。比如获取IP地址为192.168.1.104的ICMP数据包表达式为ip.addr == 192.168.1.104 and icmp

## 2、TCP 握手过程
### 1）TCP 报文协议
![20230506180734](http://s3.airtlab.com/blog/20230506180734.png)

### 2）TCP 抓包演示
```
curl 'http://blog.airtlab.com/' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Cache-Control: max-age=0' \
  -H 'Connection: keep-alive' \
  -H 'If-Modified-Since: Thu, 15 Apr 2021 02:08:45 GMT' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1' \
  --compressed \
  --insecure
```

![20230506180754](http://s3.airtlab.com/blog/20230506180754.png)

前三次通讯即为握手过程

```js
// 16 进制转换 => 57346
parseInt(0xe002, 10)
```

## 3、标记数据包