---
title: 05-terms多个单词查询
url: https://www.yuque.com/gaollard/efekv4/lqx2s8
---

```shell
#查询索引库中programming_languages字段的内容，包含php和java任何一个单词的文档都会被返回
GET /myindex-term-level/_search
{
  "query": {
    "terms": {
      "programming_languages": ["php","java"]
    }
  }
}
```
