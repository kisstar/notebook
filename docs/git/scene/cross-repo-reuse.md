# 在仓库之间复用提交

如果你有两个仓库 A 和 B，现在有个需求要在这两个仓库上完成，最简单的方法是在两个仓库中分别进行开发和提交，但更简单的是我们可以在一个仓库中开发，然后在另一个仓库中直接复用。

## cherry-pick

要想实现提交复用最先想到的就是 `cherry-pick` 命令，它可以将指定的提交（commit）应用于其他分支：

```bash
git cherry-pick <commit>
```

如上，它会将指定的提交应用到当前分支上，然后产生一个新的提交，就像是将其中的内容在当前工作区进行添加和提交一样。

如果想要同时复用多个提交，可以直接在后面继续添加，每个提交之间用空格隔开：

```bash
git cherry-pick <commitA> <commitB>
```

如上，这将会将 commitA 和 commitB 对应的提交都应用在当前分支上。

如果要引用两个提交之间的所有提交，则可以使用下面的语法：

```bash
git cherry-pick <commitA>..<commitB>
```

这里的 A 应该早与 B 提交，而且应用时是不包含 A 的。你也可以通过下面的语法来包含 A 提交：

```bash
git cherry-pick <commitA>^..<commitB>
```

## 跨仓库复用

现在已经可以在一个仓库中进行复用了，那么跨仓库呢？方式其实差不多的，我们只需要拿到另一个仓库的提交就可以了。

假设我们现在在 A 仓库中，想要引用 B 中的提交，那么就把 B 中的修改推送到远程，然后将 B 对应的远程仓库地址也在 A 中库中进行添加。

```bash
git remote add origin_b https://repository_B_URL
```

接着我们就可以将在 B 仓库中需要应用的提交拉取下来，假设其提交在 branch_b 分支上：

```bash
git fetch origin branch_b
git checkout -b branch_b origin/branch_b
```

最后复用就跟在单仓库中一样了：

```bash
git cherry-pick branch_b
```

试试看吧。
