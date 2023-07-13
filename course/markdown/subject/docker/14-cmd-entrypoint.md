---
tags: Docker
date: 2018-05-02
---

> https://www.cnblogs.com/sparkdev/p/8461576.html 这篇文章讲的很好

```
ENTRYPOINT ["executable", "param1", "param2"]   // 这是 exec 模式的写法，注意需要使用双引号。
ENTRYPOINT command param1 param2                // 这是 shell 模式的写法。
```