## 1、Running Homebrew as root is extremely dangerous and no longer supported

在 macOS High Sierra(10.13.6) 及以上版本的 Mac 上面，使用 brew install 安装时老是报错，因为苹果已经不允许 Homebrew 作为根来安装了。当你添加 `sudo brew install xxxx` 时提示：危险操作。

网上很多做法是把 `/usr/local` 路径改成当前用户路径，但是在高版本的Mac上面已经不允许了：

```shell
sudo chown -R $(whoami) /usr/local
chown: /usr/local: Operation not permitted
```

修复：

```shell
sudo chown -R `whoami` /usr/local/Homebrew/
sudo chown -R $(whoami) $(brew --prefix)/*
sudo mkdir /usr/local/Frameworks
sudo chown -R `whoami` /usr/local/Frameworks/
```

**下面是 chatgtp 给出的方案**

要解决您在以root用户身份运行Homebrew的问题，您可以按照以下步骤进行操作：
1. 卸载Homebrew：在终端中运行以下命令：
```
sudo rm -rf /usr/local/Homebrew
```

2. 修改目录权限：继续在终端中运行以下命令：
```
sudo chown -R $(whoami) $(brew --prefix)/*
```

3. 移除残留文件：还在终端中运行以下命令，以删除可能残留的配置文件：
```
rm -rf ~/Library/Caches/Homebrew
```

4. 重新安装Homebrew：现在，您可以按照常规用户的方式重新安装Homebrew。 在终端中运行以下命令：
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

上述步骤将帮助您彻底卸载并重新安装 Homebrew。记得在安装后，按照常规用户的方式，而不是root用户，来使用Homebrew进行操作和安装软件包。
 
请注意，对于具体的操作，我强烈建议您查阅Homebrew的官方文档以获取最新的指引和说明。