我在写一个 babel 插件，用于给每一个 div 标签都加一个 css class。现在出现了两种场景。

## 1、`React.createElement('div', {})`

![20230511185255](http://s3.airtlab.com/blog/20230511185255.png)

```js
module.exports = function (api) {
  api && api.cache(false);
  return {
    presets: [
      ["@babel/preset-react", { runtime: "classic" }],
    ],
    plugins: [
      // 注意 prefix 中的空格
      ["./src/babel-plugin-change-jsx-className", {
        prefix: 'f6 '
      }]
    ]
  };
};

```

```js
const fs = require('fs');
const { Console } = require('console');
const logFile = process.cwd() + '/' + 'a.log'

const std = fs.createWriteStream(logFile, { flags: 'a' });
const console = new Console(std);
const types = require('@babel/types');
let config = {};

module.exports = function (
  _,
  options = {
    prefix: '',
  },
) {
  config = options;
  return {
    visitor: {
      CallExpression,
      JSXElement(path) {
        const node = path.node;
        if (node.openingElement.name.name === "div") {
          console.log("Found div:", node);
        }
      },
      BinaryExpression(path) {
        console.log(path.node.left); // Identifier Node
        console.log(path.node.right); // Identifier Node
        console.log(path.node.operator); // "*"
      },
    },
  };
};

function CallExpression(path) {
  // debugger;
  const _this = this;
  const callee = path.node.callee;
  console.log(444, callee);

  if (callee.type === 'MemberExpression') {
    const callFn = callee.object.name + '.' + callee.property.name;
    if (callFn === 'React.createElement') {
      path.skip();

      const arg1 = path.get('arguments.1');

      if (arg1.node.type === 'NullLiteral') {
        // null
        arg1.replaceWith(
          types.objectExpression([
            types.objectProperty(
              types.identifier('className'),
              types.stringLiteral(config.prefix),
            ),
            types.objectProperty(
              types.identifier('data-code'),
              types.stringLiteral(_this.filename),
            ),
          ]),
        );
      } else {
        // {}
        if (arg1.node.type === 'ObjectExpression') {
          const index = arg1.node.properties.findIndex((it) => {
            return it.key.name === 'className';
          });
          if (index !== -1) {
            const proPath = arg1.get(`properties.${index}`);
            proPath.node.value = types.binaryExpression(
              '+',
              types.StringLiteral(config.prefix),
              proPath.node.value,
            );
          }
        }
      }
    }
  }
}
```

```json
{
  "name": "f6",
  "version": "0.0.0",
  "description": "> TODO: description",
  "author": "gaollard <1056834607@qq.com>",
  "homepage": "",
  "license": "ISC",
  "main": "src/index.js",
  "directories": {
    "lib": "lib",
    "test": "__tests__"
  },
  "files": [
    "lib",
    "src"
  ],
  "scripts": {
    "test": "echo \"Error: run tests from root\" && exit 1",
    "build": "babel demo/index.js"
  },
  "dependencies": {
    "@babel/generator": "^7.16.5",
    "@babel/preset-react": "^7.16.5",
    "@babel/runtime": "^7.16.5",
    "@types/react-transition-group": "^4.4.4"
  },
  "devDependencies": {
    "@babel/cli": "^7.16.0",
    "@babel/core": "^7.16.5",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/plugin-transform-modules-commonjs": "^7.16.5",
    "@babel/plugin-transform-object-assign": "^7.0.0",
    "@babel/plugin-transform-runtime": "^7.4.4",
    "@babel/polyfill": "^7.4.4",
    "@babel/preset-env": "^7.16.5",
    "@babel/preset-typescript": "^7.3.3",
    "@types/react": "^17.0.34",
    "@types/react-dom": "^17.0.11",
    "style-loader": "^3.3.1",
    "css-loader": "^6.5.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "rimraf": "^3.0.2",
    "typescript": "^4.4.4"
  },
  "peerDependencies": {
    "classnames": "^2.3.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

## 2、_jsx('div', {})

![20230511190028](http://s3.airtlab.com/blog/20230511190028.png)

## 3、遍历 JSXElement 更合理

![20230511191205](http://s3.airtlab.com/blog/20230511191205.png)