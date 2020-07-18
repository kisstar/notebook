# npmrc

Npmrc 是 Npm 的配置文件。通过 `npm config` 命令可以更新和编辑用户或全局 `npmrc` 文件的内容。

Npm 运行时将会从命令行、环境变量和配置文件获取其配置。

## 配置文件

四个相关文件是：

- 每个项目单独的配置文件 (/path/to/my/project/.npmrc)
- 每个用户单独的配置文件 (~/.npmrc)
- 全局的配置文件 (\$PREFIX/etc/npmrc)
- Npm 内置的配置文件 (/path/to/npm/npmrc)

以上每个文件都会被加载，配置选项按优先级顺序解析。例如，用户配置文件中的设置将覆盖全局文件中的设置。

所有的配置文件都是 `key = value` 格式的列表，可以使用 `${VARIABLE_NAME}` 的方式使用环境变量。例如：

```bash
prefix = ${HOME}/.npm-packages
```

数组值是通过在键名后面添加 “[]” 来指定的。例如：

```bash
key[] = "first value"
key[] = "second value"
```

## 注释

当 `.npmrc` 文件中的行以 `;` 或 `#` 字符开头时，它们被解释为注释。

`.npmrc` 文件由 [npm/ini][npm_ini] 解析，正是它指定了此注释语法。

```bash
# last modified: 01 Jan 2016
; Set a new registry for a scoped package
@myscope:registry=https://mycustomregistry.example.org
```

## 更多描述

在每个项目中工作时，项目根目录（即 node_modules 和 package.json 所在目录)中的 `.npmrc` 文件将设置为特定于此项目的配置值。

::: warning

注意，这只适用于运行 `npm` 时所在项目的根目录，并且在全局模式下（例如运行 `npm install-g` 时）不会读取此文件。

:::

对于 Npm 内置的配置文件，它总是在 Npm 更新时保持一致，是不可更改的。

通过 Npm 附带的 `./configure` 脚本则可以在这里设置字段。这主要是为了让维护人员以和标准一致的方式覆盖默认配置。

## 参考

- [npmrc | npm Documentation](https://docs.npmjs.com/configuring-npm/npmrc.html)

[npm_ini]: https://github.com/npm/ini
