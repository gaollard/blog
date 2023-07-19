---
title: 08-refresh-and-flush
url: https://www.yuque.com/gaollard/efekv4/mmp7p5
---



### Refresh

默认情况下，ES会每秒refresh一次，每次操作都会把内存缓冲区的内容拷贝到新创建的 segment 中去，这一步是在内存中操作的，这个时候新的文档就会被搜索了。也就是说ES是近实时性的搜索，差不多1s钟，才能让数据可以被搜索到。



### Flush

Flush操作意味着，所有在内存缓冲区的文档被写到新的 Lucene Segment 中，也就是所有在内存中的segment被提交到了磁盘，同时清除translog。



### 总结

- 一般Flush的时间间隔会比较久，默认30分钟，或者当translog达到了一定的大小，也会触发flush操作。
- refresh 操作是为了让最新的数据可以立即被搜索到，而 flush 操作则是为了让数据持久化到磁盘中，另外ES的搜索是在内存中处理的，因此Flush操作不影响数据能否被搜索到。
