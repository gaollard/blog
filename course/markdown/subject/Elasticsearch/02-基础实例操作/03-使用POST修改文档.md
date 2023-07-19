---
title: 03-使用POST修改文档
url: https://www.yuque.com/gaollard/efekv4/bgd3ne
---

前面的范例中我们直接使用 `PUT` 根据 `_id` 对文档内容进行修改，`Elasticsearch` 也支持使用 `POST` 对文档进行修改，语法如下：

![](https://s3.airtlab.com/elasticsearch/20220427121959.png)

- PUT执行修改操作时，会对文档的整个内容进行替换。
- POST执行修改操作时，如果字段在文档中，则修改此字段的值；如果字段不在文档中，则把此字段加入文档信息中。
