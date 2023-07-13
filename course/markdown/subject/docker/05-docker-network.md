---
tags: Docker
date: 2018-05-02
---

### 1、创建一个新的 Docker 网络

```
$ docker network create -d bridge test-net
```

![20230512163028](http://s3.airtlab.com/blog/20230512163028.png)

参数说明：
- -d：参数指定 Docker 网络类型，有 bridge、overlay。 其中 overlay 网络类型用于 Swarm mode，在本小节中你可以忽略它。

### 2、连接容器
运行一个容器并连接到新建的 test-net 网络:

```shell
$ docker run -itd --name test1 --network test-net ubuntu /bin/bash
```

打开新的终端，再运行一个容器并加入到 test-net 网络:

```shell
$ docker run -itd --name test2 --network test-net ubuntu /bin/bash
```

点击图片查看大图：

![20230512163120](http://s3.airtlab.com/blog/20230512163120.png)

下面通过 ping 来证明 test1 容器和 test2 容器建立了互联关系。
如果 test1、test2 容器内中无 ping 命令，则在容器内执行以下命令安装 ping（即学即用：可以在一个容器里安装好，提交容器到镜像，在以新的镜像重新运行以上俩个容器）。

```shell
apt-get update
apt install iputils-ping
```

在 test1 容器输入以下命令：

![20230512163154](http://s3.airtlab.com/blog/20230512163154.png)


同理在 test2 容器也会成功连接到:

![20230512163213](http://s3.airtlab.com/blog/20230512163213.png)

这样，test1 容器和 test2 容器建立了互联关系。
如果你有多个容器之间需要互相连接，推荐使用 Docker Compose，后面会介绍。
