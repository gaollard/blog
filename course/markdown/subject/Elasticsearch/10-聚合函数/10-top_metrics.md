---
title: 10-top_metrics
url: https://www.yuque.com/gaollard/efekv4/mgeg7k
---

top\_metrics 关键字与 top\_hits 关键字非常相似，但它能够使用更少的内存来完成聚合，性能更高。

    #数据准备
    POST /myindex-top_metrics_test/_bulk?refresh
    {"index": {}}
    {"num": 1, "score": 3.1415}
    {"index": {}}
    {"num": 2, "score": 1.0}
    {"index": {}}
    {"num": 3, "score": 2.71828}

    #获取索引库中num字段的最大值和对应的score信息
    POST /myindex-top_metrics_test/_search?filter_path=aggregations
    {
      "aggs": {
        "tm": {
          "top_metrics": {
            "metrics": {"field": "score"},
            "sort": {"num": "desc"}
          }
        }
      }
    }

<!---->

    {
      "aggregations" : {
        "tm" : {
          "top" : [
            {
              "sort" : [
                3
              ],
              "metrics" : {
                "score" : 2.718280076980591
              }
            }
          ]
        }
      }
    }

<!---->

    POST /myindex-top_metrics_test/_search?filter_path=aggregations
    {
      "aggs": {
        "tm": {
          "top_metrics": {
            "metrics": {"field": "score"},
            "sort": {"num": "desc"},
            "size":2
          }
        }
      }
     }

    {
      "aggregations" : {
        "tm" : {
          "top" : [
            {
              "sort" : [3],"metrics" : {"score" : 2.718280076980591}
            },
            {
              "sort" : [2],"metrics" : {"score" : 1.0}
            }
          ]
        }
      }
    }

以上结果中，根据num字段进行排序，返回前两条文档数据。
