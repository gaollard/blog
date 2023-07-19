---
title: 03-去重后求总数量-cardinality
url: https://www.yuque.com/gaollard/efekv4/mu6f7o
---

    #数据准备
    POST /myindex_cardinality/_bulk
    { "index": {}}
    { "name" : "张三", "weight" : 60}
    { "index": {}}
    { "name" : "李四", "weight" : 70}
    { "index": {}}
    { "name" : "张三", "weight" : 80}
    #统计计算不重名的姓名总数量
    POST /myindex_cardinality/_search
    {
      "size":0,
      "aggs": {
        "type_count": {
          "cardinality": {
            "field": "name.keyword"
          }
        }
      }
    }
