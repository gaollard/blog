---
title: 01 技术文档搭建
tags: tools
date: 2022-06-10 00:00:00
---

## 1、Nextra

Nextra 是一个便捷的静态网站生成工具，他底层依赖 `nextjs`。

- nextra 有两种风格 博客风格 和 文档风格，更适合用作文档，可以自己搭建，也可以拉模板进行修改。
- nextra 官方文档也是用 nextra 搭建的，可以作为一个参考
- 文档代码仓库 https://github.com/shuding/nextra
- 文档展示地址 https://nextra.site

**文档风格**

![20230630100840](http://s3.airtlab.com/blog/20230630100840.png)

## 2、VitePress

VitePress 是一个由 Vue.js 驱动的静态网站生成器。

- 它专注于为`技术文档`、`博客`和其他类似内容生成静态网站。
- VitePress 具有快速的开发速度和热模块重加载功能，可以实时预览和调试网站
- 支持 Markdown 格式的文档编写。
- 适用于构建以文档为主的网站，并提供了便捷的工具，例如自动生成的导航栏、侧边栏和搜索功能等。
- 案例1 https://sunniejs.github.io/vue-h5-template/guide/

## 3、hugo

Hugo 是由Go语言实现的静态网站生成器。简单、易用、高效、易扩展、快速部署。

这个主题比较漂亮 https://github.com/WingLim/hugo-tania 🤌 https://hugo-tania.netlify.app/

参考 https://blog.chungzh.cn

### 安装 

```shell
brew install hugo
```

### 初始化

```shell
hugo new site quickstart
cd quickstart
git init
git submodule add -b stable https://github.com/jpanther/congo.git themes/congo #下载congo主题到网站
echo "theme = 'congo'" >> hugo.toml #将""内的文本内容添加到hugo.toml文件末尾。
hugo server #创建静态文件并运行本地网站服务器
```