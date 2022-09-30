# 启动

接着需要在当前项目中的 package.json 文件内添加一段脚本：

```json
{
  "scripts": {
    "dev": "electron ./index.js"
  }
}
```

在这个项目的根目录下创建一个名为 index.js 的 JavaScript 文件，并录入如下代码：

```js
const { app, BrowserWindow } = require('electron')

let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })
  win.loadURL('https:// www.baidu.com')
})
```

在项目根目录下开启一个命令行工具，使用如下指令并可启动 Electron 应用：

```bash
npm run dev
```

这是因为在 Electron 依赖包安装完成时，Npm 除了会检查钩子脚本外，还会检查 Electron 依赖包内 package.json 文件中是否配置了 bin 指令，Electron 依赖包配置了这个指令：

```json
{
  "bin": {
    "electron": "cli.js"
  }
}
```

所以 Npm 会自动在项目的 `node_modules/.bin` 目录下注入不同系统的命令文件，当开发者执行上述指令时，Npm 会自动新建一个命令环境，然后把当前项目下的 `node_modules/.bin` 目录加入到这个命令环境的环境变量中。

接着再执行 scripts 配置节点 dev 指定的脚本内容（执行完成后，再把 `node_modules/.bin` 从这个环境变量中删除），实际也就是相当于执行：

```bash
node /node_modules/electron/cli.js ./index.js
```

在 `cli.js` 文件中最重要的逻辑代码如下：

```js
var proc = require('child_process')
var child = proc.spawn(electronExePath, process.argv.slice(2), {
  stdio: 'inherit',
  windowsHide: false,
})
```

此段代码使用 Node.js 的 child_process 对象创建了一个子进程，让子进程执行 Electron 的可执行文件，并把当前进程的命令行参数传递给了这个子进程。
