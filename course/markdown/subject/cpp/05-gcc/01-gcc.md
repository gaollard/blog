---
title: 01 gcc 的使用
tags: CPP
---

## 1、通过 `-L` 设置动态库查找路径

### 1) `-L` 说明
在C++中，可以使用以下命令来指定动态库的位置：
```
-L<path>
```

其中，`<path>`是指动态库文件所在的目录路径。这条命令告诉编译器在指定路径下查找动态库文件。

例如，如果要在Linux系统中使用`g++`编译`example.cpp`文件，并链接名为`libexample.so`的动态库文件，可以在命令行中输入以下命令：

```
g++ example.cpp -L/path/to/dynamic/library -lexample
```

其中，`/path/to/dynamic/library`是指动态库文件`libexample.so`所在的目录。`-lexample`则是告诉编译器链接`libexample.so`动态库文件。

在Windows系统中，可以使用以下命令来指定动态库的位置：

```
-L<path> -l<library_name>
```

其中，`<path>`是指动态库文件所在的目录路径，`<library_name>`是动态库的名称。

例如，如果要在Windows系统中使用`g++`编译`example.cpp`文件，并链接名为`example.dll`的动态库文件，可以在命令行中输入以下命令：

```
g++ example.cpp -L/path/to/dynamic/library -l example
```

其中，`/path/to/dynamic/library`是指动态库文件`example.dll`所在的目录。`-l example`则是告诉编译器链接`example.dll`动态库文件。注意，在Windows系统中，在库名称前需要加上`lib`前缀。例如，如果库名称为`example.dll`，则需要写成`libexample.dll`。

### 2) 可以多次使用 `-L`

在一次编译中可以使用多次`-L`来指定多个动态库的路径。例如，如果有两个不同的动态库路径需要链接，可以使用以下命令：

```
g++ example.cpp -L/path/to/first/dynamic/library -L/path/to/second/dynamic/library -lexample1 -lexample2
```

这个命令将在`/path/to/first/dynamic/library`和`/path/to/second/dynamic/library`目录中查找`libexample1.so`和`libexample2.so`。

请注意，在使用多个`-L`参数时，编译器按照指定参数的顺序搜索路径，因此，如果两个路径中都有同名的库，则可能会发生链接错误。

### 3) `-L` 演示

**创建动态链接库**
```c
#include<stdio.h>
void hello()
{
  printf("hello world/n");
}
```

```shell
g++ -std=c++11 -fPIC -shared hello.c -o libhello.so
```

- `-shared`: 该选项指定生成动态连接库（让连接器生成T类型的导出符号表，有时候也生成弱连接W类型的导出符号），不用该标志外部程序无法连接。相当于一个可执行文件
- `-fpic`: 表示编译为位置独立的代码，不用此选项的话编译后的代码是位置相关的所以动态载入时是通过代码拷贝的方式来满足不同进程的需要，而不能达到真正代码段共享的目的

**链接动态库**
```c
#include<stdio.h>

void: hello();

int main()
{
  printf("call hello()");
  hello();
}
```

```shell
# 需要使用-L选项，告诉 hello 库的位置
g++ -std=c++11 main.c -o main -lhello -L.
```

## 2、`-I` 指定头文件的包含路径

比如这里指定 mysql 头文件所在位置

```shell
gcc -I/usr/include/mysql main.c -L/usr/lib/mysql -lmysqlclient -o main
```

应该将`-L`放在`-l`之前。