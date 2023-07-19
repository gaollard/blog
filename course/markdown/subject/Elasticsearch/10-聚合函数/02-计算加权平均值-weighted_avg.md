---
title: 02-计算加权平均值-weighted_avg
url: https://www.yuque.com/gaollard/efekv4/cs31li
---

    #数据准备
    POST /myindex-metrics_test/_bulk
    { "index": {}}
    { "grade" : 80, "weight" : 0.5}
    { "index": {}}
    { "grade" : 90, "weight" : 0.2}
    { "index": {}}
    { "grade" : 60, "weight" : 0.3}

    #计算grade字段的加权平均值
    POST /myindex-metrics_test/_search
    {
      "size": 0,
      "aggs": {
        "weighted_grade": {
          "weighted_avg": {
            "value": { # 设置值的字段
              "field": "grade"
            },
            "weight": { # 设置权重字段
              "field": "weight"
            }
          }
        }
      }
    }

但是在实际业务中，有可能出现索引结构不一致的情况，那么需要在“运行时字段”上进行聚合。范例如下：

    #数据准备
    POST /myindex-metrics_test1/_doc?refresh
    {
      "grade": 90,
      "weight": [2, 3]
    }
    POST /myindex-metrics_test1/_doc?refresh
    {
      "grade": 80,
      "weight": 3
    }
    #在"运行时字段"上进行聚合统计，查询加权平均值
    POST /myindex-metrics_test1/_search?filter_path=aggregations
    {
      "size": 0,
      "runtime_mappings": {
        "weight.combined": {
          "type": "double",
          "script": """
            double s = 0;
            for (double w : doc['weight']) {
              s += w;
            }
            emit(s);
          """
        }
      },
      "aggs": {
        "weighted_grade": {
          "weighted_avg": {
            "value": {
              "script": "doc.grade.value "
            },
            "weight": {
              "field": "weight.combined"
            }
          }
        }
      }
    }
