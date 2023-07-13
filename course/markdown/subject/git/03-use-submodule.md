---
title: 03 Git 使用 submodule
tags: Git
---

## submodule 的使用

- 参考文档 [https://git-scm.com/book/zh/v2/Git-工具-子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

```bash
usage: git submodule [--quiet] [--cached]
   or: git submodule [--quiet] add [-b <branch>] [-f|--force] [--name <name>] [--reference <repository>] [--] <repository> [<path>]
   or: git submodule [--quiet] status [--cached] [--recursive] [--] [<path>...]
   or: git submodule [--quiet] init [--] [<path>...]
   or: git submodule [--quiet] deinit [-f|--force] (--all| [--] <path>...)
   or: git submodule [--quiet] update [--init] [--remote] [-N|--no-fetch] [-f|--force] [--checkout|--merge|--rebase] [--[no-]recommend-shallow] [--reference <repository>] [--recursive] [--[no-]single-branch] [--] [<path>...]
   or: git submodule [--quiet] set-branch (--default|--branch <branch>) [--] <path>
   or: git submodule [--quiet] set-url [--] <path> <newurl>
   or: git submodule [--quiet] summary [--cached|--files] [--summary-limit <n>] [commit] [--] [<path>...]
   or: git submodule [--quiet] foreach [--recursive] <command>
   or: git submodule [--quiet] sync [--recursive] [--] [<path>...]
   or: git submodule [--quiet] absorbgitdirs [--] [<path>...]
```

### 1、添加子模块

```shell
# 添加子模块
git submodule add git@github.com:gaollard/test_submodule_B.git  projectB

# 可设置子模块在当前项目的相对路径
git submodule add http://test.com/backend src/vendor/
```

### 2、检出项目的指定版本

```shell
# 检出项目的指定版本(HEAD), 注意它并不是指向一个分支
git submodule update
```

### 3、拉取项目时拉取子模块

```shell
# 可在拉取项目时把依赖的子模块同时拉取下来
git clone –recursive
```

### 4、submodule ignore 选项

```
untracked ：忽略在子模块B(projectB目录)新添加的，未受版本控制内容
dirty     ：忽略对projectB目录下受版本控制的内容进行了修改
all       ：同时忽略untracked和dirty
```

### 5、modified: XXX (new commits)

说明当前主仓库依赖的 HEAD 和 本地仓库提交不匹配了，这个时候要特别注意。

- 如果希望使用旧的 `HEAD`，使用 `git submodule update`；
- 如果希望使用新的 `HEAD`，那么就 `git add` 提交代码；

### 6、git submodule update --remote

更新子模块为远程项目的最新版本

### 7、init & update

```shell
git submodule init
git submodule update

# 合并
git submodule update --init
```

### 8、git submodule update --remote
更新为远程

### 9、submodule 冲突怎么办
submodule 冲突时，应先合并 submodule, 再来合并主仓库