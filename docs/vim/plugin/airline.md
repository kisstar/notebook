# vim-airline 状态栏美化

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

在 Vim 的配置文件中启用 Powerline fonts 字体：

```bash
# .vimrc
let g:airline_powerline_fonts = 1
```

最后，修改终端配置中使用的字体为 `xxx for Powerline`，完成后就可以看到效果啦。

## 标签美化

默认情况下，插件关闭了对 Tab 标签的美化，如果需要的话也可以开启：

```bash
# .vimrc
let g:airline#extensions#tabline#enabled = 1
```

## 模式冲突

另外，使用该插件之后之后加上 Vim 本身会显示当前模式，两者会有重复，我们可以关闭默认的：

```bash
# .vimrc
set noshowmode
```

## 在 Tmux 中

如果你在使用 Tmux 的话，你还需要通过 TERM 环境变量来告诉其正确检测 256 种颜色：

```bash
export TERM=screen-256color
```

更多可查看回答 <https://stackoverflow.com/a/35086011>
