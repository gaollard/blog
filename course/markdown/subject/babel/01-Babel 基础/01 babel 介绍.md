---
title: 01 babel 介绍
tags: Babel
---

## 1、Babel 介绍

Babel 是一个开源的 JavaScript 编译器工具，用于将新版本的 JavaScript 代码转换为向后兼容的旧版本，以便在不同的浏览器和环境中运行。它可以将使用最新的 ECMAScript 标准编写的代码转换为支持更旧的版本，以便在不同的浏览器中运行。

## 2、Babel 版本

### 2.1 v6 VS v7
Babel V7 相对于 Babel V6来说，有以下几个主要的区别：

1. 命令行工具改进：V7 增加了一些新的命令行工具，如 `babel-upgrade` 和 `babel-merge` 等，这些工具让你更方便地维护Babel配置和升级到新的版本。

2. 插件新增：V7 在默认插件集合中新增了一些新的插件，如 `@babel/plugin-transform-runtime` 和 `@babel/plugin-proposal-class-properties` 等，这些插件为开发者提供更多的便利和控制力。

3. 配置文件更改：Babel V7 将配置文件名称从 `.babelrc` 更改为 `babel.config.js`，并支持更复杂的配置选项。

4. 匹配更多的 ECMAScript 特性：Babel V7 支持更多的 ECMAScript 特性，如对象的 Rest 和 Spread 属性，对象的解构赋值，Async 函数和模板字符串标记等。

Babel V7 相对于 Babel V6 的改进主要在于命令行工具、插件集合、配置文件和匹配更多的 ECMAScript 特性等方面。

### 2.2 V7.4.0
- @babel/polyfill 被弃用，取而代之的是 `"core-js/stable"`

### 2.3 v7.6.0
- 支持 TypeScript 命名空间的编译。

## 3、学习资料

### 3.1 官方文档

- babel 官方网 [https://babeljs.io/docs/en](https://babeljs.io/docs/en/)
- babel 中文网 [https://www.babeljs.cn/docs](https://www.babeljs.cn/docs/)

### 3.2 调试工具

- AST 在线 <https://astexplorer.net/#/2uBU1BLuJ1>
- babel 插件开发手册 <https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md>

### 3.3 实践经验
- babel 腾讯云社区文档 <https://cloud.tencent.com/developer/doc/1260> 介绍babel API
- 最简单 compiler 教程 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)
- [高级前端基础-JavaScript抽象语法树AST](https://segmentfault.com/a/1190000018532745) <https://segmentfault.com/a/1190000018532745>
- [AST抽象语法树——最基础的javascript重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512?utm_source=tag-newest#articleHeader10)
- [从零开始写一个wepy转VUE的工具](http://zzfed.com/#/detail/5c8efc30c476e35308705a5b)
- Babel是如何读懂JS代码的 <https://zhuanlan.zhihu.com/p/27289600>
- 网易云课堂 JS编译原理： [https://study.163.com/course/courseMain.htm?courseId=1209486877&*trace\_c\_p\_k2*=8ea58ce894c149179bd099a664c39d08](https://study.163.com/course/courseMain.htm?courseId=1209486877&_trace_c_p_k2_=8ea58ce894c149179bd099a664c39d08)