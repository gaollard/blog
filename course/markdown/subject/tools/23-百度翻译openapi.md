---
tags: tools
---

```ts
import axios from 'axios';
import md5 from 'md5'

var url = `https://fanyi-api.baidu.com/api/trans/vip/translate`;
var app_id = '20230612001709576';
var app_secret = `Mv3I6oaIcj48dm2ISiDt`;
var salt = '1435660288';

function create_sign(q: string) {
  var content = app_id + q + salt + app_secret;
  return md5(content);
}

async function translate(q: string) {
  var sign = create_sign(q);
  var fullUrl =
    url + `?q=${q}&from=zh&to=en&appid=${app_id}&salt=${salt}&sign=${sign}`;

    axios(fullUrl).then((res) => {
    console.log(res.status)
    console.log(res.data)
  })
}

translate(`基础用法`);
```