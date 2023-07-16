- AST test https://astexplorer.net/#/2AmVrGuGVJ

## 1、使用 htmlparser2 解析 heading

需要注意 pre + code 或者 xmp 的处理

```js
const fs = require('fs')
const htmlparser = require("htmlparser2");

function resolveHeadings (content) {
  const headings = []
  let heading;
  let isHeading = false;
  let isTag = true;
  const parser = new htmlparser.Parser({
    onopentag: function (name, attributes) {
      if (name === 'xmp') {
        isTag = false;
      }

      if (isTag) {
        if (
          name === "h1" ||
          name === "h2" ||
          name === "h3" ||
          name === "h4" ||
          name === "h5" ||
          name === "h6"
        ) {
          isHeading = true;
          heading = {
            level: name,
            text: '',
            attributes
          }
          headings.push(heading)
        } else {
          isHeading = false;
        }
      }
    },
    onclosetag: function (name, attributes) {
      if (name === 'xmp') {
        isTag = true;
      }

      if (
        name === "h1" ||
        name === "h2" ||
        name === "h3" ||
        name === "h4" ||
        name === "h5" ||
        name === "h6"
      ) {
        isHeading = false;
      }
    },

    ontext: function(text) {
      if (isHeading) {
        heading.text = text
      }
    }
  });

  parser.write(content);
  parser.end();

  return headings;
}

console.log(resolveHeadings(fs.readFileSync('./index.html', 'utf8')))
```

```text
[
  { level: 'h1', text: 'h1', attributes: { id: 'h1' } },
  { level: 'h2', text: 'h2', attributes: {} }
]
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1 id="h1">h1</h1>
  <div>哈哈哈哈电话</div>
  <h2>h2</h2>
  <div>哈哈哈哈电话</div>
  <xmp>
    <h3>h3</h3>
  </xmp>
</body>
</html>
```