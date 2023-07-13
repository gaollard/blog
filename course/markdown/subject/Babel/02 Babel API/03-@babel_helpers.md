---
title: 03 @babel/helpers
tags: Babel
---

该模块用于提供了编译时的一些帮助函数。

```javascript
import * as helpers from '@babel/helpers';
import * as t from '@babel/types';

const typeofHelper = helpers.get('typeof');

t.isExpressionStatement(typeofHelper);
// true
```