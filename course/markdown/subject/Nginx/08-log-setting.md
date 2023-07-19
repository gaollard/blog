---
title: 08 日志配置
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1. nginx 日志功能

在 nginx 中有两种日志：

- access_log：访问日志，通过访问日志可以获取用户的IP、请求处理的时间、浏览器信息等
- error_log：错误日志，记录了访问出错的信息，可以用于定位错误的原因

## 2. 设置 access_log

访问日志主要用于记录客户端的请求。客户端向 nginx 服务器发起的每一次请求都会被记录到 access_log 中。

包含请求 IP、时间、访问 url 等等，当然访问日志中具体记录哪些日志信息我们可以通过 log_format 设置。

### access_log 指令语法

```bash
access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]]; # 设置访问日志
access_log off; # 关闭访问日志

- path 表示指定日志存放位置
- format 表示日志格式即日志中记录的内容
- buffer 用于指定日志写入时的缓存大小，默认 64k
- gzip 日志写入前先压缩。压缩率可以指定，从1到9数值越大压缩比越高，同时压缩的速度也越慢，默认1
- flush 设置缓存的时间，如果超过flush指定的时间，缓存中的内容将被清空
- if 判断条件，如果指定的条件计算为0或空字符串，那么该请求不会被写入日志
```

设置 buffer 的目的，是为了避免高频对磁盘进行读写操作，即暂时先不将日志写入磁盘，而是存入内存中，等达到了设置缓存大小之后再一次性写入。

注意 flush 指令是和 buffer 一起使用的，即指定 buffer=size 之后，如果超过 flush 指令设定的时间仍然未达到缓存区大小，则也会被写入到磁盘，没有 buffer 而只有 flush 则会报错。

### access_log 配置示例

```bash
access_log /var/logs/nginx-access.log
```

上面的例子指定日志的写入路径为 /var/logs/nginx-access.log 日志格式默认使用 combined：

```bash
access_log /var/logs/nginx-access.log buffer=32k gzip flush=1m
```

该例子指定日志写入路径为 `/var/logs/nginx-access.log` 日志格式默认使用 combined ，日志的缓存大小为 32k，日志写入前启用 gzip 压缩，压缩比值 1，缓存数据的有效时间为 1 分钟。

需要注意，在 nginx.conf 文件中 access_log 默认是关闭的：
![20230512205539](http://s3.airtlab.com/blog/20230512205539.png)

去掉注释：
![](http://c1.airtlab.com/15953369053114.jpg#id=yK5bl&originHeight=700&originWidth=2190&originalType=binary&ratio=1&status=done&style=none)

### access_log 日志查看

通过 cat 命令查看日志：
![](http://c1.airtlab.com/15953370482388.jpg#id=Atj9p&originHeight=490&originWidth=2878&originalType=binary&ratio=1&status=done&style=none)

它的格式为：
![](http://c1.airtlab.com/15953374175706.jpg#id=lTOrp&originHeight=164&originWidth=1136&originalType=binary&ratio=1&status=done&style=none)

```bash
127.0.0.1 - - [21/Jul/2020:21:10:27 +0800] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36" "-"

1. $remote_addr(客户端(用户) IP地址) 127.0.0.1
2. $remote_user(需要在基于认证规则的时候，才有) ''
3. $time_local(访问时间) 21/Jul/2020:21:10:27 +0800
4. $request(请求的 url 地址) "GET / HTTP/1.1"
5. $body_bytes_sent(nginx返回给客户端的响应体的字节数，即不含响应头) 0
6. $status(请求状态) 304 
7. $http_referer(请求来源) "-"
8. $http_user_agent(客户端信息) "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
9. $http_x_forwarded_for(表示 HTTP 请求端真实 IP) "-"
```

我们也可以根据自己需要日志信息在 nginx 配置文件中修改日志格式。

## 3. 设置 error_log

error_log 错误日志，记录了访问出错的信息，可以用于定位错误的原因。

### error_log 指令语法

```bash
error_log file [level];
```

第一个参数指写入错误日志的路径
第二个参数指日志的级别。level 可以是：debug、info、notice、warn、error、crit、alert、emerg 中的任意值。只有日志的错误级别大于等于level 指定的值才会被写入错误日志中，默认值是 error。

### error_log 配置示例

```bash
error_log logs/error.log error;
```

### error_log 日志查看

![](http://c1.airtlab.com/15953384654024.jpg#id=XaDjw&originHeight=568&originWidth=2856&originalType=binary&ratio=1&status=done&style=none)

```bash
2020/07/21 18:21:47 [emerg] 57325#0: bind() to 0.0.0.0:9000 failed (48: Address already in use)

1. 发生错误时间：2020/07/21 18:21:47 
2. 日志级别：emerg 
3. 详细信息：bind() to 0.0.0.0:9000 failed (48: Address already in use)
```

## 4. 参考文章
1. [https://www.cnblogs.com/aoniboy/p/4866395.html](https://www.cnblogs.com/aoniboy/p/4866395.html)
2. [https://www.cnblogs.com/leeyongbard/p/10880356.html](https://www.cnblogs.com/leeyongbard/p/10880356.html)