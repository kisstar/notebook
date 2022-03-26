# 跨域

对于前端的同学来说，跨域是一个老生常谈的问题，无论是在面试还是在工作中，总会涉及到跨域的问题。

## 什么是跨域

要了解跨域首先需要知道同源的概念。

那么什么是同源呢？如果两个页面的协议，端口（如果有指定）和域名都相同，则两个页面具有相同的源。

```javascript
document.domain // 打印当前页面的源，默认端口为 80
```

浏览器根据同源设置了同源策略，该策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

那么现在跨域的概念也就很明显了，那就是不同源之间的交互。

## 跨域存在的意义

那么存在即有意义，是什么导致了跨域问题的诞生？

没有同源策略限制的接口请求会发生什么？当你在一个网站登录后，如果设置了 `cookie`，那么登录成功后服务端验证通过后会在响应头加入 `Set-Cookie` 字段，然后下次再发请求的时候，浏览器会自动将 `cookie` 附加在 HTTP 请求的头字段 `Cookie` 中，服务端就能知道这个用户已经登录过。

登录期间，如果你再点击打开另一个网页，那么这个新打开的网页中的脚本就可以向之前登录过的网页的服务器发起请求，相当于登录了你的账号，后果不堪设想。

可能会疑惑的是 `cookie` 是明文的，不一样可以进行操作吗？服务端可以设置 `httpOnly`，使得前端无法操作 `cookie`。

另外，没有同源策略的限制，其它网站可以直接拿到别的网站的 DOM。

```html
<!-- HTML -->
<iframe name="lll" src="www.lll.com"></iframe>
<!-- JavaScript -->
<script>
  // wwww.lIl.com 获取在 www.lll.com 输入的账号和密码
  const iframe = window.frames['lll']
  const username = iframe.document.getElementById('#username').value
  const passworld = iframe.document.getElementById('#passworld').value
  // do some bad things...
</script>
```

因此一些钓鱼网站就可以将其它（比如银行）网页引入自己的不法网站中，获取你输入的账号和密码，然后。。。

## 如何解决跨域

跨域的解决方式有许多种，常见的包括 JSONP、空 `iframe` 加 `form`、CORS 和 Web Sockets 等，接下来就来了解一下这些跨域的正确打开方式。

### 跨源资源共享

CORS（Cross-Origin Resource Sharing，跨源资源共享）就是使用自定义的 HTTP 头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

在发送 GET 或 POST 请求时，需要给它附加一个额外的 `Origin` 头部，其中包含请求页面的源信息（协议、域名和端口），以便服务器根据这个头部信息来决定是否给予响应。

下面是 `Origin` 头部的一个示例：

```javascript
Origin: http://www.anani.net
```

如果服务器认为这个请求可以接受，就在 `Access-Control-Allow-Origin` 头部中回发相同的源信息（如果是公共资源，可以回发 "\*"）。

```javascript
Access-Control-Allow-Origin: http://www.anani.net
```

如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。

- 注意，请求和响应都不包含 `cookie` 信息。
- 不能使用 `setRequestHeader()` 设置自定义头部。
- 调用 `getAllResponseHeaders()` 方法总会返回空字符串。
- 微软在 IE8 中引入了 XDR（XDomainRequest）类型，与 XHR 对象类似，但能实现安全可靠的跨域通信。
  - `cookie` 不会随请求发送，也不会随响应返回。
  - 只能设置请求头部信息中的 `Content-Type` 字段。
  - 不能访问响应头部信息。
  - 只支持 GET 和 POST 请求。

#### 使用方式

对于开发者来说，CORS 通信与同源的 AJAX 通信没有差别，代码完全一样。浏览器一旦发现 AJAX 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求。

浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。只要同时满足以下两大条件，就属于简单请求：

1、请求方法是以下三种方法之一：

- HEAD
- GET
- POST

2、HTTP 的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

对于普通请求和复杂请求浏览器的处理方式不一样，更多信息参考 [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)。

默认情况下，跨源请求不提供凭据（cookie、HTTP 认证及客户端 SSL 证明等）。通过将 `withCredentials` 属性设置为 `true`，可以指定某个请求应该发送凭据。如果服务器接受带凭据的请求，会用下面的 HTTP 头部来响应。

```javascript
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在 AJAX 请求中打开 `withCredentials` 属性。否则，即使服务器同意发送 `Cookie`，浏览器也不会发送。

```javascript
var xhr = new XMLHttpRequest()
xhr.withCredentials = true
```

或者，服务器要求设置 `Cookie`，浏览器也不会处理。但是，如果省略 `withCredentials` 设置，有的浏览器还是会一起发送 `Cookie`。这时，可以显式关闭 `withCredentials`。

需要注意的是，如果要发送 `Cookie`，`Access-Control-Allow-Origin` 就不能设为星号，必须指定明确的、与请求网页一致的域名。

同时，`Cookie` 依然遵循同源政策，只有用服务器域名设置的 `Cookie` 才会上传，其他域名的 `Cookie` 并不会上传，且（跨源）原网页代码中的 `document.cookie` 也无法读取服务器域名下的 `Cookie`。

### 图像 Ping

我们知道，一个网页可以从任何网页中加载图像，不用担心跨域不跨域。这也是在线广告跟踪浏览量的主要方式。因此可以动态地创建图像，使用它们的 `onload` 和 `onerror` 事件处理程序来确定是否接收到了响应。

图像 Ping 是与服务器进行简单、单向的跨域通信的一种方式。请求的数据是通过查询字符串形式发送的，而响应可以是任意内容，但通常是像素图或 204 响应。

通过图像 Ping，浏览器得不到任何具体的数据，但通过侦听 `load` 和 `error` 事件，它能知道响应是什么时候接收到的。

```javascript
var img = new Image()
img.onload = img.onerror = function() {
  console.log('done')
}
img.src = 'http://www.anani.com/image?name=anani'
```

图像 Ping 有两个主要的缺点，一是只能发送 GET 请求，二是无法访问服务器的响应文本。因此，图像 Ping 只能用于浏览器与服务器间的单向通信。

跟图像 Ping 类似的技术还有 `link` 和 `iframe(iframe + form)`，它们都能发出跨域请求，后者更能使用 POST 方法，但是都是只能用于浏览器与服务器间的单向通信。

### JSONP

JSONP 是通过动态 `<script>` 元素来使用的，使用时可以为 `src` 属性指定一个跨域 URL，它主要由两部分组成：回调函数和数据。

回调函数是当响应到来时应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的 JSON 数据。下面是一个典型的 JSONP 请求的封装：

```javascript
/**
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {function} callback 请求成功后的回调函数，请求成功后默认将获取的数据作为参数传入执行
 */
function jsonp(url, params, callback) {
  // 辅助函数
  function addURLParam(url, key, value) {
    url += url.indexOf('?') == -1 ? '?' : '&'
    url += encodeURIComponent(key) + '=' + encodeURIComponent(value)
    return url
  }
  function getQueryStringParams(url, params) {
    Object.keys(params).forEach(function(key) {
      url = addURLParam(url, key, params[key])
    })
    return url
  }
  // 声明全局处理函数
  var funName =
    'Jsonp_' +
    Date.now() +
    Math.random()
      .toString()
      .substr(2)
  window[funName] = function(res) {
    callback(res)

    delete window[funName]
    document.body.removeChild(script)
  }
  // 创建 script 标签发送请求
  var script = document.createElement('script')
  script.src = getQueryStringParams(url, params) + '&callback' + funName
  document.body.appendChild(script)
}
```

与图像 Ping 相比，它的优点在于能够直接访问响应文本，支持在浏览器与服务器之间双向通信。但是

- JSONP 是从其他域中加载代码执行的，如果其他域不安全，很可能会在响应中夹带一些恶意代码，而此时除了完全放弃 JSONP 调用之外，没有办法追究。
- 要确定 JSONP 请求是否失败并不容易。虽然 HTML5 给 `<script>` 元素新增了一个 `onerror` 事件处理程序，但目前还没有得到任何浏览器支持。

### Web Sockets

Web Sockets 的目标是在一个单独的 持久连接上提供全双工、双向通信。

在 JavaScript 中创建了 Web Socket 之后，会有一个 HTTP 请求发送到浏览器以发起连接。在取得服务器响应后，建立的连接会使用 HTTP 升级从 HTTP 协议交换为 Web Socket 协议。

Web Sockets 使用了自定义的协议， 所以 URL 模式也略有不同。 未加密的连接是 `ws://`；加密的连接是 `wss://`。在使用 Web Socket URL 时，必须带着这个模式，因为将来还有可能支持其他模式。

要创建 Web Socket，先实例一个 WebSocket 对象并传入要连接的 URL：

```javascript
var socket = new WebSocket('ws://www.example.com/server.php')
```

实例化了 WebSocket 对象后，浏览器就会马上尝试创建连接。与 XHR 类似，WebSocket 也有一个表示当前状态的 `readyState` 属性：

- WebSocket.OPENING (0)：正在建立连接。
- WebSocket.OPEN (1)：已经建立连接。
- WebSocket.CLOSING (2)：正在关闭连接。
- WebSocket.CLOSE (3)：已经关闭连接。

要关闭 Web Socket 连接，可以在任何时候调用 `close()` 方法。

```javascript
socket.close()
// 调用了 close() 之后，readyState 的值立即变为 2（正在关闭），而在关闭连接后就会变成
```

#### 发送和接受数据

要向服务器发送数据，使用 `send()` 方法 并传入任意字符串，因为 Web Sockets 只能通过连接发送纯文本数据，所以对于复杂的数据结构，在通过连接发送之前，必须进行序列化。

```javascript
var message = {
  time: new Date(),
  text: 'Hello world!',
}
socket.send(JSON.stringify(message))
```

当服务器向客户端发来消息时，WebSocket 对象就会触发 `message` 事件。这个 `message` 事件与 其他传递消息的协议类似，也是把返回的数据保存在 `event.data` 属性中。

#### 其它事件

WebSocket 对象还有其他三个事件，在连接生命周期的不同阶段触发。

- **open**：在成功建立连接时触发。
- **error**：在发生错误时触发，连接不能持续。
- **close**：在连接关闭时触发。该事件事件的 `event` 对象有额外的属性：`wasClean`、`code` 和 `reason`。
- `wasClean` 是一个布尔值，表示连接是否已经明确地关闭；
- `code` 是服务器返回的数值状态码；
- `reason` 是一个字符串，包含服务器发回的消息。

- 必须给 WebSocket 构造函数传入绝对 URL。
- 同源策略对 Web Sockets 不适用，因此可以通过它打开到任何站点的连接  (是否会与某个域中的页面通信，完全取决于服务器)。
- WebSocket 对象不支持 DOM2 级事件侦听器，因此必须使用 DOM0 级语法分别定义每个事件处理程序。

## 其它技术

常见的跨域的解决方式上面已经介绍了，接下来来看一些相对我们初级开发人员来说比较冷门或生涩的交互方式。

### Comet

Comet 指的是一种更高级的 Ajax 技术（经常也有人称为“服务器 推送” ）。它们明显的区别就是 Ajax 是一种从页面向服务器请求数据的技术，而 Comet 则是一种服务器向页面推送数据的技术。

Comet 能够让信息近乎实时地被推送到页面上，非常适合处理体育比赛的分数和股票报价。

有两种实现 Comet 的方式：长轮询和流。长轮询是传统轮询（也称为短轮询）的一个翻版，即浏览器定时向服务器发送请求，看有没有更新的数据。

短轮询的时间线：

<img :src="$withBase('/images/js/short_rotation_training.jpg')" alt="short_rotation_training">

长轮询把短轮询颠倒了一下。页面发起一个到服务器的请求，然后服务器一直保持连接打开，直到有数据可发送。

发送完数据之后，浏览器关闭连接，随即又发起一个到服务器的新请求。这一过程在页面打开期间一直持续不断。

长轮询的时间线：

<img :src="$withBase('/images/js/long_rotation_training.jpg')" alt="long_rotation_training">

第二种流行的 Comet 实现是 HTTP 流：浏览器向服务器发送一个请求，而服务器保持连接打开，然后周期性地向浏览器发送数据。

### 服务器发送事件

SSE（Server-Sent Events，服务器发送事件）是围绕只读 Comet 交互推出的 API 或者模式。

SSE API 用于创建到服务器的单向连接，服务器通过这个连接可以发送任意数量的数据。服务器响应的 MIME 类型必须是 `text/event-stream`，而且是浏览器中的 JavaScript API 能解析格式输出。

SSE 支持短轮询、长轮询和 HTTP 流，而且能在断开连接时自动确定何时重新连接。

#### SSE API

SSE 的 JavaScript API 与其他传递消息的 JavaScript API 很相似。要预订新的事件流，首先要创建一个新的 EventSource 对象，并传进一个入口点：

```javascript
var source = new EventSource('myevents.php')
```

注意，传入的 URL 必须与创建对象的页面同源（相同的 URL 模式、域及端口）。

EventSource 的实例有一个 `readyState` 属性，值为 0 表示正连接到服务器，值为 1 表示打开了连接，值为 2 表示关闭 了连接。

另外，还有以下三个事件：

- `open`：在建立连接时触发。
- `message`：在从服务器接收到新事件时触发，数据存在于 `event.data`。
- `error`：在无法建立连接时触发。

#### 时间流

所谓的服务器事件会通过一个持久的 HTTP 响应发送，这个响应的 MIME 类型为 `text/event-stream`。响应的格式是纯文本，最简单的情况是每个数据项都带有前缀 `data:`。

对于多个连续的以 `data:` 开头的数据行，将作为多段数据解析，每个值之间以一个换行符分隔。只有在包含 `data:` 的数据行后面有空行时，才会触发 `message` 事件。

通过 `id:` 前缀可以给特定的事件指定一个关联的 ID，这个 ID 行位于 `data:` 行前面或后面皆可：

```javascript
data: foo
id: 1
```

设置了 ID 后，EventSource 对象会跟踪上一次触发的事件。如果连接断开，会向服务器发送一个 包含名为 `Last-Event-ID` 的特殊 HTTP 头部的请求，以便服务器知道下一次该触发哪个事件。

### 附录

另外还有一些跨域技术，比如设置 `document.domain` 进行主域名相同，但子域名不同的 `iframe` 跨域 和代理、`canvas` 操作图片的跨域等问题。

值得一提的是 HTML5 提供了一个接口 `window.postMessage()`，以专注实现不同窗口不同页面的跨域通讯。

## 参考资料

- JavaScript 高级程序设计(第 3 版)
- [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [不要再问我跨域的问题了](https://segmentfault.com/a/1190000015597029)
- [聊一聊 cookie](https://segmentfault.com/a/1190000004556040#articleHeader6)
- [Cookie/Session 的机制与安全](https://harttle.land/2015/08/10/cookie-session.html)
- [Web 安全测试之 XSS](https://www.cnblogs.com/TankXiao/archive/2012/03/21/2337194.html)
- [解决 canvas 图片 getImageData,toDataURL 跨域问题](https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/)
- [window.postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)
- [跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
