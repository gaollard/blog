---
title: 06-通配符查询-wildcard
url: https://www.yuque.com/gaollard/efekv4/gxldzq
---

在Elasticsearch中，如果需要通过通配符进行查询，可使用wildcard来进行处理。范例如下：

```shell
#在索引中programming_languages字段的内容中查询匹配"p*p"和"*"（可以表示任何内容）的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "wildcard": {
      "programming_languages": {
        "value": "p*p"
      }
    }
  }
}
```

"*"可以表示多个字母
