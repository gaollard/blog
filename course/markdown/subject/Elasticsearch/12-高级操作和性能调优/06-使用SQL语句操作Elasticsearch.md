---
title: 06-使用SQL语句操作Elasticsearch
url: https://www.yuque.com/gaollard/efekv4/qusmsi
---

    #数据准备
    POST /sqldbindex/_doc
    {
      "name":"clay",
      "age":18,
      "address":"江苏省",
      "birth":"1998-01-0"
    }

    POST /sqldbindex/_doc
    {
      "name":"jick",
      "age":17,
      "address":"江苏省",
      "birth":"1999-01-0"
    }

    #使用SQL操作Elasticsearch中的数据
    POST /_xpack/sql?format=txt
    {
      "query":"select * from sqldbindex"
    }

<!---->

    #! Deprecation: [POST /_xpack/sql] is deprecated! Use [POST /_sql] instead.
        address    |      age      |     birth     |     name      
    ---------------+---------------+---------------+---------------
    江苏省            |18             |1998-01-0      |clay           
    江苏省            |17             |1999-01-0      |jick

<!---->

    #使用SQL操作Elasticsearch中的数据
    POST /_sql
    {
      "query":"select * from sqldbindex"
    }

<!---->

    {
      "columns" : [
        {
          "name" : "address",
          "type" : "text"
        },
        {
          "name" : "age",
          "type" : "long"
        },
        {
          "name" : "birth",
          "type" : "text"
        },
        {
          "name" : "name",
          "type" : "text"
        }
      ],
      "rows" : [
        [
          "江苏省",
          18,
          "1998-01-0",
          "clay"
        ],
        [
          "江苏省",
          17,
          "1999-01-0",
          "jick"
        ]
      ]
    }

需要注意的是，SQL语句中的表名称就是Elasticsearch中索引库的名称。只要懂SQL语句，就能很方便地操作Elasticsearch。sum函数和count函数的使用如图11-4所示。

    #使用SQL操作Elasticsearch中的数据
    POST /_sql
    {
      "query":"select name as ns from sqldbindex"
    }

![](https://s3.airtlab.com/elasticsearch/20220430221524.png)
