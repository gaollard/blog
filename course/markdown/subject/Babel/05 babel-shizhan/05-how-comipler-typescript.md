---
title: 05 如何编译 typescript
---

- 如果没有使用 Babel，首选 TypeScript 自带编译器（配合 ts-loader 使用）
- 如果项目中有 Babel，安装 @babel/preset-typescript，配合 tsc 做类型检查。

两种编译器不要混用。参考 https://juejin.cn/post/6954304242093932557#heading-7