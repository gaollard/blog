---
title: 04 Git 对 head 的理解
tags: Git
---

https://www.zsythink.net/archives/3412/ 这篇文章讲的非常详细。

1) 通常情况下 HEAD指针 ——–> 分支指针 ——–> 最新提交。也就是说，HEAD 指针总是通过分支指针，间接的指向了当前分支的最新提交。
2) 有些情况下，HEAD指针没有指向分支指针，而是直接指向了某个提交，这被称作 detached head 分离头。