---
tags: network
---

使用 curl 可以访问 http://blog.airtlab.com，为什么 ping blog.airtlab.com 却 Request timeout

可能是由于网络防火墙或路由器设置的规则导致 ping 请求被阻止了。curl 的工作方式与 ping 不同，curl 发送的是 HTTP 请求，而 ping 发送的是 ICMP 请求，网络设备可能会针对不同类型的请求做出不同的响应。 

此外，http://blog.airtlab.com 和 blog.airtlab.com 可能是不同的域名（比如前者可能要跳转到后者），ping 命令默认使用 DNS 协议解析主机名，而 curl 默认不会解析主机名。因此，可能需要先使用 dig 或 nslookup 等工具来查找主机名所对应的 IP 地址，然后使用 ping 命令指定 IP 地址来进行测试。