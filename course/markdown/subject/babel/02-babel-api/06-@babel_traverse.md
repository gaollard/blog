---
title: 06 @babel/traverse
tags: Babel
---

## 预备知识

### Paths（路径）

AST 通常会有许多节点，那么节点直接如何相互关联呢？ 我们可以使用一个可操作和访问的巨大可变对象表示节点之间的关联关系，或者也可以用Paths（路径）来简化这件事情。Path 是表示两个节点之间连接的对象。例如，如果有下面这样一个节点及其子节点︰

```json
{
  "parent": {
    "type": "FunctionDeclaration",
    "id": {...},
    ....
  },
  "node": {
    "type": "Identifier",
    "name": "square"
  }
}
```

同时它还包含关于该路径的其他元数据：

```json
{
  "parent": {...},
  "node": {...},
  "hub": {...},
  "contexts": [],
  "data": {},
  "shouldSkip": false,
  "shouldStop": false,
  "removed": false,
  "state": null,
  "opts": null,
  "skipKeys": null,
  "parentPath": null,
  "context": null,
  "container": null,
  "listKey": null,
  "inList": false,
  "parentKey": null,
  "key": null,
  "scope": null,
  "type": null,
  "typeAnnotation": null
}
```

当然路径对象还包含添加、更新、移动和删除节点有关的其他很多方法，稍后我们再来看这些方法。在某种意义上，路径是一个节点在树中的位置以及关于该节点各种信息的响应式 **Reactive** 表示。 当你调用一个修改树的方法后，路径信息也会被更新。 Babel 帮你管理这一切，从而使得节点操作简单，尽可能做到无状态。

### Paths in Visitors（访问者中的路径）

当你有一个 `Identifier()` 成员方法的访问者时，你实际上是在访问路径而非节点。 通过这种方式，你操作的就是节点的响应式表示（译注：即路径）而非节点本身。

```json
const MyVisitor = {
  Identifier(path) {
    console.log("Visiting: " + path.node.name);
  }
};
```

## Visiting 访问

### Get the Path of Sub-Node

为了得到一个AST节点的属性值，我们一般先访问到该节点，然后利用 path.node.property 方法即可： <a name="kxNY7"></a>

## 转换操作

### 访问

#### 获取子节点的Path

为了得到一个AST节点的属性值，我们一般先访问到该节点，然后利用 `path.node.property` 方法即可：

```javascript
// 获取子节点的Path
// 下面的例子遍历所有 BinaryExpression, 这里只有一个

import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  BinaryExpression(path) {
    console.log(path.node.left) // Identifier Node
    console.log(path.node.right) // Identifier Node
    console.log(path.node.operator) // "*"
  }
});
```

#### 检查节点的类型

```js
// 改变函数参数的例子

import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import helpers from '@babel/helpers';
import * as t from '@babel/types';

const code = `function square(n) {
  return n * fn(n);
}`;

const ast = parser.parse(code);

traverse(ast, {
  BinaryExpression(path) {
    // path.node.left: Identifier 标识符
    // path.node.right: CallExpression 函数调用表达式
    if(t.isIdentifier(path.node.left)) {
      console.log(path.node)
    }
  }
});
```

#### 检查路径（Path）类型

```javascript
BinaryExpression(path) {
  if (path.get('left').isIdentifier({ name: "n" })) {
    // ...
  }
}

// 相当于
BinaryExpression(path) {
  if (t.isIdentifier(path.node.left, { name: "n" })) {
    // ...
  }
}
```

#### 检查标识符（Identifier）是否被引用

```javascript
// 改变函数参数的例子

import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';
import * as t from '@babel/types';

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  Identifier(path) {
    if (path.isReferencedIdentifier()) {
      // console.log(path.node)
    }
  }
});
```

## 演示例子

### 修改函数参数

```javascript
// 改变函数参数的例子

import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from '@babel/generator';

const code = `function square(n) {
  return n * n;
}`;

const ast = parser.parse(code);

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  }
});

const output = generate(ast, { /* options */ }, code);

console.log(output.code);

// function square(x) {
//   return x * x;
// }
```
