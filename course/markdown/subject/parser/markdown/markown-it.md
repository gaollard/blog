- 中文文档 https://markdown-it.docschina.org

## 1、演示

```js
const fs = require("fs");
const markdown = require("markdown-it");
const anchr = require("markdown-it-anchor");
const frontmatter = require("markdown-it-front-matter");

const md = markdown({
  html: false,
  xhtmlOut: true,
  typographer: true,
  // highlight: (code, lang) => {
  //   return highlighter.codeToHtml(code, { lang })
  // }
})
  .use(frontmatter, (fm) => {
    console.log(fm); // fm 是一个对象，包含 YAML 头部数据
  })
  .use(anchr)
  // .use(toc)
  .use(require("markdown-it-table-of-contents"), {
    format(content, md) {
      // console.log(222, content, md);
      return content;
    },
    resolveHeadings (headings) {
      console.log(headings)
    }
  });

const html = md.render(fs.readFileSync("./markdown.md", "utf8"));
// console.log(html);

```

## 2、结合 highlight.js 

https://blog.csdn.net/fxss5201/article/details/103567578

## 3、结合 shiki