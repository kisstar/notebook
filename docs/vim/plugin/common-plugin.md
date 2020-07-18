# 常用插件

- [vim-airline/vim-airline](https://github.com/vim-airline/vim-airline)
- [vim-airline-themes](https://github.com/vim-airline/vim-airline-themes)
- [ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim)
- [scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)
- [mattn/emmet-vim](https://github.com/mattn/emmet-vim)
- [tpope/vim-surround](https://github.com/tpope/vim-surround)
- [tpope/vim-repeat](https://github.com/tpope/vim-repeat)
- [terryma/vim-multiple-curstomtom/tcomment_vim](https://github.com/terryma/vim-multiple-curstomtom/tcomment_vim)
- [MarcWeber/vim-addon-mw-utils](https://github.com/MarcWeber/vim-addon-mw-utils)
- [tomtom/tlib_vim](https://github.com/tomtom/tlib_vim)
- [garbas/vim-snipmate](https://github.com/garbas/vim-snipmate)
- [honza/vim-snippets](https://github.com/honza/vim-snippets)
- [majutsushi/tagbar](https://github.com/majutsushi/tagbar)
- [mileszs/ack.vim](https://github.com/mileszs/ack.vim)
- [airblade/vim-gitgutter](https://github.com/airblade/vim-gitgutter)

## vim-plug

[VimPlug][vim_plug] 是一个 Vim 插件管理器，利用异步并行的方式可以快速地安装、更新和卸载插件。

安装：

```bash
# 下载核心文件放置到 .vim/autoload 目录下
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

使用：

```bash
# 在 .vimrc 文件中配置需要安装的插件
call plug#begin('~/.vim/plugged')
  " Shorthand notation; fetches https://github.com/junegunn/vim-easy-align
  Plug 'junegunn/vim-easy-align'
call plug#end()
```

最后执行 `:PlugInstall` 安装列出的所有插件，更多方式可以参考官方说明。

## vim-airline

`vim-airline` 是一款状态栏美化插件。

默认的样式是比较简单，如果需要更美观的样式需要下载字体 Powerline fonts 进行配置：

```bash
# clone
git clone https://github.com/powerline/fonts.git --depth=1
# install
cd fonts
./install.sh
# clean-up a bit
cd ..
rm -rf fonts
```

启用：

```bash
# .vimrc
let g:airline_powerline_fonts = 1
```

最后，修改终端配置中使用的字体为 `xxx for Powerline`，完成后就可以看到效果啦。

默认情况下，插件关闭了对 Tab 标签的美化，如果需要的话也可以开启：

```bash
# .vimrc
let g:airline#extensions#tabline#enabled = 1
```

另外，使用该插件之后之后加上 Vim 本身会显示当前模式，两者会有重复，我们可以关闭默认的：

```bash
# .vimrc
set noshowmode
```

## nerdtree

NERDTree 可以列出当前路径的目录树。

默认的可以使用 `:NERDTreeToggle` 指令来打开和关闭目录树，为了方面你可以设置自己喜欢的按键映射：

```bash
# .vimrc
map <C-n> :NERDTreeToggle<CR>
```

常用配置：

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

常用快捷键：

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

有个问题时，如果左边只剩下目录树时，使用 `q` 关闭时还是会剩下一个窗口，当然你可以使用 `qa` 来进行关闭，或者是做一下额外的配置：

```bash
# .vimrc
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif
```

最后，需要说明的是默认情况下不会显示以点开头的文件，需要的话，可以使用快捷键 I 进行切换。

## ctrlp.vim

`ctrlp.vim` 可以模糊搜索文件。

进入搜索模式：

```bash
<leader>f   # 模糊搜索最近打开的文件(MRU)
<leader>p   # 模糊搜索当前目录及其子目录下的所有文件
```

操作搜索结果：

```bash
ctrl + j/k  # 进行上下选择
ctrl + x    # 在当前窗口水平分屏打开文件
ctrl + v    # 同上, 垂直分屏
ctrl + t    # 在 Tab 中打开
```

使用 `<Ctrl-d>` 在 路径匹配和文件名匹配之间切换，通过设置 `let g:ctrlp_by_filename = 1` 来设置默认使用文件名匹配模式进行模糊搜索。

另外，你也可以配置忽略某些文件或目录：

```bash
# .vimrc
" Exclude files and directories
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]\.(git|hg|svn)$|tmp$|node_modules$',
  \ 'file': '\v\.(exe|so|dll)$',
  \ }
```

## vim-surround

快速给词加环绕符号，例如单引号/双引号/括号/成对标签等。

```bash
# 添加(ys=you surround): ysiw"
Hello -> "Hello"

# 添加: csw"
Hello -> "Hello"

# 添加-当前到行尾: ys$"
Hello world -> "Hello world"

# 添加-整行: yss"
Hello world -> "Hello world"

# ySS"
Hello world ->
"
    hello world
"

# 替换: cs"'
"Hello world!" -> 'Hello world!'

# 删除: ds"
"Hello world!" -> Hello world!

# 替换-标签(t=tag): cst"
<a>abc</a>  -> "abc"

cst<html>
<a>abc</a>  -> <html>abc</html>

# 添加-两个词: veeS"
hello world -> "hello world"

# 左符号/右符号 => 带不带空格
cs([
(hello) -> [ hello ]

cs(]
(hello) -> [hello]
```

## vim-repeat

你一定清楚 Vim 中的 `.` 操作，比如使用 `diw` 删除了一个 `word`，可以使用 `.` 自动删除又一个 `word`。

与 `.` 操作类似，但 `vim-repeat` 要强大的多。

## vim-multiple-cursors

提供多行编辑功能。

进入 VISUAL 模式，选择要匹配的范围，然后使用 `Ctrl+n` 继续选择下一个，选择完成后按下 Esc 结束选择，最后进入编辑模式，就是多行编辑了。

编辑完成后按下两次 Esc 回到正常模式。

## Refs

- [Vim 的 NerdTree 插件 - Solomon's 技术专栏 - SegmentFault 思否](https://segmentfault.com/a/1190000015143474)
- [vim 插件: surround & repeat[成对符号编辑]](http://wklken.me/posts/2015/06/13/vim-plugin-surround-repeat.html)

[vim_plug]: https://github.com/junegunn/vim-plug
