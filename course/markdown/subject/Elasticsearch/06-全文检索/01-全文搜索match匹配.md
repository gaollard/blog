---
title: 01-全文搜索match匹配
url: https://www.yuque.com/gaollard/efekv4/gmzg5h
---

在 Elasticsearch 中进行全文搜索时，如果要给字段指定要查询的特定字词，可以使用 match 类型的查询

```shell
#数据准备
POST /myindex-test-match/_bulk
{ "index": { "_id": 1 }}
{ "title": "The flower and the dog" }
{ "index": { "_id": 2 }}
{ "title": "The flower and the dog are beautiful" }
{ "index": { "_id": 3 }}
{ "title": "the dog are beautiful" }

#使用match类型的查询
GET /myindex-test-match/_search
{
  "query": {
    "match": {
      "title": "flower"
    }
  }
}
```

以上语句执行match查询的步骤如下：

- 1）检查字段类型。title字段是text类型（内容会被分词），说明此字段在存储时和查询时都会进行分词，而且在存储时会建立倒排索引。
- 2）分析查询字符串。将查询的字符串"flower"传入标准分词器中，输出的结果是单词"flower"。因为只有一个单词，所以match查询执行的是单个底层term查询。
- 3）查找匹配的文档。用term查询在倒排索引中查找"flower"，然后获取一组包含该单词的文档数据。
- 4）为每个文档评分。用term查询计算出每个文档的评分。

使用match查询时，返回结果中文档的评分是和该文档中字段的内容长度有关的，即字段内容越短，评分就越高。
