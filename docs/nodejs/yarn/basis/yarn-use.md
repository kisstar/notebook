# 尝新

快速、可靠、安全的依赖管理。

## 安装

```bash
npm install -g yarn
```

运行命令来测试 Yarn 是否安装：

```bash
yarn --version
```

## 配置文件

```bash
# 设置配置项 key 为一个确切值 value。
yarn config set <key> <value>
# 回显给定 key 的值
yarn config get <key>
# 删除指定 key
yarn config delete <key>
# 显示当前配置
yarn config list
```

## 显示 yarn bin 目录的位置

`yarn bin` 将打印 `yarn` 将把你的包里可执行文件安装到的目录。

```bash
# 当前安装到的 bin 目录
yarn bin
# 全局 bin 目录
yarn global bin
```

## 在所选工作区中运行所选的 Yarn 命令

指定 Yarn 命令的运行环境。

```bash
yarn workspace <workspace_name> <command>
```

## 缓存

`Yarn` 将每个包存储在你的文件系统-用户目录-全局缓存中。`yarn cache list` 将列出已缓存的每个包。

```bash
# 全局缓存在哪里
yarn cache dir
# 清除全局缓存。 将在下次运行 yarn 或 yarn install 时重新填充
yarn cache clean [<module_name...>]
# 改变 yarn 缓存路径
yarn config set cache-folder <path>
```

## 交互式创建或更新 package.json 文件

`yarn init` 通过交互式会话带你创建一个 `package.json` 文件。 一些默认值比如 `license` 和初始版本可以在 `yarn` 的 `init-*` 配置里找到，你可以对下面的这些默认配置进行更改。

* init-author-name
* init-author-email
* init-author-url
* init-version
* init-license

```bash
# --yes/-y 参数会跳过上面提到的交互式会话，并生成一个基于你的默认值的 package.json 文件
yarn init [--yes | -y]
# -p 参数会直接添加  private: true 到 package.json 文件
yarn init -yp
```

## 添加依赖包

```bash
# 安装您的 dependencies 中的一个或多个包
yarn add <package...>
# 在 devDependencies 里安装一个或多个包
yarn add <package...> [--dev/-D]
# 安装精确版本：yarn add foo@1.2.3 会接受 1.9.1 版，但是 yarn add foo@1.2.3 --exact 只会接受 1.2.3 版
yarn add <package...> [--exact/-E]

# 全局安装包
yarn global add <package...>
```

## 列出已安装包的许可证

运行下面这个命令将按字母顺序列出所有被 `yarn` 或 `yarn install` 安装的包，并且给你每个包关联的许可证（和源代码的 URL）。

```bash
yarn licenses list
```

## 列出已安装的包

默认情况下，所有包和它们的依赖会被显示。

```bash
yarn list
```

要限制依赖的深度，你可以给 `list` 命令添加一个标志 `--depth` 所需的深度，深度层级从零索引开始。

```bash
yarn list --depth=0

# 查看全局安装的
yarn global list -depth=0
```

根据模式标志会筛选出依赖列表。

```bash
yarn list --pattern <pattern>
```

## 检查过时的包依赖

列出包的所有依赖项的版本信息，包括当前已安装的版本、最符合语义版本定义（semver）的版本和最新的可用版本。

```bash
yarn outdated

# 列出一个或多个依赖项的版本信息
yarn outdated lodash
```

## 移除依赖包

当你移除一个包时，它被从所有类型的依赖里移除：`dependencies`、`devDependencies` 等等。

```bash
# yarn remove <package> --<flag> 使用与 yarn install 命令相同的 flag。
yarn remove <package...>

# 移除全局安装的包
yarn global remove <package...>
```

## 升级依赖包

升级包到它们基于规范范围的最新版本。可以选择指定一个或多个包名称。指定包名称时，将只升级这些包。未指定包名称时，将升级所有依赖项。

```bash
# 升级到指定版本
yarn upgrade [[package@version],[package@version]...]
# 升级所有匹配此模式的包
yarn upgrade --pattern <pattern>
```

## 显示一个包的信息

拉取包的信息并返回为树格式，包不必安装到本地。

```bash
# 查看 lodash 包的相关信息
yarn info lodash
# 指定版本的信息
yarn info lodash@3.10.1
# 选择特定字段
yarn info lodash [homepage | version | description]
```

## 运行一个定义好的包脚本

你可以在你的 `package.json` 文件中定义 `scripts`。

```json
{
    "test": "jest"
}
```

如果你已经在你的包里定义了 `scripts`，这个命令会运行指定的 `[script]`。

```bash
yarn run test
```

## 更新 Yarn 到最新版

```bash
yarn self-update
```

## 参考资料

* [Yarn](https://yarnpkg.com/zh-Hans/)
