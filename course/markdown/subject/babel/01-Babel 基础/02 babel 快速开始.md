---
title: 02 babel 快速开始
tags: Babel
---

## 1、初始化配置

```shell
yarn add --dev @babel/core @babel/cli @babel/preset-env
```

- @babel/core 提供了基本功能，包括 AST 解析 以及 AST visit
- @babel/cli 是一个命令行工具
- @babel/preset-env 是一个插件集合

**创建配置文件**

```js
const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

```
./node_modules/.bin/babel src --out-dir lib
```

## 2、配置文件说明

- 项目范围的配置
  - `babel.config.*` 文件，具有以下扩展名：.json, .js, .cjs, .mjs, .cts.
- 文件相关配置
  - `.babelrc.*` 文件，具有以下扩展名：.json, .js, .cjs, .mjs, .cts.
  - `.babelrc` 文件，没有扩展名。
  - `package.json` 文件，"babel" key

https://babeljs.io/docs/config-files 在这里了解他们的区别，我们应该用哪种？