---
title: 05 plugin ES2016
tags: Babel
---

## 1、ES2016

### [exponentiation-operator](https://babeljs.io/docs/en/babel-plugin-transform-exponentiation-operator)

新增指数运算法

```javascript
// in
let x = 10 ** 2;

x **= 3;

// out
let x = Math.pow(10, 2);
x = Math.pow(x, 3);
```

## 2、ES2017

### [async-to-generator](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator)

将 async 转换为 generator

```javascript
// in
async function foo() {
  await bar();
}

// out
var _asyncToGenerator = function (fn) {
  ...
};

var foo = _asyncToGenerator(function* () {
  yield bar();
});
```


## 3、ES2018

### [external-helpers](https://babeljs.io/docs/en/babel-plugin-external-helpers)

内部帮助函数

### [object-assign](https://babeljs.io/docs/en/babel-plugin-transform-object-assign)

```javascript
// in 
Object.assign(a, b);

// out
var _extends = ...;

_extends(a, b);
```

### [regenerator](https://babeljs.io/docs/en/babel-plugin-transform-regenerator)

这是 facebook 下的一个工具，用于编译 ES6 的 generator 函数，一篇非常好的文章见：<https://www.jianshu.com/p/17a4c00d5831> <a name="uzkyg"></a>

![20230608110538](http://s3.airtlab.com/blog/20230608110538.png)

### [runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

runtime 库，用于重用 @babel/runtime 代码.

### [strict-mode](https://babeljs.io/docs/en/babel-plugin-transform-strict-mode)

编译为严格模式

```javascript
// in
foo();

// out
"use strict";

foo();
```

## Modules 模块处理

- [modules-amd](https://babeljs.io/docs/en/babel-plugin-transform-modules-amd)
- [modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs)
- [modules-systemjs](https://babeljs.io/docs/en/babel-plugin-transform-modules-systemjs)
- [modules-umd](https://babeljs.io/docs/en/babel-plugin-transform-modules-umd)

### Experimental

- [class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)

扩展类的属性定义

```javascript
class Bork {
    //Property initializer syntax
    instanceProperty = "bork";

    boundFunction = () => {
      return this.instanceProperty;
    };

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    };
}
```

- [decorators](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)

装饰器的支持

```javascript
@annotation
class MyClass { }

function annotation(target) {
   target.annotated = true;
}
```

- [do-expressions](https://babeljs.io/docs/en/babel-plugin-proposal-do-expressions)

do 表达式

```javascript
let a = do {
  if(x > 10) {
    'big';
  } else {
    'small';
  }
};
// is equivalent to:
let a = x > 10 ? 'big' : 'small';
```

- [export-default-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-default-from)

快捷到出

```javascript
export v from 'mod';
```

- [export-namespace-from](https://babeljs.io/docs/en/babel-plugin-proposal-export-namespace-from)

快捷导出重命名

```javascript
export * as ns from 'mod';
```

- [function-bind](https://babeljs.io/docs/en/babel-plugin-proposal-function-bind)

快捷的函数 context 绑定

```javascript
obj::func
// is equivalent to:
func.bind(obj)
```

- [function-sent](https://babeljs.io/docs/en/babel-plugin-proposal-function-sent)
- [logical-assignment-operators](https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators)
- [nullish-coalescing-operator](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator)
- [numeric-separator](https://babeljs.io/docs/en/babel-plugin-proposal-numeric-separator)
- [optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)
- [partial-application](https://babeljs.io/docs/en/babel-plugin-proposal-partial-application)
- [pipeline-operator](https://babeljs.io/docs/en/babel-plugin-proposal-pipeline-operator)
- [private-methods](https://babeljs.io/docs/en/babel-plugin-proposal-private-methods)
- [throw-expressions](https://babeljs.io/docs/en/babel-plugin-proposal-throw-expressions)
- [private-property-in-object](https://babeljs.io/docs/en/babel-plugin-proposal-private-property-in-object)


## React 相关语法

- [react-constant-elements](https://babeljs.io/docs/en/babel-plugin-transform-react-constant-elements)
- [react-display-name](https://babeljs.io/docs/en/babel-plugin-transform-react-display-name)
- [react-inline-elements](https://babeljs.io/docs/en/babel-plugin-transform-react-inline-elements)
- [react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
- [react-jsx-compat](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-compat)
- [react-jsx-self](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-self)
- [react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source)
