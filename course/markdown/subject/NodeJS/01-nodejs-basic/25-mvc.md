---
title: 25 nodejs mvc 实现
toc: true
tags: NodeJS 基础
categories: NodeJS
---

## 1、mvc 介绍

MVC是一种软件设计架构，它将应用程序按照模型（Model）、视图（View）和控制器（Controller）的角色分成三个部分。
MVC框架可以帮助开发人员更轻松地构建和维护Web应用程序，并提高应用程序的可扩展性和可重用性。下面是MVC框架的一些关键特征：
- 模型（Model）处理数据和数据操作，包括数据的获取、存储和验证等。
- 视图（View）显示数据，通常是HTML页面或者是其他UI组件。
- 控制器（Controller）处理业务逻辑和用户输入，例如响应用户的请求并将请求转发给合适的模型和视图。

MVC框架将应用程序分为三个独立的模块，使开发更加模块化和易于组织。MVC还可以提高代码的复用程度，因为模型和视图通常可以在多个控制器之间共享。因此，MVC是Web应用程序开发中广泛使用的一种架构。常见的MVC框架包括Spring MVC、ASP.NET MVC、Ruby on Rails等。

## 2、mvc 不是完整的框架

MVC是一种常见的软件架构模式，但是它不是一个完整的应用程序设计或框架，而只是一种在应用程序中组织代码的方法。MVC中的架构模式是模型（Model）、视图（View）和控制器（Controller）的缩写，其中视图和控制器都是属于应用程序的界面和交互层。
在MVC的设计中，通常不需要服务层来处理具体的业务逻辑，而应该将业务逻辑放在控制器中处理。控制器作为连接模型和视图的中介，可以处理用户的请求并根据需要从模型中获取数据，再把数据传递给视图进行呈现。如果需要对数据进行一些逻辑操作，可以直接在控制器层面进行处理，而不需要引入额外的服务层。

当然，在某些MVC实现中，服务层或业务层可能会被用来处理更复杂的业务逻辑，特别是当控制器和模型非常庞大时。但是，这并不是MVC的强制性要求，而是一种设计选择。

相比之下，NestJS 是一个后端开发框架，它在MVC设计之上为开发者提供了便捷的模块化和服务化。在 NestJS的设计中，服务层是用来处理业务逻辑的，控制器层只负责处理HTTP请求并将请求传递给服务层处理并返回请求的响应。因此，NestJS的设计需要引入服务层来分离业务逻辑和控制器，实现业务逻辑的可重用性并使代码更加清晰易懂。

## 3、nodejs mvc

使用Node.js和Express框架的简单MVC框架。下面是主要的代码和文件：
首先，我们需要在项目中安装 Express：

```
npm install express
```

然后，创建一个server.js文件，用来启动服务器并设置路由：

```javascript
const express = require('express');
const app = express();

// 设置路由
app.get('/', function(req, res){
  res.send('Hello World!');
});

app.listen(3000, function(){
  console.log('Server started on port 3000...');
});
```

这段代码启动一个服务器，并在根URL上返回 "Hello World!" 字符串。

接下来，创建一个目录结构，用来容纳我们的MVC框架：

```
- app/
  - controllers/
    - homeController.js
  - models/
    - homeModel.js
  - views/
    - homeView.ejs
  - routes.js
- server.js
```

在MVC框架中，代码被分成三层：模型、视图和控制器。

- 模型层负责处理数据和数据操作（CRUD）。
- 视图层负责显示数据。
- 控制器层负责接收和处理用户请求，并将请求转发给适当的模型和视图。

接下来，我们来实现这三个层的代码：

### 模型层

打开homeModel.js文件，加入以下代码：

```javascript
class HomeModel {
  constructor() {
    this.data = {
      name: "John",
      age: 30,
      email: "john@example.com"
    };
  }

  getData() {
    return this.data;
  }
}

module.exports = HomeModel;
```

这是一个简单的模型类，它只是返回一些硬编码的数据。

### 视图层

我们使用EJS（Embedded JavaScript）模板引擎来实现我们的视图。

打开homeView.ejs文件，并加入以下代码：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Home Page</title>
</head>
<body>
  <h1>Welcome <%= name %>!</h1>
  <p>You are <%= age %> years old.</p>
  <p>Your email address is <%= email %>.</p>
</body>
</html>
```

这个模板使用了EJS的嵌入式Javascript语法，它将在渲染视图时被动态替换为数据。

### 控制器层

打开homeController.js文件，并加入以下代码：

```javascript
const HomeModel = require('../models/homeModel');

class HomeController {
  constructor() {
    this.homeModel = new HomeModel();
  }

  index(req, res) {
    let data = this.homeModel.getData();
    res.render('homeView', data);
  }
}

module.exports = HomeController;
```

这个控制器将接收请求并调用模型对象，然后将模型数据传递给视图进行呈现。

### service
增加 service 文件夹，增加：
- home.service.js
- user.service.js

简化 Controller 代码，抽离到 Service 中 

### 路由

打开routes.js文件，并加入以下代码：

```javascript
const express = require('express');
const router = express.Router();
const HomeController = require('./controllers/homeController');

const homeController = new HomeController();

router.get('/', homeController.index.bind(homeController));

module.exports = router;
```

这个路由文件建立路由，并将请求传递到HomeController的index方法。

### 启动服务器

最后，在server.js文件中加入以下代码：

```javascript
const express = require('express');
const app = express();
const router = require('./app/routes');

// 设置路由
app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.listen(3000, function(){
  console.log('Server started on port 3000...');
});
```

这个文件启动服务器并设置路由，同时指定视图渲染引擎为EJS。

现在，运行下面的命令启动服务器：

```
node server.js
```

现在，在浏览器中访问 http://localhost:3000/，你应该可以看到一个简单的欢迎页面。恭喜，你已经写了一个使用 Node.js 和 Express 的简单的 MVC 框架！

### 约定式自动加载
按照约定
- service 目录下每个文件导出一个 Service
- controller 目录下每个文件导出一个 Controller
- model 目录下每个文件导出一个 Model

假设程序入口为 main.js，在 main.js 中，使用 fs 遍历文件夹，再 require 每个文件，挂载到对应的 `ctx.controller` `ctx.service`  `ctx.model`，使用时不需要再导入，可以直接引用 ctx。 

## 4、软件架构的层级划分
- 粗划分
  - Model
  - View
  - Controller
- 细划分
  - Model
  - View
  - Controller
  - Service
  - Validation