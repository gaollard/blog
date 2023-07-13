---
tags: CPP
---

入门教程 https://www.bilibili.com/video/BV1pb4y1W7ZZ/

## 1、安装

- Mac 中使用可以通过 brew 安装 https://formulae.brew.sh/formula/jsoncpp


## 2、使用

### 1) 构建 Json Value

```cpp
#include "json/json.h"
#include <iostream>

/** \brief Write a Value object to a string.
 * Example Usage:
 * $g++ stringWrite.cpp -ljsoncpp -std=c++11 -o stringWrite
 * $./stringWrite
 * {
 *     "action" : "run",
 *     "data" :
 *     {
 *         "number" : 1
 *     }
 * }
 */

int main() {
  Json::Value root;
  Json::Value data;
  constexpr bool shouldUseOldWay = false;

  root["action"] = "run";
  data["number"] = 1;
  root["data"] = data;

  if (shouldUseOldWay) {
    Json::FastWriter writer;
    const std::string json_file = writer.write(root);
    std::cout << json_file << std::endl;
  } else {
    Json::StreamWriterBuilder builder;
    // 缩进默认为 \t
    builder["indentation"] = "";
    const std::string json_file = Json::writeString(builder, root);
    std::cout << json_file << std::endl;
  }

  return EXIT_SUCCESS;
}
``` 

### 2）数组的构建

```cpp
#include "json/json.h"
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Person
{
public:
  string name;
  int age;

public:
  Person(string name, int age)
  {
    this->name = name;
    this->age = age;
  }
};

void my_print(Person *it, Json::Value *value)
{
  (*value)['name'] = (*it).name;
  (*value)['age'] = (*it).age;
}

int main() {
  vector<Person*> v;

  Person *p1 = new Person("h1", 10);
  Person *p2 = new Person("h2", 12);
  Person *p3 = new Person("h3", 8);

  v.push_back(p1);
  v.push_back(p2);
  v.push_back(p3);
  
  Json::Value root;
  Json::Value data;
  Json::Value list;
  constexpr bool shouldUseOldWay = false;

  for (vector<Person*>::iterator it = v.begin(); it != v.end(); it++)
  {
    Json::Value data;
    data["name"] = (*it)->name;
    data["age"] = (*it)->age;
    list.append(data);
  }

  root["action"] = "run";
  data["number"] = 1;
  root["data"] = data;
  root["list"] = list;

  Json::StreamWriterBuilder builder;
  builder["indentation"] = "";
  const std::string json_file = Json::writeString(builder, root);
  std::cout << json_file << std::endl;

  return EXIT_SUCCESS;
}
```

```json
{"action":"run","data":{"number":1},"list":[{"age":10,"name":"h1"},{"age":12,"name":"h2"},{"age":8,"name":"h3"}]}
```