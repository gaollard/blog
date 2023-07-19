---
title: 03-字段类型-text-keyword
url: https://www.yuque.com/gaollard/efekv4/yxcau6
---



### keyword 类型

keyword（关键字）类型用于存储结构化的内容，例如 ID、电子邮件地址、主机名、状态代码、邮政编码或标签。此类型的字段通常用于排序、聚合查询等。范例如下：

    #创建索引映射并指定tag字段的字段类型为keyword类型
    PUT myindex-2_11
    {
      "mappings": {
        "properties": {
          "tag": {
            "type":  "keyword"
          }
        }
      }
    }

    #插入文档数据
    PUT myindex-2_11/_doc/1
    {
      " tag ":"北京"
    }

    #插入文档数据
    PUT myindex-2_11/_doc/2
    {
      " tag ":"北京人"
    }

    #查询索引库中tag字段是"北京"且完全匹配的内容
    GET myindex-2_11/_doc/_search?q=tag:北京



### text 类型

`text` 类型用于进行全文搜索（也称为全文检索），例如电子邮件正文或产品描述的全文，它们在被搜索之前通过分词器将全部文字内容转换为单词（term）表。txt 类型允许用户在每个全文字段中搜索单个单词。

`text` 类型的字段不适合进行排序，也不适合进行聚合计算。如果字段需要聚合计算或者排序，推荐使用 keyword 类型。需要特别注意的是，keyword 类型和 text 类型的区别是：keyword 类型的字段内容不会被分词，text 类型的字段内容会被分词

```json
#创建索引映射并指定tagname字段的字段类型为text类型
PUT myindex-2_12
{
  "mappings": {
    "properties": {
      "tagname": {
        "type":  "text"
      }
    }
  }
}

#插入文档数据
PUT myindex-2_12/_doc/1
{
  "tagname":"江苏省"
}

#插入文档数据
PUT myindex-2_12/_doc/2
{
  "tagname":"河北省"
}

#根据tagname字段内容分词，然后对所有分词进行匹配搜索
GET myindex-2_12/_doc/_search
{
  "query":{
     "match": {
       "tagname": "河南省"
     }
  }
}


{
  "took" : 0,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 0.19856803,
    "hits" : [
      {
        "_index" : "myindex-2_12",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 0.19856803,
        "_source" : {
          "tagname" : "江苏省"
        }
      },
      {
        "_index" : "myindex-2_12",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 0.16853255,
        "_source" : {
          "tagname" : "河北省"
        }
      }
    ]
  }
}
```

以上搜索结果中把"江苏省"和"河北省"这两行数据都返回了，这是因为目前默认的分词器把"河南省"分成了"河南"和"省"两个词，而"河北省"和"江苏省"分别分成"河北"、"省"和"江苏"、"省"，这两个词被分词后都有一个"省"字，所以搜索时被全文匹配到了。在实际业务中，如果我们要对字段的内容进行全文搜索，可以使用 text 类型；如果要聚合查询或者精准匹配，则尽量使用 keyword 类型。

对于大多数想要对文本字段执行更多操作的用户，也可以使用多字段映射，其中既有 text 类型可以用于全文搜索，又有 keyword 类型可以用于聚合分析，语法如下：

    PUT索引库名称
    {
      "mappings": {
        "properties": {
          "my_field": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword"
              }
            }
          }
        }
      }
    }

由以上语句可知，my\_field字段的映射关系是：父字段类型是text类型，子字段类型是keyword类型。范例如下：

```json
GET myindex-2_13/_doc/_search
{
  "query":{
     "match": {
       "tagname.keyword": "河南省"
     }
  }
}
```
