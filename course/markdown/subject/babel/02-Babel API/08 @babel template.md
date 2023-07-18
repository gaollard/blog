---
title: 08 @babel template
---

- https://babeljs.io/docs/babel-template#templatesmart
- https://en.wikipedia.org/wiki/Quasi-quotation

@babel/template 是 Babel 内置工具，用于在 JS 代码中构建和生成 AST（抽象语法树）节点。
@babel/template 为 Babel 编译器提供了一个简洁、灵活和可定制化的方式来操作和生成 AST 节点。

它的作用主要有以下几个方面：

1. 自动生成AST：@babel/template 可以通过传入模板字符串和选项参数，自动解析并生成对应的AST节点。这样可以避免手动构建复杂的AST结构，提高了开发效率。
2. 代码生成：通过调用模板函数生成的AST，可以将其转换回JavaScript代码字符串。这在编写代码生成器或转换器时非常有用。
3. AST节点替换：@babel/template 还允许你在生成AST节点时，根据变量或条件情况动态替换其中的某些部分。这使得你可以根据需要生成不同的AST节点，从而实现更灵活的代码转换。

## 1、准引用介绍

quasiquotes 是一种在编程语言中引用代码片段的技术。它们允许程序员以一个类似于模式匹配的方式来处理代码，并在运行时构造和生成代码。

在实现 quasiquotes 的过程中，编程语言会提供一些特殊的语法或API，使得代码可以像数据一样进行引用和操作。这些 quasiquotes 通常包含一个模板，其中包含了一些占位符，程序员可以在需要的时候填充具体的值。

quasiquotes 广泛应用于元编程、宏系统和模板引擎等领域。它们可以简化代码的生成和转换过程，使得代码更加灵活和易于维护。

不同的编程语言可能有不同的实现方式和语法规则，但总体上都旨在提供一种方便的方式来处理代码片段，将其作为数据进行操纵和生成。

## 2、准引用演示

```typescript
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";

const buildRequire = template(`
  var %%importName%% = require(%%source%%);
`);

const ast = buildRequire({
  importName: t.identifier("myModule"),
  source: t.stringLiteral("my-module"),
});

console.log(generate(ast as t.Statement).code)
// var myModule = require("my-module");
```



## 3、API

### 3.1 .ast
如果没有使用占位符，并且您只需要一种简单的方法将字符串解析为 AST，则可以使用模板的 .ast 版本。

```js
const ast = template.ast(`
  var myModule = require("my-module");
`);
```

### 3.2

```js
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";

const source = "my-module";

const fn = template`
  var IMPORT_NAME = require('${source}');
`;

const ast = fn({
  IMPORT_NAME: t.identifier("myModule"),
});

// var myModule = require("my-module");
console.log(generate(ast as t.Statement).code);
```