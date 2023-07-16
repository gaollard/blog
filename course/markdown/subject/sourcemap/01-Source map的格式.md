```json
　{
　　　　version : 3,
　　　　file: "out.js",
　　　　sourceRoot : "",
　　　　sources: ["foo.js", "bar.js"],
　　　　names: ["src", "maps", "are", "fun"],
　　　　mappings: "AAgBC,SAAQ,CAAEA"
　　}
```

```
　　- version：Source map的版本，目前为3。
　　- file：转换后的文件名。
　　- sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
　　- sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。
　　- names：转换前的所有变量名和属性名。
　　- mappings：记录位置信息的字符串，下文详细介绍。
```