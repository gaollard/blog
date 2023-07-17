---
title: 07 preset react
tags: Babel
---

This preset always includes the following plugins:

- @babel/plugin-syntax-jsx
- @babel/plugin-transform-react-jsx
- @babel/plugin-transform-react-display-name

And with the development option:

Classic runtime adds:

- @babel/plugin-transform-react-jsx-self
- @babel/plugin-transform-react-jsx-source

```json
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
        "throwIfNamespace": false, // defaults to true
        "runtime": "classic" // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
      }
    ]
  ]
}
```

## @babel/plugin-syntax-jsx

@babel/plugin-syntax-jsx 是一个用于 Babel 的插件，它的作用是让 Babel 能够识别和转换 JSX 语法的代码。JSX 是一种 JavaScript 的语法扩展，它允许在 JavaScript 中编写类似于 HTML 的标记语言，用于构建用户界面。
在没有该插件的情况下，Babel 将无法理解 JSX 代码中的标签，会抛出错误。使用 @babel/plugin-syntax-jsx 插件后，Babel 将能够正确地解析并转换 JSX 语法到普通的 JavaScript 代码。

需要注意的是，该插件只是解析 JSX 语法，它并不会将 JSX 转化为真正的 DOM 操作。要将 JSX 转换为可用的 JavaScript 代码，需要使用其他的插件或工具，例如 @babel/preset-react 插件、React 或 Preact 库等。

## @babel/plugin-transform-react-jsx

@babel/plugin-transform-react-jsx 是一个用于 Babel 的插件，它的作用是将 JSX 语法转换为普通的 JavaScript 代码，以便 JavaScript 引擎能够识别和执行这些代码。
JSX 是一种 JavaScript 的语法扩展，它允许在 JavaScript 中编写类似于 HTML 的标记语言，用于构建用户界面。但是，由于 JavaScript 引擎不能直接执行 JSX 代码，因此需要将其转换为普通的 JavaScript 代码，以便能够在浏览器或 Node.js 等环境中执行。


## React 17 介绍全新的 JSX 转换 (React.createElement => jsx)

![20230518151443](http://s3.airtlab.com/blog/20230518151443.png)

![20230518151453](http://s3.airtlab.com/blog/20230518151453.png)

![20230518151506](http://s3.airtlab.com/blog/20230518151506.png)

![20230518151537](http://s3.airtlab.com/blog/20230518151537.png)

![20230518151556](http://s3.airtlab.com/blog/20230518151556.png)