---
tags: Javascript
---

整数溢出在日常开发中比较常见，可以分为几种场景：
- 在 JS 代码中进行数值运算
- 拿到 HTTP Response 后通过 JSON.parse 序列化

## 1、JSON.parse 序列化

```js
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991

var a = '{"an": 90071992547409912}'
console.log(JSON.parse(a))
```

打印结果
```js
{an: 90071992547409920}
```

不能直接使用 `JSON.parse` ，可以考虑将数值转为字符串，也就是：

```
'{"an": '90071992547409912'}'
```

相当于自己写一个 JSON 语法解析器，当读取 90071992547409912 时，发现他是一个数值，但是超过了范围，因此序列化为字符串。

## 1、JSON.stringify

```js
var JSONbig = require('json-bigint');
 
var json = '{ "value" : 9223372036854775807, "v2": 123 }';

var r1 = JSONbig.parse(json);
console.log('JSONbig.parse(input).value : ', r1.value.toString());
console.log('JSONbig.stringify(JSONbig.parse(input)):', JSONbig.stringify(r1));
```