---
title: 03 使用 plugin 和 preset
tags: Babel
---

Babel 插件 和 Preset 是用于在 JavaScript 项目中进行代码转换的工具。

## 1、插件 和 Preset 有什么区别？

- 插件是针对 Babel 的具体功能的单个功能，例如“转换箭头函数为普通函数”，“转换 ES6 类成为普通函数”等，而 preset 则是包含另外一些插件的一个集合，这些插件共同完成一些相关的 tasks。

- 软件预设(packaged presets) 可以轻松地执行多项任务，而不必单独安装和配置多个插件。例如，@babel/preset-env 是一个预设，它帮助您将 ES6+代码转换为符合您指定的目标环境的 JavaScript 代码。

## 2、如何使用？

使用 Babel 插件和 Preset，您需要在项目中安装它们并配置 Babel。在您的项目根目录下创建一个 `.babelrc` 文件，为 Babel 提供配置。

### preset

例如，使用 preset-env 转换 ES6 +代码：

1. 安装 `@babel/preset-env`:

```
npm install --save-dev @babel/preset-env
```

2. 然后在 .babelrc 文件中配置：

```
{
  "presets": ["@babel/preset-env"]
}
```

这意味着在项目中的所有 ES6+代码都将被转换为适用于您的所需 JavaScript 环境的标准 JavaScript。

### plugin

```shell
yarn add --dev @babel/plugin-transform-arrow-functions
```

```
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

```js
const fn = () => 1;

// converted to
var fn = function fn() {
  return 1;
};
```

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

const plugins = [["@babel/plugin-transform-arrow-functions"]];

module.exports = { presets, plugins };
```
