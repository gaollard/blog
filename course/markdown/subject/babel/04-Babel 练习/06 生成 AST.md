```javascript
const fs = require('fs');
const babel = require("@babel/core");

var res = babel.transformSync("var code = 1; var fn = () => {}", {
  ast: true,
  plugins: [
    require('@babel/plugin-transform-arrow-functions')
  ]
});

console.log(res.code);
```