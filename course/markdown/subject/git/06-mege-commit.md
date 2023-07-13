---
title: 06 Git 合并多个 commit
tags: Git
---

## 1、合并方式
- 使用 git rebase -i head~{number} 不会产生新的 commit
- 使用 git reset 会产生新的 commit (更不友好的做法)

## 2、坏味道
`git rebase` 这种方式需要强制推送，它是一种坏味道做法，最好通知到项目的组员