---
title: 04-runtime_mappings & script_fields
url: https://www.yuque.com/gaollard/efekv4/ma5lc7
---

```typescript
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "UiPsXoMByQPvkdn1ZDUN",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 1
        }
      },
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "UyPsXoMByQPvkdn1eTUO",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 2
        }
      },
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "VCPsXoMByQPvkdn1pTWj",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 0
        }
      }
    ]
  }
}
```



### 1、runtime\_mappings

如果需要对布尔值进行转换，可以使用“运行时”脚本来处理，范例如下：

```json
GET index_02/_search
{
  "fields": [
    {"field": "weight"}
  ],
  "runtime_mappings": {
    "weight": {
      "type": "long",
      "script": "emit(doc['is_published'].value > 1 ? 1: 0)"
    }
  },
  "query": {
    "term": {
      "weight": {
        "value": 0
      }
    }
  }
}
```

```json
{
  "took" : 4,
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
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "UiPsXoMByQPvkdn1ZDUN",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 1
        },
        "fields" : {
          "weight" : [
            0
          ]
        }
      },
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "VCPsXoMByQPvkdn1pTWj",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 0
        },
        "fields" : {
          "weight" : [
            0
          ]
        }
      }
    ]
  }
}

```



### 2、script\_fileds

<https://www.elastic.co/guide/en/elasticsearch/reference/8.2/search-fields.html#script-fields>

```json
GET index_02/_search
{
  "query": {
    "match_all": {}
  },
  "script_fields": {
    "test1": {
      "script": {
        "lang": "painless",
        "source": "doc['is_published'].value * 2"
      }
    }
  },
  "_source": ["is_published"]
}
```

```json
#! Elasticsearch built-in security features are not enabled. Without authentication, your cluster could be accessible to anyone. See https://www.elastic.co/guide/en/elasticsearch/reference/7.17/security-minimal-setup.html to enable security.
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "UiPsXoMByQPvkdn1ZDUN",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 1
        },
        "fields" : {
          "test1" : [
            2
          ]
        }
      },
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "UyPsXoMByQPvkdn1eTUO",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 2
        },
        "fields" : {
          "test1" : [
            4
          ]
        }
      },
      {
        "_index" : "index_02",
        "_type" : "_doc",
        "_id" : "VCPsXoMByQPvkdn1pTWj",
        "_score" : 1.0,
        "_source" : {
          "is_published" : 0
        },
        "fields" : {
          "test1" : [
            0
          ]
        }
      }
    ]
  }
}
```
