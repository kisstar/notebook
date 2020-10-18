# 渐进式 Web 应用

PWA（Progressive web apps，渐进式 Web 应用）运用现代的 Web API 以及传统的渐进式增强策略来创建跨平台 Web 应用程序。

渐进式 Web 应用同时赋予它们 Web 应用和原生应用的特性：

- 易于发现——相比于安装应用，访问一个网站显然更加容易和迅速，并且你可以通过一个链接来分享 Web 应用。
- 另一方面，与操作系统可以更加完美的整合。可以通过点击主页上的图标来进行访问，并且在离线的状态下也可以运行。

如何区分一个应用是 Web 应用还是 PWA 应用？后者应该具有以下特点：

- Discoverable, 内容可以通过搜索引擎发现。
- Installable, 可以出现在设备的主屏幕。
- Linkable, 你可以简单地通过一个 URL 来分享它。
- Network independent, 它可以在离线状态或者是在网速很差的情况下运行。
- Progressive, 它在老版本的浏览器仍旧可以使用，在新版本的浏览器上可以使用全部功能。
- Re-engageable, 无论何时有新的内容它都可以发送通知。
- Responsive, 它在任何具有屏幕和浏览器的设备上可以正常使用——包括手机，平板电脑，笔记本，电视等。
- Safe, 在你和应用之间的连接是安全的，可以阻止第三方访问你的敏感数据。

## Service workers

PWA 所需的关键要素是 [Service Workers][service_worker_api] 支持。

Service Workers 是浏览器和网络之间的虚拟代理，运行在一个与我们页面的 JavaScript 主线程独立的线程上，并且没有对 DOM 结构的任何访问权限。

与传统 Web 编程方法不同 - Service Workers 提供的 API 是非阻塞的，并且可以在不同的上下文之间发送和接收信息。

您可分配给 Service Worker 一些任务，并在使用基于 Promise 的方法当任务完成时收到结果。

最值得注意的是解决了如何正确缓存网站资源并使其在用户设备离线时可用。

当然，它们不仅仅提供离线功能，还提供包括处理通知，在单独的线程上执行繁重的计算等。

实际上，Service workers 非常强大，因为他们可以控制网络请求，修改网络请求，返回缓存的自定义响应，或合成响应。

由于功能非常强大，所以为了安全，它们只能在安全的上下文中执行（即 HTTPS ）。

### 注册

如果浏览器支持 service worker API，则可以使用 ServiceWorkerContainer.register() 方法对该站点进行注册。

```html
<body>
  <script src="./app.js"></script>
</body>
```

```javascript
// app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwa-examples/js13kpwa/sw.js')
}
```

`register` 方法的第二个参数是选填的，可以被用来指定你想让 service worker 控制的内容的子目录。

以上是 `app.js` 文件中唯一的 Service Worker 代码，其他关于 Service Worker 的内容都写在 `sw.js` 文件中。

### 生命周期

注册完成后，`sw.js` 文件会自动下载，然后安装，最后激活。

#### install

针对安装可以添加相应的事件监听器，也就是 `install` 事件：

```javascript
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install')
})
```

其事件对象上存在一个 `waitUntil` 方法，它将安装的 `worker` 保持在 `installing` 阶段，直到传递的 Promise 被成功地 `resolve`。

通常，该方法会结合特定的行为来进行使用。比如当前面的代码已经在运行时，我们再次更改 `sw.js` 文件，新的内容并不会被立即激活，而是处于 `waiting` 状态。

此时我们可以通过调用 ServiceWorkerGlobalScope.skipWaiting() 方法来进行激活：

```javascript
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install')
  e.waitUntil(self.skipWaiting())
})
```

接着，再次改变其中的内容，新的内容将会被自动激活。

#### activate

还有一个 `activate` 事件，它的用法跟 `install` 事件相同。这个事件通常用来删除那些我们已经不需要的文件或者做一些清理工作。

```javascript
self.addEventListener('activate', function(e) {
  console.log('[Service Worker] Activate')
})
```

另外，其事件对象上也存在一个 `waitUntil` 方法，它延迟将 `active worker` 变到已激活阶段，直到传递的 Promise 被成功地 `resolve`。

默认情况下，页面在首次加载并不受 Service Worker 控制，而通过 ServiceWorkerGlobalScope.clients.claim() 则可以改变这一点：

```javascript
self.addEventListener('activate', function(e) {
  console.log('[Service Worker] Activate')
  self.clients.claim()
})
```

#### fetch

每次当我们的应用发起一个 HTTP 请求时，我们还有一个 `fetch` 事件可以使用。它允许我们拦截请求并对请求作出自定义的响应。

```javascript
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetched resource ' + e.request.url)
})
```

请求的响应可以是任何我们想要的东西：请求过的文件缓存下来的副本，或者一段做了具体操作的 JavaScript 代码，拥有无限的可能。

## 优点

- 减少应用安装后的加载时间, 由 Service Workers 来进行缓存, 以此来节省带宽和时间。
- 当应用有可用的更新时，可以仅仅去更新发生改变的那部分内容。与之相反，对于一个原生应用而言，即便是最微小的改动也需要强制用户去再次下载整个应用。
- 外观和使用感受与原生平台更加融为一体——应用图标被放置在主屏幕上，应用可以全屏运行等。
- 凭借系统通知和推送消息与用户保持连接，对用户产生更多的吸引力，并且提高转换效率。

## 参考

- [Introduction to progressive web apps - Progressive web apps (PWAs) | MDN](https://developer.mozilla.org/Apps/Progressive/Advantages)

[discoverable]: https://developer.mozilla.org/en-US/Apps/Progressive/Advantages#Discoverable
[installable]: https://developer.mozilla.org/en-US/Apps/Progressive/Advantages#Installable
[service_worker_api]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
