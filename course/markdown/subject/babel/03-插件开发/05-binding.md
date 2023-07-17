---
title: 05 Bindings（绑定）
url: https://www.yuque.com/gaollard/ubc1q5/rw3qxv
---

一个作用域可以创建变量，这种关系被称为绑定。

```typescript
function scopeOnce() {
  var ref = "This is a binding";

  ref; // This is a reference to a binding

  function scopeTwo() {
    ref; // This is a reference to a binding from a lower scope
  }
}
```

## 1、Binding 的定义

```typescript
export type BindingKind = 'var' | 'let' | 'const' | 'module' | 'hoisted' | 'param' | 'local' | 'unknown';

export class Binding {
    constructor(opts: { identifier: t.Identifier; scope: Scope; path: NodePath; kind: BindingKind });
    identifier: t.Identifier;
    scope: Scope;
    path: NodePath;
    kind: BindingKind;
    referenced: boolean;            // 是否被引用
    references: number;             // 被引用次数
    referencePaths: NodePath[];     // 被引用的路径
    constant: boolean;              // 是否被修改
    constantViolations: NodePath[];
    hasDeoptedValue?: boolean;
    hasValue?: boolean;
    value?: any;

    deopValue(): void;
    setValue(value: any): void;
    clearValue(): void;

    reassign(path: NodePath): void;
    reference(path: NodePath): void;
    dereference(): void;
}
```

有了这些信息你就可以查找一个绑定的所有引用，并且知道这是什么类型的绑定(参数，定义等等)，查找它所属的作用域，或者拷贝它的标识符。 你甚至可以知道它是不是常量，如果不是，那么是哪个路径修改了它。 <a name="I31IK"></a>

## 2、代码辅助理解

### 1. 引用次数 \[references]

```typescript
function test1() {
  var a = 10;
  console.log(a);
}
```

```typescript
bindings: [Object: null prototype] {
  a: Binding {
    identifier: [Node],
    scope: [Circular],
    path: [NodePath],
    kind: 'var',
    constantViolations: [],
    constant: true,
    referencePaths: [Array],
    referenced: true,
    references: 1,
    hasDeoptedValue: false,
    hasValue: false,
    value: null
  }
}
```

### 2. 绑定是否是常量 \[constant]

a 没有修改：

```typescript
function test1() {
  var a = 10;
  console.log(a);
}
```

```typescript
bindings: [Object: null prototype] {
  a: Binding {
    identifier: [Node],
    scope: [Circular],
    path: [NodePath],
    kind: 'var',
    constantViolations: [],
    constant: true,
    referencePaths: [Array],
    referenced: true,
    references: 1,
    hasDeoptedValue: false,
    hasValue: false,
    value: null
  }
}
```

a 有被修改：

```typescript
function test1() {
  var a = 10;
  a = 20;
  console.log(a);
}
```

```typescript
Binding {
  identifier: Node {
    type: 'Identifier',
    start: 26,
    end: 27,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: 'a'
    },
    name: 'a'
  },
  scope: Scope {
    uid: 1,
    path: NodePath {
      contexts: [Array],
      state: undefined,
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Array],
      listKey: 'body',
      key: 0,
      node: [Node],
      type: 'FunctionDeclaration',
      parent: [Node],
      hub: undefined,
      data: null,
      context: [TraversalContext],
      scope: [Circular]
    },
    block: Node {
      type: 'FunctionDeclaration',
      start: 1,
      end: 63,
      loc: [SourceLocation],
      id: [Node],
      generator: false,
      async: false,
      params: [],
      body: [Node]
    },
    labels: Map {},
    inited: true,
    bindings: [Object: null prototype] { a: [Circular] },
    references: [Object: null prototype] {},
    globals: [Object: null prototype] {},
    uids: [Object: null prototype] {},
    data: [Object: null prototype] {},
    crawling: undefined
  },
  path: NodePath {
    contexts: [],
    state: {
      references: [Array],
      constantViolations: [],
      assignments: [Array]
    },
    opts: {
      ForStatement: [Object],
      ImportDeclaration: [Object],
      LabeledStatement: [Object],
      AssignmentExpression: [Object],
      UpdateExpression: [Object],
      UnaryExpression: [Object],
      CatchClause: [Object],
      ClassExpression: [Object],
      _exploded: true,
      _verified: true,
      Identifier: [Object],
      JSXIdentifier: [Object],
      enter: [Array],
      FunctionDeclaration: [Object],
      VariableDeclaration: [Object],
      ClassDeclaration: [Object],
      ExportAllDeclaration: [Object],
      ExportDefaultDeclaration: [Object],
      ExportNamedDeclaration: [Object],
      DeclareClass: [Object],
      DeclareFunction: [Object],
      DeclareInterface: [Object],
      DeclareModule: [Object],
      DeclareModuleExports: [Object],
      DeclareTypeAlias: [Object],
      DeclareOpaqueType: [Object],
      DeclareVariable: [Object],
      DeclareExportDeclaration: [Object],
      DeclareExportAllDeclaration: [Object],
      InterfaceDeclaration: [Object],
      OpaqueType: [Object],
      TypeAlias: [Object],
      EnumDeclaration: [Object],
      TSDeclareFunction: [Object],
      TSInterfaceDeclaration: [Object],
      TSTypeAliasDeclaration: [Object],
      TSEnumDeclaration: [Object],
      TSModuleDeclaration: [Object],
      ForInStatement: [Object],
      ForOfStatement: [Object],
      FunctionExpression: [Object],
      ObjectMethod: [Object],
      ArrowFunctionExpression: [Object],
      ClassMethod: [Object],
      ClassPrivateMethod: [Object]
    },
    _traverseFlags: 0,
    skipKeys: null,
    parentPath: NodePath {
      contexts: [],
      state: [Object],
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Array],
      listKey: 'body',
      key: 0,
      node: [Node],
      type: 'VariableDeclaration',
      parent: [Node],
      hub: undefined,
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    },
    container: [ [Node] ],
    listKey: 'declarations',
    key: 0,
    node: Node {
      type: 'VariableDeclarator',
      start: 26,
      end: 32,
      loc: [SourceLocation],
      id: [Node],
      init: [Node]
    },
    type: 'VariableDeclarator',
    parent: Node {
      type: 'VariableDeclaration',
      start: 22,
      end: 33,
      loc: [SourceLocation],
      declarations: [Array],
      kind: 'var'
    },
    hub: undefined,
    data: null,
    context: TraversalContext {
      queue: null,
      priorityQueue: [],
      parentPath: [NodePath],
      scope: [Scope],
      state: [Object],
      opts: [Object]
    },
    scope: Scope {
      uid: 1,
      path: [NodePath],
      block: [Node],
      labels: Map {},
      inited: true,
      bindings: [Object: null prototype],
      references: [Object: null prototype] {},
      globals: [Object: null prototype] {},
      uids: [Object: null prototype] {},
      data: [Object: null prototype] {},
      crawling: undefined
    }
  },
  kind: 'var',
  constantViolations: [
    NodePath {
      contexts: [],
      state: [Object],
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Node],
      listKey: undefined,
      key: 'expression',
      node: [Node],
      type: 'AssignmentExpression',
      parent: [Node],
      hub: undefined,
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    }
  ],
  constant: false,
  referencePaths: [
    NodePath {
      contexts: [],
      state: [Object],
      opts: [Object],
      _traverseFlags: 0,
      skipKeys: null,
      parentPath: [NodePath],
      container: [Array],
      listKey: 'arguments',
      key: 0,
      node: [Node],
      type: 'Identifier',
      parent: [Node],
      hub: undefined,
      data: null,
      context: [TraversalContext],
      scope: [Scope]
    }
  ],
  referenced: true,
  references: 1,
  hasDeoptedValue: false,
  hasValue: false,
  value: null
}

```

### 3. 只有 变量定义 和 函数定义 拥有 binding

```typescript
let binding = scope.getBinding(name);
// 例如: var a = 123; 这里的 a 就拥有 binding。

function test(a,b,c) {};
// 函数名test以及形参a，b，c均拥有 binding。
```

### 4. binding.path

用于定位初始拥有binding的path; <a name="hn5qZ"></a>

### 5. binding.referenced

用于判断当前变量是否被引用，true表示代码下面有引用该变量的地方，false表示没有地方引用该变量。注意，引用和改变是分开的。 <a name="Y9Wns"></a>

### 6. binding.referencePaths

它是一个Array类型，包含所有引用的path，多用于替换。

### 7. binding.constantViolations

它是一个Array类型，包含所有改变的path，多用于判断。
