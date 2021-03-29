# 书写友好的提交信息

在书写提交信息时让其变得人机可读是非常重要的，查找问题可以通过搜索提交信息快速定位相关的提交记录。

## 规范

开源社区已经为我们总结出了一种用于给提交信息增加人机可读含义的规范，其名 [Conventional Commits][conventionalcommits]。

## 交互式提交

刚开始使用时，我们对提交规范可能会比较陌生，不知道存在哪些选项，又或者需要怎样选择，因此实现交互式的提交是有必要的。

`@commitlint/prompt-cli` 包就是这样一个存在，它有助于快速编写提交消息，并确保它们符合配置中的提交约定。

```bash
npm i -D @commitlint/prompt-cli
```

`@commitlint/prompt-cli` 的使用也很简单，安装它并使用它提供的 `commit` 命令进行提交即可。

```json
{
  "scripts": {
    "commit": "commit"
  }
}
```

编写符合中配置的提交约定的提交消息的另一个交互式工具包是 `commitizen`，当你使用它进行提交时系统也将提示你需要填写的所有必需提交字段。

```bash
yarn add -D commitizen
```

它提供了一个 `git-cz` 命令，用于代替 `git commit` 进行提交。

```json
// package.json
{
  "scripts": {
    "commit": "npx git-cz"
  }
}
```

默认情况下它会将 [streamich/git-cz][git_cz] 作为 Adapter 进行询问，你可以通过配置指定你需要的 Adapter，以 [AngularJS's commit message convention][ng_developers] 为例：

```bash
yarn add -D cz-conventional-changelog
```

配置：

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

`commitizen.path` 通过 `require.resolve` 加载，同时支持：

- Npm 模块
- 相对于 `process.cwd()` 包含 `index.js` 文件的目录
- 相对于 `process.cwd()` 的 `.js` 文件
- 完整的相对文件名
- 绝对路径

更多配置可点击[查看更多][cz-conventional-changelog]。

## 校验

和 ESLint 一样的是，`commitlint` 自身只提供了检测的功能和一些最基础的规则。使用者需要根据这些规则配置出自己的规范。

```bash
# Install commitlint cli and conventional config
# @commitlint/config-conventional 规定了遵循上述的 Conventional Commits 规范
yarn add -D @commitlint/cli @commitlint/config-conventional
```

安装完成后需要在配置文件中（`commitlint.config.js` 或 `.commitlintrc.js` 或 `.commitlintrc.json` 或 `.commitlintrc.yml`）或 `package.json` 文件中的 `commitlint` 字段进行配置。

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

## Git Hooks

有时候我们可能会忘记校验提交信息，因此可以将其自动化，当我们提交时自动校验，`husky` 可以很好的做到这点。

```bash
yarn add -D husky
```

通过 `husky` 我们可以很容易的使用 Git hooks 对我们的提交信息进行校验。

```json
// package.json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## CHANGELOG

使用约定式提交的一个好处就是可以自动化生成 CHANGELOG，`standard-version` 常用于完成此项工作。

```bash
yarn add -D standard-version
```

接着在 `package.json` 中配置一个脚本命令：

```json
{
  "scripts": {
    "release": "standard-version"
  }
}
```

当你第一次生成 CHANGELOG 时可以添加 `--first-release` 选项，这将会标记当前版本，而不会改变 `package.json` 文件中的版本字段。

更多命令或选项：

```bash
# 假设你的项目的当前版本是 1.0.0
# 使用 --pre-releases 生成 pre-release 标志
yarn run release --prerelease # 1.0.0 -> 1.0.1-0; one more time: 1.0.1-0 -> 1.0.1-1
# 如果要命名预发行版，可以通过 --prerelease <name> 指定名称
yarn run release --prerelease alpha # 1.0.0 -> 1.0.1-alpha.0
# 通过 --release-as 选项升级指定位的版本号
# 你也可以同时 -prerelease 选项一起使用
yarn run release --release-as major # 1.0.0 -> 2.0.0
yarn run release --release-as minor # 1.0.0 -> 1.1.0
yarn run release --release-as patch # 1.0.0 -> 1.0.1
```

看起来和 `npm version` 的功能很像吧？是的，你完全可以使用 `standard-version` 代替 `npm version` 命令了。

另外，你还可以通过配置文件（.versionrc, .versionrc.json 或 .versionrc.js）对其进行配置，配置规范可以参考[conventional-changelog-config-spec][conventional_changelog_config_spec]。

## 拓展

目前，我们已经知道了如何书写友好的提交信息。进一步，可以了解一下如何自定义这些规则。

### 自定义 Adapter

如果你没有找到合适的 Adapter，那么你可以通过 [cz-customizable][cz-customizable] 来自定义交互时的行为。

```bash
yarn add cz-customizable
```

配置 `commitizen` 使用 `cz-customizable` 插件：

```json
// package.json
{
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
}
```

最后在项目根目录下创建配置文件（.cz-config.js 或 .config/cz-config.js）或在 `package.json` 文件指定配置文件所在：

```json
{
  "config": {
    "cz-customizable": {
      "config": "config/path/to/my/config.js"
    }
  }
}
```

然后就是在你的配置文件中进行具体的配置了，具体可参考[官方介绍][cz-customizable-options]。

### 校验自定义的 Adapter

当我们使用 `cz-customizable` 做了违背 Angular 风格的提交说明时，就需要使用 `commitlint-config-cz` 而不是 `@commitlint/config-conventional` 规则对其进行校验。

```bash
commitlint-config-cz
```

在 `commitlint` 的配置文件中配置：

```js
module.exports = {
  extends: ['cz'],
}
```

## 自定义规则

对于默认支持的规则，你可以在配置文件的 `rules` 字段进行配置。

另外，每个插件可以导出一个包含额外规则的 `rules` 对象，其中 key 为规则的名称、值为校验函数。

```js
module.exports = {
  rules: {
    'dollar-sign': function(parsed, when, value) {
      // rule implementation ...
    },
  },
}
```

通过本地插件的方式可以很方便的添加额外的规则：

```js
// commitlint.config.js
module.exports = {
  rules: {
    'hello-world-rule': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'hello-world-rule': ({ subject }) => {
          const HELLO_WORLD = 'Hello World'
          return [
            subject.includes(HELLO_WORLD),
            `Your subject should contain ${HELLO_WORLD} message`,
          ]
        },
      },
    },
  ],
}
```

更多信息可以参考[官方介绍][reference-plugins]。

## Ref

- [Conventional Commits][conventionalcommits]
- [angular.js/CONTRIBUTING.md at master · angular/angular.js][ng_contributing]
- [npm version 常用命令及用法示例][90384398]
- [Cz 工具集使用介绍 - 规范 Git 提交说明 - 掘金][5cc4694a6fb9a03238106eb9]
- [优雅的提交你的 Git Commit Message - 掘金][5afc5242f265da0b7f44bee4]

[conventionalcommits]: https://www.conventionalcommits.org/en/v1.0.0/
[ng_contributing]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit
[ng_developers]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[git_cz]: https://github.com/streamich/git-cz
[conventional_changelog_config_spec]: https://github.com/conventional-changelog/conventional-changelog-config-spec/
[90384398]: https://blog.csdn.net/weixin_40817115/article/details/90384398
[cz-customizable]: https://github.com/leoforfree/cz-customizable
[cz-customizable-options]: https://github.com/leoforfree/cz-customizable#options
[5cc4694a6fb9a03238106eb9]: https://juejin.im/post/5cc4694a6fb9a03238106eb9
[5afc5242f265da0b7f44bee4]: https://juejin.im/post/5afc5242f265da0b7f44bee4
[reference-plugins]: https://commitlint.js.org/#/reference-plugins
[cz-conventional-changelog]: https://github.com/commitizen/cz-conventional-changelog#configuration
