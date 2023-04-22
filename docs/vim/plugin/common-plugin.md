# 常用插件

Vim 插件允许您根据您的工作流程和偏好扩展 Vim 的功能。

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

## 插件列表

| 通用插件 | 描述 |
| :-- | :-- |
| [scrooloose/nerdtree](https://github.com/scrooloose/nerdtree) | 文件系统资源管理器 |
| [ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim) | 支持完整路径的模糊匹配 |
| [majutsushi/tagbar](https://github.com/majutsushi/tagbar) | 大纲式导航 |
| [mileszs/ack.vim](https://github.com/mileszs/ack.vim) | 在项目里全局搜索某个单词 |
| [airblade/vim-gitgutter](https://github.com/airblade/vim-gitgutter) | 显示 Git 变化 |
| [tpope/vim-surround](https://github.com/tpope/vim-surround) | 提供强大的成对符号更改功能 |
| [jiangmiao/auto-pairs](https://github.com/jiangmiao/auto-pairs) | 插入和删除括号 |
| [voldikss/vim-floaterm](https://github.com/voldikss/vim-floaterm) | 终端管理器 |
| [vim-airline/vim-airline](https://github.com/vim-airline/vim-airline) | 提供更友好的状态栏 |

| TypeScript 开发插件 | 描述 |
| :-- | :-- |
| [pangloss/vim-javascript](https://github.com/pangloss/vim-javascript) | 改进了 Javascript 缩进和语法 |
| [leafgarland/typescript-vim](https://github.com/leafgarland/typescript-vim) | 提供 TypeScript 语法支持 |
| 增强 |  |
| [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim) | 基于 NodeJS 的智能补全插件 |
| `:CocInstall coc-tsserver` | 为 JavaScript 和 TypeScript 提供更丰富的语言功能 |

| 提效插件 | 描述 |
| :-- | :-- |
| [terryma/vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors) | 多游标操作 |
| [tpope/vim-repeat](https://github.com/tpope/vim-repeat) | 扩展用点执行重复操作 |
| [mattn/emmet-vim](https://github.com/mattn/emmet-vim) | 快速书写 HTML 语法的工具 |

<!-- 使用自动补全可安装以下依赖，包括插件本身和所依赖的插件 -->
<!-- 如果需要自定义，则可以在 ~/.vim/snippets/ 目录下添加 *.snippets 文件 -->

| 代码片段插件 | 描述 |
| :-- | :-- |
| `:CocInstall coc-snippets` | Coc.nvim 的代码片段解决方案 |
| [MarcWeber/vim-addon-mw-utils](https://github.com/MarcWeber/vim-addon-mw-utils) |  |
| [tomtom/tlib_vim](https://github.com/tomtom/tlib_vim) |  |
| [garbas/vim-snipmate](https://github.com/garbas/vim-snipmate) |  |
| [honza/vim-snippets](https://github.com/honza/vim-snippets) |  |

| Git 插件                                                            | 描述               |
| :------------------------------------------------------------------ | :----------------- |
| [tpope/vim-fugitive](https://github.com/tpope/vim-fugitive)         | Git 包装器插件     |
| [airblade/vim-gitgutter](https://github.com/airblade/vim-gitgutter) | 侧边栏显示变化状态 |

| 代码格式和规范插件         | 描述         |
| :------------------------- | :----------- |
| `:CocInstall coc-prettier` | 代码格式化   |
| `:CocInstall coc-eslint`   | 代码规范校验 |

| UI 插件                                                                 | 描述                 |
| :---------------------------------------------------------------------- | :------------------- |
| [vim-airline-themes](https://github.com/vim-airline/vim-airline-themes) | vim-airline 的主题集 |
| [dracula/vim](https://github.com/dracula/vim)                           | 深色主题             |

## Refs

- [Vim 的 NerdTree 插件 - Solomon's 技术专栏 - SegmentFault 思否](https://segmentfault.com/a/1190000015143474)
- [vim 插件: surround & repeat[成对符号编辑]](http://wklken.me/posts/2015/06/13/vim-plugin-surround-repeat.html)

[vim_plug]: https://github.com/junegunn/vim-plug
