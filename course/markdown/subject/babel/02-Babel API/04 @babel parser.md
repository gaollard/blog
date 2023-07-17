---
title: 04 @babel parser
tags: Babel
---

## 1、@babel/parser 是什么

@babel/parser 主要的任务是将源代码生成AST抽象语法树。按照官网的介绍，@babel/parser 应该在 [acorn](https://github.com/marijnh/acorn) 和 [acorn-jsx](https://github.com/RReverser/acorn-jsx) 的基础上开发的，虽然 @babel/parser 的源码没有依赖 acorn 模块，其中 acorn 主要包含以下3个模块：

> - [acorn](https://github.com/acornjs/acorn/blob/master/acorn/): The main parser 主要的解释器
> - [acorn-loose](https://github.com/acornjs/acorn/blob/master/acorn-loose/): The error-tolerant parser 错误处理
> - [acorn-walk](https://github.com/acornjs/acorn/blob/master/acorn-walk/): The syntax tree walker 语法树的遍历

## 2、@babel/parser 源码定义

在 @babel/parser 的 d.ts 文件可以看到，它只提供了两个方法：
![20230608023126](http://s3.airtlab.com/blog/20230608023126.png)

```typescript
/**
 * Parse the provided code as an entire ECMAScript program.
 * 解析完整的 ECMAScript 程序
 */
export function parse(input: string, options?: ParserOptions): import('@babel/types').File;

/**
 * Parse the provided code as a single expression.
 * 仅仅解析 ECMAScript 表达式
 */
export function parseExpression(input: string, options?: ParserOptions): import('@babel/types').Expression;
```

除此之外还提供了一些 type：

- ParserOptions
- ParserPlugin
- ParserPluginWithOptions
- DecoratorsPluginOptions
- PipelineOperatorPluginOptions
- FlowPluginOptions <a name="zJB8k"></a>

## 3、API

### 3.1、parse(code, \[options])

解析完整的 ECMAScript 程序

```typescript
const parser = require('@babel/parser');
// console.log(parser.parse('const name = 123'))
console.log(JSON.stringify(parser.parse('const name = 123')))
```

解析后的语法树为：

```javascript
{
	"type": "File",
	"start": 0,
	"end": 16,
	"loc": {
		"start": {
			"line": 1,
			"column": 0
		},
		"end": {
			"line": 1,
			"column": 16
		}
	},
	"errors": [],
	"program": {
		"type": "Program",
		"start": 0,
		"end": 16,
		"loc": {
			"start": {
				"line": 1,
				"column": 0
			},
			"end": {
				"line": 1,
				"column": 16
			}
		},
		"sourceType": "script",
		"interpreter": null,
		"body": [{
			"type": "VariableDeclaration",
			"start": 0,
			"end": 16,
			"loc": {
				"start": {
					"line": 1,
					"column": 0
				},
				"end": {
					"line": 1,
					"column": 16
				}
			},
			"declarations": [{
				"type": "VariableDeclarator",
				"start": 6,
				"end": 16,
				"loc": {
					"start": {
						"line": 1,
						"column": 6
					},
					"end": {
						"line": 1,
						"column": 16
					}
				},
				"id": {
					"type": "Identifier",
					"start": 6,
					"end": 10,
					"loc": {
						"start": {
							"line": 1,
							"column": 6
						},
						"end": {
							"line": 1,
							"column": 10
						},
						"identifierName": "name"
					},
					"name": "name"
				},
				"init": {
					"type": "NumericLiteral",
					"start": 13,
					"end": 16,
					"loc": {
						"start": {
							"line": 1,
							"column": 13
						},
						"end": {
							"line": 1,
							"column": 16
						}
					},
					"extra": {
						"rawValue": 123,
						"raw": "123"
					},
					"value": 123
				}
			}],
			"kind": "const"
		}],
		"directives": []
	},
	"comments": []
}
```

### 3.2、parseExpression(code, \[options])

仅仅解析 ECMAScript 表达式

### 3.3、options

- allowImportExportEverywhere：默认情况下，import 并 export 声明只能出现在一个程序的 top level scope。将此选项设置为true允许在任何位置使用。
- allowAwaitOutsideFunction：默认情况下，await 仅允许在异步函数内部使用，或者当 topLevelAwait 插件被启用后，在模块的 top level scope 内使用。将其设置为 true，则在脚本的 top-level scope 内可使用。
- allowReturnOutsideFunction：默认情况下，顶层的 return 语句会引发错误。设置 true 为接受这样的代码。

下面的代码将会引发错误：

```typescript
const parser = require('@babel/parser');
// console.log(JSON.stringify(parser.parse('const name = 123')))

console.log(JSON.stringify(parser.parse('return 6', {
  allowReturnOutsideFunction: false
})))
```

![20230608023157](http://s3.airtlab.com/blog/20230608023157.png)

设置 allowReturnOutsideFunction 为 true，将不会报错。

- **allowSuperOutsideMethod**

默认情况下，super 不允许在类和对象方法之外使用，设置 true 为接受这样的代码

- **allowUndeclaredExports**

默认情况下，导出在当前模块作用域中未声明的标识符将引发错误。尽管 ECMAScript 模块规范要求此行为，但Babel 的解析器无法在以后可能会插入适当声明的插件管道中预期转换，因此有时设置此选项`true`以防止解析器过早地抛出异常未声明的导出会很重要。

## 4、Output

Babel解析器根据 [Babel AST格式](https://github.com/babel/babel/tree/master/packages/babel-parser/ast/spec.md) 生成AST 。它基于 [ESTree规范](https://github.com/estree/estree)，但存在以下差异：

![20230608023257](http://s3.airtlab.com/blog/20230608023257.png)

## 5、Plugins
### 5.1、语言插件

| Name | Code Example |
| --- | --- |
| `flow`
&#x20;([repo](https://github.com/facebook/flow)) | `var a: string = "";` |
| `flowComments`
&#x20;([docs](https://flow.org/en/docs/types/comments/)) | `/*:: type Foo = {...}; */` |
| `jsx`
&#x20;([repo](https://facebook.github.io/jsx/)) | `<a attr="b">{s}</a>` |
| `typescript`
&#x20;([repo](https://github.com/Microsoft/TypeScript)) | `var a: string = "";` |
| `v8intrinsic` | `%DebugPrint(foo);` |


### 5.2、ECMAScript [proposals](https://github.com/babel/proposals)

| Name | Code Example |
| --- | --- |
| `asyncGenerators`
&#x20;([proposal](https://github.com/tc39/proposal-async-iteration)) | `async function*() {}`
, `for await (let a of b) {}` |
| `bigInt`
&#x20;([proposal](https://github.com/tc39/proposal-bigint)) | `100n` |
| `classProperties`
&#x20;([proposal](https://github.com/tc39/proposal-class-public-fields)) | `class A { b = 1; }` |
| `classPrivateProperties`
&#x20;([proposal](https://github.com/tc39/proposal-private-fields)) | `class A { #b = 1; }` |
| `classPrivateMethods`
&#x20;([proposal](https://github.com/tc39/proposal-private-methods)) | `class A { #c() {} }` |
| `decorators`
&#x20;([proposal](https://github.com/tc39/proposal-decorators))
`decorators-legacy` | `@a class A {}` |
| `doExpressions`
&#x20;([proposal](https://github.com/tc39/proposal-do-expressions)) | `var a = do { if (true) { 'hi'; } };` |
| `dynamicImport`
&#x20;([proposal](https://github.com/tc39/proposal-dynamic-import)) | `import('./guy').then(a)` |
| `exportDefaultFrom`
&#x20;([proposal](https://github.com/leebyron/ecmascript-export-default-from)) | `export v from "mod"` |
| `exportNamespaceFrom`
&#x20;([proposal](https://github.com/leebyron/ecmascript-export-ns-from)) | `export * as ns from "mod"` |
| `functionBind`
&#x20;([proposal](https://github.com/zenparsing/es-function-bind)) | `a::b`
, `::console.log` |
| `functionSent` | `function.sent` |
| `importMeta`
&#x20;([proposal](https://github.com/tc39/proposal-import-meta)) | `import.meta.url` |
| `logicalAssignment`
&#x20;([proposal](https://github.com/tc39/proposal-logical-assignment)) | `a &&= b` |
| `nullishCoalescingOperator`
&#x20;([proposal](https://github.com/babel/proposals/issues/14)) | `a ?? b` |
| `numericSeparator`
&#x20;([proposal](https://github.com/samuelgoto/proposal-numeric-separator)) | `1_000_000` |
| `objectRestSpread`
&#x20;([proposal](https://github.com/tc39/proposal-object-rest-spread)) | `var a = { b, ...c };` |
| `optionalCatchBinding`
&#x20;([proposal](https://github.com/babel/proposals/issues/7)) | `try {throw 0;} catch{do();}` |
| `optionalChaining`
&#x20;([proposal](https://github.com/tc39/proposal-optional-chaining)) | `a?.b` |
| `partialApplication`
&#x20;([proposal](https://github.com/babel/proposals/issues/32)) | `f(?, a)` |
| `pipelineOperator`
&#x20;([proposal](https://github.com/babel/proposals/issues/29)) | `a &#124;> b` |
| `throwExpressions`
&#x20;([proposal](https://github.com/babel/proposals/issues/23)) | `() => throw new Error("")` |
| `topLevelAwait`
&#x20;([proposal](https://github.com/tc39/proposal-top-level-await/)) | `await promise`
&#x20;in modules |

## 6、sourceType

sourceType 可以是 "module" 或者 "script"，它表示 Babylon 应该用哪种模式来解析。 "module" 将会在严格模式下解析并且允许模块定义，"script" 则不会。

## 7、Example

```typescript
require("@babel/parser").parse("code", {
  // parse in strict mode and allow module declarations
  sourceType: "module",

  plugins: [
    // enable jsx and flow syntax
    "jsx",
    "flow"
  ]
});
```

## 8、参考文档
- [1] acorn github <https://github.com/acornjs/acorn>
- [2] estree 规范 <https://github.com/estree/estree>