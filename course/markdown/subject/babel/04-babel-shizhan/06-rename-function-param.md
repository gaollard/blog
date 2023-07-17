---
title: 06 修改函数参数
---

```js
module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        path.scope.rename('age', path.scope.generateUidIdentifier("age").name)
      }
    }
  }
}
```

```js
module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        const { replaceMap } = state.opts;
        const params = path.get('params');

        params.forEach((idPath) => {
          if (replaceMap[idPath.node.name]) {
            idPath.replaceWith(t.identifier(replaceMap[idPath.node.name]))
          }
        })

        Object.keys(path.scope.bindings).forEach((name) => {
          const referencePaths = path.scope.bindings[name].referencePaths
          referencePaths.forEach((idPath) => {
            if (replaceMap[idPath.node.name]) {
              idPath.replaceWith(t.identifier(replaceMap[idPath.node.name]))
            }
          })
        })
      }
    }
  }
}
```
