---
title: 06-使用GET查询
url: https://www.yuque.com/gaollard/efekv4/nvraar
---

GET语句不仅可以查询文档信息，还可以查询服务中所有的索引库以及索引库的结构信息。如下是常用的GET查询语句。

```shell
#根据_id查询文档详情
GET索引库名称/_doc/文档_id

#查询指定索引库中所有的文档信息
GET索引库名称/_doc/_search

#查询当前集群中所有的索引库信息
GET /_cat/indices

#查询当前集群中所有的别名索引信息
GET /_cat/aliases

#查询当前集群的颜色信息
GET /_cat/health

#查询当前集群中主节点的信息
GET /_cat/master

#查询当前集群中所有的节点信息
GET /_cat/nodes

#查询当前集群中索引分片的信息
GET /_cat/shards

#查询当前集群的健康状态
GET _cluster/health?pretty=true

#查询当前集群的运行状态信息
GET _cluster/stats?pretty

#查询当前集群中所有节点的监控信息
GET _nodes/stats?pretty

#查询当前集群中所有索引的监控信息
GET _stats?pretty
```
