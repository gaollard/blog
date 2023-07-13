---
tags: CPP
---

add_definitions 是 CMake 中的一个函数，用于向编译器添加预定义的符号。在 CMake 中，您可以通过在 CMakeLists.txt 文件中调用 add_definitions 函数来为您的应用程序添加符号。

添加符号的基本目的是为了在编译时定义一些宏，这些宏在源代码中使用，可以控制应用程序的行为。例如，您可以使用 add_definitions(-DDEBUG) 添加一个名为 DEBUG 的符号，在源代码中使用 #ifdef DEBUG 和 #ifndef DEBUG 对程序进行调试。

除了控制程序行为之外，使用 add_definitions 还可以为不同的平台配置不同的编译标记和参数。例如，您可以使用 add_definitions(-DMY_LINUX_BUILD) 来指定在 Linux 系统上编译。

总的来说，add_definitions 函数帮助您向编译器添加预定义的符号，并为您的应用程序提供更大的灵活性和可配置性。