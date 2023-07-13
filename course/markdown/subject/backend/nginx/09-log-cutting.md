---
title: 09 nginx 日志切割
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

nginx web 服务器中 access 日志，默认是不能按时间分隔的，每次日志都是打在access.log上，这样久而久之这个日志文件就特别的大，也不利于清理和管理，故此我们肯定是需要做时间上的切割的，那么如何做到完美的切割的呢？

我们采取的方案是利用shell脚本和crontab定时任务来做：每天 23:59:59 将日志取出来并新建文件，比如：error-2020-07-20.log。

创建shell脚本 `cut_nginx_log.sh`：

```shell
#!/bin/bash
year=`date +%Y`
month=`date +%m`
day=`date +%d`
logs_backup_path="/usr/local/Cellar/nginx/1.15.8/logs"  

logs_path="/usr/local/Cellar/nginx/1.15.8/logs/" 
logs_access="access" 
logs_error="error"
pid_path="/usr/local/etc/nginx/logs/nginx.pid"

[ -d $logs_backup_path ]||mkdir -p $logs_backup_path
rq=`date +%Y_%m_%d`

if [ -f "/usr/local/Cellar/nginx/1.15.8/logs/access.log" ];then
mv ${logs_path}${logs_error}.log ${logs_backup_path}/${logs_error}_${rq}.log
fi

if [ -f "/usr/local/Cellar/nginx/1.15.8/logs/error.log" ];then
mv ${logs_path}${logs_access}.log ${logs_backup_path}/${logs_access}_${rq}.log
fi

# 刷新 nginx 日志文件
kill -USR1 $(cat /usr/local/etc/nginx/logs/nginx.pid)
```

创建定时任务：

```shell
# 每天 23:59:分开始执行
crontab –e 59 23 * * * bash cut_nginx_log.sh
```

`kill -USR1 ...` 用于向nginx服务主进程发送信号, USR1为信号类型，它支持以下几种：
![](http://c1.airtlab.com/15954265846281.jpg#id=y1tYR&originHeight=602&originWidth=1964&originalType=binary&ratio=1&status=done&style=none)

需要注意的是，在上面的脚本中，我将 nginx 的安装路径写死了，应该尽量避免这种做法，通用性不强，应该改为使用shell命令获取。