---
title: 17 常用配置
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1、try_file

```nginx
location / {
  index index.html index;
  try_files $uri $uri/ /index.html =404;
}
```

## 2、反向代理

```nginx
server {
  listen 80;
  server_name www.example.com example.com;

  location /api {
    proxy_set_header Host $host;
    proxy_set_header Accept-Encoding "";
    proxy_pass http://localhost:3000;
  }
}
```

注意这里 `http://localhost:3000` 和 `http://localhost:3000/` 的区别

## 3、重定向

```nginx
location /bill/detail {
  rewrite ^/bill/detail/([\d]+)(.*)$ https://www.baidu.com/?$args redirect;
}
```

## 4、大文件上传

```nginx
server {
  listen       80;
  server_name  localhost;
  
  client_max_body_size     50m;  # 限制请求体的大小，若超过所设定的大小，返回413错误，默认1m
  client_header_timeout    1m;  # 读取请求头的超时时间，若超过所设定的大小，返回408错误
  client_body_timeout      1m; # 读取请求实体的超时时间，若超过所设定的大小，返回413错误
  proxy_connect_timeout     60s; # http请求无法立即被容器(tomcat, netty等)处理，被放在nginx的待处理池中等待被处理。此参数为等待的最长时间，默认为60秒，官方推荐最长不要超过75秒
  proxy_read_timeout      1m;  # http请求被容器(tomcat, netty等)处理后，nginx会等待处理结果，也就是容器返回的response。此参数即为服务器响应时间，默认60秒
  proxy_send_timeout      1m; # http请求被服务器处理完后，把数据传返回给Nginx的用时，默认60秒

  location  / {
      # ...
  }
}   
```

## 5、虚拟目录

```
location /web2 {
  # index index.html index;
  alias /Users/user/Desktop/html;
}
```

使用 root + rewrite 可以 实现虚拟目录的功能
