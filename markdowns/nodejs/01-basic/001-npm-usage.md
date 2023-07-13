---
title: 001 npm 用法笔记
toc: true
tags: NodeJS
categories: 前端开发
---

## 1、设置镜像地址

用户级别 `npm` 配置文件一般在 `~/.npmrc`，可以手动打开并修改：

```text
;;;;
; npm userconfig file: /Users/xxx/.npmrc
; this is a simple ini-formatted file
; lines that start with semi-colons are comments
; run `npm help 7 config` for documentation of the various options
;
; Configs like `@scope:registry` map a scope to a given registry url.
;
; Configs like `//<hostname>/:_authToken` are auth that is restricted
; to the registry host specified.

home=https://www.npmjs.org
registry=https://npm.shopee.io/ # 设置仓库地址
```

或者通过 `npm config` 命令打开文件:

```bash
npm config edit
```

或者直接使用 `npm config` 命令进行修改：

```text
Usage:
npm config set <key>=<value> [<key>=<value> ...]
npm config get [<key> [<key> ...]]
npm config delete <key> [<key> ...]
npm config list [--json]
npm config edit
```

当然你也可以在项目的根目录新建 `.npmrc` 文件进行局部覆盖：

```text
registry=https://registry.npmjs.org/
```

## 2、安装本地 npm 包

```bash
npm install [path]
```

比如安装下面的 sleep 包，可以通过 `npm install ~/Desktop/sleep` 进行安装，其目录地址为 `~/Desktop/sleep`。

![20230404152959](http://s3.airtlab.com/blog/20230404152959.png)

```js
const sleep = () => {
  console.log(sleep);
};
module.exports = { sleep };
```

安装完成后，`dependencies` 中显示 `sleep` 是一个本地文件：

```json
{
  "dependencies": {
    "sleep": "file:../sleep"
  }
}
```

`package-lock.json` 也会标注本地依赖：

```json
{
  "packages": {
    "../sleep": {
      "version": "1.0.0",
      "license": "ISC"
    },
    "node_modules/sleep": {
      "resolved": "../sleep",
      "link": true
    }
  }
}
```

## 3、查看 npm 全局包

执行 `npm -h` 提示：

```shell
root@host ~ %
root@host ~ %
root@host ~ %
root@host ~ %
root@host ~ %
root@host ~ % npm -h
npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview

All commands:

    access, adduser, audit, bin, bugs, cache, ci, completion,
    config, dedupe, deprecate, diff, dist-tag, docs, doctor,
    edit, exec, explain, explore, find-dupes, fund, get, help,
    hook, init, install, install-ci-test, install-test, link,
    ll, login, logout, ls, org, outdated, owner, pack, ping,
    pkg, prefix, profile, prune, publish, query, rebuild, repo,
    restart, root, run-script, search, set, set-script,
    shrinkwrap, star, stars, start, stop, team, test, token,
    uninstall, unpublish, unstar, update, version, view, whoami

Specify configs in the ini-formatted file:
    /Users/xiong.gao/.npmrc
or on the command line via: npm <command> --key=value

More configuration info: npm help config
Configuration fields: npm help 7 config

npm@8.19.3 /usr/local/lib/node_modules/npm
```

其中最底部 `/usr/local/lib/node_modules` 就是全局包的安装路径

## 4、npm link 用法

`npm link` 在开发 npm 包进行本地调试的时候会很有用，假设现在有两个项目，main 为主项目，sleep 为 npm 包项目。

- 在 sleep 目录下执行 `npm link`，此操作会在全局包中创建一个软连接指向真实目录
- 在 main 目录下执行 `npm link sleep`，创建软连接到 node_modules

![20230404154920](http://s3.airtlab.com/blog/20230404154920.png)

## 5、npx 用法

npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了 xxx，如果想在命令行下调用，必须像下面这样：

```shell
# 项目的根目录下执行
$ node-modules/.bin/xxx --version
```

使用 npx 只要像下面这样调用就行了

```shell
npx xxx --version
```

## 6、npm ci 和 npm install 区别

- 必须已经存在 package-lock.json 或 npm-shrinkwrap.json，否则无法使用 npm ci
- 如果 package-lock.json 中的依赖项与 package.json 中的依赖项不匹配，则 npm ci 将退出并显示错误，而不是更新 package-lock.json
- npm ci 一次只能安装整个项目，无法添加单个依赖项
- npm ci 开始安装之前自动删除 node_modules 文件夹
- npm ci 不会更改 package.json 和 package-lock.json

## 7、npm prune 的作用

在开发过程中，可能使用了某些模块，而后来的某个环节可能又不再使用。但是 npm install 一次，都会在 node_modules 中存留文件，node_modules 目录就会变的臃肿起来，npm prune 此命令的功能是根据 package.json 里的依赖项，删除不需要的模块文件。如果 --production 指定了标志或将 NODE_ENV 环境变量设置为 production，则此命令将删除您的包中指定的软件包 devDependencies

```shell
npm prune --production
```

## 8、peerDependencies 作用

当一个包被依赖时，如果它在其peer dependency中声明了另一个依赖包，那么这个依赖包的版本和安装方式将被忽略，而是使用当前项目中或父级包中已经安装的相同版本的依赖包。

默认在安装依赖时 peerDependency 版本不一致会报错，可以设置忽略。

## 9、npm devDependencies

我的项目依赖了 npm 包 b， 当执行 npm install b 时，b 里面的 devDependencies 会被自动安装吗？

在默认情况下，当您运行 `npm install b` 时，npm 将仅安装依赖项列表中列出的生产环境依赖项，而不会自动安装 `b` 包中 `devDependencies` 中列出的开发环境依赖项。
如果你需要同时安装开发环境依赖项，你需要在安装时加上 `--dev` 或 `-D` 参数来安装所有生产和开发环境依赖项。

例如，您可以运行以下命令来同时安装生产和开发环境依赖项：

```
npm install b --save-dev
```

或者也可以简写为：

```
npm install b -D
```

这将安装 `b` 依赖项和 `b` 的所有 `devDependencies` 依赖项。
