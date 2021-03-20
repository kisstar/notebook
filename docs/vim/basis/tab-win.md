# 标签和窗口

包括标签页，窗口等操作。

## 操作标签

创建签页：

```bash
# 指定的文件若存在则直接打开，否则在保存后将进行新建
# 此外，tabnew 也具有同样的功能
tabedit <filename>
```

列出当前所有的 Tab：

```bash
:tabs
```

跳到上一个/下一个/第一个/最后一个 Tab：

```bash
# 其中 tabnext 可简写为 tabn，tabprevious 可简写为 tabp
:tabnext/:tabprevious/:tabfirst/:tablast
```

将当前页移动到指定页：

```bash
# 如果不指定页数则指定移动到最后
:tabm [n]
```

关闭标签页：

```bash
# n 是一个数字，指定关闭的标签页，默认关闭当前标签页
# tabclose 可以简写为 tabc
:tabclose [n]
```

关闭其他标签页：

```bash
:tabo
```

### 快捷键

`gt` – 到下一个页

`gT` – 到前一个页

`[n]gt` – 到指定页，比如：5gt 就是到第 5 页

_Vim 默认最多只能打开 10 个标签页。你可以用 `set tabpagemax=15` 改变这个限制。_

## 操作窗口

水平打开多个窗口：

```bash
vim -o <filename1> [<filename2> ...]
# or
vim -o filename*
```

垂直打开多个窗口：

```bash
vim -O <filename1> [<filename2> ...]
# or
vim -O filename*
```

垂直打开多窗口，并且进行比较：

```bash
vim -d <filename1> [<filename2> ...]
# or
vim -d filename*
```

横向分割窗口：

```bash
new <filename>
# or
split <filename> # split 可简写为 sp
```

纵向分割窗口：

```bash
vnew <filename>
# or
vsplit <filename> # vsplit 可简写为 vsp
```

### 窗口管理

切换：

连续按下 ctrl+w 两次则可以一次切换窗口。

按下 ctrl+w 后，再通过 j/k/h/l 进行上下左右切换。

纵向调整：

```bash
# 例如：:res 5，显示行数调整为5行
:res[ize] num
# 把当前窗口高度增加 num 行
:res[ize]+num
# 把当前窗口高度减少 num 行
:res[ize]-num
```

另外，你还可以直接使用快捷键进行调整：

`ctrl+w +`: 纵向扩大（行数增加）

`ctrl+w –`: 纵向缩小（行数减少）

横向调整：

```bash
# 指定当前窗口为 num 列
:vertical res[ize] num
# 把当前窗口增加 num 列
:vertical res[ize]+num
# 把当前窗口减少 num 列
:vertical res[ize]-num
```

## 参考

- [Linux vi/vim 多标签和多窗口, Tab 页浏览目录, 多 Tab 页编辑](https://justcode.ikeepstudying.com/2018/03/linux-vi-vim%E5%A4%9A%E6%A0%87%E7%AD%BE%E5%92%8C%E5%A4%9A%E7%AA%97%E5%8F%A3-tab%E9%A1%B5%E6%B5%8F%E8%A7%88%E7%9B%AE%E5%BD%95-%E5%A4%9Atab%E9%A1%B5%E7%BC%96%E8%BE%91/)
