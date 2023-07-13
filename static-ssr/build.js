const fs = require("fs");
const path = require("path");

const rootPath = path.resolve("/Users/xiong.gao/code/learn-books/gaollard-blog/docs/pages");
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
      if (ext === ('.md')) {
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