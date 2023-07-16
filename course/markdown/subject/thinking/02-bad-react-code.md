---
title: 02 这个 React 代码没法看
---

最近在帮另外一个小组的同事做一个技术项目，他原本的主要工作偏向后台开发，第一次写 React 代码，当我接手这个项目傻眼了。

首先这个项目本身并不简单，他还是很厉害的，但是代码写的实在是难以理解。特别是层级很深的 prop 传递 (很多 6/7 层)，以及很多匿名的组件，导致当我想找到页面上某个视图所对应的文件时，根本无从下手啊，也可能有其他我不知道的姿势，如果你知道，麻烦告诉我 😂。

虽然无副作用的函数，从架构设计上来讲是最优的，但是在 UI 开发领域，当组件深度太大时，代码不容易理解，心智负担大。

我想到办法可以将页面抽象为一个树，我可以查看树上的任意一个节点的依赖 和 被依赖，具体有几个点：

- (1) 从入口分析代码，解析出一个树 或者 多个树，和 webpack 的依赖树差不多
- (2) 在开发模式下，当我的鼠标悬浮在页面某个节点时，会在侧边提示器代码所在文件

举个例子：

```tsx
const Box = (
  <div>
    <div>hello world</div>
    <div>hello world</div>
  </div>
);
```

=>

```tsx
const Box = (
  <div data-file="src/components/Box.tsx">
    <div>hello world</div>
    <div>hello world</div>
  </div>
);

// 或者
const Box = (
  <div data-file="src/components/Box.tsx">
    <div data-file="src/components/Box.tsx">hello world</div>
    <div data-file="src/components/Box.tsx">hello world</div>
  </div>
);
```

在每个组件的根标签 或者 所有标签加一个 data-code 属性

![20230511222239](http://s3.airtlab.com/blog/20230511222239.png)

插件代码非常简单：

```js
const types = require("@babel/types");

module.exports = function () {
  return {
    visitor: {
      JSXOpeningElement(path) {
        const t = types;
        const _this = this;

        if (
          !path.parent.openingElement.name ||
          !["div", "span", "p", "ul", "li"].includes(
            path.parent.openingElement.name.name
          )
        ) {
          return;
        }

        const existingProp = path.node.attributes.find(
          (node) => node.name && node.name.name === "data-code"
        );

        if (existingProp) {
          existingProp.node.value.value === "data-code";
          return;
        }

        const newProp = t.jSXAttribute(
          t.jSXIdentifier("data-code"),
          t.stringLiteral(_this.filename)
        );

        path.node.attributes.push(newProp);
      },
    },
  };
};
```
