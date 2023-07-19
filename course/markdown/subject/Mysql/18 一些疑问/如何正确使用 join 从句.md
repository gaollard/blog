---
title: 如何正确使用 join 从句
url: https://www.yuque.com/gaollard/utbbp1
---

### 1. 连接类型

***

![image.png](http://s3.airtlab.com/mysql/1601646120805-feb496bd-9874-4cc1-9592-ba9bb857f38f.png) 

### 2. 内连接

***

内连接也称为等值连接，返回两张表都满足条件的部分。
![image.png](http://s3.airtlab.com/mysql/1601647451240-ff77e6c7-ec03-480b-95e1-0259916956a7.png)
![image.png](http://s3.airtlab.com/mysql/1601647482334-67b8f9b2-421f-4f39-b762-7d6dd35a71e4.png)
![image.png](http://s3.airtlab.com/mysql/1601647510549-e7f2e88e-0314-4052-8599-1ec44d42d435.png)

```sql
-- 只用 where ...
select s.`student_name`, c.`class_name`,  s.`class_id`, s.`id` as `student_id` from student s, class c where s.`class_id` = c.`id`

-- join ... on ...
select s.`student_name`, c.`class_name`,  s.`class_id`, s.`id` as `student_id` from student s join class c on s.`class_id` = c.`id`

-- inner join ... on ...
select s.`student_name`, c.`class_name`,  s.`class_id`, s.`id` as `student_id` from student s inner join class c on s.`class_id` = c.`id`
```

![image.png](http://s3.airtlab.com/mysql/1601647626566-9f555265-a068-4b26-a9ec-5efc95f6d129.png) 

### 3. 外连接

***

#### 3.1 左连接

根据左表的记录，在被连接的右表中找出符合条件的记录与之匹配，如果找不到与左表匹配的，用 null 表示。注意和内连接的区别，内连接是识别出交集部分，而左连接是以左表为基准，右边的表按条件找出符合条件的显示，不符合则显示null。
![image.png](http://s3.airtlab.com/mysql/1601648425851-5c144939-a985-4e86-96cb-eca5dbaab320.png)
![image.png](http://s3.airtlab.com/mysql/1601648507489-6464a585-46ed-42a3-a3a0-c5df7c1982e9.png)
![image.png](http://s3.airtlab.com/mysql/1601648520602-4211e3ce-5225-430b-aa41-f58687da1fdd.png)

```sql
-- letf join ... on ...
select s.`student_name`, c.`class_name`,  s.`class_id`, s.`id` as `student_id` from student s left join class c on s.`class_id` = c.`id`

-- letf outer join ... on ...
select s.`student_name`, c.`class_name`,  s.`class_id`, s.`id` as `student_id` from student s left outer join class c on s.`class_id` = c.`id`
```

![image.png](http://s3.airtlab.com/mysql/1601651166059-a41028b2-f055-4737-9691-805a9879847e.png) 

#### 3.2 右连接

![image.png](http://s3.airtlab.com/mysql/1601652160919-e8960bed-f0cb-48a3-9a9c-89d4999801bd.png)
取右边的表的全部，左边的表按条件，符合的显示，不符合则显示null。用法完全与左连接完全一致，只是将 left join 改为 right join。
![image.png](http://s3.airtlab.com/mysql/1601651529787-d0279b09-7a18-4697-8d0e-f51698e78523.png)
![image.png](http://s3.airtlab.com/mysql/1601651539854-e8e698fd-9d12-4ff1-ab16-54ee6d1546eb.png)
![image.png](http://s3.airtlab.com/mysql/1601651558941-62a0abe6-ab08-4d27-92a4-d5ef51bf14f9.png) 

#### 3.3 全连接

返回符合条件的所有表的记录，没有与之匹配的，用 null 表示（结果是左连接和右连接的并集）
![image.png](http://s3.airtlab.com/mysql/1601652137150-f67c5ce3-fd5d-4a1e-9943-e60e1bdc9e10.png)
在 mysql 中使用 full join 会语法报错，需要换一种方式：
![image.png](http://s3.airtlab.com/mysql/1601652679077-39e9ea35-e791-4e67-8ef7-2f4aa1e73d4f.png)

```sql
select s.`student_name`, s.`id` as `student_id`, c.`class_name`, c.`id` as `class_id` from student s LEFT JOIN class c ON s.`class_id` = c.`id`

UNION ALL

select s.`student_name`, s.`id` as `student_id`, c.`class_name`,  c.`id` as `class_id` from student s RIGHT JOIN class c ON s.`class_id` = c.`id`
```

这里需要注意 union 与 union all 的区别。
![image.png](http://s3.airtlab.com/mysql/1601653439698-30e9d183-3451-4221-84d6-9f68530fe018.png) 

### 4. 交叉连接(笛卡尔集)

![image.png](http://s3.airtlab.com/mysql/1601653634696-bfec6734-9973-4925-bb8d-ac45e725679b.png)

```sql
-- where 
select * from student CROSS join class where student.`student_name`="小华"

-- on
select * from student CROSS join class on student.`student_name`="小华"
```

![image.png](http://s3.airtlab.com/mysql/1601653913263-b786d0f0-b79c-400c-b7e0-58eb29bce77e.png) 

### 参考文档

1. <https://www.cnblogs.com/buxingzhelyd/p/7853454.html>
