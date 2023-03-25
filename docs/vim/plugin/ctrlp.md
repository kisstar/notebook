# ctrlp.vim 文件搜索

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
