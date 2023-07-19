---
title: 02-bool和filter组合查询
url: https://www.yuque.com/gaollard/efekv4/yg1dkt
---

```shell
#搜索address字段内容中包含"杭州"并且满足age大于等于10、小于等于20的文档数据
GET userinfo_003/_doc/_search
{

  "query":{
    "bool": {
      "must": [
        {
          "match": {
            "address": "杭州"
          }
        }
      ],
      "filter": {
        # 不满足的都会被过滤
        "range": {
          "age": {
            "gte": 10,
            "lte": 20
          }
        }
      }
    }
  }
}
```
