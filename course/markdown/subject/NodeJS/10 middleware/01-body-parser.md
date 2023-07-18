- 预备知识：熟悉 express 的中间件逻辑
- 阅读时间：30min

## 1. body-parser 解决什么问题
在 node http 模块中，您只能通过 data 事件，以 buffer 的形式来获取请求体内容，node 没有提供如何解析请求 body 的API，[body-parser](https://www.npmjs.com/package/body-parser) 提供了这个功能。

body-parser 本质是一个处理请求 body 的中间件函数，他负责按照您给的规则解析请求body，并且将结果赋值到 req.body 属性上。

## 2. 简单的使用 body-parser
```javascript
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  
  // 您可以通过req.body 来访问请求体内容
  res.end(JSON.stringify(req.body, null, 2))
})
```

通过这个例子您可以了解到如何简单的使用 body-parser。

## 3. 源码分析

首先 bodyParser 的源码结构如下：

![20230605002602](http://s3.airtlab.com/blog/20230605002602.png)

- index.js：入口文件
- lib：核心方法
   - types：该文件下的4个文件，分别用于解析对应的4个类型
      - json.js：将body解析为JSON对象
      - raw.js
      - text.js：将body解析为字符串
      - urlencoded.js：将表单数据(urlencoded编码)解析为JSON对象
   - read.js：读取 body 内容

### 1. bodyParser的导出形式

bodyParser 的定义在 index.js，这里的逻辑非常清晰：

- 创建一个用于解析 json 和 urlencoded 格式的中间件：bodyParser 并导出
- 给 bodyParser 添加 json/text/raw/urlencoded 方法
```javascript
'use strict'

var deprecate = require('depd')('body-parser')

// 缓存 parser 
var parsers = Object.create(null)

// 导出一个Function
exports = module.exports = deprecate.function(bodyParser,
  'bodyParser: use individual json/urlencoded middlewares')

// JSON parser.
Object.defineProperty(exports, 'json', {
  configurable: true,
  enumerable: true,
  get: createParserGetter('json')
})

// Raw parser.
Object.defineProperty(exports, 'raw', {
  configurable: true,
  enumerable: true,
  get: createParserGetter('raw')
})

// Text parser.
Object.defineProperty(exports, 'text', {
  configurable: true,
  enumerable: true,
  get: createParserGetter('text')
})

// URL-encoded parser.
Object.defineProperty(exports, 'urlencoded', {
  configurable: true,
  enumerable: true,
  get: createParserGetter('urlencoded')
})

// 创建一个用于解析 json 和 urlencoded 格式的中间件
function bodyParser (options) {
  var opts = {}

  // exclude type option
  if (options) {
    for (var prop in options) {
      if (prop !== 'type') {
        opts[prop] = options[prop]
      }
    }
  }

  var _urlencoded = exports.urlencoded(opts)
  var _json = exports.json(opts)

  return function bodyParser (req, res, next) {
    _json(req, res, function (err) {
      if (err) return next(err)
      _urlencoded(req, res, next)
    })
  }
}

// Create a getter for loading a parser.
function createParserGetter (name) {
  return function get () {
    return loadParser(name)
  }
}

// Load a parser module.
function loadParser (parserName) {
  var parser = parsers[parserName]

  if (parser !== undefined) {
    return parser
  }

  // this uses a switch for static require analysis
  switch (parserName) {
    case 'json':
      parser = require('./lib/types/json')
      break
    case 'raw':
      parser = require('./lib/types/raw')
      break
    case 'text':
      parser = require('./lib/types/text')
      break
    case 'urlencoded':
      parser = require('./lib/types/urlencoded')
      break
  }

  // store to prevent invoking require()
  return (parsers[parserName] = parser)
}

```
### 2. text 解析流程

将 body 解析非常简单，这只需要将 buffer 转换为 string 即可。 所以从最简单 text parser 开始，其他解析大体也是类似的，主要区别在于将字符串解析到特定格式的方法。比如将表单数据(urlencoded form) 解析为JSON对象。

现在您希望将 text/plain 的请求体解析为一个字符串，源码是这样的：

```javascript
// 默认将 type 为 text/plain 解析为字符串
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express()
var port = 3000;
 
app.use(bodyParser.text())

app.post('/text', (req, res) => res.send(req.body))

app.listen(port, () => console.log(`\nExample app listening on port ${port}!`))
```

当我们 curl 进行如下访操作：

```bash
$ curl -d "hello" http://localhost:3000/text
hello
```

这背后的流程是怎样的呢？

#### 1. bodyParser.text() 中间件

由于我们使用 bodyParser.text() 中间件，所以当进行上述访问时，会访问到 lib/types/text，源码如下：
```javascript
'use strict'

var bytes = require('bytes')
var contentType = require('content-type')
var debug = require('debug')('body-parser:text')
var read = require('../read')
var typeis = require('type-is')

// 导出 text 中间件
module.exports = text

// text 中间件 定义
function text (options) {
  // option 是使用该中间件传入的选项
  var opts = options || {}

	// 获取字符集
  var defaultCharset = opts.defaultCharset || 'utf-8'
 
  // 是否处理压缩的body, true时body会被解压，false时body不会被处理
  var inflate = opts.inflate !== false
  
  // body大小限制
  var limit = typeof opts.limit !== 'number'
    ? bytes.parse(opts.limit || '100kb')
    : opts.limit
  
  // 需要处理的 content-type 类型
  var type = opts.type || 'text/plain'
  
  // 用户自定义的校验函数，若提供则会被调用verify(req, res, buf, encoding)
  var verify = opts.verify || false

  if (verify !== false && typeof verify !== 'function') {
    throw new TypeError('option verify must be function')
  }

  // create the appropriate type checking function
  var shouldParse = typeof type !== 'function'
    ? typeChecker(type)
    : type
	
  // 这里是核心, 不同的解析器有不同的处理方式
  // text parse 很简单是因为它啥也不需要干
  function parse (buf) {
    return buf
  }

  return function textParser (req, res, next) {
    // 当我们进行 POST 请求时 textParser 中间件会被调用
    // 这里先判断 body 是否已经解析过了，下游会设置为 true
    if (req._body) {
      debug('body already parsed')
      next()
      return
    }

    req.body = req.body || {}
		
    // 没有请求体时不处理
    // skip requests without bodies
    if (!typeis.hasBody(req)) {
      debug('skip empty body')
      next()
      return
    }

    debug('content-type %j', req.headers['content-type'])

    // determine if request should be parsed
    if (!shouldParse(req)) {
      debug('skip parsing')
      next()
      return
    }

    // get charset
    var charset = getCharset(req) || defaultCharset

    // read
    read(req, res, next, parse, debug, {
      encoding: charset,
      inflate: inflate,
      limit: limit,
      verify: verify
    })
  }
}

// 获取请求字符集
function getCharset (req) {
  try {
    return (contentType.parse(req).parameters.charset || '').toLowerCase()
  } catch (e) {
    return undefined
  }
}

// content-type 检测
function typeChecker (type) {
  return function checkType (req) {
    return Boolean(typeis(req, type))
  }
}

// 判断是否包含请求体(这个函数是从type-is包复制出来的)
function hasbody (req) {
  return req.headers['transfer-encoding'] !== undefined ||
    !isNaN(req.headers['content-length'])
}
```
大概流程如下：

- 使用 app.use 使用中间件
- 客户端发起 POST 请求
- 进入 textParser 中间件
   - 判断是否已经解析过(req._body = true)
   - 判断请求是否包含请求体
   - 判断请求体类型是否需要处理
   - 读取请求体，解析并设置 req.body &&  req._body = true
- 进入 read 中间件(读取请求体，解析并设置 req.body &&  req._body = true)

#### 2. read() 中间件(lib/read.js)

lib/types 下的4个文件，最终都会访问 lib/read.js，形式如下：

```javascript
read(req, res, next, parse, debug, {
  encoding: charset,
  inflate: inflate,
  limit: limit,
  verify: verify
})
```

现在我们来看下 lib/read.js 源码：

```javascript
'use strict'

var createError = require('http-errors')
var getBody = require('raw-body')
var iconv = require('iconv-lite')
var onFinished = require('on-finished')
var zlib = require('zlib')

module.exports = read

function read (req, res, next, parse, debug, options) {
  var length
  var opts = options
  var stream

  // parsed flag, 上游服务有做判断
  req._body = true

  // read options
  var encoding = opts.encoding !== null
    ? opts.encoding
    : null
  var verify = opts.verify

  try {
    // get the content stream
    stream = contentstream(req, debug, opts.inflate)
    length = stream.length
    stream.length = undefined
  } catch (err) {
    return next(err)
  }

  // set raw-body options
  opts.length = length
  opts.encoding = verify
    ? null
    : encoding

  // assert charset is supported
  if (opts.encoding === null && encoding !== null && !iconv.encodingExists(encoding)) {
    return next(createError(415, 'unsupported charset "' + encoding.toUpperCase() + '"', {
      charset: encoding.toLowerCase(),
      type: 'charset.unsupported'
    }))
  }

  // read body
  debug('read body')
  // getBody 函数用于从 stream 中读取内容
  getBody(stream, opts, function (error, body) {
    if (error) {
      // 异常处理
      var _error
      if (error.type === 'encoding.unsupported') {
        // echo back charset
        _error = createError(415, 'unsupported charset "' + encoding.toUpperCase() + '"', {
          charset: encoding.toLowerCase(),
          type: 'charset.unsupported'
        })
      } else {
        // set status code on error
        _error = createError(400, error)
      }

      // read off entire request
      stream.resume()
      onFinished(req, function onfinished () {
        next(createError(400, _error))
      })
      return
    }

    // 用户自定义校验函数 verify
    if (verify) {
      try {
        debug('verify body')
        verify(req, res, body, encoding)
      } catch (err) {
        next(createError(403, err, {
          body: body,
          type: err.type || 'entity.verify.failed'
        }))
        return
      }
    }

    var str = body
    try {
      debug('parse body')
      // 如果body不是字符类型而且设置了encoding，那么需要重新解码 
      str = typeof body !== 'string' && encoding !== null
        ? iconv.decode(body, encoding)
        : body
     	
      // 这里不同解析器，会传入不同 parse
      req.body = parse(str)
    } catch (err) {
      next(createError(400, err, {
        body: str,
        type: err.type || 'entity.parse.failed'
      }))
      return
    }

    next()
  })
}

// 获取请求体 stream
// 1. 获取压缩编码格式，如果有压缩需要先解压
// 2. 返回 stream
function contentstream (req, debug, inflate) {
  var encoding = (req.headers['content-encoding'] || 'identity').toLowerCase()
  var length = req.headers['content-length']
  var stream

  debug('content-encoding "%s"', encoding)

  if (inflate === false && encoding !== 'identity') {
    throw createError(415, 'content encoding unsupported', {
      encoding: encoding,
      type: 'encoding.unsupported'
    })
  }

  switch (encoding) {
    case 'deflate':
      stream = zlib.createInflate()
      debug('inflate body')
      req.pipe(stream)
      break
    case 'gzip':
      stream = zlib.createGunzip()
      debug('gunzip body')
      req.pipe(stream)
      break
    case 'identity':
      stream = req
      stream.length = length
      break
    default:
      throw createError(415, 'unsupported content encoding "' + encoding + '"', {
        encoding: encoding,
        type: 'encoding.unsupported'
      })
  }

  return stream
}
```

## 4. 一些疑问

### 1. 为什么要对 charset 进行处理
其实本质上来说，charset前端一般都是固定为utf-8的， 甚至在JQuery的AJAX请求中，前端请求charset甚至是不可更改，只能是charset，但是在使用fetch等API的时候，的确是可以更改charset的，这个工作尝试满足一些比较偏僻的更改charset需求。

### 2. 为什么要对 content-encoding 做处理
一般情况下我们认为，考虑到前端发的AJAX之类的请求的数据量，是不需要做Gzip压缩的。但是向服务器发起请求的不一定只有前端，还可能是Node的客户端。这些Node客户端可能会向Node服务端传送压缩过后的数据流。 例如下面的代码所示:

```javascript
const zlib = require('zlib');
const request = require('request');
const data = zlib.gzipSync(Buffer.from("我是一个被Gzip压缩后的数据"));
request({
    method: 'POST',
    url: 'http://127.0.0.1:3000/post',
    headers: {//设置请求头
        "Content-Type": "text/plain",
        "Content-Encoding": "gzip"
    },
    body: data
})
```

## 5. 参考以及延伸

- npm bodyParser [https://www.npmjs.com/package/body-parser#bodyparsertextoptions](https://www.npmjs.com/package/body-parser#bodyparsertextoptions)
- npm iconv-lite 纯JS编码转换器
- npm raw-body 以buffer或者string的方式获取一个可读流的全部内容，并且可校验长度
- bodyparser 实现原理解析(这篇文章回答了我上述2个疑问) [https://zhuanlan.zhihu.com/p/78482006](https://zhuanlan.zhihu.com/p/78482006)
