---
title: 锚点定位双向更新 ⭕
date: 2020-12-02
tags: FE
description: 
---

TOC 目录在页面中起到一个很好的索引作用，当页面滑动时，TOC 会随着页面滑动对应更新，如下图

![20230605150435](http://s3.airtlab.com/blog/20230605150435.png)

交互逻辑：

- 页面滑动时，目录对应条目高亮
- 点击目录对应条目，页面滑动到对应位置

## 1、点击目录，更新页面位置

这个比较好处理，给每个标题一个链接锚点，锚点为

```js
`${window.location.hostname}${window.location.pathname}#${标题id}/`
```

比如 `字符串匹配`的路径可能为 `https://example.com/path/#字符串匹配`，点击目录滚动到对应锚点即可。

1. 通过`a`标签，`<a href="https://example.com/path/#字符串匹配">`跳转

2. 通过`scrollIntoView` 滑动, id为对应的标题id

   ```js
    document
       .getElementById(id)
       .scrollIntoView({ inline: 'nearest', behavior: 'smooth' });
   ```

## 2、页面位置变更，目录对应更新

这里有两个方案

1. 监听页面滚动位置，判断哪个标题内容进入到视图，然后更新对应的目录标题样式
2. 浏览器提供了原生的API `IntersectionObserver`, 用于观测DOM元素的交叉情况，我们使用 `IntersectionObserver` 监听各个标题区块即可

### 1. 通过滚动位置判断

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TOC</title>
  <style>
    .article {
      width: 1200px;
      margin: 0 auto;
      line-height: 30px;
    }

    .toc {
      position: fixed;
      right: 600px;
      top: 30px;
      padding-right: 60px;
      padding-left: 20px;
      background-color: #f5f5f5;
    }

    .toc ul {
      padding-left: 0;
    }

    .toc a {
      color: #666;
      text-decoration: none;
    }

    .toc .active a {
      color: #3c3ce7;
    }
  </style>
</head>

<body>
  <div class="article">
    <h2 id="hash1">hash1</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash2">hash2</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash3">hash3</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h2 id="hash4">hash4</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash5">hash5</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash6">hash6</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h2 id="hash7">hash7</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash8">hash8</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash9">hash9</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
  </div>
  <div class="toc"></div>
</body>

<script>
  var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  var toc = document.querySelector('.toc');
  var html = '<ul>'

  function init() {
    headings.forEach((heading, index) => {
      const title = heading.textContent
      const id = `heading-${index}`
      heading.setAttribute('id', id)
      const level = parseInt(heading.tagName.replace('H', ''), 10)

      html += `
    <li style="margin-left: ${(level - 1) * 16}px">
      <a href="#${id}">
        ${title}
      </a>
    </li>
  `
    })

    html += '</ul>'

    toc.innerHTML = html;

    const navList = document.querySelectorAll(".toc li");

    navList[0].className = "active"

    for (let i = 0; i < headings.length; i++) {
      console.log(`offset`, headings[i].offsetTop)
    }

    window.addEventListener('scroll', function () {
      var top = document.documentElement.scrollTop
      console.log(`current scroll top`, top)

      for (let i = 0; i < headings.length; i++) {
        navList.forEach((it) => {
          it.className = ''
        })
      }

      for (let i = 0; i < headings.length; i++) {
        if (headings[i].offsetTop > top) {
          navList[i].className = "active";
          break;
        }
      }
    })
  }

  if (headings.length) {
    init()
  }

</script>

</html>
```

### 2. 使用 IntersectionObserver 观测

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TOC</title>
  <style>
    .article {
      width: 1200px;
      margin: 0 auto;
      line-height: 30px;
    }

    .toc {
      position: fixed;
      right: 600px;
      top: 30px;
      padding-right: 60px;
      padding-left: 20px;
      background-color: #f5f5f5;
    }

    .toc ul {
      padding-left: 0;
    }

    .toc a {
      color: #666;
      text-decoration: none;
    }

    .toc .active a {
      color: #3c3ce7;
    }
  </style>
</head>

<body>
  <div class="article">
    <h2 id="hash1">hash1</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash2">hash2</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash3">hash3</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h2 id="hash4">hash4</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash5">hash5</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash6">hash6</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h2 id="hash7">hash7</h2>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash8">hash8</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
    <h3 id="hash9">hash9</h3>
    <div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
      <div>首先，我们导入了内置的fs模块，然后定义了要检查的目录路径。接下来，我们使用我们使用</div>
    </div>
  </div>
  <div class="toc"></div>
</body>

<script>
  var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  var toc = document.querySelector('.toc');
  var html = '<ul>'

  function init() {
    const anchorsId = [];
    headings.forEach((heading, index) => {
      const title = heading.textContent
      const id = `heading-${index}`
      anchorsId.push(id)
      heading.setAttribute('id', id)
      const level = parseInt(heading.tagName.replace('H', ''), 10)

      html += `
    <li style="margin-left: ${(level - 1) * 16}px">
      <a href="#${id}">
        ${title}
      </a>
    </li>
  `
    })

    html += '</ul>'

    toc.innerHTML = html;

    const navList = document.querySelectorAll(".toc li");

    navList[0].className = "active"

    // 观测进入到视图的内容
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(entry.target.id)
          // setActiveAnchor(entry.target.id);
        }
      });
    });

    forEach(anchorsId, id => observer.observe(document.getElementById(id)));

    /**
     * 对一个可遍历对象每一个元素操作
     * @param iterator 可遍历对象
     * @param func 操作函数
     */
    function forEach(iterator, func) {
      for (let val of iterator) {
        func(val);
      }
    }
  }

  if (headings.length) {
    init()
  }

</script>

</html>
```

## 3、从 HTML 或者 Markdown 中解析出 TOC

- markdown 可借助 `markdown-it-table-of-contents` 修改下源码 暴露 headings 
- html 

## 4、总结
使用滚动距离比使用 IntersectionObserver 的方式更符合习惯

## 5、参考
- https://github.com/feikerwu/shan-hai-jing/blob/main/content/blog/toc.md
