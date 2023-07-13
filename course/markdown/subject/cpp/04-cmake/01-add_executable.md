---
tags: CPP
---

## 1、add_executable 用法

在 CMakeLists.txt 文件中，add_executable() 函数用于创建一个可执行文件，并可以将源文件添加到此可执行文件中。其语法如下：
```
add_executable(executable_name source1 [source2 ...])
```

其中，`executable_name` 是生成的可执行文件的名称，`source1` 是可执行文件的主源文件，`source2`、`source3`、……则是可选的其他源文件。

下面是一个示例：

```
cmake_minimum_required(VERSION 3.10)

project(my_project)

add_executable(my_executable main.cpp helper.cpp)
```

## 2、add_executable 参数过长
此示例中，CMakeLists.txt 文件指定生成一个名称为 my_executable 的可执行文件，并将主源文件 main.cpp 和辅助源文件 helper.cpp 添加到可执行文件中。

如果源文件比较多，也可以通过使用变量，将源文件名列表提取出来，以便使 CMakeLists.txt 文件更加清晰简洁。可以使用 `set()` 函数创建一个包含源文件名的变量，然后把这个变量传递给 `add_executable()` 函数。示例如下：
```
cmake_minimum_required(VERSION 3.10)

project(my_project)

# 使用 set() 函数创建包含所有源文件名的变量
set(SOURCES
    main.cpp
    helper.cpp
    some_other_file.cpp
    ... # 更多文件名
)

# 将 SOURCES 变量传递给 add_executable() 函数
add_executable(my_executable ${SOURCES})
```

这样可以将所有源文件名集中在一个变量中，更容易管理和更新，也可以避免命令行过长的问题。

## 3、add_executable 目录参数

可以将源文件指定为目录而不是单个文件。在 CMake 中，它被称为目录范围（directory scope），而不是文件范围（file scope）。

在这种情况下，`add_executable()` 函数将递归地搜索指定的目录，找到所有可编译的源文件，并将它们添加到执行目标中。

可以使用 `aux_source_directory()` 函数指定目录，并从目录中收集源文件。具体示例如下：

```
cmake_minimum_required(VERSION 3.10)

project(my_project)

# 将源文件目录作为参数传递给 aux_source_directory() 函数
aux_source_directory(src SOURCES)

# 将 SOURCES 变量传递给 add_executable() 函数
add_executable(my_executable ${SOURCES})
```

此示例中，`src` 目录下的所有源文件都将被添加到 `SOURCES` 变量中。`add_executable()` 函数将使用此变量创建可执行文件。

## 4、目录范围不包含头文件

不包括头文件。 `aux_source_directory()` 函数只会查找并添加源文件，但不会包含头文件，因为头文件通常不是可编译的源代码（除非它们是 `inline` 或者 `template` 形式的），它们不会被编译成目标文件，header 文件更像是库的一部分或者接口的一部分，用于定义类、定义函数、定义宏等等，被用于在许多代码文件中进行 #include 引用。
在使用 `aux_source_directory()` 时，应该将标头文件包含在使用这些源文件的文件中，并且应该使用 `target_include_directories()` 函数将相应目录添加为可执行文件或库的包含目录。 例如：

```
cmake_minimum_required(VERSION 3.10)

project(my_project)

# 将源文件目录作为参数传递给 aux_source_directory() 函数
aux_source_directory(src SOURCES)

# 将头文件目录添加为可执行文件或库的包含目录
target_include_directories(my_executable PUBLIC include)

# 将 SOURCES 变量传递给 add_executable() 函数
add_executable(my_executable ${SOURCES})
```

在这个例子中，`include` 目录路径被添加为可执行文件或库的包含目录，该目录中包含所有必要的头文件。 添加 `target_include_directories()` 函数后，使用变量 `SOURCES` 添加所有源文件即可。