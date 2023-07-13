---
tags: network
---

## 1、ICMP 介绍
因特网控制报文协议(ICMP) 是TCP/IP 套件的协议之一。 它是一种网络层协议，用于实现错误报告和网络路径诊断功能。 ICMP 回传请求和ICMP 回传应答消息通常称为ping 消息。 ICMP Ping 是一个故障诊断工具，用于测试网络设备之间的连接。

## 2、Ping 命令
Ping不使用端口，而是使用协议。Ping通过将Internet控制消息协议（ICMP）回显请求数据包发送到目标主机并等待ICMP回显应答来进行操作。但是，出于安全考虑，通常你可以禁用ping功能。 转载必须保留本文地址:http://xiiie.com/html/1301016.html

## 3、检查 ping 是否支持
通常情况下，Linux 系统默认是开启 ping 命令的，除非被系统管理员或者安全人员关闭或限制。您可以通过以下方法来检查 Linux 服务器是否可以 ping 通。

1. 使用 ping 命令来尝试 ping 目标地址，如果能够 ping 通，则说明服务器可以正常 ping 通目标地址，否则则说明服务器上的 ping 命令被限制或禁用。

```bash
ping 39.108.138.156
```

如果服务器返回数据包，则说明服务器支持 ping 命令，如果无法返回数据包，则说明服务器上的 ping 命令被禁用或 ping 目标地址时被防火墙限制了。

2. 检查防火墙规则，ping 命令需要 ICMP 协议支持，因此如果服务器的防火墙规则中禁用了 ICMP 协议，则 ping 命令无法正常工作。您可以使用以下命令检查 iptables 防火墙规则中是否存在 ICMP 协议限制规则：

```bash
sudo iptables -L -v | grep icmp
```

如果输出结果中包含 DROP 或 REJECT 规则，则说明 ICMP 协议被禁用。

3. 检查 SELinux 选项，如果 SELinux 开启并设置为 enforcing 模式，则可能会限制 ping 的执行。可以查看 /etc/selinux/config 文件中的 SELINUX 选项是否为 enforcing：

```bash
cat /etc/selinux/config | grep SELINUX
```

如果输出结果中 SELINUX=enforcing，则说明 SELinux 模式为 enforcing 模式，需要禁用或修改 SELinux 配置。

注意：如果您没有 root 权限或者无法访问服务器，则可能无法确定系统是否对 ping 命令进行了限制。
