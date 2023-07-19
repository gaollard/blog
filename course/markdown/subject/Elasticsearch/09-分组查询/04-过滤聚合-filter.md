---
title: 04-过滤聚合-filter
url: https://www.yuque.com/gaollard/efekv4/eh4rse
---

Elasticsearch中也支持先筛选再聚合。范例如下

```shell
#聚合计算厂商toyota出售车的平均价格和出售的总数量
GET /myindex-aggtest/_search
{
  "size": 0,
  "aggs": {
    "make_by": {
      "filter": { "term": { "make": "toyota" } },
      "aggs": {
        "avg_price": { "avg": { "field": "price" } }
      }
    }
  }
}
```
