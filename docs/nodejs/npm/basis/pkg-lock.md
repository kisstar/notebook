# package-lock.json

对于 `npm install` 而言，它的输入是 `package.json`，输出则是一棵 `node_modules` 树。

理想情况下，`npm install` 应该像纯函数一样工作，对于同一个 `package.json` 总是生成完全相同的 `node_modules` 树。

在某些情况下，确实如此。但在其他很多情况中，`npm` 无法做到这一点。有以下原因：

- 不同版本的 `npm` 的安装算法不同。
- 某些依赖项自上次安装以来，可能已发布了新版本，因此将根据 `package.json` 中的 `semver-range version` 更新依赖。
- 某个依赖项的依赖项可能已发布新版本，即使您使用了固定依赖项说明符（1.2.3 而不是 ^1.2.3），它也会更新。

## 工作机制

如果只有一个 `package.json` 文件，运行 `npm i` 会根据它生成一个 `package-lock.json` 文件。

如果某个依赖项在 `package.json` 中，但是不在 `package-lock.json` 中，运行 `npm install` 会将这个依赖项的确定版本更新到 `package-lock.json` 中。

如果 `package.json` 的 `semver-range version` 和 `package-lock.json` 中版本兼容，即使此时 `package.json` 中有新的版本，执行 `npm i` 也还是会根据 `package-lock.json` 下载。

如果手动修改了 `package.json` 的 `version ranges`，且和 `package-lock.json` 中版本不兼容，那么执行 `npm i` 时 `package-lock.json` 将会更新到兼容 `package.json` 的版本。

## 参考

- [npm install package-lock.json 的更新策略 - 掘金](https://juejin.im/post/5d40f9a4e51d45620821ce30)
