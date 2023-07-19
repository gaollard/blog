---
title: 05 nginx 超时设置
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1. 长链接超时 keepalive
- 语法: `keepalive_timeout timeout [ header_timeout ]`
- 默认值：75s
- 上下文: http server location

说明：

- 第一个参数指定了与 client 的 keep-alive 连接超时时间。服务器将会在这个时间后关闭连接，建议设置为 60s。
- 可选的第二个参数指定了在响应头 Keep-Alive: timeout=time中的time值。这个头能够让一些浏览器主动关闭连接，这样服务器就不必要去关闭连接了。
- keepalive_timeout 的值应该大于 client_body_timeout

可以在浏览器上通过 connectionId 测试。

## 2. 客户端 header 超时 client_header_timeout

- 语法: `client_header_timeout 15s;`
- 默认值：60s

客户端向服务端发送一个完整的 request header 的超时时间，如果60s内没有收到完整的 http request header，则为超时。如果客户端超时，nginx 返回 HTTP 408（Request Timed Out）。

当 cookie 很大很大时，容易出现。

## 3. 客户端 body 超时 client_body_timeout

- 语法：`client_body_timeout 15s;`
- 默认值：60s

客户端向服务端发送 request body 的超时时间，如果连续的60s内没有收到客户端的1个字节，则表示超时，如果客户端超时，nginx 返回 HTTP 408（Request Timed Out）。

## 4. 向客户端发送数据超时 send_timeout

- 语法：`send_timeout 15s;`
- 默认值: 60s

send_timeout 指定客户端的响应超时时间。这个设置指的是在这段时间内，客户端没有读取任何数据，nginx就会关闭连接。

## 5. 大文件上传
有大文件上传时，需要指定body的最大值:
```nginx
client_max_body_size          50m;` # 默认1M
```

超过这个值会返回 413 状态码。

## 6. 大文件下载
如果有大文件下载，建议限制下载速度，否则会导致网站奔溃。

## 7. nginx 作为反向代理服务器
通常需要注意以下配置：

- 定义与被代理服务器建立连接的超时，应该注意，这个超时通常不能超过75秒。
```nginx
proxy_connect_timeout 60s;
```

- 设置向被代理服务器传输请求的超时。超时仅在两个连续的写操作之间设置，而不用于传输整个请求。如果代理服务器在此期间没有接收到任何内容，则关闭连接。
```nginx
proxy_send_timeout 60s;
```

- 定义从被代理服务器读取响应的超时。超时仅在两个连续的读取操作之间设置，而不用于传输整个响应。如果代理服务器在此期间没有传输任何内容，则关闭连接。
```nginx
proxy_read_timeout 60s;
```
