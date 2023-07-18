---
title: 01 目录树转 JSON
toc: true
tags: nodejs-scripts
categories: NodeJS
---

```js
const fs = require("fs");
const path = require("path");

const rootPath = path.resolve("/Users/user/Desktop/gaollard-blog/docs/pages");
const rootNode = new Node(rootPath, rootPath, false);

function Node(path, route, title, depth, leaf) {
  this.path = path;
  this.route = route;
  this.leaf = leaf;
  this.title = title;
  this.depth = depth;
  if (!this.leaf) {
    this.children = [];
  }
}

function read(sPath, parent, depth) {
  const files = fs.readdirSync(sPath);
  files.forEach((file) => {
    const cPath = sPath + "/" + file;
    const stats = fs.statSync(cPath);
    const { name, ext } = path.parse(file);

    if (stats.isDirectory()) {
      const node = new Node(
        cPath,
        cPath.replace(rootPath, ""),
        name,
        depth,
        false
      );
      parent.children.push(node);
      read(cPath, node, depth + 1);
    } else {
      if (ext == '.md') {
        const node = new Node(
          cPath,
          cPath.replace(rootPath, ""),
          name,
          depth,
          true
        );
        parent.children.push(node);
      }
    }
  });
}

read(rootPath, rootNode, 0);

fs.writeFileSync("src/routes.json", JSON.stringify(rootNode.children));

console.dir(rootNode, { depth: 6 });
```

```json
[
   {
    "path": "docs/pages/android",
    "route": "/android",
    "leaf": false,
    "title": "android",
    "depth": 0,
    "children": [
      {
        "path": "docs/pages/android/01-use-javascriptcore.md",
        "route": "/android/01-use-javascriptcore.md",
        "leaf": true,
        "title": "01-use-javascriptcore",
        "depth": 1
      },
      {
        "path": "docs/pages/android/02-react-native.md",
        "route": "/android/02-react-native.md",
        "leaf": true,
        "title": "02-react-native",
        "depth": 1
      },
      {
        "path": "docs/pages/android/03-use-quickjs.md",
        "route": "/android/03-use-quickjs.md",
        "leaf": true,
        "title": "03-use-quickjs",
        "depth": 1
      }
    ]
  },
  {
    "path": "docs/pages/backend",
    "route": "/backend",
    "leaf": false,
    "title": "backend",
    "depth": 0,
    "children": [
      {
        "path": "docs/pages/backend/01-mysql",
        "route": "/backend/01-mysql",
        "leaf": false,
        "title": "01-mysql",
        "depth": 1,
        "children": [
          {
            "path": "docs/pages/backend/01-mysql/01-query-on-tcp.md",
            "route": "/backend/01-mysql/01-query-on-tcp.md",
            "leaf": true,
            "title": "01-query-on-tcp",
            "depth": 2
          },
          {
            "path": "docs/pages/backend/01-mysql/02-mysql-utilities.md",
            "route": "/backend/01-mysql/02-mysql-utilities.md",
            "leaf": true,
            "title": "02-mysql-utilities",
            "depth": 2
          },
          {
            "path": "docs/pages/backend/01-mysql/03-mysql-workbench.md",
            "route": "/backend/01-mysql/03-mysql-workbench.md",
            "leaf": true,
            "title": "03-mysql-workbench",
            "depth": 2
          },
          {
            "path": "docs/pages/backend/01-mysql/04-get-db-used-size.md",
            "route": "/backend/01-mysql/04-get-db-used-size.md",
            "leaf": true,
            "title": "04-get-db-used-size",
            "depth": 2
          },
          {
            "path": "docs/pages/backend/01-mysql/是多大.md",
            "route": "/backend/01-mysql/是多大.md",
            "leaf": true,
            "title": "是多大",
            "depth": 2
          }
        ]
      },
      {
        "path": "docs/pages/backend/02-redis",
        "route": "/backend/02-redis",
        "leaf": false,
        "title": "02-redis",
        "depth": 1,
        "children": [
          {
            "path": "docs/pages/backend/02-redis/01-Failed-to-refresh-slots-cache.md",
            "route": "/backend/02-redis/01-Failed-to-refresh-slots-cache.md",
            "leaf": true,
            "title": "01-Failed-to-refresh-slots-cache",
            "depth": 2
          }
        ]
      }
    ]
  },
]
```