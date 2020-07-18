# 常用命令

Npm 提供了众多方便的命令，这里主要列举一下其中一些常用的命令。

<!-- markdownlint-disable MD026 -->

## npm config

用于更新和编辑用户或全局 `.npmrc` 文件的内容。

格式：

```bash
# 设置 key 的值为 value，value 缺省为 true
npm config set <key> <value> [-g|--global]
# 从配置文件中移除指定 key-value 对
npm config delete <key>
# 用编辑器打开配置文件，使用 --globa 参数可打开全局配置文件
npm config edit
# 打印 key 的值
npm config get <key>
# 显示所有的配置，-l 参数显示默认值，--json 将以 json 格式显示
npm config list [-l] [--json]
```

设置和获取值时可以省略 `config`：

```bash
npm set <key> <value> [-g|--global]
npm get <key>
```

另外，`config` 也可以使用别名 `c` 代替：

```bash
npm c list
```

## npm cache

管理 Npm 的缓存目录。

```bash
# 将指定的包添加到本地缓存
npm cache add <tarball file>
npm cache add <folder>
npm cache add <tarball url>
npm cache add <name>@<version>
# 从缓存文件夹中删除所有数据，从 npm@5 开始，为了保证缓存数据的有效性和完整性，需要加上 --force 参数
npm cache clean [<path>]
aliases: npm cache clear, npm cache rm
# 验证缓存文件夹的内容，回收任何不需要的数据，并验证缓存索引和所有缓存数据的完整性
npm cache verify
```

从 `npm@5` 开始，数据存储在缓存目录下的 `_cacache` 目录中，所有缓存都通过 [pacote][pacote] 模块进行下载和管理，基于 [cacache][cacache] 缓存存储，而不是以模块名直接存放。

另外，所有的缓存数据在插入和提取时都要经过完整性验证，如果损坏要么会触发错误，要么会向 `pacote` 发出信号，说明必须重新提取数据，它将自动执行此操作。

由于上面的校验规则，所以除了回收磁盘空间之外，永远不需要清除缓存，这也是为什么现在清理需要 `--force` 来运行的原因。

目前 Npm 没有提供公开的方法去检查或直接管理此缓存的内容，因此随着你不断安装新的模块，缓存数据也会越来越多，因为 Npm 不会自己删除数据。

## npm init

创建一个 `package.json` 文件。

格式：

```bash
npm init [--force|-f|--yes|-y|--scope]
npm init <@scope> (same as `npx <@scope>/create`)
npm init [<@scope>/]<name> (same as `npx [<@scope>/]create-<name>`)
```

使用 `npm init <initializer>` 可用于设置一个新的或已经存在的包。

此处的 `initializer` 是一个名为 `create-<initializer>` 的 Npm 包，它将由 Npx 安装，然后执行其 `main bin` – 大概是在创建或更新 `package.json` 以及运行任何其他与初始化相关的操作。

```bash
npm init foo # npx create-foo
npm init @usr/foo # npx @usr/create-foo
npm init @usr # npx @usr/create
```

如果省略了 `initializer` 将会回退到默认的初始化行为，它会问你很多问题，然后为你创建一个包含你回答的 `package.json` 文件。

您也可以使用 `-y/--yes` 完全跳过问答，直接创建一个默认的配置文件。如果您传递 `--scope`，它将创建一个作用域包。

如果默认的初始化行为不能满足你的需求，你还可以创建一个 `~/.npm-init.js` 文件来进行定制。在其中当你需要获取用户输入时候，使用 `prompt()` 方法即可：

```js
const desc = prompt('description?', 'A new package...')

module.exports = {
  otherKey: 'value',
  name: prompt(
    'name?',
    process
      .cwd()
      .split('/')
      .pop(),
  ),
  version: prompt('version?', '0.1.0'),
  description: desc,
  main: 'index.js',
}
```

## npm install

安装一个包。何为包：

- a) a folder containing a program described by a package.json file
- b) a gzipped tarball containing (a)
- c) a url that resolves to (b)
- d) a `<name>@<version>` that is published on the registry (see registry) with (c)
- e) a `<name>@<tag>` (see npm dist-tag) that points to (d)
- f) a `<name>` that has a “latest” tag satisfying (e)
- g) a `<git remote url>` that resolves to (a)

格式：

```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <alias>@npm:<name>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

aliases: npm i, npm add
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]
```

此命令会安装指定包及其所依赖的任何包。如果该包具有 `package-locak` 或则 `shrinkwrap` 文件，则依赖项的安装将通过这两个文件进行安装，同时存在时后者优先。

### npm i

运行 `npm install` 不带参数时，将会安装所有的依赖到当前目录下的 `node_modules` 目录中。如果带上 `-g` 或 `--global` 选项，将会把当前包安装为全局包。

默认情况下，在 `package.json` 文件中 `dependencies` 和 `devDependencies` 字段列出的包都会被安装，不过当带上 `--production` 选项（或者环境变量 NODE_ENV 的值为 production）时 `devDependencies` 中的包将不会被安装。

如果你想在环境变量 NODE_ENV 的值为 `production` 时，仍然安装 `devDependencies` 中的包，那么可以使用 `--production=false` 选项。

### npm install [&lt;@scope&gt;/]&lt;name&gt;

在大多数情况下，这将在 `npm registry` 中安装标记为最新版本的模块。

```bash
npm install sax
```

### npm install [&lt;@scope&gt;/]&lt;name&gt;@&lt;tag&gt;

安装指定标记引用的包的版本。如果该包的注册表数据中不存在该标记，则此操作将失败。

```bash
npm install sax@latest
```

### npm install [&lt;@scope&gt;/]&lt;name&gt;@&lt;version&gt;

安装包的指定版本。如果版本尚未发布到注册表，则此操作将失败。

```bash
npm install sax@0.1.1
```

### npm install [&lt;@scope&gt;/]&lt;name&gt;@&lt;version range&gt;

安装与指定版本范围匹配的包版本。

注意，大多数版本范围都必须加引号，以便 `shell` 将其视为单个参数。

```bash
npm install sax@">=0.1.0 <0.2.0"
```

### npm install &lt;folder&gt;

将包作为当前项目中的符号链接安装在目录中，它的依赖项将在链接之前安装。

```bash
npm install path/to/pkg # ln -s path/to/pkg ./node_modules/
```

如果 `<folder>` 位于项目的根目录中，那么它的依赖项可能会像其他类型的依赖项一样被提升到顶层 `node_modules`。

### npm install &lt;tarball file&gt;

安装位于系统上的包。

```bash
npm install ./package.tgz
```

要求：

- 文件必须使用 `.tar`, `.tar.gz`, `or .tgz` 作为扩展名。
- 包内容应该位于 Tarball 中的子文件夹中（通常称为 package/）。Npm 在安装包时会剥离一个目录层（相当于运行 tar x --strip-components=1）。
- 包必须包含 `package.json` 具有名称和版本属性的文件。

### npm install &lt;tarball url&gt;

请求 `tarball url`，然后安装它。

```bash
npm install https://github.com/indexzero/forever/tarball/v0.5.6
```

为了区别其它安装方式，接受的参数必须以 “http://” 或 “https://” 开头。

### npm install &lt;alias&gt;@npm:&lt;name&gt;

以自定义的别名安装一个包。

```bash
npm install ep@npm:express
```

这样在项目中使用时直接只用别名即可：

```js
const app = require('ep')()
```

如此依赖，允许多个版本的同一名称的包并排使用，更方便地导入具有其他长名称的包。

别名仅对项目有效，不会重命名可传递依赖项中的包。并且声明的名称应该遵循[命名约定][pkg_name]。

### npm install &lt;git remote url&gt;

使用 Git 克隆包，对于完成的 URL 将只会尝试该 URL：

`<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]`

其中：

- `protocol` 可是是 `git`, `git+ssh`, `git+http`, `git+https` 或 `git+file` 其中之一
- 如果 `commit-ish` 的格式为 `#semver:<semver>`，`<semver>` 可以是任何有效的 `semver` 范围或精确版本，Npm 将在远程存储库中查找与该范围匹配的任何标记或引用
- 如果提供了 `#<commit ish>`，则将使用它精确地克隆该提交
- 如果未指定 `#<commit ish>` 或 `#semver:<semver>`，则使用存储库的默认分支

例如：

```bash
npm install git+ssh://git@github.com:npm/cli.git#v1.0.27
npm install git+https://isaacs@github.com/npm/cli.git
```

### npm install github:&ltlgithubname&gt;/&ltlgithubrepo&gt;[#&ltlcommit-ish&gt;]

通常尝试克隆 `https://github.com/githubname/githubrepo` 来进行安装。

对于 `#<commit-ish>` 的处理同上，类似的还有：

- `npm install gitlab:<gitlabname>/<gitlabrepo>[#<commit-ish>]`。
- `npm install bitbucket:<bitbucketname>/<bitbucketrepo>[#<commit-ish>]`
- `npm install gist:[<githubname>/]<gistID>[#<commit-ish>|#semver:<semver>]`

## npm ls

以树状结构打印所有已安装软件包版本及其依赖项。

格式：

```bash
npm ls [[<@scope>/]<pkg> ...]

aliases: list, la, ll
```

位置参数是 `name@version-range` 标识符，这将把结果限制为指向 `<name>` 的包的路径。请注意，嵌套包还将显示指向指定包的路径。

| 配置项 | 类型 | 说明 |
| :-- | :-- | :-- |
| global | boolean | 列举全局安装的包和及其依赖 |
| depth | int | 依赖关系树的最大显示深度 |
| prod / production | boolean | 仅显示 `dependencies` 中包的依赖关系树 |
| dev / development | boolean | 仅显示 `devDependencies` 中包的依赖关系树 |
| link | boolean | 仅显示链接的依赖项 |
| json | boolean | 以 JSON 格式显示信息 |
| long | boolean | 显示扩展信息 |
| parseable | boolean | 显示可解析的输出而不是树视图 |
| unicode | boolean | 是否使用 `unicode` 字符表示树结构。将其设置为 `false` 以使用 `all-ansi` 输出 |
| only | "prod" / "production" / "dev" / "development" | 显示指定类型包的依赖关系树，相当于上面两配置项的别名 |

## npm outdated

检查过时的软件包，格式：

```bash
npm outdated [[<@scope>/]<pkg> ...]
```

常用配置项：

| 配置项    | 类型    | 说明                         |
| :-------- | :------ | :--------------------------- |
| global    | boolean | 列举全局安装的包和及其依赖   |
| depth     | int     | 依赖关系树的最大显示深度     |
| long      | boolean | 显示扩展信息                 |
| json      | boolean | 以 JSON 格式显示信息         |
| parseable | boolean | 显示可解析的输出而不是树视图 |

此命令将检查 `registry`，以查看是否有（或特定的）安装的软件包已过期。如果没有老版本的，就没有任何输出。

如果有过期的包，在在输出中：

- **`wanted`** 是满足在 `package.json` 中指定的 `semver` 范围的软件包的最高版本
- **`latest`** 是在 `registry` 中标记为最新的软件包的版本
- **`location`** 是包在依赖关系树中的位置。默认深度为 0
- **`package type`** 当使用 `-l` 是显示包是 `dependency` 还是 `devDependency`。在 `package.json` 中未包含的软件包始终带有标记 `dependencies`
- **`homepage`** 是 `package.json` 中 `homepage` 的值

红色表示有一个新版本符合您的 `semver` 要求，因此您应该立即进行更新，而黄色表示超出您的 `semver` 要求需谨慎处理。

## npm update

将把列出的所有包更新到最新版本（由 **tag** config 指定），并遵守 `semver`。

格式：

```bash
npm update [-g] [<pkg>...]

aliases: up, upgrade
```

它还将安装丢失的软件包。与安装软件包的所有命令一样，使用 `--dev` 标志也将导致 `devDependencies` 也被处理。

如果指定了 `-g` 标志，此命令将更新全局安装的包。

如果未指定包名称，则指定位置（全局或本地）中的所有包都将更新。

截止 `npm@2.6.1`，`npm update` 只会检查顶级软件包。先前版本还会递归检查所有依赖项。要获取旧的行为，可以使用：

```bash
npm --depth 9999 update
```

同时，从 `npm@5.0.0` 起，`npm update` 还在 `package.json` 中将新版本保存为所需的最低依赖关系更新。要获取旧的行为，可以使用：

```bash
npm update --no-save
```

## npm uninstall

移除一个包，格式：

```bash
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional|--no-save]

aliases: remove, rm, r, un, unlink
```

常用选项：

- -S, --save：包将从您的 `dependencies` 中删除
- -D, --save-dev：包将从您的 `devDependencies` 中删除
- -O, --save-optional：包将从您的 `optionalDependencies` 中删除
- --no-save：软件包不会从 `package.json` 文件中删除

带有选项 `-g` 或 `--global` 时是在全局模式下进行的，它将当前软件包上下文作为全局软件包卸载。

此外，如果您有一个 `npm-shrinkwrap.json` 那么它也会被更新。

## 参考

- [npm-config | npm Documentation](https://docs.npmjs.com/cli-commands/config.html)
- [npm-cache | npm Documentation](https://docs.npmjs.com/cli-commands/cache.html)
- [记一次排错经历——npm 缓存浅析 - 掘金](https://juejin.im/post/5c77e05e518825407a32b94b)
- [npm 模块安装机制简介 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)
- [npm-init | npm Documentation](https://docs.npmjs.com/cli-commands/init.html)
- [npm-install | npm Documentation](https://docs.npmjs.com/cli-commands/install.html)
- [npm-ls | npm Documentation](https://docs.npmjs.com/cli-commands/ls.html)
- [npm-outdated | npm Documentation](https://docs.npmjs.com/cli-commands/outdated.html)
- [npm-update | npm Documentation](https://docs.npmjs.com/cli-commands/update.html)
- [npm-uninstall | npm Documentation](https://docs.npmjs.com/cli-commands/uninstall.html)

[pacote]: https://www.npmjs.com/package/pacote
[cacache]: https://www.npmjs.com/package/cacache
[pkg_name]: https://www.npmjs.com/package/validate-npm-package-name#naming-rules
