---
title: 04-InnoDB死锁
url: https://www.yuque.com/gaollard/utbbp1
---



### 1、死锁定义

当两个或以上的事务相互持有和请求锁，并形成一个循环的依赖关系，就会产生死锁。多个事务同时锁定同一个资源时，也会产生死锁。在一个事务系统中，死锁是确切存在并且是不能完全避免的。

解决：InnoDB会自动检测事务死锁，立即回滚其中某个事务，并且返回一个错误。它根据某种机制来选择那个最简单（代价最小）的事务来进行回滚。



### 2、死锁场景一之 select for update

产生场景：两个 transaction 都有两个 select for update

- transaction a 先锁记录1，再锁记录2
- transaction b 先锁记录2，再锁记录1

第一步更新会话一:

```sql
start TRANSACTION;
select * from t_lock where id=1 for update;
```

第二步更新会话二:

```sql
start TRANSACTION;
select * from t_lock where id=2 for update;
```

第三步更新会话一:

```sql
select * from t_lock where id=2 for update;
```

![](http://s3.airtlab.com/mysql/20220603101538.png)

第四步更新会话二:

```sql
select * from t_lock where id=1 for update;
```

![](http://s3.airtlab.com/mysql/20220603101613.png)

来看下执行的日志:

```sql
show engine innodb status;
```

最后一个锁的时间，锁的表，引起锁的语句。其中session1被锁 14秒(ACTIVE 14)，session 2被锁了10秒(Active 10)



### 3、死锁场景二之 两个update

产生场景：两个transaction都有两个update:

- transaction a先更新记录1，再更新记录2
- transaction b先更新记录2，再更新记录1

![](http://s3.airtlab.com/mysql/20220603101843.png)

产生日志：

![](http://s3.airtlab.com/mysql/20220603101903.png)



### 4、innodb\_deadlock\_detect

注意：仔细查看上面2个例子可以发现一个现象，当2条资源锁住后，再执行第三个会执行成功，但是第四个会提示死锁。

在mysql5.7中，执行第三个的时候就会一直在Running状态了，本博文使用的是mysql8.0 ，其中 有这个参数 innodb\_deadlock\_detect 可以用于控制 InnoDB 是否执行死锁检测，当启用了死锁检测时（默认设置），InnoDB 自动执行事务的死锁检测，并且回滚一个或多个事务以解决死锁。InnoDB 尝试回滚更小的事务，事务的大小由它所插入、更新或者删除的数据行数决定。

![](http://s3.airtlab.com/mysql/20220603102035.png)

那么这个innodb\_deadlock\_detect参数，到底要不要启用呢？

> 对于高并发的系统，当大量线程等待同一个锁时，死锁检测可能会导致性能的下降。此时，如果禁用死锁检测，而改为依靠参数 innodb\_lock\_wait\_timeout 执行发生死锁时的事务回滚可能会更加高效。

通常来说，应该启用死锁检测，并且在应用程序中尽量避免产生死锁，同时对死锁进行相应的处理，例如重新开始事务。

只有在确认死锁检测影响了系统的性能，并且禁用死锁检测不会带来负面影响时，可以尝试关闭 innodb\_deadlock\_detect 选项。另外，如果禁用了 InnoDB 死锁检测，需要调整参数 innodb\_lock\_wait\_timeout 的值，以满足实际的需求。



### 5、程序开发过程中应该如何注意避免死锁

锁的本质是资源相互竞争，相互等待，往往是两个(或以上)的Session加锁的顺序不一致。如何有效避免？

（1）在程序中，操作多张表时，尽量以相同的顺序来访问（避免形成等待环路）

（2）批量操作单张表数据的时候，先对数据进行排序（避免形成等待环路） A线程 id：1 ,10 ,20按顺序加锁     B线程id:20,10,1   这种的话就容易锁。

（3）如果可以，大事务化成小事务，甚至不开启事务 select for update==>insert==>update = insert into update on duplicate key

（4）尽量使用索引访问数据，避免没有 where 条件的操作，避免锁表 有走索引是记录行锁，没走索引是表锁

（5）使用等值查询而不是范围查询查询数据，命中记录，避免间隙锁对并发的影响 1，10，20 等值where id in (1,10,20) 范围查询 id>1 and id<20

（6）避免在同一时间点运行多个对同一表进行读写的脚本，特别注意加锁且操作数据量比较大的语句；我们经常会有一些定时脚本，避免它们在同一时间点运行
