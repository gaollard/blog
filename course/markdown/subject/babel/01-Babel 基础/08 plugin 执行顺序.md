---
title: 08 plugin 执行顺序
tags: Babel
---

babel 插件按顺序执行，那么插件的先后顺序是如何决定的呢？比如在一个项目中使用 React 和 Typescript，那么识别 ts 的语法插件在前面，还是识别 jsx 的语法的插件在前面？

- Plugin 会运行在 Preset 之前。
- Plugin 会从前到后顺序执行。
- Preset 的顺序则 刚好相反(从后向前)。

很明显，谁在前，谁就得支持两种语法，`@babel/preset-typescript` 已经支持了 jsx 语法

![20230705145919](http://s3.airtlab.com/blog/20230705145919.png)

`@babel/preset-typescript` 底层依赖，plugin-syntax-typescript 