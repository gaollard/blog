---
title: 02 包管理器
tags: CPP
---

## 1、基本介绍

C++ vcpkg 是一个用于管理 C++ 第三方库的跨平台包管理器。它能够在不同的操作系统上安装库并处理其依赖关系，能够为开发人员提供一个方便的方式来获取和使用 C++ 第三方库。

C++ vcpkg 支持 Windows、Linux 和 MacOS 等多个操作系统。它使用一个命令行界面来管理包，支持自动下载、编译和安装 C++ 库，也可以手动配置安装库。

使用 C++ vcpkg，开发人员可以通过简单的命令行操作快速获取需要的库，并在项目中使用它们。此外，C++ vcpkg 还具有一些高级功能，如版本控制、库升级、构建选项等。

总之，C++ vcpkg 是一个非常有用的工具，可以帮助开发人员轻松管理 C++ 第三方库，并在不同的平台上进行开发。

## 2、使用步骤

以下是使用 vcpkg 进行 C++ 包管理的基本步骤：
1. 下载和安装 vcpkg 工具
   - 首先需要在 GitHub 上下载 vcpkg 的最新版本：https://github.com/microsoft/vcpkg
   - 推荐将 vcpkg 所在目录添加到系统环境变量 PATH 中。

2. 通过 vcpkg 安装所需的库
   - 打开命令行，进入 vcpkg 目录。
   - 使用以下命令安装所需的库：`vcpkg install <package-name>`
   - 例如，安装 OpenSSL 库可以用命令：`vcpkg install openssl` 

3. 配置 C++ 项目以使用 vcpkg 安装的库
   - 在 C++ 项目中打开配置文件（如 Visual Studio 中的 .vcxproj 文件）。
   - 将以下几行代码添加到vcxproj中：
    ```
    <ItemGroup>
        <PackageReference Include="openssl" Version="*" />
    </ItemGroup>
    ```
  - 上述语句将 `<PackageReference>` 元素添加到项目文件中，因此可以使用库的名称作为其中的包引用 。

4. 构建和运行程序
   - 使用 C++ 编译器构建和编译项目。
   - 运行可执行程序以确保库已被成功添加以及项目以正常工作。

这是使用 vcpkg 进行基本 C++ 包管理的简单步骤。可以根据具体情况调整这些步骤，如掌握更多的编译选项、通过 vcpkg 查看包列表和版本等。