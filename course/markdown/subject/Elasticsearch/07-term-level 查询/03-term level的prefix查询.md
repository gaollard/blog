---
title: 03-term level的prefix查询
url: https://www.yuque.com/gaollard/efekv4/mfmqql
---

在Elasticsearch中，使用prefix可以根据前缀来查找某个字段。范例如下：

```shell
#查询索引库中name字段的内容中前缀是"张"的所有文档信息
GET /myindex-term-level/_search
{
  "query": {
    "prefix": {
      "name": {
        "value": "张"
      }
    }
  }
}
```
