---
title: 04-term单个单词查询
url: https://www.yuque.com/gaollard/efekv4/zgcop3
---

以下范例是利用term（搜索的内容不会被分词）进行单词查询。

```shell
#查询索引库中"programming_languages"字段内容中包含"dotnet"的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "term": {
      "programming_languages": "dotnet"
    }
  }
}
```
