# package.json

每个项目的根目录下面，一般都有一个 `package.json` 文件，其中定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。

## 重要字段

### name

指定包的名称。

对于一个包而言，名称和版本一起构成一个唯一的标识符。当然，如果你不打算发布包，则“名称”和“版本”字段是可选的。

```json
{
  "name": "pkg-name"
}
```

而对于已经发布的包，你就可以通过包名来进行安装。

```bash
npm install pkg-name
```

指定包名时需要指定一些规则；

- 必须少于或等于 214 个字符（对于限定域的包来说包括 @scope/）。
- 不能以句点（.）或者下划线（.）开头。
- 名字里不能有大写字母。
- 必须只使用 URL 安全的字符。

提示：

- 不要使用和 `Node.js` 核心模块相同的名字。
- 不要在名字里包含 `js` 或者 `node` 单词。
- 短小精悍，让人看到名字就大概了解包的功能，记住它也会被用在 `require()` 调用里。
- 保证名字在 [registry](https://www.npmjs.com/) 里是唯一的。

### version

指定包的版本。

```json
{
  "version": "1.0.0"
}
```

指定的版本号必须可由 [node-semver](https://github.com/isaacs/node-semver) 解析，它作为依赖项与 `npm` 捆绑在一起。你也可以通过 `npm install semver` 命令自己安装使用。

**版本格式**：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号：当你做了不兼容的 API 修改，
- 次版本号：当你做了向下兼容的功能性新增，
- 修订号：当你做了向下兼容的问题修正。

**先行版本**：当要发布大版本或者核心功能时，如果不能保证这个版本的功能 100% 正常就需要发布先行版本。

- **alpha**: 内测版，可能存在较多缺陷，通常只在软件开发者内部交流使用。
- **beta**: 公测版，消除了严重错误，但还是存在少量缺陷。
- **rc**：候选版本，如果不出意外将作为稳定版本发布。

在项目中安装模块时，有时会在模块版本号前面添加相应的前缀，常见的比如：

- **~**：限定主版本号。
- **^**：限定主版本号和次版本号。
- **>=**：高于指定版本号即可。
- **<=**：低于指定版本号即可。
- **v1 - v2**：在 `v1` 到 `v2` 版本之间即可，左右都是闭区间。

前往 [semver](https://docs.npmjs.com/misc/semver) 查看更多关于版本号和范围的信息。

## 信息类字段

### description

指定描述信息。

```json
{
  "description": "Descriptive information"
}
```

描述信息是帮助使用者了解包的功能的字符串，包管理器也会把这个字符串作为搜索关键词。

### keywords

指定包的关键字。

```json
{
  "keywords": ["pkg-name", "demo"]
}
```

关键字是一个字符串数组，当在包管理器里搜索包时很有用。

### license

指定包的许可证，以便让用户了解他们是在什么授权下使用此包，以及此包还有哪些附加限制。

```json
{
  "license": "MIT"
}
```

该字段的值必须是以下之一：

- 如果你使用标准的许可证，需要一个有效地 [SPDX 许可证标识](https://spdx.org/licenses/)。
- 如果你用多种标准许可证，需要有效的 [SPDX 许可证表达式 2.0 语法表达式](https://www.npmjs.com/package/spdx)。
- 如果你使用非标准的许可证，一个 `SEE LICENSE IN <文件名>` 字符串指向你的包里顶级目录的一个 `<文件名>`。
- 如果你不想在任何条款下授权其他人使用你的私有或未公开的包，一个 `UNLICENSED` 字符串。

那么，如何选择开源许可证？

<img :src="$withBase('/images/npm/free_software_licenses.png')" alt="licenses">

## 链接类字段

### homepage

指定包的项目主页或者文档首页。

```json
{
  "homepage": "https://github.com/owner/project#readme"
}
```

### bugs

问题反馈系统的 URL，或者是 `email` 地址之类的链接。用户通过该途径向你反馈问题。

如果你只需提供 URL，可以将“bugs”的值指定为一个简单的字符串：

```json
{
  "bugs": "https://github.com/user/repo/issues"
}
```

或者同时指定两者：

```json
{
  "bugs": {
    "url": "https://github.com/owner/project/issues",
    "email": "project@hostname.com"
  }
}
```

如果指定了 URL 的话，它将会被命令 `npm bugs` 使用。

### repository

指定代码托管的位置。

如果对应的 `Git` 仓库位于 `GitHub` 上，那么 `npm docs` 命令将能够找到它。

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/user/repo.git"
  }
}
```

如果你的 `package.json` 文件不在你项目的根目录下时（比如同时维护多个包），还可以通过添加 `directory` 字段来说明：

```json
{
  "type": "git",
  "url": "https://github.com/facebook/react.git",
  "directory": "packages/react-dom"
}
```

另外，对于在 GitHub、GitHub gist、Bitbucket 或 GitLab 的存储库，也可以使用与 `npm install` 相同的快捷语法。

```bash
"repository": "npm/npm"

"repository": "github:user/repo"
```

## 项目维护类字段

### author

指定作者信息。

你也可以直接指定为一个字符串，电子邮件和 URL 都是可选的：

```json
{
  "author": "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
}
```

或者，它可以是一个带有 “name” 字段和可选的 “url” 和 “email” 的对象。

```json
{
  "name": "Barney Rubble",
  "email": "b@rubble.com",
  "url": "http://barnyrubble.tumblr.com/"
}
```

### contributors

指定贡献者信息。

它的值是一个数组，其中每一项的内容和 `author` 字段的值的格式一致。

```json
{
  "contributors": [
    {
      "name": "Your Friend",
      "email": "friend@example.com",
      "url": "http://friends-website.com"
    }
  ]
}
```

## 文件类信息

### files

指定项目作为依赖项被安装时所包含的文件。

在开发一个项目时，其中可能包含许多测试文件和一些开发时使用的各种配置文件，而这些文件在包发布时往往是不需要的，因此我们可以使用 `.npmignore` 文件来指定应该忽略哪些文件。

`.npmignore` 文件的工作方式和 `.gitignore` 相似。当项目中不存在 `.npmignore` 文件时，则会使用 `.gitignore` 文件代替。

与 `.npmignore` 文件相反，“files” 字段就像一个白名单，指定了哪些文件应该被包含进去。在根目录中，它比 `.npmignore` 文件的优先级更高。

默认的，无论如何设置都将始终包含某些文件：

- package.json
- README
- CHANGES / CHANGELOG / HISTORY
- LICENSE / LICENCE
- NOTICE
- 由 “main” 字段指定的文件

相反地，一些文件则总是被忽略：

- .git
- CVS
- .svn
- .hg
- .lock-wscript
- .wafpickle-N
- .\*.swp
- .DS_Store
- .\_\*
- npm-debug.log
- .npmrc
- node_modules
- config.gypi
- \*.orig
- package-lock.json (use shrinkwrap instead)

### main

指定项目的入口文件。

```json
{
  "main": "index.js"
}
```

假如你的包的名字是 `foo`，当用户安装它后通过 `require("foo")` 来使用时，你指定包的入口文件中通过 `module.exports` 导出的结果将会被返回。

### bin

指定随项目一起被安装的可执行文件。

许多包都需要将一个或多个可执行文件放在环境变量中，通过 `bin` 字段可以很方便的实现这点，其值就是命令和本地文件的映射。

```json
{
  "bin": {
    "command": "./path/to/executable_file"
  }
}
```

当包被全局安装时会 `prefix/bin` 中以命令为名创建脚本文件，而对于本地安装则是创建 `./node_modules/.bin/` 中。当脚本文件被执行时，就是自动的调用 `node` 来执行命令对应的文件。

如果包只有一个命令时，可以简写（命令就是包名）：

```json
{
  "name": "command",
  "bin": "./path/to/executable_file"
}
```

注意：请确保在 “bin” 字段中指定的文件的内容总是以 `#!/usr/bin/env node` 开头，否则将不能正确的被执行。

### directories

当你的包安装时，你可以指定确切的位置来放二进制文件、man pages、文档、例子等。

```json
{
  "directories": {
    "lib": "path/to/lib/",
    "bin": "path/to/bin/",
    "man": "path/to/man/",
    "doc": "path/to/doc/",
    "example": "path/to/example/"
  }
}
```

## 任务类字段

### scripts

指定包含在包的生命周期中不同时间运行的脚本命令。

```json
{
  "scripts": {
    "greeting": "node hello.js"
  }
}
```

在 "scripts" 字段里定义的脚本，可以通过 `yarn run <script>` 命令来执行。

例如，上述 `hello` 脚本可以通过 `yarn run hello` 调用，并执行 `node hello.js`。

有一些特殊的脚本名称。如果定义了 `preinstall` 脚本，它会在包安装前被调用。出于兼容性考虑，`install`、`postinstall` 和 `prepublish` 脚本会在包完成安装后被调用。

参阅 [npm-scripts](https://docs.npmjs.com/misc/scripts) 以了解有关编写包脚本的信息。

### config

配置你的脚本的选项或参数。

```json
{
  "scripts": {
    "test": "node index.js"
  },
  "config": {
    "port": 8080
  }
}
```

例如，在入口文件中包含如下内容：

```JavaScript
console.log(process.env.npm_package_config_port)
```

运行命令 `npm run test` 将会输出 8080。

## 依赖描述类字段

### dependencies

指定你的包的开发版和发布版都需要的依赖。

```json
{
  "dependencies": {
    "foo": "1.0.0 - 2.9999.9999",
    "bar": ">=1.0.2 <2.1.2",
    "baz": ">1.0.2 <=2.3.4",
    "boo": "2.0.1",
    "qux": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
    "asd": "http://asdf.com/asdf.tar.gz",
    "til": "~1.2",
    "elf": "~1.2.3",
    "two": "2.x",
    "thr": "3.3.x",
    "lat": "latest",
    "dyl": "file:../dyl"
  }
}
```

### devDependencies

指定在你的包开发期间需要，但是生产环境不会被安装的包。

```json
{
  "devDependencies": {
    "coffee-script": "~1.6.3"
  }
}
```

### peerDependencies

平行依赖允许你说明你的包和其他包版本的兼容性。

```json
{
  "peerDependencies": {
    "tea": "2.x"
  }
}
```

当别人安装你的包却没有安装版本为 2.x 的 `tea` 时，将会得到警告性的提示。

### bundledDependencies

指定打包依赖，发布你的包时将会一起打包的一个包名数组。

```json
{
  "bundledDependencies": ["renderized", "super-streams"]
}
```

请注意，包名称不包含任何版本，因为该信息是在依赖项中指定的。

### optionalDependencies

指定可选依赖，它们可以用于你的包，但不是必需的。如果可选包没有找到，安装还可以继续。

```json
{
  "bundledDependencies": ["package"]
}
```

## Yarn

### flat

如果你的包只允许给定依赖的一个版本，你想强制和命令行上 `yarn install --flat` 相同的行为，把这个值设为 true。

```json
{
  "flat": true
}
```

请注意，如果你的 `package.json` 包含 `"flat": true` 并且其它包依赖你的包，则其它那些包也需要在它们的 `package.json` 加上 `"flat": true`，或者在命令行上用 `yarn install --flat` 安装。

### resolutions

允许您覆盖特定嵌套依赖项的版本。

```json
{
  "resolutions": {
    "transitive-package-1": "0.0.29",
    "transitive-package-2": "file:./local-forks/transitive-package-2",
    "dependencies-package-1/transitive-package-3": "^2.1.1"
  }
}
```

有关完整规范，请参见 [选择性版本解析 RFC](https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-selective-versions-resolutions.md)。

注意，`yarn install --flat` 命令将会自动在 `package.json` 文件里加入 `resolutions` 字段。

## 系统

### engines

指定使用你的包客户必须使用的版本。

```json
{
  "engines": {
    "node": ">=0.10.3 <0.12"
  }
}
```

对于这里的配置，将会检查 `process.versions`。

### os

指定你的包的操作系统兼容性，它会检查 `process.platform`。

```json
{
  "os": ["darwin", "linux"]
}
```

### cpu

使用这个选项指定你的包将只能在某些 CPU 体系架构上运行，这会检查 `process.arch`。

```json
{
  "cpu": ["x64", "ia32"]
}
```

## 发布

### private

如果你不想你的包发布到包管理器，设置为 true。

```json
{
  "private": true
}
```

这是一种防止意外发布私有存储库的方法。

### publishConfig

```json
{
  "publishConfig": {}
}
```

这些配置值将在你的包发布时使用。比如，你可以给包打标签。

## 参考

- [npm-package.json | npm Documentation](https://docs.npmjs.com/files/package.json)
- [package.json | Yarn](https://classic.yarnpkg.com/zh-Hans/docs/package-json)
- [package.json 文件 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/packagejson.html)
- [如何选择开源许可证？ - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
- [语义化版本 2.0.0 | Semantic Versioning](https://semver.org/lang/zh-CN/)
- [看在上帝的份上，不要使用 .npmignore - 众成翻译](https://www.zcfy.cc/article/for-the-love-of-god-don-t-use-npmignore)
- [82 天突破 1000star，项目团队梳理出软件开源必须注意的 8 个方面 - 宜信技术学院 - SegmentFault 思否](https://segmentfault.com/a/1190000020269384)
