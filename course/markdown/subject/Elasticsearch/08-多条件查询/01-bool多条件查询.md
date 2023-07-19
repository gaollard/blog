---
title: 01-bool多条件查询
url: https://www.yuque.com/gaollard/efekv4/qctre0
---

- must：必须匹配（返回结果中评分字段的结果有意义）。全部匹配才保留
- must\_not：过滤子句，必须不能匹配（返回结果中评分字段的结果无意义）。匹配任何一条就过滤
- should：选择性匹配，至少满足一条（返回结果中评分字段的结果有意义）。至少匹配一条才保留
- filter：过滤子句，必须匹配（返回结果中评分字段的结果无意义）。全部匹配才保留

在使用 Elasticsearch 查询时，如果想要构造更复杂的查询（即搜索），可以使用"bool"来组合多个查询条件。使用语法如下：

```shell
GET /索引库名称/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "字段1": "数据1" } }
      ],
      "must_not": [
        { "match": { "字段2": "数据2" } }
      ]
    }
  }
}
```

```shell
#搜索索引库中age字段内容等于18并且address字段内容中不包含"中国上海"的数据
GET /userinfo_003/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "18" } }
      ],
      "must_not": [
        { "match_phrase": { "address": "中国上海" } }
      ]
    }
  }
}
```

```shell
#搜索索引库中age字段内容等于18并且address字段内容中不包含"中国上海"的数据
GET /userinfo_003/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "18" } }
      ],
      "must_not": [
        # 任何其中一个匹配就过滤
        # 区分都要满足才过滤
        { "match_phrase": { "address": "中国上海" } },
      ]
    }
  }
}
```

如果有多个 must\_not 呢？比如 address 不能为中国，age 不能为 18:

```shell
GET mindex/_doc/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "bool": {
              "must_not": [
              {
                "match_phrase": {
                  "address": "中国"
                }
              }
            ]
          }
        },
        {
          "bool": {
              "must_not": [
              {
                "match_phrase": {
                  "name": "18"
                }
              }
            ]
          }
        }
      ]
    }
  }
}
```
