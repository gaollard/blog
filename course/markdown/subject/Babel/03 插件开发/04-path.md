---
title: 04 Path 路径
url: https://www.yuque.com/gaollard/ubc1q5/yhzw27
---

<a name="jNaIt"></a>

### 1、Path 介绍

![20230608092337](http://s3.airtlab.com/blog/20230608092337.png)

***

![20230608092353](http://s3.airtlab.com/blog/20230608092353.png)

### 2、Paths in Visitors（存在于访问者中的路径）

![20230608092412](http://s3.airtlab.com/blog/20230608092412.png)

### 3、demo 演示

```javascript
const fs = require('fs');
const babel = require("@babel/core");

const MyVisitor = {
  Identifier(path) {
    console.log("Visiting: " + path.node.name);
  }
};

function MyPlugin() {
  return {
    visitor: MyVisitor
  }
}

var res = babel.transformSync("var code = 1; var fn = () => {}", {
  ast: true,
  plugins: [
    require('@babel/plugin-transform-arrow-functions'),
    MyPlugin
  ]
});

console.log(res.code);
```
