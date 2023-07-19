---
title: 08-搜索词相似的词-fuzzy
url: https://www.yuque.com/gaollard/efekv4/miggql
---

    GET /myindex-term-level/_search
    {
      "query": {
        "fuzzy": {
          "remarks": {
            "value": "powerf"
          }
        }
      }
    }
