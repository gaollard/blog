---
title: 07-段落匹配查询(match_phrase)
url: https://www.yuque.com/gaollard/efekv4/lm7e38
---

因为查询的时候两个内容之间有空格，所以被当作分隔符处理，查询内容被分词，如果想要查询的内容不被分词，可使用match\_phrase查询。

```shell
GET /userinfo_002/_search
{
   "query": { 
     "match_phrase": 
     { 
       "address": "中国 上海" 
     } 
   }
}
```
