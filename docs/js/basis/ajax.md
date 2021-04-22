# Ajax

20 世纪 90 年代，几乎所有的网站都由 HTML 页面实现，服务器在处理每一个用户的请求时都需要重新加载整个网页，即使只是一部分页面元素发生了改变。

显然，这样的处理方式效率不高，并且还会加重服务器的负担。同时，对于用户来说体验也很差。为了解决这些问题，最后发展出了 Ajax 技术。

Ajax(Asynchronous JavaScript and XML) 指的就是一套综合了多项技术的浏览器端网页开发技术，其最大的特点就是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

## Ago

在了解 Ajax 的具体内容之前，我们先来想想在没有 Ajax 之前网页是如何发送请求的呢？

当然能想到的发送请求的方式也有不少，包括在浏览器上输入你要访问的网页地址，以及在 HTML 中会自动发送请求的 Link、Script 和图片等标签。

另外，还有一些提供给用户进行交互的 A 标签和 Form 表单。那么在这些请求的方式中，难道都会导致页面重新刷新吗？

自然不是的，要不然可就进入死循环了。而且通过其中的一些方式我们还可以实现一些无刷新的体验，比如我们常说的 JSONP 请求：

```js
// client
/**
 * 通过创建 Script 标签来向服务器发送 Get 请求，并把获取的数据给回调函数
 */
function jsonp(url, callback) {
  const functionName = `jsonp_${parseInt(Math.random() * 1000000, 10)}`
  const script = document.createElement('script')

  window[functionName] = function(result) {
    callback(result)
    document.body.removeChild(script)
  }
  script.setAttribute('src', `${url}${url.endsWith('/') ? '' : '/'}${functionName}`)
  document.body.append(script)
}

jsonp('http://localhost:3000/jsonp', function name(result) {
  console.log(result)
})

// server
const { createServer } = require('http')

createServer((req, res) => {
  const functionName = (req.url.match(/jsonp\/(.*)/) || [])[1]

  if (functionName) {
    res.end(`${functionName}(${JSON.stringify({ name: 'kisstar', age: 18 })})`)
  } else {
    res.end()
  }
}).listen(3000)
```

既然如此那为什么还需要 Ajax 呢？因为在这些请求方式中要么会导致页面刷新，要么只能请求特定类型的文件，或者只能使用特定的请求方法（比如 JSONP 的方式就只支持 GET 请求）。

## XMLHttpRequest

现在回到 Ajax，本质上作为一个浏览器端的技术，首先面临的第一个无可避免的问题就是浏览器的兼容性问题。

好在所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject），以下是跨浏览器的通用方法：

```js
var xmlHttp
if (window.XMLHttpRequest) {
  //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
  xmlHttp = new XMLHttpRequest()
} else {
  // IE6, IE5 浏览器执行代码
  xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
}
```

后续调用实例上的 `open()` 方法我们可以指定请求的地址、方法以及请求的方式（同步或异步）：

```js
xmlHttp.open('GET', 'http://localhost:3000/ajax', true)
```

最后通过实例上的 `send()` 方法将请求发送到服务器。对于 POST 请求而言，还可以在 `send()` 方法中指定参数。

## onreadystatechange

现在请求已经发送了，可是我们怎么拿到返回的响应数据呢？

当请求被发送到服务器时，每当状态（readyState）发送改变，就会触发 `onreadystatechange` 方法。因此，我们可以通过指定该事件来做一些事情。

对于 `readyState` 属性而言，在请求过程中主要存在五种（从 0 到 4）情况：

- 0: 请求未初始化
- 1: 服务器连接已建立
- 2: 请求已接收
- 3: 请求处理中
- 4: 请求已完成，且响应已就绪

从上面我们发现根据 `readyState` 并不能推断出响应的状态（成功还是失败，亦或是其它），为此我们还需要借助 `status` 属性，其常见的值包括：

- 200: "OK"
- 404: 未找到页面

最后获得来自服务器的响应，还需使用 XMLHttpRequest 对象的 `responseText`（服务器以文本字符的形式返回）或 `responseXML`（以 XMLDocument 对象方式返回）属性：

```js
// client
xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
    console.log(this.responseText)
  }
}

// server
if (req.url.startsWith('/ajax')) {
  return res.end('Response data')
}
```

现在上面的请求将会获取到服务端针对以 `/ajax` 开头的地址设定的响应数据。

## Method

请求方法除了这里的 GET 方法外，根据 HTTP 标准，HTTP 请求可以使用多种请求方法。

| 序号 | 方法 | 描述 |
| :-- | :-- | :-- |
| 1 | GET | 请求指定的页面信息，并返回实体主体。 |
| 2 | HEAD | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 |
| 3 | POST | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| 4 | PUT | 从客户端向服务器传送的数据取代指定的文档的内容。 |
| 5 | DELETE | 请求服务器删除指定的页面。 |
| 6 | CONNECT | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。 |
| 7 | OPTIONS | 允许客户端查看服务器的性能。 |
| 8 | TRACE | 回显服务器收到的请求，主要用于测试或诊断。 |
| 9 | PATCH | 是对 PUT 方法的补充，用来对已知资源进行局部更新 。 |

其中常用的方法包括 GET 和 POST，它们在大小、参数传递等方面都存在一些差别，开发中可根据实际情况进行选用。

## URL

请求的地址就比较好理解了，主要是用于标识一个互联网资源，并指定对其进行操作或获取该资源的方法，称为统一资源定位符。

统一资源定位符（英语：Uniform Resource Locator，缩写：URL）的语法是一般的，可扩展的，它使用 ASCII 的一部分来表示因特网的地址。

通常，以一个计算机网络所使用的网络协议开始，其标准格式如下：

```plaintext
[协议类型]://[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]
```

完整格式如下：

```plaintext
[协议类型]://[访问资源需要的凭证信息]@[服务器地址]:[端口号]/[资源层级UNIX文件路径][文件名]?[查询]#[片段ID]
```

其中访问凭证信息、端口号、查询、片段 ID 都属于选填项。

对于我们常见的网址而言，由于绝大多数网页内容都是超文本传输协议文件，所以网页中 `https://` 的部分可以省略。同时，“80” 作为超文本传输协议文件的常用端口号，因此一般也不必写明。

## Async

另外就是同步和异步的区别了。简而言之，同步请求会阻止代码的执行，这会导致屏幕上出现“冻结”和无响应的用户体验。

比如我们在调用 `send()` 方法后立即打印一条信息 `console.log('Send Request');`，那么我们收到的打印信息会是：

```js
// Response data
// Send Request
```

通常来说，出于性能和体验方面的原因，异步请求应优先于同步请求。

如果你使用 XMLHttpRequest 发送异步请求，那么当请求的响应数据完全收到之时，会执行一个指定的回调函数，而在执行异步请求的同时，浏览器会正常地执行其他事务的处理。

此时我们收到的打印信息会是：

```js
// Send Request
// Response data
```

额外需要注意的是，当在 Worker 中使用 XMLHttpRequest 时，那么同步请求比异步请求更适合。

## Headers

在发送 HTTP 请求之前，我们还可以对请求头进行相关的设置，以便和服务器进行有效的沟通。比如我们可以告诉服务器本次期望获得数据类型。

需要主要的是对请求头的设置应该在调用 `open()` 方法之后，并在调用 `send()` 方法之前：

```js
xmlHttp.open('GET', 'http://localhost:3000/ajax', true)

// 对请求头进行设置 ...
xmlHttp.setRequestHeader('Accept', 'application/json')

xmlHttp.send()
```

在获取到响应信息后，你也可以通过提供的方法获取到服务器返回的响应头信息：

```js
// 获取所有的响应头信息
console.log(xmlHttp.getAllResponseHeaders())

// 获取指定字段的值
xmlHttp.getResponseHeader('Content-Length')
```

除了常见的消息头外，开发者还可以自定专用消息头。

## Parameter

为了携带更多的消息，在发送请求时，我们还可以根据需要带上额外的数据。对于 GET 请求而言可以通过 URL 发送参数，而对于 POST 而言能传递的数据和类型则更多。

通常，资源可以具有多个表示形式，主要是因为可能有多个不同的客户端期望不同的表示形式。要求客户进行适当的演示称为内容协商。

在服务器端，传入的请求可能具有附加的实体。为了确定其类型，服务器使用 HTTP 请求标头 Content-Type，就 POST 请求而言常用的数据类型包括：

- application/x-www-form-urlencoded
- application/json
- multipart/form-data
- text/xml

### x-www-form-urlencoded

其中第一种也是 Form 表单默认使用的 MIME 类型，但我们使用 POST 数据时则需要通过设置请求头来指定：

```js
xmlHttp.open('POST', 'http://localhost:3000/ajax/post/urlencoded', true)
xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
```

然后在 `send()` 方法中发送相应的数据，它们的格式类似于查询：

```js
xmlHttp.send('name=kisstar&age=18')
```

此时后台在接收数据时则需要通过监听 `data` 事件来完成，并通过请求头的信息来进行处理：

```js
const { createServer } = require('http')

function bodyParser(req, res) {
  return new Promise(function(resolve) {
    let data = '',
      body = (req.body = {})

    req.on('data', function(chunk) {
      data += chunk
    })

    req.on('end', function() {
      // 根据请求头信息对接收到的数据进行响应的处理
      if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        data
          .split('&')
          .map(item => item.split('='))
          .forEach(item => (body[item[0]] = item[1]))
      }

      resolve()
    })
  })
}

createServer(async (req, res) => {
  await bodyParser(req, res)

  if (req.url.startsWith('/ajax/post/urlencoded')) {
    console.log(req.body) // { name: 'kisstar', age: '18' }
  }

  res.end()
}).listen(3000)
```

### json

通过 `application/json` 告诉服务端消息主体是序列化后的 JSON 字符串：

```js
const userInfo = { name: 'Kisstar', age: 18 }
xmlHttp.open('POST', 'http://localhost:3000/ajax/post/json', true)
xmlHttp.setRequestHeader('Content-type', 'application/json')
xmlHttp.send(JSON.stringify(userInfo))
```

然后在服务端同样根据请求头信息进行对应的处理：

```js
// ....
req.on('end', function() {
  const contentType = req.headers['content-type']

  if (contentType === 'application/x-www-form-urlencoded') {
    data
      .split('&')
      .map(item => item.split('='))
      .forEach(item => (body[item[0]] = item[1]))
  }

  if (contentType === 'application/json') {
    Object.assign(body, JSON.parse(data))
  }

  resolve()
})
```

### xml

可扩展标记语言（Extensible Markup Language，简称：XML）是一种标记语言。 标记指计算机所能理解的信息符号，通过此种标记，计算机之间可以处理包含各种信息的文章等。

```js
const userXML = `
  <?xml version="1.0" encoding="UTF-8"?>
  <user>
    <name>Kisstar</name>
    <age>18</age>
  </user>
`
xmlHttp.open('POST', 'http://localhost:5000/ajax/post/xml', true)
xmlHttp.setRequestHeader('Content-type', 'text/xml')
xmlHttp.send(userXML)
```

在服务端照旧添加对 XML 类型的处理：

```js
const xml2js = require('xml2js')

req.on('end', async function() {
  const contentType = req.headers['content-type']

  if (contentType === 'application/x-www-form-urlencoded') {
    data
      .split('&')
      .map(item => item.split('='))
      .forEach(item => (body[item[0]] = item[1]))
  }

  if (contentType === 'application/json') {
    Object.assign(body, JSON.parse(data))
  }

  if (contentType === 'text/xml') {
    const parser = new xml2js.Parser()
    const result = await parser.parseStringPromise(data)
    Object.assign(body, result)
  }

  resolve()
})
```

### form-data

通常，我们在使用表单上传文件时，必须让 `<form>` 表单的 `enctype` 等于 `multipart/form-data`。然后请求体会被分割成多部分，每部分使用 `--boundary` 分割。

每部分都是以 `--boundary` 开始，紧接着是内容描述信息，然后是回车，最后是字段具体内容（文本或二进制）。如果传输的是文件，还要包含文件名和文件类型信息。

同时我们也可以自己使用 FormData 接口来通过 Ajax 进行发送：

```html
<form
  action="http://localhost:3000/ajax/post/form-data"
  method="post"
  enctype="multipart/form-data"
>
  <div>
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div>
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div>
    <label for="file">Select your file: </label>
    <input type="file" name="file" id="file" required />
  </div>
  <div>
    <input type="submit" value="Subscribe" id="submit" />
  </div>
</form>

<script>
  submit.onclick = function submit(e) {
    e.preventDefault()
    const formEle = document.forms[0]
    const formData = new FormData(formEle)
    xmlHttp.open('POST', 'http://localhost:3000/ajax/post/form-data', true)
    xmlHttp.send(formData)
  }
</script>
```

后台在接受到请求之后通过 Content-Type 字段的值获取到数据类型和本次请求的 `boundary` 的值。再根据 `boundary` 的值解析请求体：

```js
const formidable = require('formidable')
const util = require('util')

if (req.headers['content-type'].includes('multipart/form-data')) {
  const form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.end(err.message)
    }
    return res.end(util.inspect({ fields: fields, files: files }))
  })
  return
}
```

在[这里][handle__multipart__form__data]查看更多相关信息。

## Fetch

很长一段时间我们都是通过 XHR 来与服务器建立异步通信，但由于 XHR 是基于事件的异步模型，在设计上将输入、输出和事件监听混杂在一个对象里，且必须通过实例化方式来发请求，配置和调用方式混乱。

正是由于 XHR 在使用上的不便，许多前端库就将进行封装，方便开发者调用。时至今日，随着 Fetch API 的横空出世，开始演变为取代 XHR 的技术新标准。

Fetch API 提供了一个获取资源的接口（包括跨域请求）- `fetch()` 方法，该方法必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 Promise `对象，resolve` 对应请求的 Response。你也可以传一个可选的第二个参数 `init`（包括所有对请求的设置）。

```js
fetch('http://localhost:3000/ajax')
  .then(res => res.text())
  .then(console.log) // Response data
```

可见 Fetch API 具有更好更方便的写法，符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里；而且更加底层，提供的 API 丰富。

但是 Fetch 并不支持取消和超时控制，也没有办法原生监测请求的进度；并且只对网络请求报错，对状态码 400、500 等都当做成功的请求，需要封装去处理。

## Ref

- [AJAX - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/AJAX)
- [HTTP 与 AJAX 深入揭秘，不使用 AJAX 实现页面无刷新 - 追梦子 - 博客园](https://www.cnblogs.com/pssp/p/5827559.html)
- [HTTP 请求方法 | 菜鸟教程](https://www.runoob.com/http/http-methods.html)
- [四种常见的 POST 提交数据方式 | JerryQu 的小站](https://imququ.com/post/four-ways-to-post-data-in-http.html)
- [从 Form 表单到 Ajax | keqingrong.github.io](https://keqingrong.github.io/blog/2020-06-27-from-forms-to-ajax)
- [Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)

[handle__multipart__form__data]: https://nodejs.org/en/knowledge/HTTP/servers/how-to-handle-multipart-form-data/
