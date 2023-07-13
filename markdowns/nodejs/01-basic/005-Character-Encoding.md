---
title: 005 理解字符编码
toc: true
tags: NodeJS
categories: 前端开发
---

> - ASCII编码转换 https://www.qqxiuzi.cn/bianma/ascii.htm
> - Unicode(UTF-8, UTF-16)令人混淆的概念 https://www.cnblogs.com/kingcat/archive/2012/10/16/2726334.html

### 1、ASCII
ASCII编码范围 0x00-0x7F，即十进制的0-127，定义了128个单字节字符，其中包含95个可打印字符（数字、字母、符号），以及33个控制字符（下表中文描述的字符）。国标码GB18030、国际码Unicode均兼容ASCII编码。

### 2、Unicode
统一码（Unicode），也叫万国码、Unicode的最初目标，是用1个16位的编码来为超过65000字符提供映射。但这还不够，它不能覆盖全部历史上的文字，也不能解决传输的问题 (implantation head-ache's)，尤其在那些基于网络的应用中。已有的软件必须做大量的工作来程序16位的数据。 

因此，Unicode用一些基本的保留字符制定了三套编码方式。它们分别是`UTF-8`, `UTF-16` 和 `UTF-32`。

在UTF－8中，字符 是以8位序列来编码的，用一个或几个字节来表示一个字符。这种方式的最大好处，是UTF－8保留了ASCII字符的编码做为它的一部分，例如，在 UTF－8和ASCII中，“A”的编码都是0x41。

UTF－16和UTF－32分别是Unicode的16位和32位编码方式。考虑到最初的目的，通常说的Unicode就是指UTF-16。在讨论Unicode时，搞清楚哪种编码方式非常重要。Unicdoe相关的技术介绍参见http://www.unicode.org/unicode/standard/principles.html.

### 3、UTF8
参考 https://www.zhihu.com/question/23374078
![20230226215929](http://s3.airtlab.com/blog/20230226215929.png)

> UTF-8的编码方式中，当计算机读到1110XXXX，就知道目前的这个字符占了3个字节，应该继续往后读取。

### 4、UTF-8/UTF-16/UTF-32
（1）UTF-8是变长编码，每个Unicode代码点按照不同范围，可以有1-3字节的不同长度。

（2）UTF-16长度相对固定，只要不处理大于\U200000范围的字符，每个Unicode代码点使用16位即2字节表示，超出部分使用两个UTF-16即4字节表示。按照高低位字节顺序，又分为UTF-16BE/UTF-16LE。

（3）UTF-32长度始终固定，每个Unicode代码点使用32位即4字节表示。按照高低位字节顺序，又分为UTF-32BE/UTF-32LE。

**举个例子**
假如中文字"汉"对应的 unicode 是6C49(这是用十六进制表示，用十进制表示是 27721 为啥不用十进制表示呢？很明显用十六进制表示要短点。其实都是等价的没啥不一样，就跟你说60分钟和1小时一样)。你可能会问当用程序打开一个文件时我们怎么知道那是用的UTF-8还是UTF-16啊.自然会有点啥标志,在文件的开头几个字节就是标志:
```
EF BB BF 表示UTF-8
FE FF 表示UTF-16.
```

### 5、base64
Base64是网络上最常见的用于传输8Bit字节码的编码方式之一，Base64就是一种`基于64个可打印字符来表示二进制数据的方法`。可查看RFC2045～RFC2049，上面有MIME的详细规范。base64 编码是可逆的。
