---
title: mysql 分组
url: https://www.yuque.com/gaollard/utbbp1/is25v0
---

1、group 常用句式

```sql
select ... from ... where ... group by ... having ... order by ...
```

```sql
select * from `book` t where t.id > 1 group by t.name having t.id > 1  order by t.id ASC 
```
