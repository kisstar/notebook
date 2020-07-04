# 引用

我们可以使用 `git log a495e2cc` 这样的命令来浏览完整的提交历史，但为了能遍历那段历史从而找到所有相关对象，你需要最后一个提交的 SHA-1 值。

显然这样显得是否麻烦，因此我们需要一个文件来保存 SHA-1 值，并给文件起一个简单的名字，然后用这个名字指针来替代原始的 SHA-1 值。

在 Git 里，这样的文件被称为“引用（references，或缩写为 refs）”；你可以在 `.git/refs` 目录下找到这类含有 SHA-1 值的文件。

在目前的项目中，这个目录没有包含任何文件，但它包含了一个简单的目录结构。

```bash
$ find .git/refs/
.git/refs/
.git/refs/heads # ----> 其下文件名为其中内容（提交对象的 SHA-1 值）的简名
.git/refs/tags
```

## 基础

若要创建一个新引用来帮助记忆最新提交所在的位置，从技术上讲我们只需简单地做如下操作。

```bash
echo "a495e2cc498bfcf1f676fff2a905ec26b09f7015" > .git/refs/heads/master
```

现在，你可以直接使用 `master` 这个简单的名字来替代 SHA-1 值了。

```bash
$ git log --oneline master
a495e2c (HEAD -> master) third commit
97bf78e second commit
b3bafe1 first commit
```

当然，这样直接编辑文件是不被推荐的（在这里可以很好的帮助我们理解），因为很可能输入错误，而且对于一些操作来说，它可能不只是更改一处文件。更好的做法是使用 Git 提供的一个更加安全的命令 `update-ref` 来完成此事。

```bash
# 这可以达到与上面同样的效果，而且更加安全
$ git update-ref refs/heads/master a495e2cc498bfcf1f676fff2a905ec26b09f7015
```

聪明的你应该已经想象到了，这一切和我们理解的分支系统很像，不是吗？**分支就是一个指向某一系列提交之首的指针或引用**，在这里它就是简写的 SHA-1 值（也就是文件名，比如：master）。

因此若想在第二个提交上创建一个分支，可以很简单的实现。

```bash
git update-ref refs/heads/test 97bf78e
```

*当运行类似于 `git branch <branchname>` 这样的命令时，Git 实际上会运行 `update-ref` 命令，取得当前所在分支最新提交对应的 SHA-1 值，并将其加入你想要创建的任何新引用中。*

## HEAD 引用

当我们执行 `git branch <branchname>` 时，Git 如何知道最新提交的 SHA-1 值呢？ 答案是 HEAD 文件。

HEAD 文件是一个符号引用（symbolic reference），指向目前所在的分支。

所谓符号引用，意味着它并不像普通引用那样包含一个 SHA-1 值——它是一个指向其他引用的指针。如果查看 HEAD 文件的内容，一般而言我们看到的类似这样：

```bash
$ cat .git/HEAD
ref: refs/heads/master # 我们当前处于 master 分支
```

当我们执行 `git commit` 时，该命令会创建一个提交对象，并用 HEAD 文件中那个引用所指向的 SHA-1 值设置其父提交字段。

跟分支引用相同，我们可以手动的编辑该文件，然而同样存在一个更安全的命令来完成此事：`symbolic-ref`。借助此命令来查看或设置 HEAD 引用对应的值。

```bash
# 查看
$ git symbolic-ref HEAD
# 设置
$ git symbolic-ref HEAD refs/heads/test
```

## 标签引用

在 Git 对象中我们讨论过 Git 的三种主要对象类型，事实上还有第四种。

**标签对象**（tag object）非常类似于一个提交对象——它包含一个标签创建者信息、一个日期、一段注释信息，以及一个指针。

主要的区别在于，标签对象通常指向一个提交对象，而不是一个树对象。它像是一个永不移动的分支引用——永远指向同一个提交对象，只不过给这个提交对象加上一个更友好的名字罢了。

Git 存在两种类型的标签：附注标签和轻量标签。可以像这样创建一个轻量标签。

```bash
git update-ref refs/tags/v1.0 97bf78e
```

这和创建一个分支建之如出一辙，只不过存放的目录改变了。

若要创建一个附注标签会稍显复杂些，Git 会创建一个标签对象，并记录一个引用来指向该标签对象，而不是直接指向提交对象。

可以通过创建一个附注标签来验证这个过程（-a 选项指定了要创建的是一个附注标签）：

```bash
$ git tag -a v1.1 a495e2c -m 'test tag'
$ cat .git/refs/tags/v1.1
5c78c52a9f3cb081eb36f8cb995e91fe97c3cb65
$ git cat-file -p 5c78c52a9f3cb081eb36f8cb995e91fe97c3cb65
object a495e2cc498bfcf1f676fff2a905ec26b09f7015 # 指向了我们打了标签的那个提交对象的 SHA-1 值
...
```

签对象并非必须指向某个提交对象；你可以对任意类型的 Git 对象打标签。

## 远程引用

如果你添加了一个远程版本库并对其执行过推送操作，Git 会记录下最近一次推送操作时每一个分支所对应的值，并保存在 `refs/remotes` 目录下。例如，你可以添加一个叫做 `origin` 的远程版本库，然后把 `master` 分支推送上去：

```bash
git remote add origin <remote_url>
git push origin master
```

此时，如果查看 `refs/remotes/origin/master` 文件，可以发现 `origin` 远程版本库的 `master` 分支所对应的 SHA-1 值，就是最近一次与服务器通信时本地 `master` 分支所对应的 SHA-1 值：

```bash
$ cat .git/refs/remotes/origin/master
a495e2cc498bfcf1f676fff2a905ec26b09f7015
```

远程引用和分支（位于 refs/heads 目录下的引用）之间最主要的区别在于，远程引用是只读的。

虽然可以 `git checkout` 到某个远程引用，但是 Git 并不会将 HEAD 引用指向该远程引用。因此，你永远不能通过 `commit` 命令来更新远程引用。Git 将这些远程引用作为记录远程服务器上各分支最后已知位置状态的书签来管理。

## 总结

分支只是一个指向某一系列提交之首的指针或引用。而 HEAD 文件则是一个符号引用，指向目前所在的分支。
