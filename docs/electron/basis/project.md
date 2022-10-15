# 项目基本配置和流程

对于一个 Electron 项目总有一些几乎总是一致的一些配置或者处理流程，下面针对一些基础的配置和流程机制做一个梳理。

## 在窗口中打开您的页面

在 Electron 中，只有在 app 模块的 `ready` 事件被激发后才能创建浏览器窗口。

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

## 根据窗口时关闭应用或新建窗口

在 Windows 和 Linux 上，关闭所有窗口通常会完全退出一个应用程序。为了实现这一点，你需要监听 app 模块的 `window-all-closed` 事件。

```js
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

但对于 MacOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。为了实现这一特性，监听 app 模块的 `activate` 事件。

```js
app.whenReady().then(() => {
  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()

    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      createWindow()
    }
  })
})
```

## 在 Windows7 上禁用 GPU 加速

在部分 Windows 7 电脑上启用 GPU 加速会造成程序黑屏，所以需要禁用加速。

```js
import { release } from 'os'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()
```

## 防止程序多开

通过 `requestSingleInstanceLock()` 方法获取当前应用程序实例是否成功取得了锁，如果当前进程是应用程序的主要实例，则此方法返回 true，否则我们应该直接退出。

当第二个实例被执行并且调用`requestSingleInstanceLock()` 方法时，在主窗口会触发 `second-instance` 事件，此时应当唤起主窗口。

```js
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
} else {
  app.on('second-instance', (event, argv, cwd) => {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
      } else if (!win.isVisible()) {
        win.show()
      }
      win.focus()
    }
  })
}
```

## 完整代码

```js
import { release } from 'os'
import { app, BrowserWindow } from 'electron'

let win = null // 主窗口
const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('index.html')
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) {
  app.disableHardwareAcceleration()
}

app.whenReady().then(() => {
  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()

    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      createWindow()
    }
  })

  createWindow()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) {
      win.restore()
    } else if (!win.isVisible()) {
      win.show()
    }
    win.focus()
  }
})

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

## 参考

- [Electron | 使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序](https://www.electronjs.org/)
