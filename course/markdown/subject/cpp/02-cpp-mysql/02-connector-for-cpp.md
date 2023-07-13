---
title: 02 使用 connector/cpp
tags: CPP
---

# connector/cpp

## 1、安装

```shell
apt-get -y install libmysqlcppconn-dev
```

```shell
g++ -I/usr/include/mysql -std=c++11 01-select.cpp -lmysqlcppconn -o main && ./main
```

- **[Mac os 上用C++进行MYSQL开发配置](https://www.cnblogs.com/laohehexiaohe/p/5436295.html)**
- **https://github.com/mysql/mysql-connector-cpp**

## 2、操作

### 1) 查询操作
```cpp
#include <stdio.h>
#include <mysql_connection.h>
#include <mysql_driver.h>
#include <mysql_error.h>
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using namespace std;

int main()
{
    sql::Driver *driver;
    sql::Connection *con;
    sql::Statement *stmt;
    sql::ResultSet *res;

    driver = get_driver_instance();
    con = driver->connect("tcp://10.53.100.113:3306", "root", "123456");
    con->setSchema("test");

    stmt = con->createStatement();
    res = stmt->executeQuery("SELECT * FROM user");

    while (res->next())
    {
        cout << "--------- row ---------\n";
        cout << "\tname: " << res->getString("name") << endl;
        cout << "\t  id: " << res->getString("id") << endl;
    }

    delete res;
    delete stmt;
    delete con;
}
```

### 2) 修改

```cpp
#include <stdio.h>
#include <mysql_connection.h>
#include <mysql_driver.h>
#include <mysql_error.h>
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using namespace std;

int main()
{
    sql::Driver *driver;
    sql::Connection *con;
    sql::Statement *stmt;
    sql::ResultSet *res;

    driver = get_driver_instance();
    con = driver->connect("tcp://10.53.100.113:3306", "root", "123456");
    con->setSchema("test");

    stmt = con->createStatement();
    int  effectRows = stmt->executeUpdate("UPDATE user SET name = 'frank' WHERE id = 1");

    cout << "修改数据成功" << effectRows << "行受影响！" << endl; 

    delete res;
    delete stmt;
    delete con;
}
```

### 3) 插入
```cpp
#include <stdio.h>
#include <mysql_connection.h>
#include <mysql_driver.h>
#include <mysql_error.h>
#include <cppconn/driver.h>
#include <cppconn/exception.h>
#include <cppconn/resultset.h>
#include <cppconn/statement.h>

using namespace std;

int main()
{
    sql::Driver *driver;
    sql::Connection *con;
    sql::Statement *stmt;
    sql::ResultSet *res;

    driver = get_driver_instance();
    con = driver->connect("tcp://10.53.100.113:3306", "root", "123456");
    con->setSchema("test");

    stmt = con->createStatement();
    stmt->execute("INSERT INTO user(name) VALUES('hello')");

    delete stmt;
    delete con;

    return 0;
}
```