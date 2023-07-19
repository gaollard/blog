---
title: 02-自定义与standard类似的分词器
url: https://www.yuque.com/gaollard/efekv4/lex3et
---

如果希望自定义一个与standard类似的分词器，用户只需要在原定义中配置参数即可。范例如下：

```shell
#创建索引映射，自定义一个分词器规则：根据关键字（keyword）类型分词，将单词全部转成小写
PUT custom_standard_analyzer_index
{
  "settings": {
    "analysis": {
      "analyzer": {
        "rebuild_analyzer":{
          "type":"keyword",          #根据关键字类型分词
          "tokenizer":"standard",
          "filter":["lowercase"]    #单词都转成小写
        }
      }
    }
  }
}

#对指定内容根据如上自定义的分词规则进行分词
POST custom_standard_analyzer_index/_analyze
{
  "text": "Our usual study and experience are our most powerful support at a critical moment"
}
```
