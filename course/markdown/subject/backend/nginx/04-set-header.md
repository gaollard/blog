---
title: 04 header 操作
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1. ngx_http_headers_module

这是一个自带模块，已经集成到了 nginx 的二进制安装包。

### 1) 添加 header 字段

- 语法：`add_header name value [always];`
- 上下文：`http, server, location, if in location`

```nginx
location = /test2 {
  add_header x-server nginx;
}
```

> 默认当响应状态码为 200, 201 (1.3.10), 204, 206, 301, 302, 303, 304, 307 (1.1.16, 1.0.13), or 308 (1.13.0). add_header 才会被使用，如果希望忽略状态码，可以使用是 4 个参数 always。

> There could be several add_header directives. These directives are inherited from the previous configuration level if and only if there are no add_header directives defined on the current level. 您可能会配置多个 add_header，但是 nginx 只会遵循就近原则，最终只有一个会生效。

另外，当您使用了代理服务器时，当出现了同名的字段，add_header 不能覆盖原有的 header 字段，只会再次增加，这会带来一些 BUG。

### 2) 设置过期时间 expires

```nginx
location / {
  expires    24h;
}
```

直接看文档：[http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires](http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires)

## 2. headers_more 模块

源码地址：https://github.com/openresty/headers-more-nginx-module。用于添加，设置，清除输入和输出的头信息。nginx 源码没有包含该模块，需要另行添加。

该模块是 `ngx_http_headers_module` 模块的增强版，提供了更多的实用工具，比如复位或清除内置头信息，如 Content-Type, Content-Length, 和 Server。

主要区别：

1. 该模块的指示适用于所有的状态码，包括 4xx 和 5xx 的。 add_header 只适用于 200，201，204，206，301，302，303，304，或 307。
2. 可以添加或者替换。

主要指令：

- more_set_headers 用于添加、修改、清除响应头
- more_clear_headers 用于清除响应头
- more_set_input_headers 用于添加、修改、清除请求头，常常和 proxy_pass 一起使用。
- more_clear_input_headers 用于清除请求头，常常和 proxy_pass 一起使用。

```nginx
location /bar {
  more_set_headers 'X-1: 1' 'X-2: 1';
  more_clear_headers 'Content-Type';
  # proxy_pass ...
}

location /foo {
  set $my_host 'my dog';
  more_set_input_headers 'Host: $my_host';
  # proxy_pass ...
}
```

## 3. ngx_http_proxy_module
用于给代理下游服务添加请求头

### 1) proxy_set_header

语法: `proxy_set_header field value;`
默认:

```
proxy_set_header Host $proxy_host;
proxy_set_header Connection close;
```

上下文: http, server, location
使用这个指令特别注意，如果你的代理服务和客户端是同一个 HOST，那么转发设置是这样的：

```nginx
proxy_set_header Host       $http_host
```

如果不是同一个 HOST，那你应该改成你需要的：

```nginx
proxy_set_header Host       $host;
```

![](https://img2020.cnblogs.com/blog/2032346/202012/2032346-20201209090752688-1537133429.png#id=wqEca&originHeight=456&originWidth=2044&originalType=binary&ratio=1&status=done&style=none)
