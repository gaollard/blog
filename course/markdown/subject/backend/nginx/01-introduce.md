---
title: 01 nginx 介绍
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1、nginx 介绍

Nginx 是一个免费开源的、高性能的Web服务器软件，可用做：
- 反向代理
- 负载均衡
- HTTP缓存
- 动静分离

Nginx 最初由Igor Sysoev开发，现由 NGINX INC. 维护。

Nginx 是基于**事件驱动**的方式实现的，它采用**异步非阻塞I/O模型**，在处理高并发请求时性能比传统的阻塞式Web服务器更优秀。Nginx可以在一台服务器上同时处理数万个并发请求，对高流量网站来说是非常有用的。

在反向代理中，Nginx可以将客户端请求转发到多个后端Web服务器进行处理，实现负载均衡，保证服务器的高可用性和性能弹性。

Nginx可以通过模块和插件扩展功能，例如增加HTTPS支持，实现动态内容的FastCGI代理，缓存和压缩数据等等。

Nginx易于配置和使用，具有较高的可靠性和稳定性，在Linux和UNIX等操作系统上广泛应用于高性能Web服务器，云计算领域和大型企业级应用系统中。

## 2、nginx 架构

![20230609162440](http://s3.airtlab.com/blog/20230609162440.png)

Nginx服务器的进程模型有两种：`Single模型` 和 `Master-Worker模型`。`Single模型` 为单进程方式，性能较差，一般在实际工作中不使用。`Master-Worker模型` 实际上被更广泛地称为 `Master-Slave模型`。在Nginx服务器中，充当Slave角色的是工作进程。

## 3、学习资源
**(1) 官方文档**

对每个模块的使用都介绍的非常清楚。http://nginx.org/en/docs

**(2)《Nginx高性能Web服务器详解 》**

此书对新手非常友好，能够快速上手 以及 了解 Nginx 的工作模式。https://weread.qq.com/web/bookDetail/e8d3200059fb19e8d3b2af6
