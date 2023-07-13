在 使用 next.js 时发现文件名包含中文字符时，访问页面 404，在 next.js github 上已经有人提了 issue: **Pages with utf-8 name don't work properly under SSR** https://github.com/vercel/next.js/issues/10084

比如当 URL 中包含中文时 404 `http://localhost:5001/Javascript%E7%AD%89%E7%AD%89/01-oversize-number`

![20230517173057](http://s3.airtlab.com/blog/20230517173057.png)

![20230530222452](http://s3.airtlab.com/blog/20230530222452.png)