---
title: 02 Git 设置代理
tags: Git
---

https://www.cnblogs.com/cscshi/p/15705045.html

`git config http.proxy` 设置 HTTP 协议的代理地址，即指定 Git 在通过 HTTP 协议进行网络连接时所使用的代理服务器。此功能通常用于在公司或组织等内部网络环境中访问外部Git仓库时的需要。

具体来说，当 Git 通过 HTTP 协议进行网络连接时，其会尝试直接连接目标服务器进行通信。但在一些网络环境中，直接连接可能被禁止或无法正常工作。此时，可以通过配置 HTTP 代理服务器来让 Git 通过代理服务器进行网络连接。

使用代理服务器可以实现对网络流量的过滤和控制，加强对网络安全的保护，也可以提高网络连接的稳定性和性能。

```shell
# 去掉代理设置
git config --global --unset http.proxy
git config --global --unset https.proxy

# 这里我使用了丰巢客户端
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890
```