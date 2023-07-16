---
title: 03 检测目录是否存在
toc: true
tags: nodejs-scripts
categories: NodeJS
---

```js
const fs = require('fs')
const path = require('path')
const os = require('os')

try {
  const rootPath = path.resolve(os.homedir(), 'yunqu1/docs')
  const stat1 = fs.statSync(rootPath)
  console.log(stat1)
} catch (e) {
  // 不存在会报错
  console.log(e)
}
```

或者 

```javascript
const fs = require('fs');
const path = './my-directory';

if (fs.existsSync(path)) {
  console.log('目录存在');
} else {
  console.log('目录不存在');
}
```