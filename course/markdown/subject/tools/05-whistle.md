---
title: 05 whistle 教程
tags: tools
date: 2022-06-10 00:00:00
---

### 1、使用本地资源替换
```javascript
www.gaollard.com file:///Users/gaollard/code/whistle/index.html
```

### 2、请求转发，将指定域名请求转发到另一个域名
```javascript
www.qq.com ke.qq.com # 指定域名转发生效
**.qq.com ke.qq.com  # 所有qq.com子域名转发生效
```

### 3、脚本注入
将一段脚本（可以使html、js、CSS片段）注入到dom页面中进行调试
```javascript
// mac
renwu.airtlab.com css:///Users/gaollard/code/whistle/index.css
renwu.airtlab.com js:///Users/gaollard/code/whistle/test.js
```

### 4、请求改写与接口mock
```javascript
# 会把内容 append 到请求后面
http://www.text.com/style.css resAppend://{append.css}

# 完全替换请求内容
renwu.airtlab.com/api/demand-category resBody://{mock_cate}
```

### 5、学习资料
- IMBweb whistle工具全程入门 https://www.imweb.io/topic/596480af33d7f9a94951744c
- 官方配置文档 http://wproxy.org/whistle/
- whistle 实用小技巧 https://baijiahao.baidu.com/s?id=1694050105421549643&wfr=spider&for=pc