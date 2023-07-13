---
title: 024 libuv
toc: true
tags: NodeJS
categories: 前端开发
---

- https://musicfe.com/libuv/
- https://zhuanlan.zhihu.com/p/50497450

## libuv 的核心

libuv为什么可以这么高效呢？实际他使用了操作系统提供的高并发异步模型：
- linux: epoll
- freebsd: kqueue
- windows: iocp

每个我们常见的操作系统都为我们封装了类似的高并发异步模型，那libuv其实就是对各个操作系统进行封装，最后暴露出统一的api供开发者调用，开发者不需要关系底层是什么操作系统，什么API了。 我们来看一下同步模型和异步模型的区别


![image](https://user-images.githubusercontent.com/34447750/230695916-e4c2dcef-62ce-432d-9fa0-d3ed667eabbd.png)
