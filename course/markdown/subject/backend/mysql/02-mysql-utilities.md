---
tags: Mysql
---

## 1、MySQL Utilities 介绍

MySQL Utilities 提供一组命令行工具用于维护和管理 MySQL 服务器，包括：

- 管理工具 (克隆、复制、比较、差异、导出、导入)
- 复制工具 (安装、配置)
- 一般工具 (磁盘使用情况、冗余索引、搜索元数据)

MySQL Utilities 是一系列的命令行工具以 及​ ​Python​​库更容易完成管理的任务

## 2、通过 pip 安装 【失败】

您可以按照以下步骤在 macOS 上安装 mysql utilities：

1. 使用 Homebrew 安装 MySQL：

```
brew install mysql
```

2. 安装 Python pip 工具（如果您的系统尚未安装）：

```
sudo easy_install pip
```

这里安装可能会报错 (https://stackoverflow.com/questions/72270592/syntaxerror-when-pip-install-pip-def-readrel-path-str) 

![20230515145909](http://s3.airtlab.com/blog/20230515145909.png)

3. 使用 pip 安装 mysql-utilities：

```
sudo pip install mysql-utilities
```

安装完成后，您可以在终端中运行 mysql utilities 命令。

## 3、下载源码安装 【成功】

https://github.com/mysql/mysql-utilities/releases/tag/release-1.6.5

```shell
cd mysql-utilities-release-1.6.5
python setup.py install

cd /Library/Frameworks/Python.framework/Versions/2.7/bin
```

![20230515160248](http://s3.airtlab.com/blog/20230515160248.png)

## 4、测试 mysqldiff

```shell
mysqldiff --server1=root:123456@127.0.0.1:3306 --server2=root:123456@127.0.0.1:3306 --changes-for=server2 test:test2
```

提示缺少 MySQLConverter

```shell
Traceback (most recent call last):
  File "/Library/Frameworks/Python.framework/Versions/2.7/bin/mysqldiff", line 30, in <module>
    from mysql.utilities.command.diff import object_diff, database_diff
  File "/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/mysql/utilities/command/diff.py", line 25, in <module>
    from mysql.utilities.common.database import Database
  File "/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/mysql/utilities/common/database.py", line 32, in <module>
    from mysql.utilities.common.options import obj2sql
  File "/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/mysql/utilities/common/options.py", line 36, in <module>
    from mysql.connector.conversion import MySQLConverter
ImportError: No module named connector.conversion
```

安装
```shell
pip install mysql-connector-python
```

又提示
```text
Traceback (most recent call last):
  File "/Library/Frameworks/Python.framework/Versions/2.7/bin/mysqldiff", line 28, in <module>
    from mysql.utilities.common.tools import check_python_version
ImportError: No module named utilities.common.tools
```

放弃了... 就很无语 😭😭😭