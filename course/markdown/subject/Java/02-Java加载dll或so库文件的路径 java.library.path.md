Java 的 System.load 和 System.loadLibrary 都可以用来加载库文件，例如你可以这样载入一个 windows 平台下JNI库文件：

```java
System.load("C://Documents and Settings//TestJNI.dll"); //绝对路径
```

例如你可以这样载入一个windows平台下JNI库文件 

```java
System.loadLibrary ("TestJNI");
```

这里 TestJNI 必须在 java.library.path 这一 jvm 变量所指向的路径中，可以通过如下方法获得该变量的值：

```java
System.getProperty("java.library.path");
```

默认情况下，Windows平台下包含下面的路径：

  1）和jre相关的目录
  2）程序当前目录
  3）Windows目录
  4）系统目录(system32)
  5）系统环境变量path指定的目录

在 linux 下添加一个 java.library.path 的方法如下：
> 在 /etc/profile 后面加上一行 export LB_LIBRARY_PATH=路径

在执行程序的时候可以显示指定， -Djava.library.path=路径，这种会清除掉预设置的 java.library.path 的值 。实例如下：
```shell
java -jar -Djava.library.path=/home/fly/Desktop/sound_dream sound.war
```