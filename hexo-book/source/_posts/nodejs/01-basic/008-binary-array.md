---
title: 008 了解二进制数组
---

目前笔者很少有使用到相关API，仅做了解。

## 1. 二进制数组的由来
为了满足 JavaScript 与显卡之间大量的、实时的数据交换，它们之间的数据通信必须是二进制的，而不能是传统的文本格式。文本格式传递一个32位整数，两端的 JavaScript 脚本与显卡都要进行格式转化，将非常耗时。这时要是存在一种机制，可以像 C 语言那样，直接操作字节，将4个字节的32位整数，以二进制形式原封不动地送入显卡，脚本的性能就会大幅提升。

比如 WebGL 相关接口的调用。

二进制数组主要有三个对象：
- ArrayBuffer
- TypedArray
- DataView

参考文章：
- [JS操作内存？二进制数组了解一下](https://www.bilibili.com/read/cv4386302/)
- [ArrayBuffer 介绍](https://wizardforcel.gitbooks.io/es6-tutorial-3e/content/docs/arraybuffer.html)