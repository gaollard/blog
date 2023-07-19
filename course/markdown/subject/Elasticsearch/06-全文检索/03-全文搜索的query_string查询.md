---
title: 03-全文搜索的query_string查询
url: https://www.yuque.com/gaollard/efekv4/gqeh3s
---

query\_string查询是根据运算符（AND/OR）来解析和拆分要搜索的字符串。范例如下：

```shell
GET /myindex-test-match/_search
{
  "query": {
    "query_string": {
      "query": "(dog and) AND (beautiful)",
      "default_field": "title"
    }
  }
}
```

在以上语句中，查询索引库的title字段，必须匹配到beautiful单词，并且必须匹配dog和and其中任何一个单词的字段。
