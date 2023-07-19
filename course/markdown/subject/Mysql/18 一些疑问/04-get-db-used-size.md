---
tags: Mysql
---

## 1、某张表占用磁盘大小

可以使用以下命令查询MySQL数据库中某张表占用的磁盘大小：

```
SELECT table_name AS "Table",
ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)"
FROM information_schema.TABLES
WHERE table_schema = "<your_database_name>"
AND table_name = "<your_table_name>";
```

请将 `<your_database_name>` 和 `<your_table_name>` 替换为您想查询的数据库名称和表名称。

执行该命令后，您将看到表格名称和表占用的磁盘空间大小（以MB为单位）。

## 2、数据库占用磁盘大小

可以使用以下MySQL查询来检索整个数据库所占用的磁盘空间大小：

```
SELECT table_schema AS "Database",
SUM(data_length + index_length) / 1024 / 1024 AS "Size (MB)"
FROM information_schema.TABLES
GROUP BY table_schema;
```

执行该命令后，您将看到每个数据库的名称和它所占用的磁盘空间大小（以MB为单位）。请注意，这将为所有表格的数据和索引空间总和提供一个估计值。