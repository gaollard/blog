---
tags: Git
---

- reset 是彻底回退到指定的commit版本，该commit后的所有commit都将被清除，包括提交历史记录；
- revert 仅仅是撤销指定commit的修改，并不影响后续的commit，但所撤销的commit被后续的commit修改了同一地方则会产生冲突；
- reset 执行后不会产生记录，revert执行后会产生记录；
- reset 执行后无法再次恢复，revert执行后因为不会清除记录，并且会产生新纪录，所以文件不会丢失，你可以多次执行revert恢复到某次改变之前的状态；
- reset 执行后HEAD会后移，而revert的HEAD则一直是向前的；

https://blog.csdn.net/baiyuliang2013/article/details/120646835