---
title: 12 重定向功能
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1. return 指令

(1) 语法

![20230512210550](http://s3.airtlab.com/blog/20230512210550.png)

(2) CODE

-  301 永久重定向 
-  302 临时重定向，禁止缓存 
-  303 临时重定向，允许改变请求方法，临时重定向，禁止缓存 
-  307 临时重定向，不允许改变请求方法，临时重定向，禁止缓存 
-  308 永久重定向，不允许改变请求方法 

(3) return 在各上下文的执行顺序
server return > location return > error_page

![20230512210612](http://s3.airtlab.com/blog/20230512210612.png)

## 2. return 不下载文件

![20230512211033](http://s3.airtlab.com/blog/20230512211033.png)

nginx 使用 return 指令，会下载文件，配置返回内容的编码格式即可：

```nginx
location /test {
  default_type text/html ;
  return 200 "hello $remote_addr";
}
```

## 3. rewrite 指令

![20230512210642](http://s3.airtlab.com/blog/20230512210642.png)

### 1. last 和 break 区别演示

假设 html 根目录如下：

![20230512210730](http://s3.airtlab.com/blog/20230512210730.png)

```

```nginx
location /first {
  rewrite /first(.*) /second$1 break;
  return 200 "first";
}

location /second {
  rewrite /second(.*) /third$1 last;
  return 200 "second";
}

location /test {
  rewrite /xxxtest(.*) /second$1 break;
  return 200 "test";
}

location /third {
  return 200 "third";
}
```

演示 last 与 break 区别：

（1）访问 /first/1.html，会重定向到 /second$1，此时使用了 break，则停止继续匹配，直接访问 /second/1.html，这里返回 404

（2）访问 /second/3.html，会重定向到 /third$1，此时使用了 last，所以不会直接输出 /third/3.html，而是继续匹配，进入 `location /third`，然后返回 `third`。

（3）访问 /test/1.html，此时 `location /test` 下的 rewrite 重定向失败(匹配失败)，会直接走后面的 return 语句，返回 `test`。

### 2. rewrite 301/302 重定向

![20230512210801](http://s3.airtlab.com/blog/20230512210801.png)

### 3. 开启 rewrite_log

rewrite_log 开启后，可以看到重定向日志，以便调试

![20230512210943](http://s3.airtlab.com/blog/20230512210943.png)