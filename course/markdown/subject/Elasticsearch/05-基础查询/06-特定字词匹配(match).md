---
title: 06-特定字词匹配(match)
url: https://www.yuque.com/gaollard/efekv4/tqhg6b
---

```shell
GET /索引库名称/_search
{
  "query": {
    "match": {
      "address": "查询内容"
    }
  }
}
```

```shell
GET /userinfo/_search
{
  "query": {
    "match": {
      "address": "中国，美国"
    }
  }
}
```

搜索 address 字段中包含"中国"或者"美国"的文档数据
