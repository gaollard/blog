在 JavaScript 中，有以下几个常用的 HTML 解析器：
1. DOM Parser：DOM Parser 是 JavaScript 内置的一个解析器，通过解析 HTML 文件将其转换成一个 DOM 对象，使我们可以对 HTML 文件的结构进行操作。

2. jQuery：jQuery 是一个流行的 JavaScript 库，它能够快速地解析 HTML，并通过 CSS 选择器获取 DOM 元素。由于其简单易用和广泛使用，因此在许多 Web 开发项目中广泛采用。

3. Cheerio：Cheerio 是另一个流行的 JavaScript HTML 解析器，它模仿了 jQuery 的 API，并可以在服务器端和客户端上使用。它使用类似于 jQuery 的语法来解析 HTML 文件，并以一个 DOM 树的形式返回解析结果。

4. jsdom：jsdom 是一个在 Node.js 上运行的 JavaScript 环境，它可以模拟一个浏览器环境，并解析 HTML 文档。它也可以用于测试 jQuery 和其他库的代码，同时还支持 DOM 操作。

5. HTML5 Parser：HTML5 Parser 是一个用于解析 HTML5 文档的 JavaScript 库，它使用了新的 HTML5 规范，并能够处理不规范的标记和特性。

6. htmlparser2 htmlparser2 is the fastest HTML parser, and takes some shortcuts to get there. If you need strict HTML spec compliance, have a look at parse5.