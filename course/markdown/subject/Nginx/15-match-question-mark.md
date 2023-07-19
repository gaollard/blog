---
title: 15  normalized URI 不包含查询字符串
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

期望当访问 `localhost:5000/bill/detail/1234?a=1&b=2` 时重定向到 `http://localhost:5000/bill/detail/?a=1&b=2&term=123`

## 1、代码测试

```conf
  location /bill/detail {
    # $1 匹配 数字部分
    # $2 匹配 query string
    rewrite  ^/bill/detail/([\d]+)\?(.*)$ https://www.baidu.com?$2&term=$1 redirect;
  }
```

```
2023/06/03 20:20:38 [notice] 3128#0: *5 "^/bill/detail/([\d]+)\?(.*)$" does not match "/bill/detail/1234", client: 127.0.0.1, server: 127.0.0.1, request: "GET /bill/detail/1234?a=1&b=2 HTTP/1.1", host: "localhost:5000"
```

## 2、相关问题

(1) https://stackoverflow.com/questions/58019632/how-to-rewrtite-in-nginx-uri-with-a-question-mark

![20230603203523](http://s3.airtlab.com/blog/20230603203523.png)
  
(2) https://stackoverflow.com/questions/15713934/how-to-match-question-mark-as-regexp-on-nginx-conf-location

![20230603204049](http://s3.airtlab.com/blog/20230603204049.png)

这里是说 `location ~ match` match 不能匹配 ? query string 部分

(3) https://stackoverflow.com/questions/40551769/nginx-rewrite-rule-add-trailing-slash-before-question-mark

这是一个类似问题，作者也想匹配 `?`

## 3、参考资料

- http://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite

## 4、原因

`The ? marks the start of the query string which is not part of the normalized URI used in location and rewrite directives.` 参考 https://stackoverflow.com/questions/40551769/nginx-rewrite-rule-add-trailing-slash-before-question-mark

`The ? and anything following is the query string and is not part of the normalised URI used by nginx in location and rewrite directives.`

https://stackoverflow.com/questions/44782411/nginx-rewrite-question-mark


问号和问号后面的内容是查询字符串，不是由nginx在位置和重写指示中使用的标准化URI的一部分。查询字符串是HTTP请求中用于将额外的参数传递给服务器的一部分，而URI（统一资源标识符）则指定了要访问的资源的标识符。因此，对于使用nginx的位置和重写指令的服务器来说，查询字符串需要单独处理。

## 5、最终方案

```nginx
location /bill/detail {
  rewrite ^/bill/detail/([\d]+)(.*)$ https://www.baidu.com/?term=$1&$args? redirect;
}
```