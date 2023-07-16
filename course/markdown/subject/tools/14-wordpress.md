---
title: 14 wordpress 建站
tags: tools
date: 2022-06-10 00:00:00
---

使用 wordpress 搭建博客教程

## 1、下载源码

```shell
wget https://cn.wordpress.org/latest-zh_CN.zip && unzip latest-zh_CN.zip -d /www/wwwroot
```

## 2、配置

可参考 https://blog.csdn.net/qq_36234720/article/details/127547705 注意配置文件 wp-config.php

```php
<?php
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '123456' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

define( 'AUTH_KEY',         'Al4cZm4c1Ir(TlXxO[0;/pVch9oz|=M@ENnkbrmR%7LDK,{QH$)_0?]JyfQ.WQ7$' );
define( 'SECURE_AUTH_KEY',  'SJh_McK2suE1ie44DunHad;[.Ea||o5]$2fsP$rJ!{L,fe.bPa V t,zqbE~hOt&' );
define( 'LOGGED_IN_KEY',    'zf7K^#Jq{F|rA13p^xW^of?S#Aq0~vXHp{w]W)TfYW3X<w4=&jmjW5!XMH.Wp;3V' );
define( 'NONCE_KEY',        'G]}dSp}:>pn1L}N Pumbwi=11(Vt0o[cTq<+k~S#K-[XoR@8RlRJOR*k2Xa)/QDo' );
define( 'AUTH_SALT',        'FG-FT/r/ KM9h@h ^$8r]/|8t|FbggBBw<13BtU/2K2Mf50a[,5k0%ieozh] mY4' );
define( 'SECURE_AUTH_SALT', '6M*@?Jw|alm/&&0K63lxN%;_N#Z[Q;4pRjrWSn=)6]`zD?VjsQtLx{6FyOf@S@nx' );
define( 'LOGGED_IN_SALT',   'b>8p:(kZJ`l<muL&hsq7bRE.O L3ei.((K]&5GIO`]LaLtBbxs=!D?k}g~Y~#]px' );
define( 'NONCE_SALT',       '4@*.Rh9dB[K8F$lRD).+foBb3[<HROEcC%R8~m?FXo ^[KLP3|;q.]6w0~PC~U}D' );

// define('FTP_BASE', '/www/wwwroot/wordpress');
// define('FTP_CONTENT_DIR', 'wordpress的内容目录位置');
// define('FTP_PLUGIN_DI', 'wordpress的插件目录位置');
// define('FTP_THEMES_DIR', 'wordpress的主体目录位置');

$table_prefix = 'wp_';


define( 'WP_DEBUG', false );

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';

if(is_admin()) {

add_filter('filesystem_method', create_function('$a', 'return "direct";' ));

define( 'FS_CHMOD_DIR', 0751 );

}
```