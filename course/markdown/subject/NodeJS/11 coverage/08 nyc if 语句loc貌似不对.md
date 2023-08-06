源码是这样的：

![20230804174548](http://s3.airtlab.com/blog/20230804174548.png)

其位置信息:

```json
{
  "loc": {
    "start": { "line": 17, "column": 4 },
    "end": { "line": 21, "column": 5 }
  },
  "type": "if",
  "locations": [
    {
      "start": { "line": 17, "column": 4 },
      "end": { "line": 21, "column": 5 }
    },
    {
      "start": { "line": 17, "column": 4 },
      "end": { "line": 21, "column": 5 }
    }
  ],
  "line": 17
}
```

为什么不是...

if 语句不需要做什么处理吧