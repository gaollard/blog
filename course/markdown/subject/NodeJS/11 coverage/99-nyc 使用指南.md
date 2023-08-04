### 1、紧凑模式
默认开启紧凑模式，打桩后，代码会被压缩，可读性很差，而且在 typescript 代码可能会有BUG、比如 `infer U` 会被压缩为 `inferU`。

关闭紧凑模式

```shell
npx nyc instrument --compact false ./src ./instrument
```

### 2、打桩后输出位置

```shell
npx nyc instrument input output
```

如果你希望直接替换原文件，使用 `--in-place`

```shell
npx nyc instrument --compact false  src --in-place
```

### 3、Reporter format
参考 https://istanbul.js.org/docs/advanced/alternative-reporters/
支持各种不同形式的输出，比如 json、html、table

### 4、.nyc_output 目录