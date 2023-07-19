---
title: 03-keyword类型和text类型的区别
url: https://www.yuque.com/gaollard/efekv4/bypwst
---

- text字段类型会进行分词处理，然后根据分词后的单词建立倒排索引（反向索引），因而不支持聚合计算。
- keyword字段类型不会进行分词处理，直接根据字符串的内容建立倒排索引（反向索引），支持聚合计算和排序操作。
