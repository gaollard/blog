---
title: 07-histrogram范围间隔聚合
url: https://www.yuque.com/gaollard/efekv4/cf3k8p
---

在前面的范例中，我们可以指定具体的范围来进行聚合，但是当范围很多时，可以直接指定范围间隔（Histrogram）来进行聚合统计

    #聚合统计，根据出售价格范围进行分组，每一组之间价格相差40000
    GET /myindex-aggtest/_search
    {
       "size" : 0,
       "aggs":{
          "price":{
             "histogram":{ 
                "field": "price",
                "interval": 40000
             } 
          }
       }
    }
