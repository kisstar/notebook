# NERDTree 文件资源管理器

NERDTree 是 Vim 编辑器的文件系统资源管理器。使用此插件，用户可以直观地浏览复杂的目录层次结构，快速打开文件以进行读取或编辑，以及执行基本的文件系统操作。

默认的可以使用 `:NERDTreeToggle` 指令来打开和关闭目录树，为了方面你可以设置自己喜欢的按键映射：

```bash
# .vimrc
map <C-n> :NERDTreeToggle<CR>
```

## 常用配置

以下是我们经常会配置的选项：

```bash
# .vimrc
autocmd vimenter * NERDTree # 自动打开 NERDTree
NERDTreeMinimalUI = 1 # 关闭目录树上面的 `..` 和帮助提示
```

对于自动打开可以更有好点：

```bash
# .vimrc
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 0 && !exists("s:std_in") | NERDTree | endif
```

使用这里的配置替代上面的 `autocmd vimenter * NERDTree` 就可以只在使用 Vim 且没有指定文件时自动打开。

另外，如果左边只剩下目录树时，使用 `q` 关闭时还是会剩下一个窗口，当然你可以使用 `qa` 来进行关闭，或者是做一下额外的配置：

```bash
# .vimrc
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
```

最后，需要说明的是默认情况下不会显示以点开头的文件，需要的话，可以使用快捷键 I 进行切换。

## 常用快捷键

```bash
ctrl + w + h # 光标 focus 左侧树形目录
ctrl + w + l # 光标 focus 右侧文件显示窗口
ctrl + w + w # 光标自动在左右侧窗口切换

x # 合拢选中结点的父目录
X # 递归合拢选中结点下的所有目录
o # 在已有窗口中打开文件、目录或书签，并跳到该窗口
t # 在新 Tab 中打开选中文件/书签，并跳到新 Tab
m # 显示更多的操错菜单
u # 以上级目录为根
C # 以当前目录作为根
```

## 操作命令

| 按键 | 说明                                  |
| :--- | :------------------------------------ |
| ?    | 切换快速帮助的显示                    |
| m    | 显示 NERDTree 菜单（ESC 退出）        |
| 树根 |                                       |
| cd   | 将 CWD 更改为所选节点的目录           |
| CD   | 树根更改为 CWD                        |
| u    | 将树根向上移动一个目录                |
| U    | 与 u 相同，但旧的根节点保持打开状态   |
| r    | 递归刷新当前目录                      |
| R    | 递归刷新当前根                        |
| 显示 |                                       |
| I    | 切换是否显示隐藏文件                  |
| F    | 切换是否显示文件                      |
| 节点 |                                       |
| p    | 跳转到当前节点 parent                 |
| P    | 跳转到根节点                          |
| 移动 |                                       |
| j    | 向下移动                              |
| k    | 向上移动                              |
| J    | 在当前树深度的内部目录中向下跳转      |
| K    | 在当前树深度的内部目录中向上跳转      |
| 目录 |                                       |
| o    | 打开文件（当前窗口），目录和书签      |
| O    | 递归打开所选目录                      |
| x    | 关闭当前节点父节点                    |
| X    | 递归关闭当前节点的所有子节点          |
| 文件 |                                       |
| i    | 在拆分（水平）窗口中打开所选文件      |
| gi   | 与 i 相同，但将光标留在 NERDTree 上   |
| s    | 在拆分（垂直）窗口中打开所选文件      |
| gs   | 与 s 相同，但将光标留在 NERDTree 上   |
| t    | 在新选项卡中打开选定的节点/书签       |
| T    | 与 t 相同，但将焦点保持在当前选项卡上 |

## 参考

- [NERDTree 文件资源管理器 — vim8.0 latest 文档](https://vim80.readthedocs.io/zh/latest/plugin/nerdtree.html)
