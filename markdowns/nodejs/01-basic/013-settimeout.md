---
title: 013 setTimeout 实现原理
toc: true
tags: NodeJS
categories: 前端开发
---

不同的 Runtime 实现机制不一样，`setTimeout` 并不是 ECMA 的 API，而是 Web API，所以 V8 这类 JavaScript 引擎是不会帮你实现的，需要在 Runtime 中自行实现。 

- [`死月` 和 `王译锋` 回答](https://www.zhihu.com/question/463446982/answer/1927497540)
- [深入Linux C/C++ Timer定时器的实现核心原理](https://cloud.tencent.com/developer/article/1763594)