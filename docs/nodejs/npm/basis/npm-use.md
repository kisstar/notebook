# 尝新

`npm` 是 `JavaScript` 世界的包管理工具，并且是 `Node.js` 平台的默认包管理工具。通过 `npm` 可以安装、共享、分发代码,管理项目依赖关系。

## 版本信息

查看当前 `npm` 的版本信息，也可以用来检测是否安装成功。

```bash
npm -v
```

## 使用淘宝镜像

国内直接使用 `npm` 的官方镜像是非常慢的，这里推荐使用淘宝NPM镜像。

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

往后使用 `cnpm` 代替 `npm`，体验飞一般的速度，或者你也可以使用 [nrm](https://github.com/Pana/nrm)。

## 初始化包

`npm init` 用来初始化生成一个新的 `package.json` 文件。它会向用户提问一系列问题，如果你觉得不用修改默认配置，可以一路回车。

如果使用了 `-f`（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的 `package.json` 文件，后续你也可以随时直接更改该文件。

```bash
npm init -y
```

## 打开包主页

执行 `home` 命令会打开 `<packageName>` 的主页。

```bash
npm home <packageName>
```

例如，如果指定 `<packageName>` 为 `lodash`，那么就就会打开 `Lodash` 官网。没有安装（全局/某个项目） `package` 不影响该命令的使用。

```bash
npm home lodash
```

## 打开包仓库

类似上面的 `home` 命令， `repo` 命令会打开 `<packageName>` 的 `Github` 仓库。同样，不需要安装对应的 `package` 就能使用。

```bash
# 如打开 Express 的官方仓库地址。
npm repo express
```

## 查看包信息

`npm info` 命令可以查看每个模块的具体信息。

```bash
npm info <packageName>
```

比如，查看 `lodash` 模块的信息。

```bash
npm info lodash
```

你也可以直接获取具体想要的信息，比如：

```bash
npm info lodash [homepage | version | description]
```

## 查找包

`npm search` 命令用于搜索 `npm` 仓库，它后面可以跟字符串，也可以跟正则表达式。

```bash
npm search <Reg | String>
```

## 安装包

* 安装的方式通常分为全局安装和局部安装，比如现在需要安装 `lodash`：

```bash
# 不加任何参数会根据项目下的 package.json 文件中定义的依赖进行安装
npm install
# 局部安装
npm install lodash
# 全局安装
npm install -global lodash
npm intall -g lodah # 使用 -global 简写模式 -g
```

* 除了指定包名外，还可以直接输入 `Github` 代码库地址。

```bash
npm install https://github.com/lodash/lodash
```

安装之前，`npm install` 会先检查，`node_modules` 目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。

* 如果你希望，一个模块不管是否安装过，`npm` 都要强制重新安装，可以使用 `-f` 或 `--force` 参数。

* 另外，使用 `npm install` 总会安装最新的版本，如果你需呀安装特定的版本则需要在后面进行指定。

```bash
npm install <packageName>@[version]
npm install <packageName>@[tag]
```

* 对于一个项目所需要的依赖，一般分为开发环境的依赖和生产环境的依赖。在安装模块时，可以根据依赖所处分类而写入 `package.json` 文件中的不同字段中。

当我们在安装模块时使用 `--save` 参数时，将模块安装到项目目录下，并在 `package.json` 文件的 `dependencies` 字段写入依赖，而使用 `--save-dev` 的意思是将模块安装到项目目录下，并在 `package.json` 文件的 `devDependencies` 字段写入依赖，运行 `npm install --production` 或者注明NODE_ENV变量值为 `production` 时，不会自动下载模块到 `node_modules` 目录中。

简单而言，`devDependencies` 节点下的模块是我们在开发时需要用的，比如项目中压缩`CSS`、`JavaScript`的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 `--save-dev` 的形式安装。像 `express` 这些模块是项目运行必备的，应该安装在 `dependencies` 节点下，所以我们应该使用 `--save` 的形式安装。

```bash
npm install webpack --save-dev
npm install express --save
```

## 升级已安装的包

我们可以使用以下命令更新模块：

```bash
# 升级到最新版本
npm update lodash
# 升级到指定版本
npm update lodash@3.10.1
```

## 查看已安装的包

`npm list` 命令以树形结构列出当前项目安装的所有模块，以及它们依赖的模块。如果加上 `global` 参数，会列出全局安装的模块，通常这样直接列出的树形结构比较庞大，我们可以通过 `--depth` 指定显示的层级。

```bash
# 查看所有已安装
npm list
# 查看某个已安装的模块
npm list <packageName>
# 查看所有全局安装
npm list -g
# 指定层级
npm list -g --depth=0
```

## 移除包

我们可以使用以下命令来卸载已安装的模块。

```bash
# npm uninstall 使用 npm install 相同的 flag
npm uninstall lodash
```

## 检查包的过时依赖

在项目中，运行 `outdated` 命令会通过 `npm registry` 检查是否有过时的 `package`，并在命令行中打印出当前版本、所需版本以及最新版本。

```bash
npm outdated
```

## 检查 package.json 中未声明的包

运行 `prune` 命令，`npm CLI` 会读取 `package.json`，并将结果与项目的 `/node_modules` 目录进行对比，并打印出不在 `package.json` 之列的模块列表。

```bash
npm prune
```

`npm prune` 命令接着会拿出这些 `package`，并移除那些没有手动加到 `package.json` 中或没有使用 `--save` 标志安装的 `package`。

## 锁定依赖版本

在项目中使用 `shrinkwrap` 命令，会生成一个 `npm-shrinkwrap.json` 文件，将项目依赖锁定在当前在 `node_modules` 中使用的特定版本。

运行 `npm install` 时，若发现存在 `npm-shrinkwrap.json`，则会覆盖列出的依赖以及 `package.json` 中的任何语义版本范围。

```bash
npm shrinkwrap
```

它的功能就像是 `yarn.lock` 一样，如果你在使用 `yarn`，那么它是默认就会生成的。

## 运行脚本

`npm` 不仅可以用于模块管理，还可以用于执行脚本。`package.json` 文件有一个 `scripts` 字段，可以用于指定脚本命令，供 `npm` 直接调用。

```json
{
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

`npm run` 是 `npm run-script` 的缩写，一般都使用前者，但是后者可以更好的反应这个命令的本质。当不加任何参数时，会列出 `package.json` 里面所有可以执行的脚本命令。

`npm` 内置了两个命令简写， `npm test` 等同于执行 `npm run test`。

```bash
npm test
```

并且 `npm run` 为每条命令提供了 `pre-` 和 `post-` 两个钩子（hook）。以 `npm run deploy` 为例，执行这条命令之前， `npm` 会先查看有没有定义 `predeploy` 和 `postdeploy` 两个钩子，如果有的话，就会先执行 `npm run predeploy`，然后执行 `npm run deploy`，最后执行 `npm run postdeploy`。

```json
{
    "scripts": {
        "predeploy": "gitbook build",
        "deploy": "gh-pages --dist _book  --dest /  --branch gh-pages --dotfiles=true --add=true"
    },
}
```

## What's Npx

`npx` 想要解决的主要问题，就是调用项目内部安装的模块。比如，如果我们需要调用项目下的 `lessc` 命令，必须像下面这样：

```bash
node-modules/.bin/lessc --version
```

而通过 `npx` 你可以不必全局安装 `less` 就可以直接快速使用：

```bash
npx lessc -v
```

甚至，我们都不需要安装 `less`，它的安装也比较简单。

```bash
npm install -g npx
```

你可以点击 [npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html) 查看更多信息。

## 参考资料

* [npm](https://www.npmjs.com/)
* [让人倾倒的 11 个 npm trick](https://www.zcfy.cc/article/1206)
* [NPM 学习笔记整理](https://segmentfault.com/p/1210000009653830/read)
* [NPM install -save 和 -save-dev 傻傻分不清](https://www.limitcode.com/detail/59a15b1a69e95702e0780249.html)
* [npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)
* [11 Simple npm Tricks That Will Knock Your Wombat Socks Off](https://nodesource.com/blog/eleven-npm-tricks-that-will-knock-your-wombat-socks-off/)
