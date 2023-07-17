---
title: 07 State（状态）
url: https://www.yuque.com/gaollard/ubc1q5/prgac1
---

状态是抽象语法树AST转换的敌人，状态管理会不断牵扯你的精力，而且几乎所有你对状态的假设，总是会有一些未考虑到的语法最终证明你的假设是错误的。
考虑下列代码：

```javascript
function square(n) {
  return n * n;
}
```

让我们写一个把 n 重命名为 x 的访问者的快速实现:

```javascript
let paramName;

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    paramName = param.name;
    param.name = "x";
  },

  Identifier(path) {
    if (path.node.name === paramName) {
      path.node.name = "x";
    }
  }
};
```

对上面的例子代码这段访问者代码也许能工作，但它很容易被打破：

```javascript
function square(n) {
  return n * n;
}
n;
```

更好的处理方式是使用递归，下面让我们来像克里斯托佛·诺兰的电影盗梦空间那样来把一个访问者放进另外一个访问者里面:

```javascript
const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = "x";
    }
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = "x";

    path.traverse(updateParamNameVisitor, { paramName });
  }
};

path.traverse(MyVisitor);
```

注意例子中 `path.traverse(updateParamNameVisitor, { paramName })` 第二个参数，在 visitor 中通过 this 可以访问。

这个例子演示了如何从访问者中消除全局状态。
