---
title: 002 NodeJS 版本管理
toc: true
tags: NodeJS
categories: 前端开发
---

推荐在 windows 上使用 nvm，在 mac 上则使用 n。
二者主要区别如下：
- n 会将 nodejs 安装为全局版本，因此有可能在切换 node 版本后，发生全局模块执行出错的问题；
- nvm 则会将全局模块存在于各自版本的沙箱中，切换版本后需要重新安装，不同版本间也不存在任何冲突；

对于 `node` 可执行文件的位置:
- n 存放到 `/usr/local/bin`，所以不需要配置环境变量就能访问
- nvm 则需要手动指定路径。

## 1. nvm
nvm 全名 Node.js Version Management，在 macOS、Linux（包括适用于 Linux 的 Windows 子系统）和各种其他类 Unix 系统上均受支持。
由于 Windows 支持程度不佳，社区孵化了 nvm-windows 供 Windows 使用，它们隶属于不同的项目，相互分开的支持和维护。

- Linux、Mac OS：https://github.com/nvm-sh/nvm
- Windows：https://github.com/coreybutler/nvm-windows

### 1.1 安装
#### Mac
```shell
# 方式1 浏览器打开下面链接下载
https://github.com/nvm-sh/nvm/blob/v0.39.1/install.sh
# 下载完成后，通过命令安装
sh install.sh

# 方式2 推荐
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 方式3
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

#### windows
参考 https://www.freecodecamp.org/chinese/news/node-version-manager-nvm-install-guide/

注意，如果在安装 nvm 之前已经装了 nodejs，建议先卸载掉。

**nvm-setup 安装**
请记住安装位置，后续配置环境变量时方便检查
![vnm安装路径](http://s3.airtlab.com/blog/20230224224924.png)

![链接路径](http://s3.airtlab.com/blog/20230224224943.png)

**查看安装路径**
C:\Users\Administrator\AppData\Roaming\nvm
![20230224225211](http://s3.airtlab.com/blog/20230224225211.png)

**修改 setting 配置镜像**
![20230224225244](http://s3.airtlab.com/blog/20230224225244.png)

### 1.2 使用
```shell
nvm ls                # 查看版本安装所有版本
nvm ls-remote         # 查看远程所有的 Node.js 版本
nvm install 17.0.0    # 安装指定的 Node.js 版本
nvm use 17.0.0        # 使用指定的 Node.js 版本
nvm alias default 17.0.0  # 设置默认 Node.js 版本
nvm alias dev 17.0.0  # 设置指定版本的别名，如将 17.0.0 版本别名设置为 dev
```

## 2. n
n 是一款交互式的 Node.js 版本管理工具，没有子脚本，没有配置文件，也没有复杂的 API，使用起来非常简单。
n 只适用于 macOS 和 Linux ，不适用于 Windows。
### 2.1 安装

```shell
npm install n -g
```

### 2.2 使用
```shell
n          # 显示所有已下载版本
n 10.16.0  # 下载指定版本
n lts      # 查看远程所有 LTS Node.js 版本
n run 10.16.0 # 运行指定的 Node.js 版本
```