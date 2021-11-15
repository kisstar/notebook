# 常见情形

记录 Git 的常见使用情形。

## 某次提交

查看某次提交涉及的文件和及其修改方式：

```bash
git whatchanged -1 <commit_id>
```

查看某次提交修改文件的统计信息：

```bash
git log -1 --stat <commit_id>
```

查看某次提交的详细内容：

```bash
git log -1 -p <commit_id>

# 或者
git show <commit_id>
```

## 文件或目录

查看某个文件或目录的的提交历史：

```bash
git log -- <filename>/<dir>
```

查看某个版本下某个文件的具体改动：

```bash
git show <commit_id> -- <file>

# 或者
$ git log -1 <commit_id> -<file>：
```

从特定提交项切换出某个文件：

```bash
git checkout <commit_id> -- <filename>
```

## 比较

查看两个版本间某个文件的差异：

```bash
git diff <commitId1> <commitId2> -- <file>
```

## 分支

创建一个空白分支，没有父提交：

```bash
git checkout --orphan <branch_name>
```

## 合并

找出两个分支的共同祖先：

```bash
git merge-base <branch_a> <branch_b>
```

合并失败后，显示接触了合并冲突文件的提交：

```bash
git log --merge
```

## 其它

查看某个时间段内的提交：

```bash
git log [--since='<Date>'] [--until='<Date>']
```

影响了包含搜索字符串的代码或文本的提交：

```bash
git log -S "<some text>"
```

查看系统中设置的别名：

```bash
git config -l | grep alias | sed 's/^alias\.//g'
```

移除所有的标签：

```bash
git tag | xargs git tag -d
```
