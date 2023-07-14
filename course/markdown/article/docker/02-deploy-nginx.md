---
tags: Docker
date: 2018-05-02
---

## 1. 简单部署
第一步：前端打包生成 dist 文件
```shell
npm run build
```

第二步：在项目根目录创建 dockerfile 文件
```shell
# 设置基础镜像
FROM nginx

# 定义作者
MAINTAINER gaollard

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
```

第三步：构建镜像
```shell
# 在项目根目录执行 iname 为镜像名称
docker build -t iname .

# 查看镜像
docker ps
```

第四步：启动容器
```shell
# -p ：配置端口映射，格式是外部访问端口：容器内端口
# -d ：后台运行  
# --name : 给容器取名
# cname: 容器名称
# iname: 镜像名称

docker run -p 3000:80 -d --name cname iname
```

第五步：查看是否运行成功
```shell
docker ps
```

![20230512162713](http://s3.airtlab.com/blog/20230512162713.png)

## 2. 脚本化部署
```shell
# 备份原代码
tar -zcvf gentle-vue.tar ./gentle-vue
 
# 删除原代码文件夹
rm -rf gentle-vue
 
# 拉取代码
git clone https://gitee.com/FJ_WoMenDeShiJie/gentle-vue.git
echo -e "\033[32m\n代码拉取\n\033[0m"
 
# 拷贝 node_modules
cp ./node.tar ./gentle-vue
 
# build 打包 vue 项目，生成 dist 文件夹
cd ./gentle-vue
tar -zxvf node.tar
npm run build
echo -e "\033[32m\nvue项目打包完成\n\033[0m"
 
# 删除原镜像
docker rmi gentle-vue &> /dev/null
echo  -e "\033[32m\n删除原镜像文件\n\033[0m"
 
# 拷贝 dockerfile 到工程目录下
cp ../dockerfile ./
 
# 构建镜像
docker build -t gentle-vue .
echo -e "\033[32m\n新镜像构建成功\n\033[0m"
 
# 删除原容器
docker rm -f gentle-vue
 
# 启动容器
docker run -p 3000:80 -d --name gentle-vue gentle-vue
echo -e "\033[32m\n前端工程部署完成\n\033[0m"
```

## 3. 参考文档
[https://blog.csdn.net/jiangyu1013/article/details/84572582](https://blog.csdn.net/jiangyu1013/article/details/84572582)
