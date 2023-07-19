---
title: 06 content 阶段疑惑
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

```nginx
location /renwu/ {
  # 1
  rewrite /renwu(.*) /api/index.html break;

  # 2
  proxy_pass http://renwu.airtlab.com;
}
```

之前对这一块不了解，自己看不懂上面的配置，以为这里的 proxy_pass 是无效的，当访问 /renwu/ 时永远都是访问
`/api/index.html` 这个资源。

今天接手了同事的项目，发现这样配置是有效的，于是查了相关文档搞清楚了，这里涉及到两个知识点。

（1）rewrite 比 proxy_pass 先执行，而且重定向后的 path 会替代 proxy_pass 的 URI

![20230512205118](http://s3.airtlab.com/blog/20230512205118.png)

（2）proxy_pass 有效的原因是，proxy_pass 在 conetnt 阶段执行。

> CONTENT 阶段有些特殊，它不像其他阶段只能执行固定的 handler 链，还有一个特殊的 content_handler，每个 location 可以有自己独立的 content handler，而且当有 content handler 时，CONTENT 阶段只会执行 content handler，不再执行本阶段的 handler 链。


> 默认情况下，nginx 会在 CONTENT 阶段的 handler链挂上index模块，静态文件处理模块等的 handler。另外模块还可以设置独立的 content handler，比如ngx_http_proxy_module的proxy_pass指令会设置一个名为ngx_http_proxy_handler的content handler。

这里解释了为什么这里的 proxy_pass 有效的原因，参考文章见：[http://tengine.taobao.org/book/chapter_12.html#content](http://tengine.taobao.org/book/chapter_12.html#content)