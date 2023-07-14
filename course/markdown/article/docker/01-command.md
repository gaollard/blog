---
tags: Docker
date: 2018-05-02
---

## 1、docker 简介
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的Linux机器或Windows 机器上，也可以实现虚拟化，容器是完全使用沙箱机制，相互之间不会有任何接口。

一个完整的Docker有以下几个部分组成：
1. DockerClient 客户端
2. Docker Daemon 守护进程
3. Docker Image 镜像
4. DockerContainer 容器


## 2、镜像操作

```shell
# 制作镜像
docker build -t gaollard/hello:v1 .

# 推送镜像
docker push gaollard/hello:v1 

# 删除镜像(删除之前，需要先停止相关的容器)
docker rmi IMAGE_ID

# 强制删除
docker rmi c7309a89f296 -f

# 从远程拉取镜像
docker pull nginx

# 搜索镜像
docker search httpd
```

## 3、容器操作

```shell
# 停止容器
docker stop CONTAINER_ID

# 制作容器
docker run -p 7001:80 --name tnginx -d gaollard/hello:v1

# 挂载数据卷
docker run -p 7002:80 --name tnginx2 -v /Users/arraybuffer/Desktop/html:/usr/share/nginx/html -d nginx

# 查看容器
docker ps
```

**删除容器**

语法：

```shell
docker rm [OPTIONS] 容器名，其中options有三种类型：
```

- -f ：通过SIGKILL信号强制删除一个运行中的容器
- -l ：移除容器间的网络连接，而非容器本身-v ：-v 删除与容器关联的卷

容器删除举例：

```bash
docker rm -v nginx 这句话的意思是删除nginx容器，并解除与nginx容器关联的卷
docker rm -l db 这句命令的意思是：移除容器A对容器B的连接db
docker rm -f db01 db02 这句命令的意思是删除容器db01和db02
```

容器的删除可以一次删除一个或多个，在使用时直接以空格隔开就行。

## 4、docker 容器安装 vim
在使用docker容器时，有时候里边没有安装vim，敲vim命令时提示说：vim: command not found，这个时候就需要安装vim，可是当你敲apt-get install vim命令时，提示：

```text
Reading package lists... Done
Building dependency tree       
Reading state information... Done
E: Unable to locate package vim
```
 
这时候需要敲：apt-get update，这个命令的作用是：同步 /etc/apt/sources.list 和 /etc/apt/sources.list.d 中列出的源的索引，这样才能获取到最新的软件包。

等更新完毕以后再敲命令：apt-get install vim命令即可。

```shell
$ > apt-get update
$ > apt-get install vim
```

## 5、yaml 语法
https://www.jianshu.com/p/cea930923f3d