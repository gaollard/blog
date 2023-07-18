---
tags: nodejs-coverage
---

## 1、覆盖率介绍

代码覆盖率测试是一种软件测试技术，用于测量在执行测试用例集合期间程序的源代码的百分比。

它评估了测试用例对代码库的覆盖率，即它测量了编写的测试用例中有多少行、分支或语句被执行过。

测试的目标就是尽可能多的执行代码，这样就可以排除潜在的错误和漏洞。

通过代码覆盖率测试可以确定代码库的质量，并帮助开发人员在测试完成后进行代码调整或优化。代码覆盖率测试还可以确保每行代码都至少被执行了一次，这可以降低软件错误和缺陷的风险，提高代码的可靠性。

## 2、覆盖率指标

以下是几个覆盖率指标：

- 函数覆盖率（Function coverage）：调用到程式中的每一个Function吗？
- 行覆盖率（Line coverage)：执行到程序中的每一行了吗？
- 语句覆盖率（Statement coverage）：若用控制流图表示程序，执行到控制流图中的每一个节点了吗？
- 分支覆盖率（Branches coverage）：若用控制流图表示程式，执行到控制流图中的每一条边吗？例如控制结构中所有IF指令都有执行到逻辑运算式成立及不成立的情形吗？
- 条件覆盖率（Condition coverage）：也称为谓词覆盖（predicate coverage），每一个逻辑运算式中的每一个条件（无法再分解的逻辑运算式）是否都有执行到成立及不成立的情形吗？
  
对指标的偏好可说是见仁见智，比如大名鼎鼎的 coveralls.io 就以行覆盖率 (Line coverage) 作为给项目颁发badge的首选指标。

我们需要的，是一个能根据测试用例得出覆盖率指标的工具。

## 3、代码覆盖率数据收集

在程序执行到某个执行单元时，收集其代码的信息，比如所在文件、行、列，上报到数据中心。

## 4、数据收集实现原理

不同语言的覆盖率收集，在实现机制甚至语法规范层面都大同小异。先将特定的标记按照一定规则插入到代码行中，这一步我们称为“代码插桩“，然后在执行 case 的过程中收集这些标记的执行情况，最终计算输出覆盖率然后格式化输出结果。大体流程如图所示：

![20230615100458](http://s3.airtlab.com/blog/20230615100458.png)

### 1. 代码插桩

代码插桩是覆盖率收集的前提，这一步主要是对现有代码进行语法层面的分析，并在行内指定的位置加入预设标记。咱们通过一段代码看下处理前后的对比：

**源文件**
![20230615100657](http://s3.airtlab.com/blog/20230615100657.png)

**插桩后文件**
![20230615100719](http://s3.airtlab.com/blog/20230615100719.png)

## 5、nodejs 方案调研

### 5.1 istanbuljs

istanbuljs（也称为Istanbul）是JavaScript测试覆盖率工具，用于测量在运行测试时被测JavaScript代码的代码覆盖率。istanbul可用于各种用例，包括前端和后端JavaScript代码库，例如Node.js等。
 
使用istanbuljs，可以了解每个function、branch和line的代码覆盖率率情况。istanbuljs 支持使用命令行、配置文件或API设置和运行测试覆盖率。此外，istanbul还提供了用于生成测试覆盖率报告的选项和插件，可以生成各种格式的报告，如HTML、文本等，以方便开发人员阅读和分析测试结果。

使用 istanbul 有助于提高代码库的质量，确保代码库的每个部分都得到覆盖，从而减少潜在的漏洞和错误。

`istanbuljs` 包含一些核心包，以 monorepo 的方式进行代码组织：

![20230615102955](http://s3.airtlab.com/blog/20230615102955.png)

支持多种方式的使用：
- cli 比如 `istanbul cover simple.js`
- babel 借助 [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)

### 5.2 Coveralls
Coveralls 是一个在线的测试覆盖率报告服务，它能够将你项目中的测试覆盖率报告进行图形化展示，为你提供求助和决策的重要数据。
Coveralls 支持多种不同的编程语言和测试框架，包括JavaScript、Python、Java、Ruby等等，并与 GitHub、GitLab、Bitbucket 和 Travis CI 等常用的在线仓库和自动化构建平台进行无缝集成，使得测试结果和代码覆盖率报告可以自动发布到 Coveralls 平台上。这样开发人员就可以轻松地对代码库的测试质量进行监控和管理。

Coveralls 比较流行的一个原因是，它提供的覆盖率报告非常直观，易于理解和分析。开发人员可以通过图形化界面，详细了解测试用例和代码库的覆盖情况，从而有针对性地进行代码调整和优化。

总之，Coveralls.io是一个非常有用的测试覆盖率的检测和展示工具。

## 6、参考文档
- [infoq Qunar 酒店 NodeJS 覆盖率收集实践](https://www.infoq.cn/article/l3mqhbbeadqtlrdmpojz)
- [[Node.js] Express的测试覆盖率](https://www.cnblogs.com/moye/p/express_coverage.html)
- [代码覆盖率工具 Istanbul 入门教程](https://www.ruanyifeng.com/blog/2015/06/istanbul.html)
- JS代码覆盖率工具instanbuljs及其思路介绍 https://shenlvmeng.github.io/blog/2020/04/16/istanbuljs/