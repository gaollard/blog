---
title: 05 @babel/runtime
tags: Babel
---

5、@babel/runtime

该库提供了一些运行时的帮助函数，避免了在每个文件中都定了一份帮助函数，而统一从 @babel/runtime 中引入。@babel/runtime 主要包含 运行时的 helpers 函数 以及 regenerator runtime。

babel-plugin-transform-runtime 和 babel-runtime 的区别：

- babel-plugin-transform-runtime 内部依赖了 babel-runtime