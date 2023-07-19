---
title: 05-filters分组聚合
url: https://www.yuque.com/gaollard/efekv4/fp5ybn
---

相当于灵活分组 `filters-aggs`

    GET /myindex-aggtest/_search
    {
      "size": 0,
      "aggs" : {
        "messages" : {
          "filters" : {
            "other_bucket_key": "other_color", 
            "filters" : {
              "reds" :   { "match" : { "color" : "red"   }},
              "greens" : { "match" : { "color" : "green" }}
            }
          }
        }
      }
    }

```shell
{
 …
  "aggregations" : {
    "messages" : {
      "buckets" : {
        "greens" : {
          "doc_count" : 2 // 绿色车辆的数量
        },
        "reds" : {
          "doc_count" : 3 // 红色车辆的颜色
        },
        "other_color" : {
          "doc_count" : 1 // 其他车辆的颜色
        }
      }
    }
  }
}
```
