# Gitbook 初级指南

通常大家在工作和生活中总会要记录一些东西，而做好的笔记最好不会丢失又操作简单，在这样的需求的驱动下我偶然接触到 `Gitbook` 这款工具，在此我对其如何使用作一个简单的记录。

## 概念

**Modern book format and toolchain using Git and Markdown.**

`GitBook` 是一个基于 `Node.js` 的命令行工具，可使用 `Github/Git` 和 `Markdown` 来制作精美的电子书，事实上 `GitBook` 并不是关于 `Git` 的教程，但是结合 `Git` 我们可以对电子书进行有效的版本控制，国内外一些开发者更是通过 `GitBook` 和 `gitalk` 等一些插件创建属于自己的博客系统。

## 作用

`GitBook` 可以制作出精美的电子书，而且支持输出多种文档格式：

* **静态站点**：`GitBook` 默认输出该种格式，生成的静态站点可直接托管搭载 Github Pages 服务上。
* **PDF**：需要安装 `gitbook-pdf` 依赖。
* **eBook**：需要安装 `ebook-convert`。
* **单HTML网页**：支持将内容输出为单页的 `HTML`。
* **JSON**：一般用于电子书的调试或元数据提取。

## 安装 Node.js

因为 `GitBook` 是基于 `Node.js` 的工具，所以我们首先需要安装 `Node.js`（[下载地址](https://nodejs.org/en/download/)），找到对应平台的版本安装即可。
现在安装 `Node.js` 都会默认安装 `npm`（包管理工具），所以我们不用单独安装 `npm`，安装完成通过以下命令检查是否安装成功：

``` bash
node -v
```

以上命令在 `node` 安装成功后会显示 `node` 的版本号。

``` bash
npm -v
```

以上命令在 `npm` 安装成功后会显示 `npm` 的版本号。

## 安装 Gitbook

当上面的工具都安装完成后打开命令行，执行以下命令安装 `GitBook`：

``` bash
npm install -g gitbook-cli
```

检测安装是否成功：

``` bash
gitbook-cli -v
```

以上命令在 `gitbook-cli` 安装成功后会显示 `gitbook-cli` 的版本号。

## 基础使用

创建第一本电子书。

如果将第一本电子书的名字取名 `mybook`，那么创建该电子书的方法有两个，首先你可以创建一个文件夹名为 `mybook` 然后在终端打开该文件夹并执行下面的命令：

``` bash
gitbook init
```

或者你也可以直接在任一目录下打开终端执行以下命令：

``` bash
gitbook init mybook
```

创建好电子书后会在该文件下生成 `README.md` 和 `SUMMARY.md` 两个文件，其中 `README.md` 就是静态网站首页的内容，也就是电子书的封面，而 `SUMMARY.md` 是整个电子书的目录，为了一睹为快我们先执行下面的命令来本地查看以下书籍的样貌：

``` bash
gitbook serve
```

运行该命令后会启动本地服务器，通过 [http://localhost:4000/](http://localhost:4000/) 即可预览书籍，同时在书籍的文件夹中会生成一个 `_book` 文件夹, 里面的内容即为生成的 `html` 文件. 当然我们也可以使用下面命令来生成网页而不开启服务器：

``` bash
gitbook build
```

## 添加新文章

如果我们需要添加文章只需要做两个简单的事情就可以了，首先在你需要存放的位置创建好 `.md` 文件并添加你需要展示的内容，然后在目录文件中添加上你的文章即可。创建文章的事情比较简单，这里主要介绍一下目录文件的书写。

在 `Gitbook` 中默认的目录文件是在初始化书籍时自动生成的 `SUMMARY.md` 文件，当然你可以在 `book.json` 中重新定义它的名字和位置，该文件通过 `Markdown` 语法中的列表书写形式来表示文件的父子关系。下面是一个简单的例子：

```md
# Summary

* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love JavaScript](part2/JavaScript.md)
    * [Better tools for authors](part2/better_tools.md)
```

另外为了更好地体现目录的层次感，我们可以通过使用标题（heading）或者水平分割线（horizontal line）标志将 `GitBook` 分为几个不同的部分：

```md
# Summary

### Part I

* [Writing is nice](part1/writing.md)
* [GitBook is nice](part1/gitbook.md)

### Part II

* [We love JavaScript](part2/JavaScript.md)
* [Better tools for authors](part2/better_tools.md)

----

* [Last part without title](part3/title.md)
```

## 配置

简单的介绍一下 `Gitbook` 的一些配置信息，当然前面我们已经看见了完整的电子书，所以说这些配置并不是必须的，但根据自己的需要可以对其中的配置项进行设置，整个书籍的配置都记录在默认根目录下的 `book.json` 文件中。

* **title**-设置书本的名称。

```json
{
    "title": "<书本的名称>"
}
```

* **author**-作者的相关信息。

```json
{
    "author": "<作者的姓名>"
}
```

* **description**-书本的描述信息。

```json
{
    "description": "<书本的主讲内容>"
}
```

* **language**-`Gitbook` 使用的语言。

在版本 `v3.2.3` 中 `Gitbook` 语言的 [ISO code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)，其默认值为 `en`，配置使用简体中文：

```json
{
    "language": "zh-hans"
}
```

* **gitbook**-指定使用的 `Gitbook` 的版本号。

```json
{
    "gitbook": ">= 3.2.3"
}
```

* **root**-指定存放 `GitBook` 文件（除 `book.json`）的根目录。

```json
{
    "root": "."
}
```

* **links**-在左侧导航添加链接。

```json
{
    "links": {
        "sidebar": {
            "home": "https://anani1994.github.io/blog/#/"
        }
    }
}
```

* **styles**-自定义页面样式， 默认情况下各 `generator` 对应的 `css` 文件。

```json
{
    "styles": {
        "website": "styles/website.css",
        "ebook": "styles/ebook.css",
        "pdf": "styles/pdf.css",
        "mobi": "styles/mobi.css",
        "epub": "styles/epub.css"
    }
}
```

* **structure**-指定 `Readme`、`Summary`、`Glossary` 和 `Languages` 对应的文件名，下面是这几个文件对应变量以及默认值：

| 变量 | 含义和默认值 |
|:----|:----|
|`structure.readme` | `Readme file name (defaults to README.md)` |
|`structure.summary` | `Summary file name (defaults to SUMMARY.md)`|
|`structure.glossary`| `Glossary file name (defaults to GLOSSARY.md)` |
|`structure.languages`| `Languages file name (defaults to LANGS.md)`|

## 插件

基础的 `Gitbook` 已经能够完成一些基本功能，而因其具有良好的拓展性，所以配合一些插件的使用会使得 `Gitbook` 如虎添翼。下面简单的介绍一下如何使用插件并列举一些常用的插件。

在初始化的 `Gitbook` 中其实已经内置了几款插件，写下此文时 `Gitbook` 的版本为 `v3.2.3`，其中内置的插件包括：

* [fontsettings](https://www.npmjs.com/package/gitbook-plugin-fontsettings)
* [highlight](https://www.npmjs.com/package/gitbook-plugin-highlight)
* [livereload](https://www.npmjs.com/package/gitbook-plugin-livereload)
* [lunr](https://www.npmjs.com/package/gitbook-plugin-lunr)
* [search](https://www.npmjs.com/package/gitbook-plugin-search)
* [sharing](https://www.npmjs.com/package/gitbook-plugin-sharing)
* [test](https://www.npmjs.com/package/gitbook-plugin-test)

如果我们需要禁用其中的某个插件时，只需要在 `book.json` 文件中的 `plugin` 字段下进行配置，配置的格式就是减号加上插件的名称，比如这里以禁用代码高亮插件 `highlight` 为例：

```json
{
    "plugins": [
        "-highlight"
    ]
}
```

同理，如果我们需要添加一款插件时也需要在这里申明，不过我们还需要对使用的插件进行安装和配置，这里以安装 `code` 插件为例，首先如前所述在刚才的文件中进行申明，现在不要添加禁用时的减号：

```json
{
    "plugins": [
        "code"
    ]
}
```

然后进行安装，插件的安装的方式有三种：

* 直接使用命令 `gitbook install` 进行安装。
* 通过包管理器 `npm` 或 `yarn` 进行安装(插件包的命名规则为 `gitbook-plugin-` 前缀加上自定义包名，所以以 `code` 插件为例的安装命令为 `npm install gitbook-plugin-code` 或 `yarn add gitbook-plugin-code`)。
* 从源码 `GitHub` 地址中下载，放到 `node_modules` 文件夹里。

最后对该插件进行配置(某些插件不需要配置)，依旧以 `code` 插件为例在 `book.json` 文件中的 `pluginsConfig` 字段下进行配置：

```json
{
    "plugins": [
        "code"
    ],
    "pluginsConfig": {
        "code": {
            "copyButtons": false
        }
    }
}
```

插件可能不会随着 `GitBook` 版本的升级而升级，所以我们需要指定 `Gitbook` 的版本和插件的版本，指定 `Gitbook` 的版本只需要在 `book.json` 文件的 `Gitbook` 字段里进行指定：

```json
{
    "gitbook": "3.2.3"
}
```

如果要指定插件的版本可以在声明插件时带上版本号格式即 `pluginName@<version>`，比如上面的 `code` 插件就可以声明为：

```json
{
    "plugins": [
        "code@0.1.0"
    ]
}
```

这里列举的插件在 `GitBook` 的 `3.2.3` 版本中可以正常工作。另外这里只是列举几款常用的插件，如果有其它的需求，可以参考文末的提供的链接查看更多插件及其使用方法，或者直接到 [插件官网](https://plugins.gitbook.com/) 区搜索相关插件，目前为止已经有七百多款插件。

* [disqus](https://plugins.gitbook.com/plugin/disqus)(评论功能，由于是国外的网站，所以国内的访问速度比较惨淡，国内可以使用 Gitalk 来代替也是一个很好的实现。)
* [code](https://plugins.gitbook.com/plugin/code-postman)(为代码块添加行号和复制按钮，复制按钮可关闭，单行代码无行号。)
* [splitter](https://plugins.gitbook.com/plugin/splitter)(使得侧边栏宽度可调节。)
* [page-copyright](https://plugins.gitbook.com/plugin/page-copyright)(给每个添加页脚包括有二维码、版权信息、文章修改时间等。)
* [anchor-navigation-ex](https://plugins.gitbook.com/plugin/anchor-navigation-ex)(提供添加悬浮目录和返回顶部按钮等功能。)
* [terminal](https://plugins.gitbook.com/plugin/terminal)(模拟终端的显示样式，包括 flat 和 ubuntu 等几种风格。)
* [custom-favicon](https://plugins.gitbook.com/plugin/custom-favicon)(更换网页的图标，另外 favicon 插件也具备同样的功能且更全。)
* [edit-link](https://plugins.gitbook.com/plugin/edit-link)(在页面顶部赋予编辑该页源代码链接的按钮。)

## 参考资料

* [Gitbook](https://www.gitbook.com/)
* [Gitbook Github 地址](https://github.com/GitbookIO/gitbook)
* [GitBook 文档](https://help.gitbook.com/)
* [Gitbook 工具链文档](https://toolchain.gitbook.com/)
* [编辑工具](https://legacy.gitbook.com/editor)
* [官方插件](https://plugins.gitbook.com/)
* [GitBook 插件整理](https://www.jianshu.com/p/427b8bb066e6)(网络文章，收集大部分常用插件并给出了大部分插件的使用方式)
* [Gitbook 使用教程](http://gitbook.zhangjikai.com/)(网络教程，完整介绍从安装到配置以及插件等的使用)
