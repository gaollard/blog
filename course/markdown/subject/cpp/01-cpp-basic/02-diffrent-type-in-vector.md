---
title: 02 C++ 容器怎么存放不同类型的值？
tags: CPP
---

> https://www.zhihu.com/question/33594512

```cpp
typedef boost::variant<int, std::string> Value;
```