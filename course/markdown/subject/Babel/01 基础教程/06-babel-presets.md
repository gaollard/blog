---
title: 06 babel presets
tags: Babel
---

presets 是一些 plugins 的集合。


## 1、官方 Presets

- [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)
- [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)
- [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)

## 2、实验阶段 Presets

- [Stage 0](https://babeljs.io/docs/en/babel-preset-stage-0) - Strawman: just an idea, possible Babel plugin.
- [Stage 1](https://babeljs.io/docs/en/babel-preset-stage-1) - Proposal: this is worth working on.
- [Stage 2](https://babeljs.io/docs/en/babel-preset-stage-2) - Draft: initial spec.
- [Stage 3](https://babeljs.io/docs/en/babel-preset-stage-3) - Candidate: complete spec and initial browser implementations.
- Stage 4 - Finished: will be added to the next yearly release.

## 3、自定义 presets

```javascript
module.exports = function() {
  return {
    plugins: [
      "pluginA",
      "pluginB",
      "pluginC",
    ]
  };
}
```

presets 中也可以包含其他 presets：

```javascript
module.exports = () => ({
  presets: [
    require("@babel/preset-env"),
  ],
  plugins: [
    [require("@babel/plugin-proposal-class-properties"), { loose: true }],
    require("@babel/plugin-proposal-object-rest-spread"),
  ],
});
```

使用 presets:

```javascript
// 非 node_modules
{
  "presets": ["./myProject/myPreset"]
}

// node_modules 下
{
  "presets": ["babel-preset-myPreset"]
}
```