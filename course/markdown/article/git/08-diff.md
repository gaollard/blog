---
tags: Git
title: 08 读懂 diff
---

Git diff 变更的原因有：
- 新增文件
- 修改文件
- 删除文件

## 1、用法
```text
usage: git diff [<options>] [<commit>] [--] [<path>...]
   or: git diff [<options>] --cached [<commit>] [--] [<path>...]
   or: git diff [<options>] <commit> [--merge-base] [<commit>...] <commit> [--] [<path>...]
   or: git diff [<options>] <commit>...<commit>] [--] [<path>...]
   or: git diff [<options>] <blob> <blob>]
   or: git diff [<options>] --no-index [--] <path> <path>]
```

- options 表示可选参数
- commit 表示 commit id
- path 设置文件

### 1.1 --no-index
`--no-index` 用于比较两个独立的文件或文件夹的差异。它告诉 Git diff 命令跳过对 Git 存储库的处理，并将其用于非Git文件。
当您想要比较两个文件或文件夹而不在Git存储库中时，可以使用 `--no-index` 选项。这对于跨不同Git存储库或在没有Git存储库的环境中进行比较很有用。它提供了一种比较的方式，不依赖于Git存储库的版本控制信息。

以下是使用`--no-index`选项的示例：

1. 比较两个文件的差异：
   ```
   git diff --no-index file1.txt file2.txt
   ```

2. 比较两个文件夹的差异：
   ```
   git diff --no-index dir1/ dir2/
   ```

请注意，`--no-index`选项不会处理Git存储库中的更改历史记录或版本控制信息。它只会提供一种比较两个文件或文件夹之间差异的方式，因此可能会在某些情况下产生不同的输出结果。

### 1.2 常见用法

1. 比较工作目录和暂存区之间的差异：
   ```
   git diff
   ```

2. 比较暂存区和最后一次提交之间的差异：
   ```
   git diff --staged
   ```

3. 比较两个提交之间的差异：
   ```
   git diff commit1 commit2
   ```

4. 比较两个分支之间的差异：
   ```
   git diff branch1 branch2
   ```

5. 显示文件中具体的更改内容：
   ```
   git diff --word-diff
   ```

6. 生成可供打印的简洁差异：
   ```
   git diff --color-words
   ```

这只是一些基本的用法示例。Git diff还有很多其他可选项和参数，可以根据需要进行进一步的定制。您可以通过运行`git diff --help`命令来查看所有可用选项和参数的详细信息。

### 1.3 默认输出格式

执行
```shell
git diff 801aae133e70fe312223faccd97072e8afc07404
````

其输出是下面这样的一个列表，每一项代表某个文件前后对比

```text
diff --git a/libs/grpc/src/grpc.service.ts b/libs/grpc/src/grpc.service.ts
index 3b551ff..33b5a94 100644
--- a/libs/grpc/src/grpc.service.ts
+++ b/libs/grpc/src/grpc.service.ts
@@ -12,6 +12,7 @@ import { dynamicProxyUrl, localService } from '@app/config/local.service';
 import { migrationMap } from '@app/shared/migrationMap';
 import { rpcMetrics } from '@/prom/prom.client';
 import { CURRENT_ETCD } from '@app/shared/etcd.config';
+import { isThDGL } from '@app/shared/utils/getFromContext';
 
 @Injectable()
 export class GrpcService {
@@ -41,6 +42,10 @@ export class GrpcService {
       );
     }
 
+    if (region === 'th') {
+      body = { ...body, licenseType: isThDGL() ? 'Digi' : 'CCC' };
+    }
+
     const rpcAction = getRpc(service, rpc, address as string);
     let makeParam =
       (body && body['migrationMap']) || service === Service.LoanCoreDebt
```

**1) diff 格式**

第一行表示结果为 git 格式的 diff:
```
diff --git a/libs/grpc/src/grpc.service.ts b/libs/grpc/src/grpc.service.ts
```

**2) diff 对象**

第二行表示两个版本的git哈希值
```
index 3b551ff..33b5a94 100644
```

index 区域的 3b551ff 对象 与工作目录区域的 33b5a94 对象进行比较，最后的六位数字是对象的模式（普通文件，644权限）

**3) 变动范围**

"---"表示变动前的文件，"+++"表示变动后的文件，变动的位置用两个@作为起首和结束，`@@ -12,6 +12,7 @@`

前面的"-12,6"分成三个部分：减号表示第一个文件（即f1），"12"表示第12行，"6"表示连续6行。合在一起，就表示下面是第一个文件从第16行开始的连续6行。同样的，"+12,7"表示变动后，成为第二个文件从第12行开始的连续7行。

**4) 变动的具体内容**

```text
import { dynamicProxyUrl, localService } from '@app/config/local.service';
import { migrationMap } from '@app/shared/migrationMap';
import { rpcMetrics } from '@/prom/prom.client';
import { CURRENT_ETCD } from '@app/shared/etcd.config';

@Injectable()
export class GrpcService {
```

```text
 import { dynamicProxyUrl, localService } from '@app/config/local.service';
 import { migrationMap } from '@app/shared/migrationMap';
 import { rpcMetrics } from '@/prom/prom.client';
 import { CURRENT_ETCD } from '@app/shared/etcd.config';
+import { isThDGL } from '@app/shared/utils/getFromContext';
 
 @Injectable()
 export class GrpcService {
```

### 1.4 diff 可视化展示

根据 `@@` 进行分割，进行逐行对比，即可找到某行是被删除、还是增加。

## 2、参数

```text
  -z            output diff-raw with lines terminated with NUL.
  -p            output patch format.
  -u            synonym for -p.
  --patch-with-raw
                output both a patch and the diff-raw format.
  --stat        show diffstat instead of patch.
  --numstat     show numeric diffstat instead of patch.
  --patch-with-stat
                output a patch and prepend its diffstat.
  --name-only   show only names of changed files.
  --name-status show names and status of changed files.
  --full-index  show full object name on index lines.
  --abbrev=<n>  abbreviate object names in diff-tree header and diff-raw.
  -R            swap input file pairs.
  -B            detect complete rewrites.
  -M            detect renames.
  -C            detect copies.
  --find-copies-harder
                try unchanged files as candidate for copy detection.
  -l<n>         limit rename attempts up to <n> paths.
  -O<file>      reorder diffs according to the <file>.
  -S<string>    find filepair whose only one side contains the string.
  --pickaxe-all
                show all files diff when -S is used and hit is found.
  -a  --text    treat all files as text.
```

### 2.1 name-only 只展示文件名
```shell
git diff --name-only  master
```

```text
libs/config/src/th/local.config.ts
libs/config/src/th/test.config.ts
libs/config/src/th/uat.config.ts
libs/db/src/db.service.ts
libs/elastic/src/elastic.interface.ts
libs/elastic/src/elastic.service.ts
libs/grpc/src/grpc.service.ts
libs/grpc/src/proto/protobuf-uc
```

看不出文件是改动、删除或者新增

### 2.2 --stat 显示文件差异的摘要信息

使用 `--stat` 选项可以帮助您快速了解文件间的大致差异，以便更好地理解Git存储库中的改动情况。

```shell
git diff --stat 801aae133e70fe312223faccd97072e8afc07404
```

```text
libs/grpc/src/grpc.service.ts     | 5 +++++ [增加5行]
libs/grpc/src/proto/protobuf-uc   | 2 +-    [增加1行，删除1行]
libs/grpc/src/services/BaseRpc.ts | 5 +++++ [增加5行]
3 files changed, 11 insertions(+), 1 deletion(-)
```

### 2.3 `--numstat` 以数字形式显示文件差异的摘要信息

用于以数字形式显示文件差异的摘要信息。它会显示出每个文件被添加、删除和修改的行数。

```shell
$ git diff --numstat 801aae133e70fe312223faccd97072e8afc07404
5       0       libs/grpc/src/grpc.service.ts
1       1       libs/grpc/src/proto/protobuf-uc
5       0       libs/grpc/src/services/BaseRpc.ts
```

### 2.4 --name-status 展示文件修改类型

```shell
git diff --name-status  801aae133e70fe312223faccd97072e8afc07404
M       libs/grpc/src/grpc.service.ts
M       libs/grpc/src/proto/protobuf-uc
M       libs/grpc/src/services/BaseRpc.ts
```

`--name-status` 用于以文件名和状态的形式显示文件差异的摘要信息。它会显示出每个文件的状态，包括被添加、被修改和被删除。
当您执行Git diff命令，并添加了`--name-status`选项，Git会为每个文件产生一个摘要，以文件名和其状态的形式显示文件的差异统计信息。输出结果包含两个字段：文件的状态和文件名。

以下是一个使用`--name-status`选项的示例：

```
git diff --name-status
```

这将显示出Git存储库中当前分支和上一个分支之间的文件差异的统计信息。输出结果可能类似于下面的样式：

```
A       file1.txt
M       file2.txt
D       file3.txt
```

这个示例告诉我们，`file1.txt` 文件是被添加的（Added），`file2.txt` 文件是被修改的（Modified），`file3.txt` 文件是被删除的（Deleted）。

`--name-status` 选项对于需要以文件状态形式获取文件差异统计信息的情况很有用。它可以帮助您了解每个文件的状态，包括添加、修改和删除等操作。

## 3、参考文档

- [读懂diff] https://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html