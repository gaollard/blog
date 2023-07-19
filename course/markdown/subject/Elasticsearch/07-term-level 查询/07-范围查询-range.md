---
title: 07-范围查询-range
url: https://www.yuque.com/gaollard/efekv4/cy0rly
---

我们在编写SQL查询语句时，会经常对数字或者日期进行范围查询。在Elasticsearch中，range通常被用于数字或者日期范围的查询中

```shell
#根据范围查询required_matches字段的值大于等于3且小于等于4的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "range": {
      "required_matches": {
        "gte": 3,
        "lte": 4
      }
    }
  }
}
```
