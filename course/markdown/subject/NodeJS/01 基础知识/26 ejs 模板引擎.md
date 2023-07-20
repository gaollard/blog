- 官方文档 https://ejs.co/#install

## 1、ejs 模板函数

可以在 EJS 模板中编写 JavaScript 函数。 在 EJS 中，可以像在 JavaScript 代码中一样定义并执行函数。 可以在 EJS 模板的代码块中定义函数，然后在模板中使用它们。
以下是使用 EJS 编写函数的示例：

```html
<% function greet(name) {
    return "Hello " + name;
} %>

<p><%= greet("John") %></p>
```

在上面的示例中，我们定义了一个名为“greet”的函数，它接受一个参数“name”并返回“Hello”加上给定名称的字符串。 然后，我们在模板中使用了 greet 函数，并传递“John”作为参数。 我们使用<%= %>标记来呈现函数返回的值。

请注意，函数应该在对它们进行调用之前定义，以便 EJS 能够正确解析它们。

## 2、模板引用

```
- views
  - header.ejs
  - footer.ejs
- main.js
```

```js
let ejs = require("ejs");
let path = require("path");

const tpl = `
<%- include("/views/header"); %>

<%- include("/views/footer"); %>
`;

var html = ejs.render(tpl, null, {
  root: path.resolve(__dirname),
});

console.log(html);

```

## 3、ejs 递归渲染

### 实现方式 1

`./user/item`

```html
<li class="item">
  <div class="title"><%= user.title %></div>
  <% if (user.children && user.children.length) { %> <%- include('/user/list',
  {users: user.children}); %> <% } %>
</li>
```

`./user/list`

```html
<ul class="list">
  <% users.forEach(function(user){ %> <%- include('/user/item', {user: user});
  %> <% }); %>
</ul>
```

`./entry.js`

```js
let ejs = require("ejs");
let path = require("path");
let fs = require("fs");

var html = ejs.render(
  fs.readFileSync("./user/list.ejs", "utf8"),
  {
    users: [
      {
        title: "B",
        children: [
          {
            title: "B1",
          },
          {
            title: "B2",
          },
        ],
      },
      {
        title: "CC",
      },
    ],
  },
  {
    root: path.resolve(__dirname),
  }
);

fs.writeFileSync("out/03.html", html);
```

### 实现方式 2

```js
let ejs = require("ejs");
let path = require("path");
let fs = require("fs");

const tpl = `
<% function renderTree(node) {
  %>
  <ul>
      <li><%= node.name %></li>
      <% if(node.children && node.children.length) {
          node.children.forEach(child => {
              %> 
              <li><%= renderTree(child) %></li>
              <%})
          }
      %>
  </ul>
  <%
} %>

<%= renderTree(rootNode) %>
`;

var html = ejs.render(
  tpl,
  {
    rootNode: {
      name: "AA",
      children: [
        {
          name: "BB",
        },
        {
          name: "CC",
        },
      ],
    },
  },
  {
    root: path.resolve(__dirname),
  }
);

fs.writeFileSync("out/04.html", html);
```
