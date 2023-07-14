---
tags: Docker
date: 2018-05-02
---

https://www.runoob.com/docker/docker-logs-command.html

docker logs : 获取容器的日志

```shell
docker logs [OPTIONS] CONTAINER
```

OPTIONS说明：
- -f : 跟踪日志输出
- --since :显示某个开始时间的所有日志
- -t : 显示时间戳
- --tail :仅列出最新N条容器日志