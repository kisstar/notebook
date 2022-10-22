# 安装

要安装预编译的 Electron 二进制文件，首选方法是在你的应用程序中安装 Electron 作为开发依赖：

```bash
yarn add electron --dev
```

实际安装时经常会遇到如下错误：

```bash
> electron@13.1.0 postinstall D:\test\newelectron\node_modules\electron
> node install.js
 Downloading electron-v13.1.0-win32-x64.zip: [==============================]
 100% ETA: 0.0 seconds
HTTPError: Response code 504 (Gateway Time-out)
 at EventEmitter.<anonymous> (D:\test\node_modules\got\source\as-stream.js:
 35:24)
 at EventEmitter.emit (events.js:210:5)
 at module.exports (D:\test\node_modules\got\source\get-response.js:22:10)
 at ClientRequest.handleResponse (D:\test\node_modules\got\source\request-as-
 event-emitter.js:155:5)
 at Object.onceWrapper (events.js:300:26)
 at ClientRequest.emit (events.js:215:7)
 at ClientRequest.origin.emit (D:\test\node_modules\@szmarczak\http-timer\
 source\index.js:37:11)
 at HTTPParser.parserOnIncomingClient [as onIncoming] (_http_client.js:583:27)
 at HTTPParser.parserOnHeadersComplete (_http_common.js:115:17)
 at Socket.socketOnData (_http_client.js:456:22)
npm WARN newelectron@1.0.0 No description
npm WARN newelectron@1.0.0 No repository f ield.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! electron@13.1.0 postinstall: 'node install.js'
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the electron@13.1.0 postinstall script.
 npm ERR! This is probably not a problem with npm. There is likely additional
 logging output above.
```

如倒数第 6 行所示，该包利用了 Npm 的 `postinstall` 钩子，除了 `postinstall` 钩子外，开发者还可以定义如下这些钩子：

| 名称          | 执行时机            |
| :------------ | :------------------ |
| preinstall    | 包安装之前          |
| postinstall   | 包安装之后          |
| preuninstall  | 包卸载之前          |
| postuninstall | 包卸载之后          |
| poststart     | 当 npm start 执行后 |
| posttest      | 当 npm test 执行后  |

所以在安装完 Electron 依赖包后，还会继续执行 `node install.js` 脚本，该脚本会去 GitHub 仓库中下载 Electron 的可执行文件及其依赖的二进制文件：

```js
const { downloadArtifact } = require('@electron/get')

downloadArtifact({
  version, // 需要下载的 Electron 可执行程序的版本号
  artifactName: 'electron',
  force: process.env.force_no_cache === 'true', // 强制重新下载文件
  cacheRoot: process.env.electron_config_cache,
  // 设置为 Electron 使用远程 SHASUMS256.txt 文件来验证校验和
  checksums: process.env.electron_use_remote_checksums ? undefined : require('./checksums.json'),
  platform, // 操作系统的名称
  arch, // 操作系统的架构：x32 / x64
})
```

上述信息最终会被组装成下载地址，主要分为三部分（每个部分都有其默认值，也有对应的重写该部分值的环境变量）：

```bash
https:// github.com/electron/electron/releases/download/v13.1.6/electron-v13.1.6-win32-x64.zip
# url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME

# 镜像部分（ELECTRON_MIRROR）：https://github.com/electron/electron/releases/download/。
# 版本部分（ELECTRON_CUSTOM_DIR）：v13.1.6。
# 文件部分（ELECTRON_CUSTOM_FILENAME）：electron-v13.1.6-win32-x64.zip
```

下载的可执行文件会被放到通过 `os.tmpdir()` 获取的临时目录下，下载完成后会将下载文件复制到缓存目录中。

默认的缓存目录是通过 `env-paths` 模块获取的，开发者可以通过 `electron_config_cache` 来自定义缓存目录。

所以目前来看，如果我们要解决上面的错误，我们可以通过以下两种方式来解决：

- 通过定义指定 URL 三部分的环境变量来设置下载路径；
- 把相关的资源直接放置到缓存目录中。

`install` 脚本获取到缓存目录下的压缩包后，会执行 `extractFile()` 方法，此方法会把缓存目录下的二进制文件压缩包解压到当前 Electron 依赖包的 dist 目录下：

```bash
[project]\node_modules\electron\dist
```

至此，Electron 依赖包算是安装完成了。
