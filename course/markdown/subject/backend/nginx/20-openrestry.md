---
toc: true
tags: nginx
categories: 中间件
date: 2018-05-01
---

## 1. OpenResty 介绍

OpenResty 是一个基于 nginx 服务器的 Web 应用开发框架。它提供了丰富的 Lua 库和第三方模块，并通过内置的 Lua 解释器将 Lua 语言嵌入 Nginx 的配置文件和服务器中。
OpenResty 包含了一系列的组件，例如：

- Nginx：为 HTTP/HTTPS 服务器提供平台。
- LuaJIT： 高性能 Lua VM 的快速 JIT 编译器。
- ngx_lua：将 Lua 脚本编写成 Nginx 的模块。
- ngx_stream_lua：将 Lua 脚本编写成 Nginx 的 TCP 或 UDP 的模块。
- LuaRocks：开源的 Lua 库和工具管理系统。

OpenResty 通过将 Lua 脚本编写成 Nginx 模块，使得这些模块可以通过 Nginx 的事件模型异步处理请求，并高效地执行各种操作，如：数据处理、访问数据库、HTTP 缓存等等，并且，在 Lua 语言中编写业务逻辑更加简单和灵活。

OpenResty 已经在许多高性能 Web 应用场景得到应用，例如：API Gateway、反向代理、Web 应用防火墙、分布式缓存和负载均衡等等。

## 2. 配置 

![20230609174240](http://s3.airtlab.com/blog/20230609174240.png)

**/usr/local/openresty/nginx/nginx.conf.default**
```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

**/usr/local/openresty/nginx/conf/nginx.conf**

```nginx
# nginx.conf  --  docker-openresty
#
# This file is installed to:
#   `/usr/local/openresty/nginx/conf/nginx.conf`
# and is the file loaded by nginx at startup,
# unless the user specifies otherwise.
#
# It tracks the upstream OpenResty's `nginx.conf`, but removes the `server`
# section and adds this directive:
#     `include /etc/nginx/conf.d/*.conf;`
#
# The `docker-openresty` file `nginx.vh.default.conf` is copied to
# `/etc/nginx/conf.d/default.conf`.  It contains the `server section
# of the upstream `nginx.conf`.
#
# See https://github.com/openresty/docker-openresty/blob/master/README.md#nginx-config-files
#

#user  nobody;
#worker_processes 1;

# Enables the use of JIT for regular expressions to speed-up their processing.
pcre_jit on;



#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    # Enables or disables the use of underscores in client request header fields.
    # When the use of underscores is disabled, request header fields whose names contain underscores are marked as invalid and become subject to the ignore_invalid_headers directive.
    # underscores_in_headers off;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

        # Log in JSON Format
        # log_format nginxlog_json escape=json '{ "timestamp": "$time_iso8601", '
        # '"remote_addr": "$remote_addr", '
        #  '"body_bytes_sent": $body_bytes_sent, '
        #  '"request_time": $request_time, '
        #  '"response_status": $status, '
        #  '"request": "$request", '
        #  '"request_method": "$request_method", '
        #  '"host": "$host",'
        #  '"upstream_addr": "$upstream_addr",'
        #  '"http_x_forwarded_for": "$http_x_forwarded_for",'
        #  '"http_referrer": "$http_referer", '
        #  '"http_user_agent": "$http_user_agent", '
        #  '"http_version": "$server_protocol", '
        #  '"nginx_access": true }';
        # access_log /dev/stdout nginxlog_json;

    # See Move default writable paths to a dedicated directory (#119)
    # https://github.com/openresty/docker-openresty/issues/119
    client_body_temp_path /var/run/openresty/nginx-client-body;
    proxy_temp_path       /var/run/openresty/nginx-proxy;
    fastcgi_temp_path     /var/run/openresty/nginx-fastcgi;
    uwsgi_temp_path       /var/run/openresty/nginx-uwsgi;
    scgi_temp_path        /var/run/openresty/nginx-scgi;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;

    # Don't reveal OpenResty version to clients.
    # server_tokens off;
}
```

```nginx
# nginx.vh.default.conf  --  docker-openresty
#
# This file is installed to:
#   `/etc/nginx/conf.d/default.conf`
#
# It tracks the `server` section of the upstream OpenResty's `nginx.conf`.
#
# This config (and any other configs in `etc/nginx/conf.d/`) is loaded by
# default by the `include` directive in `/usr/local/openresty/nginx/conf/nginx.conf`.
#
# See https://github.com/openresty/docker-openresty/blob/master/README.md#nginx-config-files
#


server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/local/openresty/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/local/openresty/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           /usr/local/openresty/nginx/html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```