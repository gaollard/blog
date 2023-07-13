---
title: 007 buffer操作二进制数
toc: true
tags: NodeJS
categories: 前端开发
---

> 部分内容参考 《针对 Node 的 Buffer 模块中难理解的 API 做一次彻底的讲解》https://www.bilibili.com/read/cv4881167?spm_id_from=333.999.0.0

Buffer 对象用于表示固定长度的字节序列，许多 Node.js API 都支持 Buffer。

## 1. 预备知识

### 1.1 什么是缓冲区 Buffer

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理 I/O 操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

### 1.2 Buffer 与字符编码

Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。

```javascript
const buf = Buffer.from("r", "ascii");
console.log(buf); // <Buffer 72>
// 这里的 72 在 ascii 编码中对应的十六进制值为72 => 其二进制值为 0111 0010
```

```javascript
const buf = Buffer.from("runoob", "ascii");

// 输出 72756e6f6f62
console.log(buf.toString("hex"));

// 输出 cnVub29i
console.log(buf.toString("base64"));
```

Node.js 目前支持的字符编码包括：

- ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- ucs2 - utf16le  的别名。
- base64 - Base64 编码。
- latin1 - 一种把  Buffer  编码成一字节编码的字符串的方式。
- binary - latin1  的别名。
- hex - 将每个字节编码为两个十六进制字符。

### 1.3 Buffer 与 Stream 的关系

在应用中，因为在后端与前端、后端的 IO 中，每当需要在 Node.js 中处理 I/O 操作中移动的数据时，就有可能使用 Buffer 库，很多时候会出现数据过大，不能一次性读取的问题。会导致程序的等待时间过长，因此，流操作（stream）便营运而生。

在 readable 和 writable 的 Stream 之间筑起沟通，如果仅仅使用事件方法来进行的话，代码会显得很冗杂，因此需要出现 pipe（管道）方法来进行。

```javascript
readable.pipe(writable);
```

Stream 就像司机，它的作用就是将装着数据的 Buffer 开向终点，在 NodeJS 中，许多接口都集成 Stream。假如你不懂 Stream 也没有关系，先这样了解就可以了。

## 2.  创建 Buffer 类

Buffer 提供两类 API 来创建 buffer

### 2.1 从字符串创建

`Buffer.from(string[, encoding])`

```javascript
const buf = Buffer.from("知", "utf-8");
console.log(buf); // <Buffer e7 9f a5>
```

### 2.2 指定字节序列创建

指定字节序列创建 Buffer(使用 0 – 255 范围内的字节 array 分配)，该范围之外的数组条目将被截断以符合它。

`Buffer.from(array)`

```javascript
// 创建包含字符串 'buffer' 的 UTF-8 字节的新缓冲区。
const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
console.log(buf);
```

### 2.3 buffer 拷贝创建

`Buffer.from(buffer)`

```javascript
const buf1 = Buffer.from("buffer");
const buf2 = Buffer.from(buf1);

buf1[0] = 0x61; // a

console.log(buf1.toString());
// 打印: auffer
console.log(buf2.toString());
// 打印: buffer
```

```javascript
const buf1 = Buffer.from("知");
const buf2 = Buffer.from(buf1);

// 根据 utf-8 编码规则, 后面两个字节显然无效喽
// 因为它属于 0~U+007F
buf1[0] = 0x61;

console.log(buf1.toString());
// 打印: a��
console.log(buf2.toString());
// 打印: 知
```

### 2.4 Buffer.alloc

```javascript
const buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString("ascii")); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString("ascii", 0, 5)); // 输出: abcde
console.log(buf.toString("utf8", 0, 5)); // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde
```

#### Buffer.alloc(size[, fill[, encoding]])

- size 代表 Buffer 的长度
- fill 初始化填充的内容
- encoding 代表编码

![20230228202308](http://s3.airtlab.com/blog/20230228202308.png)

可以看出 fil l 和 encoding 之间的关系，fill 先按照 encoding 编码成二进制，然后一个字节一个字节的向此方法生成的 Buffer 中填充，根据长度 size，依次循环。

### 2.5 Buffer.from 对比

(1) Buffer.from(array)  返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）。
(2) Buffer.from(arrayBuffer[, byteOffset[, length]])  返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
(3) Buffer.from(buffer)  复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例。
(4) Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例。

```javascript
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from("tést");

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from("tést", "latin1");
```

#### Buffer.from(arrayBuffer[, byteOffset[, length]])

![20230228202419](http://s3.airtlab.com/blog/20230228202419.png)

将一个二进制数组`[5000, 4000]` 放入 Buffer 中生成了 `<88 a0>`，因为 Buffer 实例是 Uint8Array 的实例，此时相当于把 arr 放入 Uint8Array 中，元素一一对应，而 Uint8Array 每个元素都是 8 位，最大值是 256，所以发生了溢出，根据溢出的算法最终变为了<88 a0>。

如果不想发生溢出，可以使用二进制数组的 buffer 属性（此时会共享内存）：

![20230228202649](http://s3.airtlab.com/blog/20230228202649.png)

可选的 byteOffset 和 length 参数指定 arrayBuffer 中与 Buffer 共享的内存范围，如果不使用 buffer 属性，这两个参数并不会生效。

![20230228202659](http://s3.airtlab.com/blog/20230228202659.png)

可选的 byteOffset 和 length 参数指定 arrayBuffer 中与 Buffer 共享的内存范围，如果不使用 buffer 属性，这两个参数并不会生效：
![20230228202715](http://s3.airtlab.com/blog/20230228202715.png)

## 3、读字节流

### 3.1 readUInt8/readInt8

读取一个字节的有/无符号的整数

![20230228202626](http://s3.airtlab.com/blog/20230228202626.png)

- readUInt8 直接读取一个字节的二进制
- readInt8 读取 8 位有符号的二进制，所以有可能会发生溢出，溢出的算法之前已经提到了

### 3.2 读取 16 位

- readInt16BE
- readInt16LE
- readUInt16BE
- readUInt16LE

读取`两个字节`的有/无符号的整数

- BE 代表大端字节序，高位在前，网络就是这种字节序
- LE 代表小端字节序，低位在前

![20230228202551](http://s3.airtlab.com/blog/20230228202551.png)

```javascript
const buf = Buffer.from([0xff, 0x01, 0x08, 0x05]);
console.log(buf);

console.log(buf.readUInt16BE(0)); // 65281 = 15 * 16 * 16 * 16 + 15 * 16 * 16 + 1

// 按照大端顺序读取（有符号）
// => 1111 1111 0000 0001
// => 1111 1110
// => 1111 1111
console.log(buf.readInt16BE(0)); // -255
```

```javascript
{
  const buf = Buffer.from([0x9f, 0xaf, 0x08, 0x05]);
  console.log(buf);

  // 9 * 16 * 16 * 16 + 15 * 16 * 16 + 10 * 16 + 15 = 40879
  // 而16位有符号范围 -32768～32767
  // 1001 1111 1010 1111 原码
  // 0110 0000 0101 0000 反码
  // 0110 0000 0110 0001 补码
  // 6051 => 24657
  console.log(buf.readInt16BE(0)); // -24657  这个数是怎么来的呢
}
```

## 4.  写入缓冲区

```javascript
buf.write(string[, offset[, length]][, encoding])
// @param string - 写入缓冲区的字符串。
// @param offset - 缓冲区开始写入的索引值，默认为 0 。
// @param length - 写入的字节数，默认为 buffer.length
// @param encoding - 使用的编码。默认为 'utf8' 。
// @result 返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。
```

```javascript
const buf = Buffer.alloc(256);
const len = buf.write("www.runoob.com");
console.log("写入字节数 : " + len);
console.log(buf.toString("ascii"));
```

## 5.  从缓冲区读取数据

```javascript
buf.toString([encoding[, start[, end]]])
// @param encoding - 使用的编码。默认为 'utf8' 。
// @param start - 指定开始读取的索引位置，默认为 0。
// @param end - 结束位置，默认为缓冲区的末尾。
// @result 解码缓冲区数据并使用指定的编码返回字符串
```

```javascript
buf = Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString("ascii")); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString("ascii", 0, 5)); // 输出: abcde
console.log(buf.toString("utf8", 0, 5)); // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde
```

## 6.  缓冲区合并

```javascript
var buffer1 = Buffer.from("菜鸟教程");
var buffer2 = Buffer.from("www.runoob.com");

var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
```

## 7. **TypedArray**

> 一个 **_TypedArray_** 对象描述了底层[二进制数据缓冲区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)的类数组视图，是所有 TypedArray 子类的通用父类。将 %TypedArray% 作为一个“抽象类”，

```javascript
// Create a TypedArray with a size in bytes
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;

console.log(typedArray1);
// Expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2);
// Expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
```

### TypeArray 列表

| 类型                                                                                                                    | 值范围                                       | 字节大小 | 描述                                                      | Web IDL 类型        | 等价的 C 类型                 |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------- | --------------------------------------------------------- | ------------------- | ----------------------------- |
| [Int8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)                 | -128 到 127                                  | 1        | 8 位有符号整型（补码）                                    | byte                | int8_t                        |
| [Uint8Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)               | 0 到 255                                     | 1        | 8 位无符号整型                                            | octet               | uint8_t                       |
| [Uint8ClampedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) | 0 到 255                                     | 1        | 8 位无符号整型（一定在 0 到 255 之间）                    | octet               | uint8_t                       |
| [Int16Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)               | -32768 到 32767                              | 2        | 16 位有符号整型（补码）                                   | short               | int16_t                       |
| [Uint16Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)             | 0 到 65535                                   | 2        | 16 位无符号整型                                           | unsigned short      | uint16_t                      |
| [Int32Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)               | -2147483648 到 2147483647                    | 4        | 32 位有符号整型（补码）                                   | long                | int32_t                       |
| [Uint32Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)             | 0 到 4294967295                              | 4        | 32 位无符号整型                                           | unsigned long       | uint32_t                      |
| [Float32Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)           | -3.4E38 到 3.4E38 并且 1.2E-38 是最小的正数  | 4        | 32 位 IEEE 浮点数（7 位有效数字，例如 1.234567）          | unrestricted float  | float                         |
| [Float64Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)           | -1.8E308 到 1.8E308 并且 5E-324 是最小的正数 | 8        | 64 位 IEEE 浮点数（16 位有效数字，例如 1.23456789012345） | unrestricted double | double                        |
| [BigInt64Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)         | -263 到 263 - 1                              | 8        | 64 位有符号整型（补码）                                   | bigint              | int64_t (signed long long)    |
| [BigUint64Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)       | 0 到 264 - 1                                 | 8        | 64 位无符号整型                                           | bigint              | uint64_t (unsigned long long) |

### 溢出规则

```javascript
{
  // -128 到 127
  const typedArray1 = new Int8Array(8);
  typedArray1[0] = 128;

  console.log(typedArray1); // ? 为什么是 -128
  // Int8Array(8) [
  //     -128, 0, 0, 0,
  //        0, 0, 0, 0
  //   ]
}

{
  // -128 到 127
  const typedArray1 = new Int8Array(8);
  typedArray1[0] = 300;

  console.log(typedArray1); // ? 为什么是44
  // Int8Array(8) [
  //     44, 0, 0, 0,
  //        0, 0, 0, 0
  //   ]
}
```
