---
title: 01 使用 mysqlclient-dev
tags: CPP
---

# mysqlclient-dev

- **[这个教程写的很详细，使用 C 操作 mysql](https://blog.csdn.net/qq_41453285/article/details/102640756)**

## 1、安装 mysqlclient-dev

这个例子在 ubuntu 上进行

```shell
apt-get install libmysqlclient-dev
sudo ldconfig # 刷新动态链接库
```

头文件位置 `/usr/include/mysql`，动态库位置 `/usr/lib/mysql`

```shell
gcc -I/usr/include/mysql main.c -L/usr/lib/mysql -lmysqlclient -o main
```

## 2、增删改查操作

### 1) 连接 mysql 服务器

```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>
#include <mysqld_error.h>
#include <errmsg.h>

int main(int argc, char *argv[])
{
    MYSQL mysql;
    mysql_init(&mysql);

    if (mysql_real_connect(&mysql, "10.53.100.113", "root",
                           "123456", "test", 0, NULL, 0))
    {
        printf("Connect success\n");

        // insert
        if (mysql_query(&mysql, "insert into user(name) values('Ann')") != 0)
        {
            fprintf(stderr, "mysql_query failed:\n\tcode:%d\n\treason:%s\n", mysql_errno(&mysql), mysql_error(&mysql));
        }
        else
        {
            printf("Insert success, affect row are %lu\n", mysql_affected_rows(&mysql));
        }

        mysql_close(&mysql);
    }
    else
    {
        fprintf(stderr, "Connect failed:\n");
        if (mysql_errno(&mysql))
        {
            printf("\terror code is %d\n\treason:%s\n", mysql_errno(&mysql), mysql_error(&mysql));
        }
    }

    return 0;
}
```

### 2) 修改数据

```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>
#include <mysqld_error.h>
#include <errmsg.h>

int main(int argc, char *argv[])
{
    MYSQL mysql;
    mysql_init(&mysql);

    if (mysql_real_connect(&mysql, "10.53.100.113", "root",
                           "123456", "test", 0, NULL, 0))
    {
        printf("Connect success\n");

        // update
        if (mysql_query(&mysql, "update user set name='tony' where id = 1") != 0)
        {
            fprintf(stderr, "mysql_query failed:\n\tcode:%d\n\treason:%s\n",
                    mysql_errno(&mysql), mysql_error(&mysql));
        }
        else
        {
            printf("Update success,affect row are %lu\n",
                   mysql_affected_rows(&mysql));
        }

        mysql_close(&mysql);
    }
    else
    {
        fprintf(stderr, "Connect failed:\n");
        if (mysql_errno(&mysql))
        {
            printf("\terror code is %d\n\treason:%s\n", mysql_errno(&mysql), mysql_error(&mysql));
        }
    }

    return 0;
}
```

### 3) 查询操作
```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>
#include <mysqld_error.h>
#include <errmsg.h>

int main(int argc, char *argv[])
{
    MYSQL mysql;
    MYSQL_RES *res;
    MYSQL_ROW sqlrow;

    mysql_init(&mysql);

    if (mysql_real_connect(&mysql, "10.53.100.113", "root",
                           "123456", "test", 0, NULL, 0))
    {
        printf("Connect success\n");

        // select
        if (mysql_query(&mysql, "select * from user") != 0)
        {
            fprintf(stderr, "mysql_query failed:\n\tcode:%d\n\treason:%s\n",
                    mysql_errno(&mysql), mysql_error(&mysql));
        }
        else
        {
            // get result
            res = mysql_store_result(&mysql);
            if (res != NULL)
            {
                // show rows
                printf("Retrived %lu rows:\n", (unsigned long)mysql_num_rows(res));
                // Get one row at a time
                while (sqlrow = mysql_fetch_row(res))
                {
                    printf("\tFetch row...\n");
                }
            }
            else
            {
                if (mysql_errno(&mysql))
                {
                    printf("\terror code is %d\n\treason:%s\n",
                           mysql_errno(&mysql), mysql_error(&mysql));
                }
            }
        }

        mysql_close(&mysql);
    }
    else
    {
        fprintf(stderr, "Connect failed:\n");
        if (mysql_errno(&mysql))
        {
            printf("\terror code is %d\n\treason:%s\n",
                   mysql_errno(&mysql), mysql_error(&mysql));
        }
    }

    return 0;
}
```

### 4) 获取字段信息
```c
#include <stdio.h>
#include <stdlib.h>
#include <mysql.h>
#include <mysqld_error.h>
#include <errmsg.h>

void display_header(MYSQL_RES *result);
void display_show(MYSQL *mysql, MYSQL_ROW *sqlrow);

int main(int argc, char *argv[])
{
    int isHeader;
    MYSQL mysql;
    MYSQL_RES *res;
    MYSQL_ROW sqlrow;
    isHeader = 1;

    mysql_init(&mysql);

    if (mysql_real_connect(&mysql, "10.53.100.113", "root",
                           "123456", "test", 0, NULL, 0))
    {
        printf("Connect success\n");

        // select
        if (mysql_query(&mysql, "select * from user") != 0)
        {
            fprintf(stderr, "mysql_query failed:\n\tcode:%d\n\treason:%s\n",
                    mysql_errno(&mysql), mysql_error(&mysql));
        }
        else
        {
            // get result
            res = mysql_use_result(&mysql);
            if (res != NULL)
            {
                // Get one row at a time
                while (sqlrow = mysql_fetch_row(res))
                {
                    if (isHeader)
                    {
                        display_header(res);
                        isHeader = 0;
                        printf("Row Deails:\n");
                    }
                    display_show(&mysql, &sqlrow);
                }
            }
            else
            {
                if (mysql_errno(&mysql))
                {
                    printf("\terror code is %d\n\treason:%s\n",
                           mysql_errno(&mysql), mysql_error(&mysql));
                }
            }
        }
        mysql_close(&mysql);
    }
    else
    {
        fprintf(stderr, "Connect failed:\n");
        if (mysql_errno(&mysql))
        {
            printf("\terror code is %d\n\treason:%s\n",
                   mysql_errno(&mysql), mysql_error(&mysql));
        }
    }

    return 0;
}

void display_header(MYSQL_RES *result)
{
    printf("Column Details:\n");
    MYSQL_FIELD *field;
    // 循环，每次返回一个字段
    while ((field = mysql_fetch_field(result)) != NULL)
    {
        // 1
        printf("\tcol_name:%s", field->name);

        // 2
        if (IS_NUM(field->type))
        {
            printf(" ,type:%s", "Number");
        }
        else
        {
            switch (field->type)
            {
            case FIELD_TYPE_DECIMAL:
                printf(" ,type:%s", "Decimal");
                break;
            case FIELD_TYPE_LONG:
                printf(" ,type:%s", "Long");
                break;
            case FIELD_TYPE_STRING:
                printf(" ,type:%s", "String");
                break;
            case FIELD_TYPE_VAR_STRING:
                printf(" ,type:%s", "Var_String");
                break;
            }
        }
        // 3
        printf(" ,column width:%ld", field->length);
        // 4
        if (field->flags & AUTO_INCREMENT_FLAG)
        {
            printf(
                " ,column flags:%s", "AUTO_INCREMENT_ FLAG");
        }
        printf("\n");
    }
}

void display_show(MYSQL *mysql, MYSQL_ROW *sqlrow)
{
    unsigned int count = 0;
    while (count < mysql_field_count(mysql))
    {
        if ((*sqlrow)[count])
        {
            printf("\t%s", (*sqlrow)[count]);
        }
        else
        {
            printf("NULL");
        }
        count++;
    }
    printf("\n");
}
```