# 定制

通常 Vim 的配置文件会存储在你的家目录下：`$HOME/.vimrc`，不同的系统可能会有所不同。

更多信息可以通过 `:h vimrc` 和 `:h vimfiles` 来查看（h 是 help 的缩写）。

## 配置项

在配置文件注释需要使用 `"`，配置完成后可以使用 `:source ~/.vimrc` 来使其立即生效。

使用 `:set` 可以查看已经配置的内容，`:set all` 则可以看到所有的配置。

| 功能 | 配置 | 备注 |
| :-- | :-- | :-- |
| 显示行号 | `set number` | `number` 可以缩写为 `nu` |
| 与系统共享复制粘贴 | `set clipboard=unnamed` |  |
| 高亮搜索结果 | `set hlsearch` |  |
| 添加游标底线 | `set cursorline` |  |
| 取消 `swap` 暂存机制 | `set noswapfile` |  |
| 输入模式，使用空白替代 Tab，并指定个数 | `set softtabstop=2` |  |
| Normal 模式，缩进的宽度为两个空格 | `set shiftwidth=2` |  |
| 将 Tab 替换为空白 | `set expandtab` | 需要结合 `:retab` 激活重新计算 Tab |
| 总是显示 Tab 标签，默认只有一个标签时，顶部不会显示标签 | `set showtabline=2` |  |
| 水平切割窗格时，打开在下面 | `set splitbelow` |  |
| 垂直切割窗格时，打开在右边 | `set splitright` |  |
| 搜索匹配不区分大小写 | `set ignorecase` |  |
| 开启渐进式搜索 | `set incsearch` |  |
| 开启语法支持 | `syntax on` |  |
| 指定颜色主题 | `colorscheme <theme_name>` | `:colorschme` + `Ctrl + d` 查看可用列表 |
| 显示当前所在行和列 | `set ruler` |  |
| 关闭折行 | `set nowrap` |  |
| 折行时保持单词完整 | `set linebreak` |  |
| 关闭显示当前模式 | `set noshowmode` |  |
| 显示当前进行的指定 | `set showcmd` |  |
| 在临近边界三行的位置开始滚动 | `set scrolloff=3` |  |
| 输入的关键字中存在大写时，智能关闭忽略大小写 | `set smartcase` |  |
| 显示 Tab 和换行 | `set list` |  |

针对不同的文件类型，可以在换行等步骤进行智能的缩进等。

```bash
filetype on
filetype indent on
filetype plugin on
```

另外，使用 `source <path_to_file>` 可以启用指定的文件中的配置。这样可以把配置进行分解，分类放置在不同的文件中。

## Key Map

设置按键映射，可以根据不同的模式进行定制，对应的指令包括 `map`、`nmap`、`imap`、`vmap`。

其中 `map` 可以在 Normal 和 Vistual 模式下同时生效。

使用 `:h key-notation` 可以查看特殊按键在 Vim 中的指代。

比如在 Vistual 模式使用 `Tab` 和 `Shift + Tab` 来进行缩进。

```bash
vmap <Tab> >>
vmap <S-Tab> <<
```

如果你需要将某个按键设置为无行为的话，可以将其映射为 `<Nop>`。

使用 `:map` 可以查看已经指定的映射。

另外，为了避免循环映射的出现，还可使用 `noremap`，同样对应不同的模式提供了 `nmap`、`imap`、`vmap` 指令。

如果你想取消某个映射的话，可以使用 unmap，同样每个模式有对应的指令。比如取消上面的缩进指令：

```bash
vumap <Tab>
vumap <S-Tab>
```

你也可以使用 `:mapclear` 直接一次性取消所有的映射。

## Auto CMD

类似发布订阅机制。指定在某种事件发生时，触发对应的指令。使用 `:h autocmd` 可以查看支持的事件。

比如，只在激活的窗格中显示 `cursorline`：

```bash
autocmd WinEnter * setlocal cursorline
autocmd WinLeave * setlocal nocursorline
```

或则存档时自动清除多余的空格：

```bash
autocmd BufWritePre * :%s/\s\+$//e
```

或则在按下 `F5` 时执行当前文件：

```bash
autocmd BufRead,BufNewFile *.js noremap <F5> :% w !node <Enter>
```

## 配置语法

如果配置语法出现错误，可能会导致整个程序崩溃。因此在可能会出错的地方可以做一些安全措施。

比如将指令放置到 `try catch` 语句中，Vim 也提供了类似的机制。

```bash
try
    colorscheme darkblue
catch
    colorscheme shine
endtry
```

在配置 `autocmd` 时，可以先检查是否支持：

```bash
if executable("node")
    autocmd BufRead,BufNewFile *.js noremap <F5> :% w !node <Enter>
else
    autocmd BufRead,BufNewFile *.js noremap <F5> :echo "you need to install node first!"
endif
```

## 插件

为了对插件进行管理，所以通常会先安装一个插件管理器。

这里使用更加轻量的插件管理器 [vim-plug][vim-plug]，它利用异步并行可以快速地安装、更新和卸载插件。

```bash
# 安装
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

启用则需要在配置文件中添加以下内容：

```bash
# Specify a directory for plugins
call plug#begin('~/.vim/plugged')
# plugins...
# Initialize plugin system
call plug#end()
```

当我们需要安装一个插件时，只需要知道插件在 GitHub 上的地址，然后在上面 `plugins...` 的地方进行指定。

比如安装 Vim Airline：

```bash
# 注意使用单引号
# 你也可以指定完整地址，或则像下面这也简写
Plug 'vim-airline/vim-airline'
```

然后重载 `.vimrc` 文件，执行 `:PlugInstall` 即可。

常用的命令包括：

```bash
:PlugUpgrade # 更新插件本身
:PlugUpdate # 更新所有已安装的插件
:PlugStatus # 查看已安装插件的状态
# 如果希望卸载插件，先在配置文件中注释或者删除对应插件的配置信息，然后再执行以下命令：
:PlugClean
```

## 其它

在 Vim 中可以使用 `.` 来重复上一次的动作，但是这好像并不好控制上一次的动作应该包括哪些。

好在 Vim 提供了类似于录制和重播的功能。当你在 Normal 模式按下 `q` 时，紧接着指定一个 `register` 就可以进行录制模式。

在按下 `q` 来结束录制之前，期间的动作都会被记录。之后，你可以通过按下 `@` 紧接着指定一个 `register` 来重复这个 `register` 记录的动作。

使用 `:reg <register>` 可以查看 `register` 记录的动作。

全局替换也是一个比较常用的功能。

例如我想把 `test1` 都替换为 `test2` 可以使用 `:%s/test1/test2/g` 来完成。将其中的 `g` 指定为 `gc` 则会在每个替换前进行询问。

[vim-plug]: https://github.com/junegunn/vim-plug
[vim-airline]: https://github.com/vim-airline/vim-airline
[vimgolf]: http://www.vimgolf.com/
[kaochenlong_cch]: https://github.com/kaochenlong/cch
