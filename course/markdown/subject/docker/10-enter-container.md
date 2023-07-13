---
tags: Docker
date: 2018-05-02
---

### 1. exec
[https://www.cnblogs.com/xhyan/p/6593075.html](https://www.cnblogs.com/xhyan/p/6593075.html)

在使用 docker 创建容器的时候，我们可以通过 -it 参数指定，直接进入容器：

```bash
# micro-web 为容器名称, 其他固定写法
docker exec -it micro-web /bin/bash
```

### 2. attach

docker attach退出容器，容器会停止运行的解决方法 [https://blog.csdn.net/enter89/article/details/89291691](https://blog.csdn.net/enter89/article/details/89291691)

```shell
docker attach [OPTIONS] CONTAINER
```
