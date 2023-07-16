---
title: 01 change-jsx-className
url: https://www.yuque.com/gaollard/ubc1q5/nafu7s
---

<https://github.com/Webang/babel-plugin-change-jsx-className>

```typescript
const types = require("@babel/types");
let config = {};

module.exports = function (
  _,
  options = {
    prefix: "",
  }
) {
  config = options;
  return {
    visitor: {
      CallExpression,
    },
  };
};

function CallExpression(path) {
  const callee = path.node.callee;
  if (callee.type === "MemberExpression") {
    const callFn = callee.object.name + "." + callee.property.name;
    if (callFn === "React.createElement") {
      path.skip();

      const arg1 = path.get("arguments.1");

      if (arg1.node.type === 'NullLiteral') {
        // null
        arg1.replaceWith(types.objectExpression([
          types.objectProperty(types.identifier('className'), types.stringLiteral(config.prefix))
        ]))
      } else {
        // {}
        if ((arg1.node.type) === 'ObjectExpression') {
          const index = arg1.node.properties.findIndex(it => {
            return it.key.name === 'className'
          });
          if (index !== -1) {
            const proPath = arg1.get(`properties.${index}`);
            proPath.node.value = types.binaryExpression(
              "+",
              types.StringLiteral(config.prefix),
              proPath.node.value
            );
          }
        }
      }
    }
  }
}

```