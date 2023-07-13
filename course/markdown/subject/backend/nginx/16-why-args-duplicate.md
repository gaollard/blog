---
title: 16 why-args-duplicate
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1、测试 1
```nginx
location /bill/detail {
  rewrite ^/bill/detail/([\d]+)(.*)$ https://www.baidu.com/?$args redirect;
}
```

`http://localhost:5000/bill/detail/1234?a=1`

=>

`https://www.baidu.com/?a=1&a=1`

## 2、测试 2

```nginx
location /bill/detail {
  rewrite ^/bill/detail/([\d]+)(.*)$ https://www.baidu.com/?term=$1&$args redirect;
}
```

`http://localhost:5000/bill/detail/1234?a=1&b=2`

=>

`https://www.baidu.com/?term=1234&a=1&b=2&a=1&b=2`

## 3、解释 

> Nginx appends the query string automatically if there are other get parameters in the rewritten URL. If you're adding $args yourself you should add a ? (question mark) at the end of the rewritten URL to avoid having duplicate parameters.

```nginx
rewrite ^(...)$ /destination$is_args$args? [permanent|redirect];
```

https://stackoverflow.com/questions/23635203/using-args-in-nginx-rewrite-causing-duplicate-url-parameters