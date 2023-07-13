---
title: 02 root 和 alias 的区别
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

nginx 指定文件路径有两种方式 root 和 alias，两者的主要区别在于 nginx 如何解释 location 后面的 uri。

## 1、真实目录与虚拟目录

官方的说，alias 指令用来重置当前文件的目录，lacation 后面的uri 是虚拟目录，而使用 root 时，lacation 后面的 uri 是真实目录。

举个例子，对于相同配置，访问 [http://localhost/test/index.html](http://localhost/test/index.html)

```nginx
location ^~ /test/ {
  root /www/root/html/;
}
```

将会访问服务器的 /www/root/html/test/index.html 资源。

```nginx
location ^~ /test/ {
  alias /www/root/html/;
}
```

将会访问服务器的 /www/root/html/index.html 资源。

## 2、使用建议

一般情况下，在 nginx 配置中的良好习惯是：

- 1）在location / 中配置root目录；
- 2）在location /path 中配置alias虚拟目录。

当然，使用 root + rewrite 可以 实现虚拟目录的功能。alias 后面也可以使用 reweite 功能，比如：

```nginx
location /web1 {
  # index index.html index;
  alias /Users/user/Desktop/html;
  rewrite /web1 /web2/web2;
}

location /web2 {
  # index index.html index;
  alias /Users/user/Desktop/html;
}
```