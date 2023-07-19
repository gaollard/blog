---
title: 09-正则表达式-regexp
url: https://www.yuque.com/gaollard/efekv4/pm3a7i
---

```shell
#查询remarks字段内容匹配po开头的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "regexp": {
      "remarks": {
        "value": "po.*",
        "case_insensitive": true
      }
   }
  }
}
```

![](https://s3.airtlab.com/elasticsearch/20220429092451.png)
