---
title: 022 加密相关
toc: true
tags: NodeJS
categories: 前端开发
---

## aes 演示

Node.js内置了加密模块，该模块提供了各种加密和解密算法，如AES（高级加密标准）和DES（数据加密标准）等。
下面是一些常用的加密和解密方法：

- crypto.createHash(algorithm): 创建一个散列对象，该对象可用于生成一个加密的哈希值，其中的“algorithm”参数是散列算法的名称，如“sha256”，“sha512”等。

- crypto.createCipheriv(algorithm, key, iv): 创建一个加密算法的对象，其中的“algorithm”参数是加密算法的名称，如“AES-128-CBC”或“DES-EDE3-CBC”，“key”参数是加密密钥，iv参数是初始化向量。

- cipher.update(data, input_encoding, output_encoding): 使用输入编码（如果给出）和输出编码（如果给出）更新加密。

- cipher.final(output_encoding): 返回加密的结果，并且关闭加密器。


例如，AES加密可以使用以下代码：

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'mysecretkey';
const iv = crypto.randomBytes(16);
const message = 'secret message';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(message, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('Encrypted message:', encrypted);
```

在上面的示例代码中，我们使用AES-256-CBC加密算法，将密钥设置为“mysecretkey”，使用随机生成的16字节IV，并且我们将明文消息设置为“secret message”。通过 `crypto.createCipheriv()` 方法创建加密算法对象，然后使用 `cipher.update()` 来加密消息，并使用 `cipher.final()`来对消息进行最终加密。

## md5 演示

在Node.js中，也可以使用`crypto`模块来计算MD5散列值。下面是使用Node.js的代码示例，演示如何使用`crypto`模块计算字符串的MD5散列值：
```javascript
const crypto = require('crypto');

const message = '需要加密的字符串';
const hash = crypto.createHash('md5').update(message).digest('hex');

console.log('MD5加密后的字符串为：', hash);
```

在这个示例中，我们首先将要加密的字符串存储在变量`message`中。然后，我们使用`createHash()`方法创建一个MD5 hash对象，并使用`update()`方法将输入字符串添加到对象中。最后，我们使用`digest()`方法获得计算出的16进制字符串，它表示了输入字符串的MD5散列值。最后，使用`console.log()`语句输出计算后的散列值。

需要注意的是，MD5虽然是一种常见的散列函数，但其安全性已经被攻击，因此建议使用更安全的散列函数，例如SHA-2系列的函数。
