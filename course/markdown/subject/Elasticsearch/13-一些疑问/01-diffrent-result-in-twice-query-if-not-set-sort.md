---
tags: elasticsearch
---

一个奇怪的现象，如果 ES 查询时不设置排序时，测试两次的查询结果可能不一致，为了保持一致，最好设置排序规则。

```json
{
  "sort": [
    { "create_time": { "order": "DESC" } },
  ],
  "from": 0,
  "size": 10
}
```