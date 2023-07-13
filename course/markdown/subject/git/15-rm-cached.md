---
tags: Git
---

有时候，我们需要忽略掉以前提交过的文件，因为git已经索引了该文件，所以我们先要删除掉该文件的缓存，如文件 main.ts 已经提交过了，现在我们想忽略，这是我们先在 .gitignore 中设置该文件为忽略。

- 使用 git rm --cached 从 Git 的数据库中删除对于该文件的追踪
- 把对应的规则写入 .gitignore，让忽略真正生效

```shell
git rm --cached main.ts

# 若是文件夹
git rm -r --cached folder/
```