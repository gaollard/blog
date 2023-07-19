---
title: mysql 权限
url: https://www.yuque.com/gaollard/utbbp1/hw7107
---

<http://c.biancheng.net/view/7490.html>

```sql
# gaollard VouFM2SEFk
CREATE USER 'gaollard'@'%' IDENTIFIED BY PASSWORD '*8D03816E306DA2740387330539899035057E5B33';
```

```sql
# canal 123456
CREATE USER 'canal'@'%' IDENTIFIED BY PASSWORD '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9';
```

```sql
# canal canal
CREATE USER 'canal'@'%' IDENTIFIED BY PASSWORD '*E3619321C1A937C46A0D8BD1DAC39F93B27D4458';

```

```sql
CREATE USER canal IDENTIFIED BY 'canal';  
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
-- GRANT ALL PRIVILEGES ON *.* TO 'canal'@'%' ;
FLUSH PRIVILEGES;
```
