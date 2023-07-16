---
title: 19 代码高亮
tags: tools
date: 2022-06-10 00:00:00
---

## 1、prismjs

- https://prismjs.com/#examples
- 在官方下载语言扩展以及主题 https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript

可以在 nodejs 和 浏览器中使用

```js
const Prism = require('prismjs');

// The code snippet you want to highlight, as a string
const code = `var data = 1;`;

// Returns a highlighted HTML string
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
console.log(html)
```

```html
<span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
```

## 2、highlight.js

https://highlightjs.org/

可以在 nodejs 和 浏览器中使用

```js
// require the highlight.js library, including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```