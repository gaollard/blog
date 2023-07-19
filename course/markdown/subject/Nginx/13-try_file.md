---
title: 13 try_file 指令
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1、演示1

```nginx
location / {
  root data;
  index index.html index.htm;
  try_files $uri $uri/ /index.html;
}
```

**解释配置**
- root：设置静态根目录为 data
- index：设置目录的默认文件为 index.html 、index.htm
- try_files：设置文件查找规则为 $uri $uri/ /index.html。即3个规则，先从 $uri 查找，再从 $uri/ 目录中查找，最后查找 /index.html。

例子：根据上面的配置，当请求 http://localhost:3004/api 时，$uri 为 /api。当前try_file 具体为：/api、/api/、/index.html，其中 / 表示根目录（根据 root 或 alias 来指定）。

**查找逻辑**
- 首先：检查 data 目录中是否存在 api 文件，如果存在，则返回文件；如果不存在，则进行下一步。
- 其次：检查 data 目录中是否存在 api/ 目录，如果存在，则在检查 api/ 目录中是否存在 index.html 或者 index.htm 文件（由 index 指定）；如果存在，则返回该文件。如果不存在，则进行下一步。
- 最后：检查 data 目录中是否存在 index.html 文件。如果存在，则返回文件；如果不存在，则返回 404。

## 2、演示2
```nginx
location /pngs/ {
  root /data/user/;
  index index.html index.htm;
  try_files $uri   $uri/  /pngs/file.png; 
}
```

根据上面的配置，当请求 http://localhost:3003/pngs/rule.png 时， $uri 为 /pngs/rule.png，当前 try_file 查找顺序为
- 首先是：/data/user/pngs/rule.png
- 其次是：/data/user/pngs/rule.png/ 文件下的 index 所配置的文件，即： index.html、index.htm
- 最后是： /data/user/pngs/file.png。