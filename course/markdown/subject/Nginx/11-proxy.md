---
title: 11 反向代理配置
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

```nginx
server {
  listen 80;
  server_name www.example.com example.com;

  location /app {
    proxy_pass http://127.0.0.1:8080;
  }
}
```

上面的配置指示 nginx 将所有以 `/app` 开头的请求传递到到 `http://127.0.0.1:8080` 服务

将请求头 Host 字段的值更改为 $host，并将 Accept-Encoding 值设置为空字符串来删除标头 Accept-Encoding 请求头。

```nginx
location / {
  proxy_set_header Host $host;
  proxy_set_header Accept-Encoding "";
  proxy_pass http://localhost:3000;
}
```

参考 https://www.myfreax.com/nginx-reverse-proxy