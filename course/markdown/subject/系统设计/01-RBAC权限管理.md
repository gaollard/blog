RBAC模型（Role-Based Access Control 基于角色的访问控制）是权限管理中比较成熟的模型，认真总结一下RBAC模型的相关知识。
接下来，本文将从以下几个方面进行整理说明：什么是RBAC模型、RBAC模型的分类、什么是权限、用户组的使用、实例分析。

## 一、什么是RBAC模型
RBAC（Role-Based Access Control）即：基于角色的权限控制。通过角色关联用户，角色关联权限的方式间接赋予用户权限。
如下图：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298033-adc02d23-f229-4552-8728-800602aaa839.png#averageHue=%23f7f6f6&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u2235e462&margin=%5Bobject%20Object%5D&originHeight=73&originWidth=776&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue77080d7-e406-4abd-ab7b-2b48fcb0919&title=)
有人会问为什么不直接给用户分配权限，还多此一举的增加角色这一环节呢？
其实是可以直接给用户分配权限，只是直接给用户分配权限，少了一层关系，扩展性弱了许多，适合那些用户数量、角色类型少的平台。
对于通常的系统，比如：存在多个用户拥有相同的权限，在分配的时候就要分别为这几个用户指定相同的权限，修改时也要为这几个用户的权限进行一一修改。有了角色后，我们只需要为该角色制定好权限后，将相同权限的用户都指定为同一个角色即可，便于权限管理。
对于批量的用户权限调整，只需调整用户关联的角色权限，无需对每一个用户都进行权限调整，既大幅提升权限调整的效率，又降低了漏调权限的概率。

## 二、RBAC模型的分类
RBAC模型可以分为：RBAC0、RBAC1、RBAC2、RBAC3 四种。其中RBAC0是基础，也是最简单的，相当于底层逻辑，RBAC1、RBAC2、RBAC3都是以RBAC0为基础的升级。
一般情况下，使用RBAC0模型就可以满足常规的权限管理系统设计了。

### 2.1 RBAC0 模型
最简单的用户、角色、权限模型。这里面又包含了2种：

1. 用户和角色是多对一关系，即：一个用户只充当一种角色，一种角色可以有多个用户担当。
2. 用户和角色是多对多关系，即：一个用户可同时充当多种角色，一种角色可以有多个用户担当。

那么，什么时候该使用多对一的权限体系，什么时候又该使用多对多的权限体系呢？
如果系统功能比较单一，使用人员较少，岗位权限相对清晰且确保不会出现兼岗的情况，此时可以考虑用多对一的权限体系。其余情况尽量使用多对多的权限体系，保证系统的可扩展性。如：张三既是行政，也负责财务工作，那张三就同时拥有行政和财务两个角色的权限。

### 2.2 RBAC1 模型
相对于RBAC0模型，增加了子角色，引入了继承概念，即子角色可以继承父角色的所有权限。
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298323-f6775ae1-4ac4-461b-8439-798a67ac728a.png#averageHue=%23f9f8f8&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uee225cd4&margin=%5Bobject%20Object%5D&originHeight=154&originWidth=776&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue5f329f6-885f-49b5-9054-0216cc13944&title=)
使用场景：如某个业务部门，有经理、主管、专员。主管的权限不能大于经理，专员的权限不能大于主管，如果采用RBAC0模型做权限系统，极可能出现分配权限失误，最终出现主管拥有经理都没有的权限的情况。
而RBAC1模型就很好解决了这个问题，创建完经理角色并配置好权限后，主管角色的权限继承经理角色的权限，并且支持在经理权限上删减主管权限。

### 2.3 RBAC2 模型
基于RBAC0模型，增加了对角色的一些限制：角色互斥、基数约束、先决条件角色等。

- 角色互斥：同一用户不能分配到一组互斥角色集合中的多个角色，互斥角色是指权限互相制约的两个角色。案例：财务系统中一个用户不能同时被指派给会计角色和审计员角色。
- 基数约束：一个角色被分配的用户数量受限，它指的是有多少用户能拥有这个角色。例如：一个角色专门为公司CEO创建的，那这个角色的数量是有限的。
- 先决条件角色：指要想获得较高的权限，要首先拥有低一级的权限。例如：先有副总经理权限，才能有总经理权限。
- 运行时互斥：例如，允许一个用户具有两个角色的成员资格，但在运行中不可同时激活这两个角色。

### 2.4 RBAC3 模型
称为统一模型，它包含了RBAC1和RBAC2，利用传递性，也把RBAC0包括在内，综合了RBAC0、RBAC1和RBAC2的所有特点，这里就不在多描述了。
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298087-8206f36e-2c85-4307-b485-cd502cb9e206.png#averageHue=%23fcfcfc&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u561202ab&margin=%5Bobject%20Object%5D&originHeight=249&originWidth=385&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u431036c7-b951-4199-b34c-c2ccca9ee07&title=)

## 三、什么是权限
说了这么久用户-角色-权限，可能小伙伴们都了解了什么是用户、什么是角色。但是有的小伙伴会好奇，那权限又是个什么玩意呢？
权限是资源的集合，这里的资源指的是软件中所有的内容，包括模块、菜单、页面、字段、操作功能（增删改查）等等。具体的权限配置上，目前形式多种多样，按照我个人的理解，可以将权限分为：页面权限、操作权限和数据权限（这种分类法，主要是结合自己在工作中的实际情况理解总结而来，若有不足之处，也请大家指出）。
页面权限：所有系统都是由一个个的页面组成，页面再组成模块，用户是否能看到这个页面的菜单、是否能进入这个页面就称为页面权限。
如下图：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298170-56642ab0-b9ff-4014-98c2-de92da3fcdd8.png#averageHue=%23f1f1f1&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=ufe328bcb&margin=%5Bobject%20Object%5D&originHeight=492&originWidth=1387&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u69f41054-3916-4c8d-8305-a0b7760b0c2&title=)
客户列表、客户黑名单、客户审批页面组成了客户管理这个模块。对于普通用户，不能进行审批操作，即无客户审批页面权限，在他的账号登录后侧边导航栏只显示客户列表、客户黑名单两个菜单。
操作权限：用户凡是在操作系统中的任何动作、交互都是操作权限，如增删改查等。
数据权限：一般业务管理系统，都有数据私密性的要求：哪些人可以看到哪些数据，不可以看到哪些数据。
简单举个例子：某系统中有销售部门，销售专员负责推销商品，销售主管负责管理销售专员日常工作，经理负责组织管理销售主管作业。
如下图：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298492-d8f40d22-ee08-4378-92c3-56a869e74179.png#averageHue=%23fcfcfc&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=ud6921f89&margin=%5Bobject%20Object%5D&originHeight=280&originWidth=934&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ucbb3e891-c0f7-49d1-a504-a2c1f1aef51&title=)
按照实际理解，‘销售专员张三’登录时，只能看到自己负责的数据；销售主管2登录时，能看到他所领导的所有业务员负责的数据，但看不到其他团队业务员负责的数据。
换另外一句话就是：我的客户只有我和我的直属上级以及直属上级的领导能看到，这就是我理解的数据权限。
要实现数据权限有多种方式：

1. 可以利用RBAC1模型，通过角色分级来实现。
2. 在‘用户-角色-权限’的基础上，增加用户与组织的关联关系，用组织决定用户的数据权限。

具体如何做呢？
①组织层级划分：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298643-5a8ced15-5391-4713-8b95-644cbe115978.png#averageHue=%23d1b286&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=ua7b90999&margin=%5Bobject%20Object%5D&originHeight=230&originWidth=492&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6d181a26-5581-44a2-9505-2edd91e14f1&title=)
②数据可视权限规则制定：上级组织只能看到下级组织员工负责的数据，而不能看到其他平级组织及其下级组织的员工数据等。
通过以上两点，系统就可以在用户登录时，自动判断要给用户展示哪些数据了。

## 四、用户组的使用
当平台用户基数增大，角色类型增多时，如果直接给用户配角色，管理员的工作量就会很大。这时候我们可以引入一个概念“用户组”，就是将相同属性的用户归类到一起。
例如：加入用户组的概念后，可以将部门看做一个用户组，再给这个部门直接赋予角色（1万员工部门可能就几十个），使部门拥有部门权限，这样这个部门的所有用户都有了部门权限，而不需要为每一个用户再单独指定角色，极大的减少了分配权限的工作量。
同时，也可以为特定的用户指定角色，这样用户除了拥有所属用户组的所有权限外，还拥有自身特定的权限。
用户组的优点，除了减少工作量，还有更便于理解、增加多级管理关系等。如：我们在进行组织机构配置的时候，除了加入部门，还可以加入科室、岗位等层级，来为用户组内部成员的权限进行等级上的区分。

## 五、实例分析
### 5.1 如何设计RBAC权限系统
首先，我们思考一下一个简单的权限系统应该具备哪些内容？
答案显而易见，RBAC模型：用户-角色-权限。所以最基本的我们应该具备用户、角色、权限这三个内容。
接下来，我们思考，究竟如何将三者关联起来。回顾前文，角色作为枢纽，关联用户、权限。所以在RBAC模型下，我们应该：创建一个角色，并为这个角色赋予相应权限，最后将角色赋予用户。
将这个问题抽象为流程，如下图：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298692-fb35eff3-8f70-408d-a7f4-1d737561569d.png#averageHue=%23f6f6f6&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=ua54756b3&margin=%5Bobject%20Object%5D&originHeight=173&originWidth=703&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uf28ec570-52b0-4fe7-b692-04f45307e0c&title=)
现在，基本的流程逻辑已经抽象出来了，接下来，分析该如何设计呢？

- 第一步，需要角色管理列表，在角色管理列表能快速创建一个角色，且创建角色的同时能为角色配置权限，并且支持创建成功的角色列表能随时进行权限配置的的修改；
- 第二步，需要用户管理列表，在用户管理列表能快速添加一个用户，且添加用户时有让用户关联角色的功能。

简单来说权限系统设计就包含以上两步，接下来为大家进行实例分析。

### 5.2 实例分析
①创建角色列表
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298837-aba57709-4040-4221-9a40-47ada9300b9b.png#averageHue=%23f8f8f8&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u42a44397&margin=%5Bobject%20Object%5D&originHeight=391&originWidth=1177&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud575fd5c-35fc-4e5a-9bfb-12a3c8d2c19&title=)
在角色列表快速创建一个角色：点击创建角色，支持创建角色时配置权限。
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272299050-e9466bd1-27ac-4f59-91b8-f9898730e809.png#averageHue=%23efefef&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uad57324e&margin=%5Bobject%20Object%5D&originHeight=594&originWidth=941&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u710c64bc-de1a-4d90-8f7c-8c6a4882060&title=)
②创建用户列表
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272298997-4a73dd47-83b1-412e-922b-8a2402171925.png#averageHue=%23f7f7f7&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u9531a06a&margin=%5Bobject%20Object%5D&originHeight=371&originWidth=1172&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u101b77e5-d64a-4c75-8af0-cca0046116c&title=)
在用户列表快速创建一个用户：支持用户关联角色的功能。
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272299297-07f327a7-c09e-4cbb-9b9a-6fa22e0e9373.png#averageHue=%23fbfafa&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u15e5dce2&margin=%5Bobject%20Object%5D&originHeight=610&originWidth=1025&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6e80f1dc-363a-4de5-82bb-6a8cab83188&title=)
上述案例是基于最简单的RBAC0模型创建，适用于大部分常规的权限管理系统。
下面再分析一下RBAC1中角色分级具体如何设计。

1. 在RBAC0的基础上，加上角色等级这个字段。
2. 权限分配规则制定：低等级角色只能在高等级角色权限基础上进行删减权限。

具体界面呈现如下图：
![](https://cdn.nlark.com/yuque/0/2023/png/271135/1673272299195-737f49d4-3be5-4e74-9807-a9877599b2c6.png#averageHue=%23f1f1f1&clientId=u7e0f5a7b-25bf-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u99a1e927&margin=%5Bobject%20Object%5D&originHeight=609&originWidth=1034&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ueb4ee16f-fce7-4494-99a2-3cfc0fe4be7&title=)
以上就是简单的RBAC系统设计，若需更复杂的，还请读者根据上面的分析自行揣摩思考，尽管样式不同，但万变不离其宗，理解清楚RBAC模型后，结合自己的业务就可以设计出一套符合自己平台需求的角色权限系统，具体的就不再多阐述了。
## 六、小结
文章的内容主要是自己工作中实际的使用场景，抱着他山之石可以攻玉的想法，参考了现有的方法论，结合自己系统的实际情况，对RBAC模型做了细致的总结理解。若有不足之处，还请大家多多沟通，共同进步。