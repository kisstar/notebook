# NPM 是如何运行命令的

NPM 是随同 `NodeJS` 一起安装的包管理工具，能解决 `NodeJS` 代码部署上的很多问题。

## npm link

`Node` 规定，使用一个模块时，需要将其安装到全局的或项目的 `node_modules` 目录之中。

开发 NPM 模块（假设在家目录下名为：myModule）的时候，有时我们希望可以在本地直接使用，让 `require('myModule')` 会自动加载本机开发中的模块，以方便调试。

解决方法就是在全局的 `node_modules` 目录之中，生成一个符号链接，指向模块的本地目录。

需要做的就是在开发中的模块目录执行下面的命令（NPM 会在全局模块安装的目录内，生成一个符号链接文件，该文件的名字就是 `package.json` 文件中指定的模块名）:

```bash
npm link # /path/to/node_global/node_modules/myModule -> ~/myModule
```

现在我们一个拥有一个全局安装的模块（'myModule'）了。

如果我们要让这个模块安装在项目内，还需要在项目目录内，再次运行 `npm link` 命令，并指定模块名。

```bash
npm link myModule  # $(pwd)/node_modules/myModule -> /path/to/node_global/node_modules/myModule
```

你可以使用更加简洁的语法，直接在项目目录内执行下面的命令：

```bash
npm link ~/myModule
```

- 在包文件夹中的执行 `npm link` 将在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个链接到该包的符号链接。
- 在其他位置，`npm link package-name` 将创建从全局安装的 `package-name` 到当前文件夹的 `node_modules` 的符号链接。

**注意**：链接应该指向包名，而不是该包的目录名。

## package.json bin

在 NPM 中许多包都建有了一个或多个可执行文件，它们希望在安装时被添加到 PATH 中从而能够执行，为此 NPM 在 `package.json` 文件中提供了 `bin` 字段，使得这实现起来非常容易。

该字段实际上指定的是命令名到本地文件名的映射。在安装时，NPM 会将文件链接到 `${prefix}/bin`（对于全局安装）或 `./node_modules/.bin/`（对于本地安装）目录。

对于单个可执行文件你可以按照下面的格式配置：

```json
{
  "name": "my-program",
  "bin": "./path/to/program.js"
}
```

而对于多个执行文件，则可以写成对象的形式：

```json
{
  "name": "my-module",
  "bin": { "my-program": "./path/to/program.js" }
}
```

这样在包（'my-module'）局部安装时，将创建从 `program.js` 脚本到 `./node_modules/.bin/my-program` 的符号链接。

但是我们在本地开发，怎么才能直接执行自定义的命令呢？

其中一种解决方式就是结合上面介绍的 `npm link` 命令。在包内执行 `npm link` 时，相当于将包安装到了全局，所以除了上面说的功能外，它还会将把包中 `bin` 字段申明的内容链接到 `{prefix}/bin/{name}`，这和我们上面描述的刚好吻合。

## npx

<!-- 可是现在这样运行的话我们又创建了全局的包，有没有办法避开呢？ -->

NPM 从 `v5.2` 版开始，增加了 `npx` 命令，用来调用项目内部安装的模块。它的原理很简单，就是在运行的时候，会到 `node_modules/.bin` 路径和环境变量 \$PATH 里面，检查命令是否存在。

使用 `npx` 的一大好处就是能够避免全局安装的模块，甚至我们都不需要安装它（保留）。当你使用 `npx` 紧跟着一个模块名时，如果本地不存在就会将模块下载到一个临时目录，使用以后再删除掉。

另外，你可以指定 `--no-install` 参数，强制使用本地的模块。如果本地不存在该模块，就会报错。与之相反的是 `--ignore-existing` 参数。

<!--
在本例中，你可以执行下面的命令来运行你的脚本：

```bash
$ npx --no-install my-program
```
-->

## package.json scripts

在 `package.json` 文件中还提供了一个常用且强大的字段 `scripts`，使用 `scripts` 字段可以自定义脚本命令。

NPM 脚本的原理非常简单。每当执行 `npm run`，就会自动新建一个 Shell，在这个 `Shell` 里面执行指定的脚本命令。因此，只要是 `Shell`（一般是 Bash）可以运行的命令，就可以写在 NPM 脚本里面。

比较特别的是，`npm run` 新建的这个 `Shell`，会将当前目录的 `node_modules/.bin` 子目录加入 PATH 变量，执行结束后，再将 PATH 变量恢复原样。

这意味着，当前目录的 `node_modules/.bin` 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。

## refs

- [npm-package.json | npm Documentation](https://docs.npmjs.com/files/package.json)
- [package.json 文件 -- JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
- [npm-link | npm Documentation](https://docs.npmjs.com/cli/link.html)
- [npm 模块管理器 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/npm.html)
- [npm scripts 使用指南 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)
- [npx 使用教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [package.json 里的一些属性讲解 - 知乎](https://zhuanlan.zhihu.com/p/33928507)
- [npm package.json 属性详解 - 桃子夭夭 - 博客园](https://www.cnblogs.com/tzyy/p/5193811.html)
- [2018 年了，你还是只会 npm install 吗？ - 掘金](https://juejin.im/post/5ab3f77df265da2392364341)
- [Shell 特殊变量：Shell $0, $#, $*, $@, $?, $\$和命令行参数\_C 语言中文网](http://c.biancheng.net/cpp/view/2739.html)
