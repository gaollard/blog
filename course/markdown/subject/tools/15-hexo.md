---
title: 15 hexo 搭建博客
tags: tools
date: 2022-06-10 00:00:00
---

- 官方文档 https://hexo.io/zh-cn/
- 自己写一个 hexo 主题 https://segmentfault.com/a/1190000006057336
- 自己写一个 hexo 主题 https://juejin.cn/post/6844904068565958663
- hexo 原理 https://juejin.cn/user/1538971967685032
- hexo 原理 https://www.ituring.com.cn/article/199295

## 1、文章排序

## 2、使用插件

## 3、Front-matter

解析 Front-matter

```js
var content = `---\n
title: hello
tas: Javascript
---

<h2>hello</h2>
---
`;

const frontMatterRegex = /^---\s*[\s\S]*?\s*---/;
const frontMatterMatch = content.match(frontMatterRegex);

if (frontMatterMatch) {
  // 取出匹配到的Front-matter部分，并将其转换为JavaScript对象
  const frontMatterString = frontMatterMatch[0].replace(/---/g, "").trim();
  console.log(frontMatterString);
  // 使用 Yaml 解析
} else {
  console.log("没有找到Front-matter部分");
}
```