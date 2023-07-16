---
title: 06 typeorm entity 自动生成
tags: tools
date: 2022-06-10 00:00:00
---

原理：查询数据库表 schema，自动生成对应的 typeorm entity 文件

- typeorm-model-generator https://github.com/Kononnable/typeorm-model-generator
- typeorm 应该被放弃 https://github.com/Kononnable/typeorm-model-generator/issues/329
- 如何使用 typeorm-model-generator https://blog.csdn.net/kuangshp128/article/details/98062662

```shell
rm -rf entities & npx typeorm-model-generator -h hostname -d g_mall -p 3306 -u user -x password -e mysql -o entities --noConfig true
```