---
title: 02-term level的ids查询
url: https://www.yuque.com/gaollard/efekv4/obscyz
---

ids就是通过id进行批量查询。我们在写SQL的时候，可能会经常这样写："select *from table where id in(1,2,3)"，通过id匹配，一次性返回多行数据。而在Elasticsearch中，可以使用ids查询。

```shell
#返回_id等于1和_id等于3的文档数据
GET /myindex-term-level/_search
{
  "query": {
    "ids": 
    {
      "values": [1,3]
    }
  }
}
```

```shell
{
 …
    "hits" : [
      {
        "_index" : "myindex-term-level",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "name" : "张三",
          "programming_languages" : [
            "c++",
            "java",
            "dotnet"
          ],
          "required_matches" : 2
        }
      },
      {
        "_index" : "myindex-term-level",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 1.0,
        "_source" : {
          "name" : "王五",
          "programming_languages" : [
            "java",
            "c++",
            "dotnet"
          ],
          "required_matches" : 3,
          "remarks" : "hello world"
        }
      }
    ]
  }
}
```

需要注意的是，返回结果的顺序和我们查找时设置的顺序没有任何关系。
