---
title: 05 cherry-pick
tags: Git
---

(1) 拷贝依赖缺失
cherry-pick 可以拷贝一次 commit 信息，如果你在分支 A 拷贝来自分支 B 的 commit id m1, 但是在代码上 m1 依赖了B分支的 m2，那么这个操作是错误的。