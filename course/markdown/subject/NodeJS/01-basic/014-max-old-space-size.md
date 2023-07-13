---
title: 014 设置 max-old-space-size
toc: true
tags: NodeJS
categories: 前端开发
---

设置 V8 旧生代内存部分的最大内存大小。 随着内存消耗接近极限，V8 会花更多的时间在垃圾回收上，以释放未使用的内存。

test.js
```js
const v8 = require('v8');
console.log(v8.getHeapStatistics())
```

当前的测试宿主机为 MacPro 2019 16G 内存。

当执行 `node test.js`
```json
{
  total_heap_size: 4984832,
  total_heap_size_executable: 524288,
  total_physical_size: 3947728,
  total_available_size: 4342033176,
  used_heap_size: 4170336,
  heap_size_limit: 4345298944,
  malloced_memory: 254120,
  peak_malloced_memory: 90624,
  does_zap_garbage: 0,
  number_of_native_contexts: 1,
  number_of_detached_contexts: 0,
  total_global_handles_size: 8192,
  used_global_handles_size: 3200,
  external_memory: 321551
}
```

当执行 `NODE_OPTIONS=--max-old-space-size=6144 node ./test.js`
```json
{
  total_heap_size: 4984832,
  total_heap_size_executable: 524288,
  total_physical_size: 3913440,
  total_available_size: 6489516800,
  used_heap_size: 4170368,
  heap_size_limit: 6492782592,
  malloced_memory: 254120,
  peak_malloced_memory: 221520,
  does_zap_garbage: 0,
  number_of_native_contexts: 1,
  number_of_detached_contexts: 0,
  total_global_handles_size: 8192,
  used_global_handles_size: 3200,
  external_memory: 321551
}
```

其中 total_available_size 已经被修改。