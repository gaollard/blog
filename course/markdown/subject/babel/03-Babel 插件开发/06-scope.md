---
title: 06 Scopes（作用域）
url: https://www.yuque.com/gaollard/ubc1q5/wt5qg7
---

## 1、Scope 介绍

接下来让我们介绍 [作用域（scope）](https://en.wikipedia.org/wiki/Scope_\(computer_science\))的概念。 JavaScript 支持[词法作用域](https://en.wikipedia.org/wiki/Scope_\(computer_science\)#Lexical_scoping_vs._dynamic_scoping)，在树状嵌套结构中代码块创建出新的作用域。

```javascript
// global scope

function scopeOne() {
  // scope 1
  function scopeTwo() {
    // scope 2
  }
}
```

在 JavaScript 中，每当你创建了一个引用，不管是通过变量（variable）、函数（function）、类型（class）、参数（params）、模块导入（import）还是标签（label）等，它都属于当前作用域。

```javascript
var global = "I am in the global scope";

function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    var two = "I am in the scope created by `scopeTwo()`";
  }
}
```

更深的内部作用域代码可以使用外层作用域中的引用。

```javascript
function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    one = "I am updating the reference in `scopeOne` inside `scopeTwo`";
  }
}
```

内层作用域也可以创建和外层作用域同名的引用。

```javascript
function scopeOne() {
  var one = "I am in the scope created by `scopeOne()`";

  function scopeTwo() {
    var one = "I am creating a new `one` but leaving reference in `scopeOne()` alone.";
  }
}
```

当编写一个转换时，必须小心作用域。我们得确保在改变代码的各个部分时不会破坏已经存在的代码。
我们在添加一个新的引用时需要确保新增加的引用名字和已有的所有引用不冲突。 或者我们仅仅想找出使用一个变量的所有引用， 我们只想在给定的作用域（Scope）中找出这些引用。
作用域可以被表示为如下形式：

```javascript
{
  path: path,
  block: path.node,
  parentBlock: path.parent,
  parent: parentScope,
  bindings: [...]
}
```

当你创建一个新的作用域时，需要给出它的路径和父作用域，之后在遍历过程中它会在该作用域内收集所有的引用(“绑定”)。
一旦引用收集完毕，你就可以在作用域（Scopes）上使用各种方法，稍后我们会了解这些方法。

## 2、Scope 定义

Scope 表示作用域

```typescript
export class Scope {
    constructor(path: NodePath, parentScope?: Scope);
    path: NodePath;
    block: Node;
    parentBlock: Node;
    parent: Scope;
    hub: HubInterface;
    bindings: { [name: string]: Binding };

    /** Traverse node with current scope and path. */
    traverse<S>(node: Node | Node[], opts: TraverseOptions<S>, state: S): void;
    traverse(node: Node | Node[], opts?: TraverseOptions, state?: any): void;

    /** Generate a unique identifier and add it to the current scope. */
    generateDeclaredUidIdentifier(name?: string): t.Identifier;

    /** Generate a unique identifier. */
    generateUidIdentifier(name?: string): t.Identifier;

    /** Generate a unique `_id1` binding. */
    generateUid(name?: string): string;

    /** Generate a unique identifier based on a node. */
    generateUidIdentifierBasedOnNode(parent: Node, defaultName?: string): t.Identifier;

    /**
     * Determine whether evaluating the specific input `node` is a consequenceless reference. ie.
     * evaluating it wont result in potentially arbitrary code from being ran. The following are
     * whitelisted and determined not to cause side effects:
     *
     *  - `this` expressions
     *  - `super` expressions
     *  - Bound identifiers
     */
    isStatic(node: Node): boolean;

    /** Possibly generate a memoised identifier if it is not static and has consequences. */
    maybeGenerateMemoised(node: Node, dontPush?: boolean): t.Identifier;

    checkBlockScopedCollisions(local: Binding, kind: BindingKind, name: string, id: object): void;

    rename(oldName: string, newName?: string, block?: Node): void;

    dump(): void;

    toArray(node: Node, i?: number): Node;

    registerDeclaration(path: NodePath): void;

    buildUndefinedNode(): Node;

    registerConstantViolation(path: NodePath): void;

    registerBinding(kind: string, path: NodePath, bindingPath?: NodePath): void;

    addGlobal(node: Node): void;

    hasUid(name: string): boolean;

    hasGlobal(name: string): boolean;

    hasReference(name: string): boolean;

    isPure(node: Node, constantsOnly?: boolean): boolean;

    setData(key: string, val: any): any;

    getData(key: string): any;

    removeData(key: string): void;

    crawl(): void;

    push(opts: {
        id: t.LVal;
        init?: t.Expression | undefined;
        unique?: boolean | undefined;
        kind?: 'var' | 'let' | 'const' | undefined;
    }): void;

    getProgramParent(): Scope;

    getFunctionParent(): Scope | null;

    getBlockParent(): Scope;

    /** Walks the scope tree and gathers **all** bindings. */
    getAllBindings(...kinds: string[]): object;

    bindingIdentifierEquals(name: string, node: Node): boolean;

    getBinding(name: string): Binding | undefined;

    getOwnBinding(name: string): Binding | undefined;

    getBindingIdentifier(name: string): t.Identifier;

    getOwnBindingIdentifier(name: string): t.Identifier;

    hasOwnBinding(name: string): boolean;

    hasBinding(name: string, noGlobals?: boolean): boolean;

    parentHasBinding(name: string, noGlobals?: boolean): boolean;

    /** Move a binding of `name` to another `scope`. */
    moveBindingTo(name: string, scope: Scope): void;

    removeOwnBinding(name: string): void;

    removeBinding(name: string): void;
}

```

## 3、代码辅助理解

### 1. 查看 scope 结构

```typescript
import * as fs from "fs";
import * as path from 'path';
import * as babel from "@babel/core";

const code = `
function test1() {
  var a = 10;
}
`

const data = babel.parse(code, {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
  ],
  filename: 'sss',
});


babel.traverse(data, {
  FunctionDeclaration(path) {
    console.log(path.scope)
  }
})
```

```typescript
Scope {
  uid: 1,
  path: NodePath {
    contexts: [ [TraversalContext] ],
    state: undefined,
    opts: { FunctionDeclaration: [Object], _exploded: true, _verified: true },
    _traverseFlags: 0,
    skipKeys: null,
    parentPath: NodePath {
      contexts: [Array],
      state: undefined,
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: null,
      container: [Node],
      listKey: undefined,
      key: 'program',
      node: [Node],
      type: 'Program',
      parent: [Node],
      hub: undefined,
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    },
    container: [ [Node] ],
    listKey: 'body',
    key: 0,
    node: Node {
      type: 'FunctionDeclaration',
      start: 1,
      end: 35,
      loc: [SourceLocation],
      id: [Node],
      generator: false,
      async: false,
      params: [],
      body: [Node]
    },
    type: 'FunctionDeclaration',
    parent: Node {
      type: 'Program',
      start: 0,
      end: 36,
      loc: [SourceLocation],
      sourceType: 'module',
      interpreter: null,
      body: [Array],
      directives: []
    },
    hub: undefined,
    data: null,
    context: TraversalContext {
      queue: [Array],
      priorityQueue: [],
      parentPath: [NodePath],
      scope: [Scope],
      state: undefined,
      opts: [Object]
    },
    scope: [Circular]
  },
  block: Node {
    type: 'FunctionDeclaration',
    start: 1,
    end: 35,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: Node {
      type: 'Identifier',
      start: 10,
      end: 15,
      loc: [SourceLocation],
      name: 'test1'
    },
    generator: false,
    async: false,
    params: [],
    body: Node {
      type: 'BlockStatement',
      start: 18,
      end: 35,
      loc: [SourceLocation],
      body: [Array],
      directives: []
    }
  },
  labels: Map {},
  inited: true,
  bindings: [Object: null prototype] {
    a: Binding {
      identifier: [Node],
      scope: [Circular],
      path: [NodePath],
      kind: 'var',
      constantViolations: [],
      constant: true,
      referencePaths: [],
      referenced: false,
      references: 0,
      hasDeoptedValue: false,
      hasValue: false,
      value: null
    }
  },
  references: [Object: null prototype] {},
  globals: [Object: null prototype] {},
  uids: [Object: null prototype] {},
  data: [Object: null prototype] {},
  crawling: undefined
}
```

- block  该作用域所属的 code block
- path   该作用域所属的 NodePath
- bindings  该作用域能够访问变量 <a name="Bi4FK"></a>

### 2. 查看 binding

```typescript
import * as fs from "fs";
import * as path from 'path';
import * as babel from "@babel/core";

const code = `
function test1() {
  var a = 10;
}

function test2() {
  var b = 10;
}
`

const data = babel.parse(code, {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
  ],
  filename: 'sss',
});


babel.traverse(data, {
  FunctionDeclaration(path) {
    if (babel.types.isIdentifier(path.node.id)) {
      console.log(path.node.id.name, path.scope.hasBinding("a"))
    }
  }
})

// test1 true
// test2 false
```