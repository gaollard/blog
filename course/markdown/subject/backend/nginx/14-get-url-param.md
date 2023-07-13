---
title: 14 获取URL参数
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## $args

在 nginx 中获取 URL 参数可以使用 `ngx_http_core_module` 模块提供的 `$args` 变量，该变量包含整个请求中的 URL 参数字符串。
要获取特定参数的值，可以使用 `ngx_http_set_misc_module` 模块提供的 `set` 指令。以下是一个示例配置：

```nginx
location /example {
  set $param1 '';
  set $param2 '';

  if ($args ~* "param1=([^&]+)") {
    set $param1 $1;
  }

  if ($args ~* "param2=([^&]+)") {
    set $param2 $1;
  }

  # do something with $param1 and $param2 here...
}
```

在上面的配置中，我们首先定义两个变量 `param1` 和 `param2`，然后使用 `if` 语句和正则表达式来提取参数值。例如，如果 URL 包含参数 `param1=foo`，那么 `$param1` 变量将被设置为 `foo`；如果参数不存在，则 `$param1` 将保持为空字符串。最后，我们可以使用 `$param1` 和 `$param2` 变量执行任何必要的操作。

## $arg_{name}

通过 $arg_{name} 获得单个参数值，比如 $arg_name 用于获取 name 的值，$arg_age 用于获取 age 的值