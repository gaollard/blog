---
title: 07 @babel types
---

@babel/types 是 Babel 编译器的一个模块，它提供了一组用于处理和操作 AST（抽象语法树）节点的工具函数和对象。它的作用主要有以下几个方面：

1. AST节点创建：@babel/types 提供了多个函数来创建不同类型的AST节点，例如Identifier、ExpressionStatement、FunctionDeclaration等。这些函数可以帮助你方便地构建AST树。

2. AST节点判断：@babel/types 提供了一系列的判断函数，用于检查一个节点是否属于某个特定的AST类型。例如，你可以使用isIdentifier()函数判断一个节点是否是标识符。

3. AST节点操作：@babel/types 还提供了一些方法来操作和修改AST节点。例如，你可以使用cloneNode()方法来复制一个AST节点，使用isExpressionStatement() 方法来判断一个节点是否是表达式语句等。

4. AST节点遍历：@babel/types 提供了一系列的遍历函数，可以帮助你对AST树进行深度优先或广度优先的遍历。例如，你可以使用traverse()函数来遍历整个AST树，并在每个节点上执行自定义的操作。

总的来说，@babel/types为Babel编译器提供了一组用于创建、操作和遍历AST节点的工具函数和对象。它使得开发者可以更方便地处理AST，进而实现代码转换、分析和生成等各种功能。

## Identify 标识符

## Expression 表达式

## Statement 语句

## Literal 字面量
