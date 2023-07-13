---
title: 07 访问限速
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

- 使用 nginx 限制单个 IP 的并发连接数能够减少一些采集程序或者 DDOS 的攻击
- 使用 nginx 限制下载速度，可以防止下载大文件时，导致网站不可访问

```nginx
http {
  # ...

  # 限制当前站点最大并发数 50
  limit_conn perserver 50;

  # 设置单个 IP 的并发连接数为 10
  limit_conn perip 10;

  # 限制客户端下载速度100KB/秒，此限制是针对单个线程
  limit_rate       50k;

  # 500k 以后开始限速
  limit_rate_after 500k;

  # ...
}
```