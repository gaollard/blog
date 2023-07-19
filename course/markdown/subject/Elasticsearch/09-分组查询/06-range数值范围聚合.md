---
title: 06-range数值范围聚合
url: https://www.yuque.com/gaollard/efekv4/wcnmgz
---

`range-aggs`

Elasticsearch提供了基于多桶值源的聚合方式。通过这种方式可以定义一组范围，每个范围代表一个桶。范例如下：

    GET /myindex-aggtest/_search
    {
      "size": 0,
      "aggs": {
        "price_ranges": {
          "range": {
            "field": "price",
            "ranges": [#如下是一组范围条件
              { "to": 10000 },
              { "from": 10000, "to": 20000 },
               { "from": 20000, "to": 30000 },
              { "from": 40000 }
            ]
          }
        }
      }
    }
