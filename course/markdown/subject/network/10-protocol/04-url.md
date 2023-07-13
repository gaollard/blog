---
tags: network
---

```
foo://example.com:8042/over/there?name=ferret#nose
   \_/ \______________/ \________/\_________/ \__/
    |         |              |         |        |
  scheme     authority                path      query   fragment
```


scheme 也可以成为 protocol。example.com被称为 hostname。

## **哪些字符需要URL编码**

- `#`
- `&`