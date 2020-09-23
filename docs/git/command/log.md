# Git log

显示提交日志信息。

## 概览

| 设置类型 | 参数 | 描述 |
| :-- | :-- | :-- |
| 显示格式 |  |  |
|  | -p | 按补丁显示每个更新间的差异，比下一条 `--stat` 命令信息更全 |
|  | --stat | 显示每次更新的修改文件的统计信息，每个提交都列出了修改过的文件，以及其中添加和移除的行数，并在最后列出所有增减行数小计 |
|  | --shortstat | 只显示 `--stat` 中最后的行数添加修改删除统计 |
|  | --abbrev-commit | 显示简短且唯一的  SHA-1  值 |
|  | --name-only | 显示每次修改的文件列表 |
|  | --name-status | 显示每次修改的文件列表（包含状态） |
|  | --graph | 显示 ASCII 图形表示的分支合并历史 |
|  | --decorate | 查看各个分支当前所指的对象 |
|  | --oneline | 单行显示，只显示哈希值和提交说明 |
|  | --relative-date | 显示相对时间 |
|  | —pretty= | 使用其他格式显示历史提交信息，可选项有：oneline, short, medium, full, fuller, email, raw 以及 format |
|  | --date= | 定制后边如果出现 `%ad` 或 `%cd` 时的日期格式，预选项包括(relative、local、default、iso、rfc、short、raw) |
| 筛选内容 |  |  |
|  | -n | 显示前 `n` 条提交信息 |
|  | --after= | （--before=）显示指定时间之前或之后的内容 |
|  | --grep= | 对提交描述进行帅选，如果想同时使用 `--grep` 和 `--author`，必须在附加一个 `--all-match` 参数 |
|  | --&lt;filename&gt; | 只显示包含指定文件的提交，你可以使用正则，也可以省略前面的 `--`，但是需要把该参数放在命令的最后 |
|  | --&lt;branchname&gt; | 只显示指定分支的上的提交记录，也可以省略前面的 `--`，如果与指定的文件名同名则需要使用 `--` 加以区分，在其后面的为文件名 |
|  |  --branches=&lt;pattern&gt;  |   默认所有的参数  `refs/heads`  都在命令行中列为  `<commit>`，指定模式后将分支限制为与给定  `shell glob`  匹配的分支   |
|  | --author= | 可以使用正则表达式来根据指定作者进行帅选 |
|  |  -S  | 显示新增和删除指定字符串的提交：`git log -S <string>`  |
|  |  -L  |   日志搜索功能->展示代码中一行或者一个函数的历史   |
| 其它 |  |  |
|  |  -g / --walk-reflogs  |   遍历提交祖先链的开头，将最近的条目遍历到较旧的条目   |
|  | --reverse | 以相反的顺序输出选择要显示的提交（不能与  --walk-reflogs  组合） |
|  |  --merge  |   合并失败后，显示接触了合并冲突文件的提交：`git log --merge`  |
|  |  -c  |   合并提交的  `diff` 输出将同时显示每个父级与合并结果之间的差异，而不是一次显示父级与结果之间的成对差异：`git log -c`  |
|  | --left-right | 结合三点，显示每个提交到底处于哪一侧的分支： `git log --left-right master...experiment` |

## 常见情形

查看  `<file_name>`  文件中 `<fun_name>`  函数的每一次变更：

```bash
git log -L :<fun_name>:<file_name>

# 也可以使用正则
git log -L <匹配起始位置的正则>,<匹配末端位置的正则>:<file_name>
```

解决冲突时一个有用的例子：

```bash
# 三点选择出合并的两个分支中一个包含而另一个不包含的提交
# 加上 --left-right 同时显示每个提交到底处于哪一侧的分支
# 加上 --merge 显示任何一边接触了合并冲突文件的提交
git log --oneline --left-right HEAD...MERGE_HEAD
```

显示指定文件的第一次提交：

```bash
git log --oneline -- <file_name> | tail -n 1
```
