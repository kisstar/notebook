# 书写友好的提交信息

在书写提交信息时，让其变得人机可读是非常重要的。规范的提交信息对代码 CR 和问题定位等都很有帮助，尤其是在团队协作中，显得更为重要。

## 规范

开源社区已经为我们总结出了一种用于给提交信息增加人机可读含义的规范，其名 [Conventional Commits][conventionalcommits]。

规范中推荐提交消息的结构应如下所示：

```bash
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

其中开头部分表明了本次提交的类型（是添加功能还是修复错误等），范围则描述了修改的影响面，然后是一段简要的描述，更多详细的信息则可以在正文中进行描述。

最后在可选的脚注中还可以添加额外的内容，比如指明是否是一次破坏性变更，关联的任务卡片等。

## 交互式提交

刚开始遵循规范提交信息时，我们对要求可能会比较陌生，不知道存在哪些选项，应该怎样选择，因此提供交互式的提交方式是有必要的。

编写符合提交规范的提交消息的常用交互式工具包是 [commitizen][commitizen]，当你使用它进行提交时系统将提示你需要填写的所有必需提交字段。

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
// package.json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

指定的 `commitizen.path` 将通过 `require.resolve` 加载，同时支持：

- Npm 模块；
- 相对于 `process.cwd()` 包含 `index.js` 文件的目录；
- 相对于 `process.cwd()` 的 `.js` 文件；
- 完整的相对文件名；
- 绝对路径。

更多配置可点击[查看更多][cz-conventional-changelog]。

## 校验

和 ESLint 一样的是，[commitlint][commitlint] 自身只提供了检测的功能和一些最基础的规则。使用者需要根据这些规则配置出自己的规范。

```bash
# Install commitlint cli and conventional config
# @commitlint/config-conventional 规定了遵循上述的 Conventional Commits 规范
yarn add -D @commitlint/cli @commitlint/config-conventional
```

安装完成后需要在配置文件中（`commitlint.config.js` 或 `.commitlintrc.js` 或 `.commitlintrc.json` 或 `.commitlintrc.yml`）或 `package.json` 文件中的 `commitlint` 字段进行配置。

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

同时它也提供了 `@commitlint/prompt-cli` 包以便快速快速编写提交消息，并确保它们符合配置中的提交约定。

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

不过相对而言 `commitizen` 表现更优，支持自定义不同的 Adapter，所以更多时候大家会使用后者。commitlint 官方也基于 cz-conventional-changelog 提供一个名为 @commitlint/cz-commitlint 的 Adapter。

## Git Hooks

有时候我们可能会忘记校验提交信息，因此可以将其自动化，当我们提交时自动校验，`husky` 可以很好的做到这点。

```bash
# 安装包
yarn add -D husky

# 开启 Git hooks
npx husky install
```

为了让其它同学在开发时也能够自动校验，同时在 `package.json` 文件中配置安装后自动启用 Git 挂钩：

```bash
npm pkg set scripts.prepare "husky install"
```

通过 `husky` 我们可以很容易的使用 Git hooks 对我们的提交信息进行校验。

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

对于 Windows 用户，如果在运行 `npx husky add ...` 时看到帮助消息，请尝试 `node node_modules/.bin/husky add ...` 代替。

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

## 总结

以上我们介绍了提交信息的规范，以及怎样才能方便大家进行书写和校验，下面总结了基础配置的命令清单：

```bash
# 支持交互式提交
yarn add -D commitizen @commitlint/cz-commitlint
npm pkg set config.commitizen.path "@commitlint/cz-commitlint"

# 支持规范校验
yarn add -D @commitlint/cli @commitlint/config-conventional
npm pkg set config.commitlint.extends "@commitlint/config-conventional"

# 配合 Git hooks 自动校验
yarn add -D husky
npx husky install
npm pkg set scripts.prepare "husky install"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# CHANGELOG
yarn add -D standard-version
npm pkg set scripts.release "standard-version"
```

注意上面的命令需要在 Node.js 16+ 行运行，不过你也可以根据上面的介绍手动进行安装。

最后书写规范的提交信息很重要，可以帮助大家进行代码 CR 和定位问题，但是否需要进行强制限制可以结合团队情况进行综合考虑，不过还是建议如此。

## Ref

- [Conventional Commits][conventionalcommits]
- [angular.js/CONTRIBUTING.md at master · angular/angular.js][ng_contributing]
- [npm version 常用命令及用法示例][90384398]
- [Cz 工具集使用介绍 - 规范 Git 提交说明 - 掘金][5cc4694a6fb9a03238106eb9]
- [优雅的提交你的 Git Commit Message - 掘金][5afc5242f265da0b7f44bee4]

[conventionalcommits]: https://www.conventionalcommits.org/en/v1.0.0/
[commitizen]: https://github.com/commitizen/cz-cli
[commitlint]: https://github.com/conventional-changelog/commitlint
[ng_contributing]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit
[ng_developers]: https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines
[git_cz]: https://github.com/streamich/git-cz
[conventional_changelog_config_spec]: https://github.com/conventional-changelog/conventional-changelog-config-spec/
[90384398]: https://blog.csdn.net/weixin_40817115/article/details/90384398
[5cc4694a6fb9a03238106eb9]: https://juejin.im/post/5cc4694a6fb9a03238106eb9
[5afc5242f265da0b7f44bee4]: https://juejin.im/post/5afc5242f265da0b7f44bee4
[cz-conventional-changelog]: https://github.com/commitizen/cz-conventional-changelog#configuration
