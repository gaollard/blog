---
title: 03 nginx 条件判断
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

初用 nginx ，发现 nginx 不支持if嵌套，逻辑与，逻辑或。但是可以采用变量叠加的方式来实现，举例：

```nginx
location ~ / {
  root /Users/manba/Desktop/html;

  set $talent_static_flag "0";

  if ($request_uri ~* "\.(gif|jpg|jpeg|bmp|png|ico|txt|json|svg|js|css)$") {
    # 请求资源类型为静态资源
    set $talent_static_flag "1";
  }

  if ($http_referer ~ ".*\/talent\/?") {
    # 请求referer包含 /talent
    set $talent_static_flag "{$talent_static_flag}1"; # 这里的值包含 {}，😂暂时不知道如何去掉 
  }

  if ($talent_static_flag = "{1}1") {
    rewrite /(.*) / break;
    proxy_pass http://demo.airtlab.com;
    break;
  }
}
```