---
title: 02-match多个词查询
url: https://www.yuque.com/gaollard/efekv4/tuzpdq
---

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
      "title": "flower dog" # 这里不支持数组啊 ["dog", "and"]
    }
  }
}
```

match查询必须查找两个单词（"flower"和"dog"），它在内部实际上先执行两次term查询，然后将两次查询的结果合并起来作为最终的查询结果
