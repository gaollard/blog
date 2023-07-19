---
title: 01-term level的exists查询
url: https://www.yuque.com/gaollard/efekv4/wwbnrq
---

```shell
#查询索引库中存在remarks字段的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "exists": 
    {
      "field": "remarks" # 存在该字段才返回
    }
  }
}
```
