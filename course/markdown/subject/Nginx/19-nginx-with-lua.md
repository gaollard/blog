---
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

nginx 中嵌入 lua 脚本环境搭建：

## 1. 环境搭建

### 1.1 源码编译安装
可以参考 https://segmentfault.com/a/1190000018641801

### nginx-mod-http-lua 集成环境

安装这个包后，会安装 nginx 以及 lua 相关的依赖

```Dockerfile
FROM alpine:3.6

RUN apk add --no-cache nginx-mod-http-lua

# Delete default config
RUN rm -r /etc/nginx/conf.d && rm /etc/nginx/nginx.conf

# Create folder for PID file
RUN mkdir -p /run/nginx

# Add our nginx conf
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir www
COPY html/ www

CMD ["nginx"]

EXPOSE 80
```

**使用演示**

```nginx
load_module /usr/lib/nginx/modules/ndk_http_module.so;
load_module /usr/lib/nginx/modules/ngx_http_lua_module.so;

pcre_jit on;

events {
  worker_connections 1024;
}

http {
  include       mime.types;
  default_type  application/octet-stream;

  gzip on;
  gzip_min_length 1k;
  gzip_comp_level 1;
  gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript;
  gzip_vary on;
  server_tokens       off;  # returns "Server: nginx"

  log_format custom '$host - $remote_addr - $remote_user [$time_local] '
                          '"$request" $status $body_bytes_sent '
                          '"$http_referer" "$http_user_agent" "$gzip_ratio"';

  gzip_disable "MSIE [1-6]\.";
  sendfile        on;

  server {
    listen 80;

    location / {
      root /www;
      index  index.html index.htm;
    }

    location /lua {
      # 定义MIME类型
      default_type 'text/plain';
      content_by_lua_block {
        ngx.say('Hello,world!')
      }
    }
  }
}

daemon off;
```

## 2. 加载动态模块

在nginx中，load_module指令用于加载动态模块，以扩展nginx的功能。

动态模块是指可以在nginx运行时动态加载和卸载的一些二进制文件。通过加载动态模块，可以为nginx添加各种功能，如支持新的协议、文件格式、认证方式等。

在 nginx 配置文件中，load_module 指令用于指定要加载的动态模块文件的路径和名称。当nginx启动时，它会自动加载并初始化指定的动态模块，从而扩展其功能。

例如，要加载一个名为 mod_http_echo.so 的动态模块，只需在nginx配置文件中添加如下指令：

```nginx
load_module /path/to/mod_http_echo.so;
```

这将加载 mod_http_echo.so 动态模块，并使其在nginx中可用。

## 3. openrestry

OpenResty 是一个基于 nginx 服务器的 Web 应用开发框架。它提供了丰富的 Lua 库和第三方模块，并通过内置的 Lua 解释器将 Lua 语言嵌入 Nginx 的配置文件和服务器中。
OpenResty 包含了一系列的组件，例如：

- Nginx：为 HTTP/HTTPS 服务器提供平台。
- LuaJIT： 高性能 Lua VM 的快速 JIT 编译器。
- ngx_lua：将 Lua 脚本编写成 Nginx 的模块。
- ngx_stream_lua：将 Lua 脚本编写成 Nginx 的 TCP 或 UDP 的模块。
- LuaRocks：开源的 Lua 库和工具管理系统。

OpenResty 通过将 Lua 脚本编写成 Nginx 模块，使得这些模块可以通过 Nginx 的事件模型异步处理请求，并高效地执行各种操作，如：数据处理、访问数据库、HTTP 缓存等等，并且，在 Lua 语言中编写业务逻辑更加简单和灵活。

OpenResty 已经在许多高性能 Web 应用场景得到应用，例如：API Gateway、反向代理、Web 应用防火墙、分布式缓存和负载均衡等等。