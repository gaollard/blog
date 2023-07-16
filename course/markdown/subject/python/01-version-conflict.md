- Mac自带的 python2 版本，在 `/System/Library/Frameworks/Python.framework/Versions` 里面
- 自己从官网安装的在 `/Library/Frameworks/Python.framework/` 里面
- 通过 homebrew 安装的在 `/usr/local/Cellar/` 里面

## 1、看看你用的 python
```shell
which python
# /usr/bin/python

ls -l /usr/bin/python
# lrwxr-xr-x  1 root  wheel  75 Jan  1  2020 /usr/bin/python -> ../../System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7
```
这里显示我用的是系统自带的，`oh shit` 难怪经常报错
  
## 2、pyenv 管理 python 版本

![20230515151400](http://s3.airtlab.com/blog/20230515151400.png)

https://stackoverflow.com/questions/60298514/how-to-reinstall-python2-from-homebrew

**安装错误**

ERROR: The Python zlib extension was not compiled. Missing the zlib?

## 3、easy_install 的作用

`easy_install` 是 Python 的一个包管理工具，它可以自动下载，安装，升级和卸载 Python 包(package)。它可以在 PyPI（Python 包索引）中搜索所需的包，然后执行必要的操作来安装和配置这些包。

使用 `easy_install`，您可以很方便地安装 Python 包并自动解决所依赖的其他包的问题。

`easy_install` 与 Python 自带的 `pip` 功能类似，但已被弃用，目前已建议使用 `pip` 进行包管理。

## 4、brew install python

```shell
$ brew install python@2

Warning: No available formula with the name "python@2". Did you mean ipython, bpython, jython or cython?
==> Searching for similarly named formulae and casks...
==> Formulae
ipython                            bpython                            jython                             cython

To install ipython, run:
  brew install ipython
```

报错了 shit...

## 5、pip install 报错


```text
Defaulting to user installation because normal site-packages is not writeable
Collecting mysql-utilities
  Using cached mysql-utilities-1.4.3.tar.gz (564 kB)
    ERROR: Command errored out with exit status 1:
     command: /System/Library/Frameworks/Python.framework/Versions/2.7/Resources/Python.app/Contents/MacOS/Python -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/private/var/folders/ft/95_cj6t91fd72fthj6ggvwp80000gq/T/pip-install-2Ka5JP/mysql-utilities/setup.py'"'"'; __file__='"'"'/private/var/folders/ft/95_cj6t91fd72fthj6ggvwp80000gq/T/pip-install-2Ka5JP/mysql-utilities/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' egg_info --egg-base /private/var/folders/ft/95_cj6t91fd72fthj6ggvwp80000gq/T/pip-pip-egg-info-Y6Ndcn
         cwd: /private/var/folders/ft/95_cj6t91fd72fthj6ggvwp80000gq/T/pip-install-2Ka5JP/mysql-utilities/
    Complete output (5 lines):
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/private/var/folders/ft/95_cj6t91fd72fthj6ggvwp80000gq/T/pip-install-2Ka5JP/mysql-utilities/setup.py", line 36, in <module>
        from info import META_INFO, INSTALL
    ImportError: No module named info
    ----------------------------------------
ERROR: Command errored out with exit status 1: python setup.py egg_info Check the logs for full command output.
```

明明在 `.zshrc` 里面已经指定了 python 为 /Lib 目录下，但是他查找出来的不是，无奈只能 指定 python 版本安装：

```shell
python3.6 -m pip install <package_name>  # 可以在python3.6下安装包
python3.7 -m pip install <package_name>  # 可以在python3.7下安装包
python3.8 -m pip install <package_name>  # 可以在python3.8下安装包
```