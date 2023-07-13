---
title: 03 CPP + Mysql 不容易
tags: CPP
---

根据 Mysql 的查询协议，field packet 记录了字段的所有信息。难点在于哪里呢？业务统一查询层很蹩脚。首先统一查询的结果返回一个列表`Vector<map<string, value>>`，有些字段的类型为 varchar, 有些是 int，但是 map 的 value 不支持多个类型。

所以有的做法是返回 `Vector<map<string, string>>`，上游可以再根据这个结果序列化为 `Vector<CustomStruct>`