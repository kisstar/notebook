# 深入 Git

从零开始，了解 Git 是如何工作的。

## 基础

创建工作目录。

```bash
~ $ mkdir alpha
~ $ cd alpha

~/alpha $ mkdir data
~/alpha $ echo 'a' > data/letter.txt

# alpha
# └── data
#     └── letter.txt
```

初始化仓库。

```bash
~/alpha $ git init
```

初始化过程中创建一个 `.git` 目录并向其中写入一些文件。这些文件定义了关于 `Git` 配置和项目历史的所有内容。如若想备份或复制一个版本库，只需把这个目录拷贝至另一处即可。

其实，它们也只是一些普通的文件，并没有什么神奇之处。用户可以使用文本编辑器或 `shell` 来读取和编辑它们。也就是说：用户可以像读取项目文件一样轻松地读取和编辑项目的历史记录。

现在整个项目的目录看起来是这样的：

```bash
alpha
├── data
|   └── letter.txt
└── .git
    ├── objects/ # 存储所有数据内容
    |   ├── pack
    |   └── info
    ├── HEAD # 指向目前被检出的分支
    ├── config*
    ├── description
    ├── hooks/
    ├── info/
    ├── refs/ # 存储指向数据（分支）的提交对象的指针
    etc...
```

该目录下可能还会包含其他文件，不过对于一个全新的 `git init` 版本库，这将是你看到的默认结构。

## 暂存区

接下来，使用 `git add` 命令将 `letter.txt` 添加到暂存区。首先，它会在 `.git/objects/` 目录中创建一个新的 `blob` 文件，此文件中包含了 `data/letter.txt` 的压缩内容。

```bash
~/alpha $ git add data/letter.txt
```

对应文件的名字则是将待存储的数据外加一个头部信息（header）一起做 `SHA-1` 校验运算而得的校验和去掉前两个字符而得到，然后会在 `objects` 目录下创建一个以校验和前两个字符命名的子目录来存放该文件。

<!--
Git 以对象类型作为开头来构造一个头部信息，本例中是一个 “blob” 字符串。
接着 Git 会添加一个空格，随后是数据内容的长度，最后是一个空字节（null byte）。
-->

你可以通过命令来查看这个完整的校验和：

```bash
~/alpha $ git ls-files --stage

100644 78981922613b2afb6025042ff6bd878ac1994e85 0       data/letter.txt
```

因为已经在 `Git` 中已经保存了完整的 `letter.txt` 文件，所以即使删除工作目录中的 `letter.txt` 文件，依然能够从 `Git` 中检出。

你可以根据上面的 `SHA-1` 值来通过命令查看其中保存的内容：

```bash
~/alpha $ git cat-file -p 78981922613b2afb6025042ff6bd878ac1994e85
```

其次，`git add` 会将文件添加到索引中。索引是一个列表，其中包含 `Git` 被要求跟踪的每个文件。它作为文件存储在 `.git/index` 中。文件的每一行都将一个被跟踪的文件映射到其内容添加时的哈希值。

这是运行 `git add` 命令后的索引:

```bash
~/alpha $ xxd .git/index

44 49 52 43 00 00 00 02 00 00 00 01 5e 42 b0 66
08 e3 fc 58 5e 42 b0 66 08 e3 fc 58 00 00 00 00
00 00 00 00 00 00 81 a4 00 00 00 00 00 00 00 00
00 00 00 02 78 98 19 22 61 3b 2a fb 60 25 04 2f
f6 bd 87 8a c1 99 4e 85 00 0f 64 61 74 61 2f 6c
65 74 74 65 72 2e 74 78 74 00 00 00 2c e9 03 19
de 7e 8e 2a dd 3e 26 b5 6a 1a 31 e2 fe 81 57 24

# 44 49 52 43 值为 DIRC（意为 DirCache），标识该文件是否是合法的索引文件
# 00000002 值为 2，标识索引文件的版本，当前版本为 2.x
# 00000001 值为 1，无符号整数，标识了索引的文件数目
# 5e42b066 08e3fc58 标识了文件的创建时间
    # 5e42b066 表示 Unix 时间，单位为秒
    # 08e3fc58 表示微秒
# 5e42b066 08e3fc58 标识了文件的最后修改时间
    # 5e42b066 表示 Unix 时间，单位为秒
    # 08e3fc58 表示微秒
# 00000000 设备编号，由于当前测试的 Windows 系统不支持，所以置为零
# 00000000 表示 inode 编号
    # 由于当前测试的 Windows 系统不支持，所以置为零
    # 溢出的 bit 被裁切。在 Git 中唯一作用就是检测文件是否修改，因此没有采用 64 位的
# 000081a4 表示文件模式
    # 000081a4 转换为二进制为 00000000000000001000000110100100，从后向前数，每三位代表一个权限，也就是 644
    # 剩余的表示文件类型，也就是 100，表示 regular file：https://www.cnblogs.com/lienhua34/p/3950458.html
# 00000000 所属用户 UID
# 00000000 所属用户组 GID
# 00000002 表示文件大小，也就是 2 字节
# 78981922613b2afb6025042ff6bd878ac1994e85 表示 SHA-1 值
# 000f 转为二进制
    # 1 位假定不变标识：0 表示跟踪所有变更，1 表示忽略所有变更
    # 1 位扩展标识：该标识在当前索引文件版本（版本2）中无意义，被置 0
    # 2 位阶段标识：该标识在合并分支的时候使用，可以通过 git ls-files --stage 命令获取。普通（未合并）文件通常为 0
    # 12 位文件名长度：最长支持到 4095位（0xFFF），溢出部分将被忽视
# 646174612f6c65747465722e747874 若干字节的文件路径
# 分隔符？
# 校验值？
# etc...
```

可见里面包含了文件信息、`SHA-1` 值等信息，再来创建一个新的文件，写入 '1234'，并将其添加到仓库中：

```bash
~/alpha $ echo '1234' > data/number.txt
~/alpha $ git add data
```

我们可以通过上面的命令来直接查看相关的关键信息：

```bash
~/alpha $ git ls-files --stage

100644 78981922613b2afb6025042ff6bd878ac1994e85 0       data/letter.txt
100644 d00491fd7e5bb6fa28c517a0bb32b8b506539d4d 0       data/number.txt
```

<!--
Notice that only the files in the data directory are listed in the index,
though the user ran git add data. The data directory is not listed separately.
-->

紧接着我们把 `data/number.txt` 中的内容改为 “1”，再添加到仓库：

```bash
~/alpha $ echo '1' > data/number.txt
~/alpha $ git add data
```

结果会根据新的内容创建新的 `blob` 对象，更新 `data/number.txt` 的索引项以指向新的对象。

## 首次提交

现在来进行一次提交操作：

```bash
~/alpha $ git commit -m 'a1'
```

执行上面的命令主要会完成三件事情，首先创建一个树图来表示提交的项目版本内容。

所有内容均以树对象和数据对象的形式存储，其中树对象对应了 UNIX 中的目录项，数据对象则大致上对应了 `inodes` 或文件内容。

```bash
# letter.txt
# .git/objects/78/981922613b2afb6025042ff6bd878ac1994e85
~/alpha $ git cat-file -p 78981922613b2afb6025042ff6bd878ac1994e85
a

# number.txt
# .git/objects/d0/0491fd7e5bb6fa28c517a0bb32b8b506539d4d
~/alpha $ git cat-file -p d00491fd7e5bb6fa28c517a0bb32b8b506539d4d
1
```

每一个树对象包含了一条或多条树对象记录（tree entry），每条记录含有一个指向数据对象或者子树对象的 `SHA-1` 指针，以及相应的模式、类型、文件名信息。

```bash
# 树记录
# .git/objects/89/29f1d99ae7ad510c084efe4babc036c6dbb8cb
~/alpha $ git cat-file -p 8929f1d99ae7ad510c084efe4babc036c6dbb8cb
040000 tree 23e3db4885d1e39c4c55d7e1b7d27206f5bbf15e    data

# 树对象
# .git/objects/23/e3db4885d1e39c4c55d7e1b7d27206f5bbf15e
~/alpha $ git cat-file -p 23e3db4885d1e39c4c55d7e1b7d27206f5bbf15e
100644 blob 78981922613b2afb6025042ff6bd878ac1994e85    letter.txt
100644 blob d00491fd7e5bb6fa28c517a0bb32b8b506539d4d    number.txt
```

然后创建一个 `commit` 对象，其中包含了本次提交的关键信息，包括提交者、提交描述、提交时间以及对应的树对象等信息。

和前面的文件存储相同，都被保存在 `.git/objects` 目录中。

```bash
# 提交对象
# .git/objects/de/62b89f98d320c682d9f2e6f77a466e63b9f347
~/alpha $ git cat-file -p de62b89f98d320c682d9f2e6f77a466e63b9f347
tree 8929f1d99ae7ad510c084efe4babc036c6dbb8cb
author dongwanhong <dongwhchn@163.com> 1581519078 +0800
committer dongwanhong <dongwhchn@163.com> 1581519078 +0800

a1
```

最后，将当前分支指向新的提交对象。

那么哪个是当前的分支呢？在 `Git` 中分支其实就是一个指向提交对象的别名，而当前分支就被保存在 `.git/HEAD` 中。

```bash
~/alpha $ cat .git/HEAD
ref: refs/heads/master
```

这意味着当前处于 `master` 分支，而 HEAD 和 master 其实都是一个引用（简单理解为上面说的别名），它们的真身实际上被保存在 `.git/refs/heads` 目录下。

每一个分支都会在该目录中创建一个与分支同名的文件，而文件内容就是该分支指向的提交对象的 `SHA-1` 值。我们目前只有一次提交，所以显然当前的 `master` 分支就指向了这次提交。

```bash
~/alpha $ cat .git/refs/heads/master
de62b89f98d320c682d9f2e6f77a466e63b9f347
```

到此，我们已经理清了运行 `git add` 和 `git commit` 命令时， `Git` 所做的实质工作——将被改写的文件保存为数据对象，更新暂存区，记录树对象，最后创建一个指明了顶层树对象和父提交的提交对象。

数据对象、树对象、提交对象——最初均以单独文件的形式保存在 `.git/objects` 目录中。

## 再次提交

现在工作区、暂存区和版本库中都有着 `data/letter.txt` 和 `data/number.txt` 一模一样的内容，不同的是暂存区和版本库中的内容都以 `blob` 对象的形式保存在 `.git/objects` 目录中。

再次更改一下 `data/number.txt` 文件中的内容：

```bash
~/alpha $ echo '2' > data/number.txt
```

显然，工作区的内容不再与暂存区和版本库中的内容相同了，那么更新一下暂存区：

```bash
~/alpha $ git add data/number.txt
```

发生了什么呢？`Git` 将根据暂存区中的内容在 `.git/objects` 目录下新建一个 `blob` 对象，并同时更新 `index` 指向这个新的索引。

```bash
# number.txt
# .git/objects/0c/fbf08886fca9a91cb753ec8734c84fcbe52c9f
~/alpha $ git cat-file -p 0cfbf08886fca9a91cb753ec8734c84fcbe52c9f
2
```

那么再做一次提交：

```bash
~/alpha $ git commit -m 'a2'
```

接下来的工作就和前面一样，首先根据暂存区中的内容创建一个图树，期间会新建一个树对象、树记录来映射整个暂存区的快照。

```bash
# 树记录
# .git/objects/2d/798b26837fd4b198a3cc0c95084032be8ea42d
~/alpha $ git cat-file -p 2d798b26837fd4b198a3cc0c95084032be8ea42d
040000 tree a2d2b3fada83eb0f8f02187fd7ee6a111391d700    data

# 树对象
# .git/objects/a2/d2b3fada83eb0f8f02187fd7ee6a111391d700
~/alpha $ git cat-file -p a2d2b3fada83eb0f8f02187fd7ee6a111391d700
100644 blob 78981922613b2afb6025042ff6bd878ac1994e85    letter.txt
100644 blob 0cfbf08886fca9a91cb753ec8734c84fcbe52c9f    number.txt
```

同时，也会创建一个提交对象：

```bash
# 提交对象
# .git/objects/f1/8e64b0d7afd37701a31f71fef2af21bf955d8a
~/alpha $ git cat-file -p f18e64b0d7afd37701a31f71fef2af21bf955d8a
tree 2d798b26837fd4b198a3cc0c95084032be8ea42d
parent de62b89f98d320c682d9f2e6f77a466e63b9f347
author dongwanhong <dongwhchn@163.com> 1581652911 +0800
committer dongwanhong <dongwhchn@163.com> 1581652911 +0800

a2
```

和第一个提交对象不同的时，该提交对象的第二行指向了它的父级提交对象。为了找到父提交，`Git` 先找到 HEAD，跟随它到 `master`，找到了 `a1` 的提交散列。

最后，就是将 `master` 分支的指向移动最新的提交。

## 分析

我们先整理一下前面的所有数据，把它们绘制在一张图形中，所有关系清晰可见。

在 `a2` 提交中引用了 `a1` 提交中的数据对象（data/letter.txt），也就是说在 `Git` 的树对象中，存储数据只存储差异。类似地，如果整个目录在两次提交中没有变化，那么它的树以及它下面的所有 `blob` 和树都可以重用。

除了首次提交外，每个提交都有一个父级，如此以来存储库就存储项目的历史记录。

`Git` 用一个文件来保存 `SHA-1` 值，并给文件起一个简单的名字，然后用这个名字指针来替代原始的 `SHA-1` 值，而这样的文件被称为 “引用”。 `Git` 使用 HEAD、MERGE-HEAD 和 FETCH-HEAD 等符号引用来支持操作提交历史记录的命令。

对象/目录中的节点是不可变的。这意味着内容是编辑的，而不是删除的。每次添加的内容和提交的内容都在 `.git/objects` 目录中的某个位置。

## 检出提交

检出提交 `a2`，也就是第二次提交：

```bash
~/alpha $ git checkout f18e64b
```

我们通过其散列签出该次提交，将陆续进行四个步骤。首先，`Git` 获取 `a2` 提交并获取它指向的树图。

其次，它将树图中的文件项写入工作区。这不会导致任何变化，因为工作副本已经有正在写入的树图的内容。

接着，`Git` 将树图中的文件项写入索引。这也不会导致任何变化。索引也已经具有 `a2` 提交的内容。

最后，HEAD 的内容被设置为 `a2` 提交的散列，所以此时仓库将处于 'detached HEAD' 状态。

此时，我们再修改一下 `data/number.txt` 文件，并进行提交：

```bash
~/alpha $ echo '3' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m 'a3'
```

和前面的工作流程一样，不同的是去 HEAD 获取 `a3` 提交父提交时，不再查找并跟踪分支引用，而是直接找到 HEAD 并返回 `a2` 提交的散列。

同时 `Git` 会更新 HEAD，直接指向新 `a3` 提交的散列。目前存储库仍处于分离头状态。由于它不在分支上，且在 `a3` 或其子代中没有提交点，这意味着很容易失去。

## 切换分支

现在创建一个名为 `deputy` 的分支：

```bash
~/alpha $ git branch deputy
```

结果会创建一个 `.git/refs/heads/deputy` 文件来存储当前 HEAD 的指向，也就是 `a3` 提交对象的 `SHA-1` 值。

分支的创建使得 `a3` 提交变得安全，而不用担心迷失。不过仓库此时仍然处于游离状态，因为 HEAD 指向的仍然直接指向了提交。

现在切换一下分支：

```bash
~/alpha $ git checkout master
```

和检出提交的步骤一样（分支就是指向提交的指针），首先 `Git` 获取 `master` 指向的 `a2` 提交，并获取提交指向的树图。

其次，`Git` 将树图中的文件条目写入工作副本的文件中。这将 `data/number.txt` 的内容设置为 2。

第三，`Git` 将树图中的文件项写入索引。这会将 `data/number.txt` 的条目更新为 2 对应的 `blob` 的哈希值。

第四，`Git` 将 HEAD 内容从散列值更改为：

```bash
ref: refs/heads/master
```

## 检出工作区不兼容的分支

向 `number.txt` 文件中写入新的内容，然后直接检出 `deputy` 分支：

```bash
~/alpha $ echo '789' > data/number.txt
~/alpha $ git checkout deputy
```

由于 `number.txt` 在 HEAD 实际指向的是 `a2` 的提交中是 2，在 `deputy` 分支实际指向的是 `a3` 的提交中是 3，而在工作区中则是 789。所有这些版本都不同，于是 `Git` 阻止了检出，现在必须解决这些差异。

最简单的就是丢弃掉工作区的修改：

```bash
~/alpha $ echo '2' > data/number.txt
~/alpha $ git checkout deputy
```

我们将 `number.txt` 的内容重置为了 2，再次切换分支成功。

## 合并祖先

合并 `master` 到当前分支：

```bash
~/alpha $ git merge master
```

合并两个分支意味着合并两个提交。第一个提交是当前分支指向的：接收者。第二个提交是 `master` 指向的：给予者。对于这个合并，`Git` 什么也不做，仅申明它已经是最新的。

也就是说，当合并中给予者是接收者的祖先的话，那么 `Git` 就什么也不做，因为这些变化都已经存在接收者中了。

## 合并后代

将分支切换到 `master`：

```bash
~/alpha $ git checkout master
```

然后合并 `deputy` 到当前分支：

```bash
~/alpha $ git merge deputy
```

`Git` 检查到合并中给予者是接收者的后代，所以将会进行一次快速合并。合并过程中，由于给予者已经有一个提交序列描述要进行的更改：接收者和给予者之间的提交序列，所以 `Git` 的历史不会发生改变。

尽管 `Git` 的历史没有改变，但是 `Git` 的 HEAD 指向的具体引用将更新为指向给予者的提交。

## 合并来自不同血统的两个提交

在 `master` 分支上修改 `number.txt` 并进行提交：

```bash
~/alpha $ echo '4' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m 'a4'
```

然后，切换到 `deputy` 分支修改 `letter.txt` 并提交：

```bash
~/alpha $ git checkout deputy
~/alpha $ echo 'b' > data/letter.txt
~/alpha $ git add data/letter.txt
~/alpha $ git commit -m 'b3'
```

再将 `master` 分支合并到当前分支：

```bash
~/alpha $ git merge master -m 'b4'
```

首先，`Git` 发现接收者 `b3` 和给予者 `a4` 有着不同的血统，就会把（接受者的提交写入 alpha/.Git/ORIG_HEAD？）给予者提交的散列写入 `alpha/.Git/MERGE_HEAD` 处的文件。

其次，`Git` 找到基本提交：接收者和给予者提交的最新的共同祖先。

第三，`Git` 从基提交、接收方提交和给定方提交的树图中生成索引。

第四，`Git` 生成一个 `diff`，它将接收者和给予者提交对基提交所做的更改组合在一起。其中包含更改的文件路径列表：添加、删除、修改或冲突。

`Git` 获取出现在基索引、接收方索引或给定方索引中的所有文件的列表。对于每一个，它都比较索引项以决定对文件所做的更改。它向`diff` 写入一个对应的条目。在本例中，`diff` 有两个条目。

第一个条目是 `data/letter.txt`。此文件的内容在基中是 `a`，在接收器中是 `b`，在给定者中是 `a`。基和接收端的内容不同。但在基础和给予者上是一样的。`Git` 看到内容是由接收者修改的，而不是给出者。所以判定 `data/letter.txt` 的 `diff` 条目是一个修改，而不是冲突。

`diff` 中的第二个条目是 `data/number.txt`。在这种情况下，内容在基部和接收器中是相同的，而在给予者中是不同的。因此，`data/letter.txt` 的 `diff` 条目也是一个修改。

第五，`diff` 中的条目所指示的更改将应用于工作副本。`data/letter.txt` 的内容设置为 `b`，`data/number.txt` 的内容设置为 4。

第六，`diff` 中的条目指示的更改将应用于索引。`data/letter.txt` 的条目指向 b 对应的 `blob`，`data/number.txt` 的条目指向 4 对应的 `blob`。

第七，提交更新后的索引。

最后，`Git` 将当前分支的指针指向这个新的提交。

## 合并来自不同血统的两个提交，这两个提交都修改同一文件

先切换到 `master` 分支进行一次合并（快速），以同步两个分支的进度：

```bash
~/alpha $ git checkout master
~/alpha $ git merge deputy
```

然后再回到 `deputy` 分支对 `number.txt` 进行修改后提交：

```bash
~/alpha $ git checkout deputy
~/alpha $ echo '5' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m 'b5'
```

接着再回到 `master` 分支，同样对 `number.txt` 文件进行修改后提交；

```bash
~/alpha $ git checkout master
~/alpha $ echo '6' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m 'b6'
```

最后，再将 `deputy` 分支的修改合并到当前分支：

```bash
~/alpha $ git merge deputy
```

前面的工作和上面合并一样，但是到第四步时生成的 `diff` 仅有一个条目：`data/number.txt`。由于它的内容在接收方、给定方和基中不同，所以被标记为冲突。

第五步，将 `diff` 中的条目所指示的更改将应用于工作副本。对于冲突区域，`Git` 将两个版本写入工作副本中的文件。`data/number.txt` 的内容设置为：

```bash
<<<<<<< HEAD
6
=======
5
>>>>>>> deputy
```

第六，`diff` 中的条目指示的更改将应用于索引。索引中的条目由其文件路径和阶段的组合唯一标识。未经许可的文件的条目的阶段为 0。在合并之前，索引如下所示，其中 0 是阶段值：

```bash
100644 61780798228d17af2d34fce4cfbdf35556832472 0       data/letter.txt
100644 1e8b314962144c26d5e0e50fd29d2ca327864913 2       data/number.txt
```

将 `merge diff` 写入索引后，索引如下所示：

```bash
100644 61780798228d17af2d34fce4cfbdf35556832472 0       data/letter.txt
100644 b8626c4cff2849624fb67f87cd0ad72b163671ad 1       data/number.txt
100644 1e8b314962144c26d5e0e50fd29d2ca327864913 2       data/number.txt
100644 7ed6ff82de6bcc2a78243fc9c54d3ef5ac14da69 3       data/number.txt
# 阶段 0 中 data/letter.txt 的条目与合并前相同
# 阶段 0 的 data/number.txt 条目已消失。这里有三个新条目，它们的存在告诉 Git data/number.txt 有冲突
# 阶段 1 的条目具有 base data/number.txt 内容的哈希
# 阶段 2 的条目具有接收者 data/number.txt 内容的哈希值
# 阶段 3 的条目具有给定方 data/number.txt 内容的哈希
```

通过将 `data/number.txt` 的内容设置为 11 来集成两个冲突版本的内容。然后将文件添加到索引中，告诉 `Git` 冲突已经解决。

```bash
~/alpha $ echo '11' > data/number.txt
~/alpha $ git add data/number.txt
```

结果 `Git` 添加了一个包含 11 的 `blob`，并从索引中删除阶段 1、2 和 3 的 `data/number.txt` 条目。它使用新 `blob` 的散列在第 0 阶段添加 `data/number.txt` 条目。索引现在显示：

```bash
100644 61780798228d17af2d34fce4cfbdf35556832472 0       data/letter.txt
100644 b4de3947675361a7770d29b8982c407b0ec6b2a0 0       data/number.txt
```

第七，手动提交。

```bash
~/alpha $ git commit -m 'b11'
```

`Git` 在存储库中看到 `.Git/MERGE_HEAD`，知晓正在进行合并。于是它检查索引，发现没有冲突。接着它创建了一个新的提交 `b11` 来记录解析合并的内容。

接着，它删除 `.git/MERGE_HEAD` 处的文件。这就完成了合并。

最后，`Git` 将当前分支 `master` 指向新的提交。

## 移除文件

删除 `letter.txt` 文件：

```bash
~/alpha $ git rm data/letter.txt
```

`Git` 将从工作副本中删除 `letter.txt` 文件。对应的条目也将从索引中删除。

接着进行提交。

```bash
~/alpha $ git commit -m '11'
```

作为提交的一部分，`Git` 一如既往地构建表示索引内容的树图。树图中不包括 `data/letter.txt`，因为它不在索引中。

## 复制仓库

复制 `alpha` 整个目录：

```bash
~/alpha $ cd ..
      ~ $ cp -R alpha bravo
```

现在我们有了两个一模一样的仓库，试着在 `alpha` 仓库中连接另一个仓库：

```bash
      ~ $ cd alpha
~/alpha $ git remote add bravo ../bravo
```

也就是说在 `alpha` 上建立了一个远程存储库 `bravo`。这会在 `alpha/.git/config` 文件中添加一些行：

```bash
[remote "bravo"]
    url = ../bravo
    fetch = +refs/heads/*:refs/remotes/bravo/*
```

这些行指定 `../bravo` 目录中有一个名为 `bravo` 的远程存储库。

## 从远程拉取分支

首先，前往 `bravo` 仓库修改 `number.txt` 文件并进行提交：

```bash
~/alpha $ cd ../bravo
~/bravo $ echo '12' > data/number.txt
~/bravo $ git add data/number.txt
~/bravo $ git commit -m '12'
```

然后，回到 `alpha` 仓库从 `bravo` 仓库拉取 `master` 分支：

```bash
~/bravo $ cd ../alpha
~/alpha $ git fetch bravo master
```

期间，`Git` 先获取 `master` 在 `bravo` 上指向的提交的散列。这是 `12` 对应提交的哈希值。

其次，`Git` 列出了该次提交所依赖的所有对象：提交对象本身、其树图中的对象、该次提交的祖先提交及其树图中的对象。

随后将从该列表中删除 `alpha` 对象数据库已经拥有的任何对象。它将其余部分复制到 `alpha/.git/objects/` 中。

第三，位于 `alpha/.git/refs/remotes/bravo/master` 的具体 `ref` 文件的内容被设置为 12 对应提交的散列。

第四，`alpha/.git/FETCH_HEAD` 的内容设置为：

```bash
584648bdda3d23312d4f12b0648c02815d32e526                branch 'master' of ../bravo
```

这表示最近的 `fetch` 命令从 `bravo` 获取了 `master` 的 12 对应的提交。

## 合并 FETCH_HEAD

合并 FETCH_HEAD：

```bash
~/alpha $ git merge FETCH_HEAD
```

FETCH_HEAD 和分支类似，只是另一个指针。作为给予者它指向 12 对应的提交。而 HEAD 作为接受者则指向 11 对应的提交。`Git` 将执行快速向前合并，并让 `master` 指向 12 对应的提交。

## 从远程拉取

从 `bravo` 拉取 `master` 到 `alpha`。

```bash
~/alpha $ git pull bravo master
```

`Pull` 是 “fetch and merge FETCH_HEAD” 的缩写。`Git` 执行这两个命令并报告 `master` 已经是最新的。

## 克隆仓库

移动到上级目录，克隆 `alpha` 仓库：

```bash
~/alpha $ cd ..
~ $ git clone alpha charlie
```

克隆仓库和我们上面复制仓库非常相似。`Git` 创建了一个名为 `charlie` 的新目录，并将它其初始化为 `Git repo`，接着将 `alpha` 添加为名为 `origin` 的远程仓库，最后获取 `origin` 并合并 FETCH-HEAD。

## 将分支推送到远程签出的分支

回到 `alpha` 仓库，修改 `number.txt` 文件并提交：

```bash
      ~ $ cd alpha
~/alpha $ echo '13' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m '13'
```

将 `charlie` 添加为新的远程仓库：

```bash
~/alpha $ git remote add charlie ../charlie
```

推送 `master` 到 `charlie` 仓库：

```bash
~/alpha $ git push charlie master
```

提交 13 所需的所有对象都被复制到 `charlie`。

`Git` 拒绝推送到远程签出的分支。这是有道理的。推送将更新远程索引和头部。如果有人在远程编辑工作副本，这将导致混乱。

此时，用户可以创建一个新的分支，将提交 13 合并到其中，并将该分支推给 `charlie`。但是，实际上，他们需要一个存储库，可以随时推送到。

他们希望有一个中心存储库，可以从中推送，但没有人直接提交给它。类似 `GitHub`，他们想要一个光秃秃的仓库。

## 克隆裸存储库

移动到上层目录，克隆 `alpha` 仓库：

```bash
~/alpha $ cd ..
      ~ $ git clone alpha delta --bare
```

此次将 `delta` 克隆为一个光秃秃的存储库。有两个不同之处：配置文件指示存储库是空的，通常存储在 `.git` 目录中的文件存储在存储库的根目录中：

```bash
delta
├── HEAD
├── config
├── objects
└── refs
```

## 推送分支到裸存储库

回到 `alpha` 仓库，并将 `delta` 设置为远程仓库：

```bash
      ~ $ cd alpha
~/alpha $ git remote add delta ../delta
```

然后，修改 `number.txt` 文件并进行提交：

```bash
~/alpha $ echo '14' > data/number.txt
~/alpha $ git add data/number.txt
~/alpha $ git commit -m '14'
```

最后，将 `master` 分支推送到 `delta` 仓库：

```bash
~/alpha $ git push delta master
```

首先，主分支上提交 14 所需的所有对象都从 `alpha/.git/objects/` 复制到 `delta/objects/`。

其次，`delta/refs/heads/master` 更新为指向提交 14。

最后，`alpha/.git/refs/remotes/delta/master` 设置为指向提交 14。`alpha` 拥有 `delta` 状态的最新记录。

## 总结

`Git` 是建立在一个图上的。几乎每个 `Git` 命令都处理这个图。要深入理解 `Git`，请关注此图的属性，而不是工作流或命令。

## 参考

- [深入 Git 索引（一）：索引文件结构篇](https://zhuanlan.zhihu.com/p/76634986)
- [理解 Git index 文件](https://wolfsonliu.github.io/archive/2018/li-jie-git-index-wen-jian.html)
- [Git 内部原理 - Git 对象](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-Git-%E5%AF%B9%E8%B1%A1)
- [Git from the inside out](https://codewords.recurse.com/issues/two/git-from-the-inside-out)
