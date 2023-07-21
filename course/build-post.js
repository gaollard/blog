const fs = require("fs");
const path = require("path");

const rootPath = path.resolve("/Users/xiong.gao/code/learn-books/blogs/course/markdown/post");
const rootNode = new Node(rootPath, rootPath, false);

function Node(path, route, title, depth, content, leaf) {
  this.key = path;
  this.path = path;
  this.route = route;
  this.leaf = leaf;
  this.title = title;
  this.depth = depth;
  this.content = content || '';
  this.isLeaf = leaf;
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
        cPath.replace(rootPath, ""),
        cPath.replace(rootPath, ""),
        name,
        depth,
        '',
        false
      );
      parent.children.push(node);
      read(cPath, node, depth + 1);
    } else {
      if (ext === ('.md')) {
        const node = new Node(
          cPath.replace(rootPath, ""),
          cPath.replace(rootPath, ""),
          name,
          depth,
          fs.readFileSync(cPath, 'utf-8'),
          true
        );
        parent.children.push(node);
      }
    }
  });
}

read(rootPath, rootNode, 0);

fs.writeFileSync("src/data/post.json", JSON.stringify(rootNode.children));