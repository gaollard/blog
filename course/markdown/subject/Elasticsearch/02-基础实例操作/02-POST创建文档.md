---
title: 02-POST创建文档
url: https://www.yuque.com/gaollard/efekv4/wn65sx
---

通过 POST 进行文档插入时，用户不需要关注 \_id 字段值（系统会自动生成唯一的\_id字段值），操作语法如下：

![](https://s3.airtlab.com/elasticsearch/20220427121812.png)

在使用POST新增文档的时候不能指定文档\_id（主键字段），只能由系统自动生成。
