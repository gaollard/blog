---
tags: Docker
date: 2018-05-02
---

参考文档：[https://blog.csdn.net/ncdx111/article/details/79878098](https://blog.csdn.net/ncdx111/article/details/79878098)

> 通过镜像名称导出时，导入镜像时，镜像名称不会丢失，通过镜像ID导出，镜像名称会丢失。


### 1、镜像导出
#### save

```bash
docker save -o nginx.tar nginx:latest
docker save > nginx.tar nginx:latest
```

nginx:latest 可以改为镜像 ID

#### export

```bash
docker export [options] container
docker export -o nginx-test.tar nginx-test
```

其中-o表示输出到文件，nginx-test.tar为目标文件，nginx-test是源容器名（name）

### 2、镜像导入
#### load

```bash
docker load -i nginx.tar
docker load < nginx.tar
```

#### import

```bash
docker import [options] file|URL|- [REPOSITORY[:TAG]]
```

```bash
docker import nginx-test.tar nginx:imp

# 或
cat nginx-test.tar | docker import - nginx:imp
```
