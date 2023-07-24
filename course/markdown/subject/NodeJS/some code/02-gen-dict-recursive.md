---
title: 02 创建多层目录
toc: true
tags: nodejs-scripts
categories: NodeJS
---

```js
const fs = require("fs");

var dir = "/Users/user/Desktop/gaollard-blog/t1/t2/t3.md";

function createDir(dir, prev) {
  const list = dir.split("/").filter((el) => el);
  const [first, ...arg] = list;
  const _dir = `${prev || ""}/${first}`;

  try {
    const stat = fs.statSync(_dir);
  } catch (e) {
    fs.mkdirSync(_dir);
  }

  if (arg.length) {
    createDir(arg.join("/"), _dir);
  }
}

createDir(dir);
```