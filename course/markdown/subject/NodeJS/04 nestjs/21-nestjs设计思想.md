## 软件分层思想
分层思想在软件架构中的作用不言而喻，7层网络模型是典型代表。web 服务端开发通用的分层可参考 [阿里分层规范](https://www.kancloud.cn/kanglin/java_developers_guide/539198) 其架构图如下：

> 图中默认上层依赖于下层，箭头关系表示可直接依赖，如：开放接口层可以依赖于Web层，也可以直接依赖于Service层，依此类推：

![20230724234645](http://s3.airtlab.com/blog/20230724234645.png)

- 开放接口层：可直接封装 Service 方法暴露成 RPC 接口；通过Web封装成http接口；进行网关安全控制、流量控制等。
- 终端显示层：各个端的模板渲染并执行显示的层。当前主要是 velocity 渲染，JS 渲染，JSP 渲染，移动端展示等。
- Web层：主要是对访问控制进行转发，各类基本参数校验，或者不复用的业务简单处理等。
- Service 层：相对具体的业务逻辑服务层。
- Manager层：通用业务处理层，它有如下特征：
  - 对第三方平台封装的层，预处理返回结果及转化异常信息；
  - 对Service层通用能力的下沉，如缓存方案、中间件通用处理；
  - 与DAO层交互，对多个DAO的组合复用。
- DAO层：数据访问层，与底层 MySQL、Oracle、Hbase 等进行数据交互。
- 外部接口或第三方平台：包括其它部门RPC开放接口，基础平台，其它公司的HTTP接口。

不同的业务场景，不同的应用大小，程序复杂度高低，可以灵活的增删上述某些结构。无论是nest还是egg，官方demo里都没有明确提到dao层，直接在service层操作数据库了。这对于简单的业务逻辑没问题，如果业务逻辑变得复杂，service层的维护将会变得非常困难。业务一开始一般都很简单，它一定会向着复杂的方向演化，如果从长远考虑，一开始就应该保留dao层，在nestJS中并未查看到相关规定，可根据开发者场景自行考虑。如下是nestJS的分层架构图：

![20230724234953](http://s3.airtlab.com/blog/20230724234953.png)


对于Web层：在nestJS中，如果使用restful风格，就是controller；如果使用graphql规范，就是resolver...对于同一个业务逻辑，我们可以使用不同的接口方式暴露出去。

经常被问到和提起的问题就是为什么需要有service层：

- 首先 service 作用就是在里面编写业务逻辑代码，一般来说，都是为了增加代码复用率，实现高内聚，低耦合等...
- 体现在这里的好处就是上述提到的同一段业务代码可以使用不同的接口方式暴露出去，或者可以在一个service内调用其他service，而非在一个接口函数里面调用另外一个内部接口，这是极其不优雅的。
- 当然，老生常谈的就是不同功能目的的代码分开写方便维护管理等等

## 分层领域模型规约

- DO（Data Object）：与数据库表结构一一对应，通过DAO层向上传输数据源对象。
- DTO（Data Transfer Object）：数据传输对象，Service或Manager向外传输的对象。
- BO（Business Object）：业务对象。由Service层输出的封装业务逻辑的对象。
- AO（Application Object）：应用对象。在Web层与Service层之间抽象的复用对象模型，极为贴近展示层，复用度不高。
- VO（View Object）：显示层对象，通常是Web向模板渲染引擎层传输的对象。
- Query：数据查询对象，各层接收上层的查询请求。注意超过2个参数的查询封装，禁止使用Map类来传输。

## IOC(Inversion of Control)

中文为控制反转，是面向对象程序设计的一种设计原则，下面简单认识一下为什么需要IOC，IOC有什么好处，简单来说就是减少了固定性，通过外部传参进行控制内部本身固定的一些变量，如下例子：

在我们的代码中，经常会出现一个类依赖于另外一个类的情况，比如这样：

```ts
class Dog {}

class Person {
  private _pet

  constructor () {
    this._pet = new Dog()
  }
}

const xiaoming = new Person()
```

在上述例子中：

- Person 类固定依赖于 Dog 类，如果后续 Person 想要依赖于其他宠物类，是无法轻易修改的。
- 并且如果 Dog 类有所变化，比如其属性颜色染成了黑色，Person 类也会直接受到影响。

IOC 的思想就是将类的依赖动态注入，以解决上述两个问题：

```ts
class Dog {}

class Person {
  private _pet

  constructor (pet) {
    this._pet = pet
  }
}

const xiaohei = new Dog()
const xiaoming = new Bird(xiaohei) // 将实例化的 dog 传入 person 类
```

这样，我们就实现了类的控制反转，同时，我们需要有一个容器来维护各个对象实例，当用户需要使用实例时，容器会自动将对象实例化给用户，这部分通常由框架处理。

这种动态注入的思想叫做依赖注入（DI, Dependency Injection），它是 IoC 的一种应用形式。

## AOP(Aspect Oriented Programming)
中文为面向切面编程。当一个请求打过来时，一般会经过 Controller（控制器）、Service（服务）、Repository（数据库访问） 的链路。当我们不使用AOP时，需要添加一些通用逻辑时（如日志记录、权限守卫、异常处理等等），就需要在每段请求逻辑中编写相关代码。

AOP 就是在所有请求外面包裹一层切面，所有请求都会经过这个切面，然后我们就可以把上述的通用逻辑放在这个结构里，如下图：

![20230724235357](http://s3.airtlab.com/blog/20230724235357.png)

在 nestJS 中实现 AOP 的方式有很多，比如（excepion filter、pipes、guards、interceptors）

## 参考文章
- 阿里巴巴java开发手册 https://www.kancloud.cn/kanglin/java_developers_guide/539198
- https://justin3go.com/%E5%8D%9A%E5%AE%A2/2023/01/25%E6%B5%85%E8%B0%88NestJS%E8%AE%BE%E8%AE%A1%E6%80%9D%E6%83%B3.html