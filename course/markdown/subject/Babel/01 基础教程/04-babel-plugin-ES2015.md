---
title: 04 plugin ES2015
tags: Babel
---

Babel 是一个编译器。从宏观角度看，它将运行代码分为3个阶段: 解析，转换，及生成（与其他编译器相同）。

始阶段，Babel 并没有做任何事情。它基本上就相当于 `const babel = code => code;`，先解析代码，然后再次生成相同的代码。你可以为 Babel 添加一些 Plugins 让其去做任何事情( Plugins 会影响 Babel 的第 2 阶段，转换)。


## 1、ES3

### [es3-member-expression-literals](https://babel.docschina.org/docs/en/babel-plugin-transform-es3-member-expression-literals)

```javascript
// 在IE8及以下会报错
foo.catch;

// 需要转换为
foo["catch"]
```

### [es3-property-literals](https://babel.docschina.org/docs/en/babel-plugin-transform-es3-property-literals)

```javascript
// 在IE8及以下会报错
var foo = {
  catch: function () {}
};

// 需要转换为
var foo = {
  "catch": function () {}
};
```


### [reserved-words](https://babeljs.io/docs/en/babel-plugin-transform-reserved-words)

有些在标识符在ES3为保留字，在ES5及以后就不是了，这个插件可以重命名这些标识符。

```javascript
// IN
var abstract = 1;
var x = abstract + 1;

// OUT
var _abstract = 1;
var x = _abstract + 1;
```

## 2、ES5

### [property-mutators](https://babeljs.io/docs/en/babel-plugin-transform-property-mutators)

对于 mutate 方法的定义，老版的部分浏览器只支持使用 Object.defineProperties 来定义：

```javascript
// In
var foo = {
  get bar() {
    return this._bar;
  },
  set bar(value) {
    this._bar = value;
  }
};

// Out
var foo = Object.defineProperties({}, {
  bar: {
    get: function () {
      return this._bar;
    },
    set: function (value) {
      this._bar = value;
    },
    configurable: true,
    enumerable: true
  }
});
```

<a name="R2DiV"></a>

## 3、ES2015

ES2015 修订文档：<https://www.ecma-international.org/ecma-262/6.0>

### [arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions)

箭头函数转译

### [block-scoped-functions](https://babeljs.io/docs/en/babel-plugin-transform-block-scoped-functions)

块级作用域函数

```javascript
// In
{
  function name (n) {
    return n;
  }
}

name("Steve");

// Out
{
  let name = function (n) {
    return n;
  };
}
name("Steve");
```

### [block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping)

块及作用域

```javascript
// In
{
  let a = 3
}

let a = 3

// Out
{
  var _a = 3;
}

var a = 3;
```

### [classes](https://babeljs.io/docs/en/babel-plugin-transform-classes)

使用 class 定义类，如果你的代码包含子类继承 Native class 时，需要额外注意，见文档 [classes](https://babeljs.io/docs/en/babel-plugin-transform-classes)。

```javascript
// In
class Test {
  constructor(name) {
    this.name = name;
  }

  logger () {
    console.log("Hello", this.name);
  }
}

// Out
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Test = function () {
  function Test(name) {
    _classCallCheck(this, Test);

    this.name = name;
  }

  Test.prototype.logger = function logger() {
    console.log("Hello", this.name);
  };

  return Test;
}();
```

### [computed-properties](https://babeljs.io/docs/en/babel-plugin-transform-computed-properties)

计算属性或表达式属性

```javascript
// In
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};

// Out
var _obj;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var obj = (
  _obj = {},
  _defineProperty(_obj, "x" + foo, "heh"),
  _defineProperty(_obj, "y" + bar, "noo"),
  _defineProperty(_obj, "foo", "foo"),
  _defineProperty(_obj, "bar", "bar"),
  _obj
);
```

### [destructuring](https://babeljs.io/docs/en/babel-plugin-transform-destructuring)

解构赋值

```javascript
// In
let {x, y} = obj;
let [a, b, ...rest] = arr;

// Out
function _toArray(arr) { ... }

let _obj = obj,
    x = _obj.x,
    y = _obj.y;

let _arr = arr,
    _arr2 = _toArray(_arr),
    a = _arr2[0],
    b = _arr2[1],
    rest = _arr2.slice(2);
```

### [duplicate-keys](https://babeljs.io/docs/en/babel-plugin-transform-duplicate-keys)

将重复key转为表达式key，没什么用

```javascript
// In
var x = { a: 5, a: 6 };
var y = {
  get a() {},
  set a(x) {},
  a: 3,
};

// Out
var x = { a: 5, ["a"]: 6 };
var y = {
  get a() {},
  set a(x) {},
  ["a"]: 3,
};
```

### [for-of](https://babeljs.io/docs/en/babel-plugin-transform-for-of)

for-of 迭代器

```javascript
// in
for (var i of foo) {}

// out
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = foo[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

### [function-name](https://babeljs.io/docs/en/babel-plugin-transform-function-name)

```javascript
// in
let number = (x) => x

// out
var number = function number(x) {
  return x;
};
```

### [instanceof](https://babeljs.io/docs/en/babel-plugin-transform-instanceof)

ES2015 对 instanceof 操作符进行了修订
![20230608110441](http://s3.airtlab.com/blog/20230608110441.png)

```javascript
// in
foo instanceof Bar;

// out
function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

_instanceof(foo, Bar);
```

### [literals](https://babeljs.io/docs/en/babel-plugin-transform-literals)

字面量转换

```javascript
// in
var b = 0b11; // binary integer literal
var o = 0o7; // octal integer literal
const u = 'Hello\u{000A}\u{0009}!'; // unicode string literals, newline and tab

// out
var b = 3; // binary integer literal
var o = 7; // octal integer literal
const u = 'Hello\n\t!'; // unicode string literals, newline and tab
```

### [new-target](https://babeljs.io/docs/en/babel-plugin-transform-new-target)

new.target返回使用new方法调用类时的类的名称，子类继承父类时，new.target会返回子类。

```javascript
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle);
  }
}
 
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
  }
}
```

### [object-super](https://babeljs.io/docs/en/babel-plugin-transform-object-super)

this 关键字总是指向函数所在的当前对象，ES6 新增了另一个类似的关键字super，指向当前对象的原型对象。

```javascript
let obj2 = {
  say () {
    // [object Object]World!
    return super.toString() + "World!"
  }
}
```

### [parameters](https://babeljs.io/docs/en/babel-plugin-transform-parameters)

处理 ES2015 函数参数：

- Destructuring parameters 参数解构
- Default parameters 默认参数
- Rest parameters 扩展符

```javascript
// in
function test(x = "hello", { a, b }, ...args) {
  console.log(x, a, b, args);
}

// out
function test() {
  var x =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "hello";
  var _ref = arguments[1];
  var a = _ref.a,
    b = _ref.b;

  for (
    var _len = arguments.length,
      args = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    args[_key - 2] = arguments[_key];
  }

  console.log(x, a, b, args);
}
```

### [shorthand-properties](https://babeljs.io/docs/en/babel-plugin-transform-shorthand-properties)

```javascript
// in
var o = { a, b, c };

// out
var o = { a: a, b: b, c: c };
```

```javascript
// in
var cat = {
  getName() {
    return name;
  }
};

// out
var cat = {
  getName: function () {
    return name;
  }
};
```

### [spread](https://babeljs.io/docs/en/babel-plugin-transform-spread)

扩展运算符，与剩余运算符互为逆运算

```javascript
// in
var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

var c = foo(...a);

// out
var a = ['a', 'b', 'c'];

var b = a.concat(['foo']);

var c = foo.apply(void 0, a);
```

### [sticky-regex](https://babeljs.io/docs/en/babel-plugin-transform-sticky-regex)

```javascript
// in
const a = /o+/y;

// out
var a = new RegExp("o+", "y");
```

y 修饰符：叫做 “粘连”（sticky）修饰符。用来正确处理匹配粘连的字符串。它的作用和g修饰类似，也是全局匹配。它可以使用新增的正则对象属性sticky来判断正则对象是否设置了y修饰符。y 和 g 的区别

- g 修饰符只要剩余位置中存在匹配的字符串就可以返回成功。而y修饰符确保匹配必须是从剩余的所有位置中的第一个位置开始，这也是粘连的含义。
- y 修饰符隐含了头部匹配的标志^（^x表示匹配的字符串的首个字符必须是x）

### [template-literals](https://babeljs.io/docs/en/babel-plugin-transform-template-literals)

模版字符串

```javascript
// in
`foo${bar}`;

// out
"foo".concat(bar);
```

### [typeof-symbol](https://babeljs.io/docs/en/babel-plugin-transform-typeof-symbol)

Symbol是原始值，ES6扩展了typeof操作符，返回"symbol"。所以可以用typeof来检测变量是否为symbol类型

### [unicode-escapes](https://babeljs.io/docs/en/babel-plugin-transform-unicode-escapes)

Compile ES2015 Unicode escapes to ES5

```javascript
// in
var \u{1d49c} = "\u{Babe1}";

console.log(\u{1d49c});

// out
var _ud835_udc9c = "\uDAAA\uDFE1";

console.log(_ud835_udc9c);
```

### [unicode-regex](https://babeljs.io/docs/en/babel-plugin-transform-unicode-regex)

```js
// in
var string = "foo💩bar";
var match = string.match(/foo(.)bar/u);
```