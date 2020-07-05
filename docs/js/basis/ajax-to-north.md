# AJAX 指北

AJAX 不是新的编程语言，而是一种使用现有标准的新方法，或者说是一套由 `JavaScript` 调用的 API。其最大的优点是在不重新加载整个页面的情况下，可以与服务器交换数据并更新部分网页内容。

## 简介

AJAX（Asynchronous JavaScript and XML）异步的 `JavaScript` 和 XML。

如今前后台数据交换的格式通常是 JSON，但是为什么最后一个字母代表的是 XML 呢？这存在着一个历史原因，因为最开始的时候是以 XML 作为转换数据的格式，而 JSON 是在后来兴起的。

## 如何使用

在不考虑兼容、设置请求头和跨域等情况时，它的使用其实非常简单，就像是类比我们打开浏览器、输入网址回车，然后等待服务器的响应。

```javascript
// 打开浏览器
var xhr = new XMLHttpRequest();
// 输入网址
xhr.open('GET', 'https://cnodejs.org/api/v1/topics');
// 回车
xhr.send();
// 等待...
```

当然事实上并非如此简单，但却可以很好的帮我们记住大概的流程。接下来，就来慢慢的了解每一步真实的内容。

### 创建 XMLHttpRequest 对象

所有现代浏览器均支持 `XMLHttpRequest` 对象（IE5 和 IE6 使用 ActiveXObject）。

```javascript
function CreateXHR() {
    if ('undefined' !== typeof XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if ('undefined' !== typeof ActiveXObject) { // 适用于IE7之前的版本
        if ('string' !== typeof arguments.callee.activeXString) {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
            var i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error('No XHR object available.');
    }
}
```

由于其他浏览器中对 XHR 的实现与 IE 最早的实现是兼容的，因此就可以在所有浏览器中都以相同方式使用上面创建的 `xhr` 对象。

### XHR 的用法

在使用 XHR 对象时，要调用的第一个方法就是 `open()` 方法，该方法可以接受 3 个参数：

* 要发送的请求的类型（"get"、"post"等）；
* 请求的 URL；
* 表示是否异步发送请求的布尔值。

```javascript
xhr.open('GET', 'https://cnodejs.org/api/v1/topics', false);
```

### HTTP 头部信息

每个 HTTP 请求和响应都会带有相应的头部信息，默认情况下，在发送 XHR 请求的同时，还会发送下列头部信息：

* Accept：浏览器能够处理的内容类型。
* Accept-Charset：浏览器能够显示的字符集。
* Accept-Encoding：浏览器能够处理的压缩编码。
* Accept-Language：浏览器当前设置的语言。
* Connection：浏览器与服务器之间连接的类型。
* Cookie：当前页面设置的任何 Cookie。
* Host：发出请求的页面所在的域 。
* Referer：发出请求的页面的 URI。注意，HTTP 规范将这个头部字段拼写错了，而为保证与规范一致，也只能将错就错了。（这个英文单词的正确拼法应该是 referrer。）
* User-Agent：浏览器的用户代理字符串。

XHR 对象也提供了操作这两种头部（即请求头部和响应头部）信息的方法。使用 `setRequestHeader()` 方法就可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称和头部字段的值。

::: tip

* 要成功发送请求头部信息，必须在调用 `open()` 方法之后且调用 `send()` 方法之前调用 `setRequestHeader()`。
* 如果发送的请求体是 `urlencoded` 格式必须设置请求头的 `Content-Type` 设置为 `application/x-www-form-urlencoded`。

:::

调用 XHR 对象的 `getResponseHeader()` 方法并传入头部字段名称，可以取得相应的响应头部信息。而调用 `getAllResponseHeaders()` 方法则可以取得一个包含所有头部信息的长字符串。

### GET 请求

GET 是最常见的请求类型，最常用于向服务器查询某些信息。它可以将查询字符串参数追加到 URL 的末尾，以便将信息发送给服务器。

对 XHR 而言，位于传入 `open()` 方法的 URL 末尾的查询字符串必须经过 `encodeURIComponent()` 的编码，然后才能放到 URL 的末尾，而且所有名-值对儿都必须由和号（&）分隔。

```javascript
/**
 * 辅助函数：向现有URL的末尾添加查询字符串参数
 * @param url 请求地址
 * @param key 拼接的名值对的key值
 * @param value 拼接的名值对的值
 */
function addURLParam(url, key, value) {
    url += (url.indexOf('?') == -1 ? '?' : '&');
    url += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    return url;
}
```

### POST 方法

在 `open()` 方法第一个参数的位置传入 "post"，就可以初始化一个 POST 请求，通常用于向服务器发送应该被保存的数据。

POST 请求把数据作为请求的主体提交，主体不仅可以包含非常多的数据，而且格式不限。

默认情况下，服务器对 POST 请求和提交 Web 表单的请求并不会一视同仁。因此，服务器端必须有程序来读取发送过来的原始数据，并从中解析出有用的部分。我们可以使用 XHR 来模仿表单提交：

* 将 `Content-Type` 头部信息设置为 `application/x-www-form-urlencoded`，也就是表单提交时的内容类型；
* 以适当的格式创建一个字符串（POST 数据的格式与查询字符串格式相同）。

需要注意的一点是，是调用 `open()` 方法并不会真正发送请求，而只是启动一个请求以备发送。如果要发送特定的请求，必须调用 `send()` 方法。

```javascript
xhr.send();
```

`send()` 方法可以接受接收一个参数（且仅用于 POST 请求），即作为请求主体发送的数据。

### 响应

在收到响应后，响应的数据会自动填充 XHR 对象的属性：

* responseText：作为响应主体被返回的文本。
* responseXML：如果响应的内容类型是 "text/xml" 或 "application/xml"，这个属性中将保存包含着响应数据的 XML DOM 文档。
* status：响应的 HTTP 状态。
* statusText：HTTP 状态的说明。

在接收到响应后，第一步是检查 `status` 属性，以确定响应已经成功返回。一般来说，可以将 HTTP 状态代码为 200 作为成功的标志。此时，`responseText` 属性的内容已经就绪。

根据返回的状态代码，可能会显示由服务器返回的内容，也可能会显示一条错误消息。所以建议要通过检测 `status` 来决定下一步的操作，不要依赖 `statusText`。

无论内容类型是什么，响应主体的内容都会保存到 `responseText` 属性中；而对于非 XML 数据而言，`responseXML` 属性的值将为 `null`。

### 同步和异步

发送请求时提到的 `open()` 方法的第三个参数默认为 `true`，表示发送的是异步请求，当设置为 `false` 时则发送同步请求。

采用同步请求意味着 `JavaScript` 需要等待服务器的响应就绪才继续执行。如果服务器繁忙或缓慢，应用程序会挂起或停止。

::: tip
当发送同步请求时，不要编写 `onreadystatechange` 函数，只需要把代码放到 `send()` 语句后面。
:::

对于 Web 开发人员来说，发送异步请求是一个巨大的进步，通过 `AJAX`，`JavaScript` 无需等待服务器的响应，而是：

* 在等待服务器响应时执行其他脚本。
* 当响应就绪后对响应进行处理。

我们不推荐使用 `async=false`，尽管对于一些小型的请求，它是可行的。

采用异步请求时，由于客户端并不知道服务器何时才会响应我们的请求，所以 AJAX 采取事件监听的机制来处理。

### onreadystatechange 事件

XHR 对象上的 `readyState` 属性存有 `XMLHttpRequest` 的状态信息：

| 属性 | 描述 |
| :-- | :-- |
| onreadystatechange | 存储函数（或函数名），每当 `readyState` 属性改变时，就会调用该函数。 |
| readyState | 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。|
| status | 200: "OK"，404: 未找到页面 |

如上所见，每当 `readyState` 改变时，就会触发 `onreadystatechange` 事件。

```javascript
var xhr = new XMLHttpRequest();
// readyState = 0 => 请求未初始化
xhr.open('GET', 'https://cnodejs.org/api/v1/topics');
// readyState = 1 => 服务器连接已建立
xhr.send();
// 等待...
// readyState = 2 => 请求已接收 => 已经接受到响应报文的响应头
// readyState = 3 => 请求处理中 => 正在下载响应体（所以此时的响应体可能唯空、可能包含部分
// readyState = 4 => 请求已完成，且响应已就绪 => 获取完整的响应报文
```

通常，我们只对 `readyState` 值为 4 的阶段感兴趣，因为这时所有数据都已经就绪。

另外，在接收到响应之前还可以调用 `abort()` 方法来取消异步请求，调用这个方法后，XHR 对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性。

在终止请求之后，还应该对 XHR 对象进行解引用操作。由于内存原因，不建议重用 XHR 对象。

::: tip

* 必须在调用 `open()` 之前指定 `onreadystatechange` 事件处理程序才能确保跨浏览器兼容性。
* 通过 `abort()` 方法取消请求成功后会触发 `onabort` 事件。`abort()` 方法需要在 `send()` 方法后调用。
* 通常，事件监听的注册越早越好。

:::

## XMLHttpRequest 2 级

鉴于 XHR 已经得到广泛接受，成为了事实标准，W3C 也着手制定相应的标准以规范其行为，所以 `XMLHttpRequest 2` 级则进一步发展了 XHR。

### FormData

现代 Web 应用中频繁使用的一项功能就是表单数据的序列化，`XMLHttpRequest 2` 级为此定义了 `FormData` 类型。使用起来非常的方便，创建了一个 `FormData` 对象，并向其中添加了一些数据：

```javascript
var data = new FormData();
data.append('name', 'Anani');
```

这里使用的 `append()` 方法如上所见可接收两个参数：键和值，分别对应表单字段的名字和字段中包含的值。可以像这样添加任意多个键值对儿。

通过向 `FormData` 构造函数中传入表单元素，也可以用表单元素的数据预先向其中填入键值对儿：

```javascript
var data = new FormData(document.forms[0]);
```

创建了 `FormData` 的实例后，可以将它直接传给XHR的 `send()` 方法：

```javascript
xhr.send(data);
```

使用 `FormData` 的方便之处体现在不必明确地在 XHR 对象上设置请求头部。XHR 对象能够识别传入的数据类型是 `FormData` 的实例，并配置适当的头部信息。

### 超时限定

XHR 对象添加了一个 `timeout` 属性，表示请求在等待响应多少毫秒之后就终止。

在给 `timeout` 设置一个数值后，如果在规定的时间内浏览器还没有接收到响应，那么就会触发 `timeout` 事件，进而会调用 `ontimeout` 事件处理程序。

需要注意的是，超时导致请求终止，会调用 `ontimeout` 事件处理程序。但此时 `readyState` 可能已经改变为 4 了，这意味着会调用 `onreadystatechange` 事件处理程序。

如果在超时终止请求之后再访问 `status` 属性，就会导致错误。为避免浏览器报告错误，可以将检查 `status` 属性的语句封装在一个 `try-catch` 语句当中。

```javascript
var xhr = new CreateXHR();
xhr.responseType = 'json';
xhr.timeout = 1000; // 设置超时标准为 1000 毫秒
xhr.ontimeout = function () { }
xhr.onreadystatechange = function () {
    if (4 === xhr.readyState) {
        try {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                // 成功的处理程序
            }
        } catch (err) {
            // 假设由ontimeout 事件处理程序处理
        }
    }
}
xhr.open('GET', 'https://cnodejs.org/api/v1/topics');
xhr.send(null);
```

### overrideMimeType() 方法

`overrideMimeType()` 方法，用于重写 XHR 响应的 MIME 类型。

::: warning
调用 `overrideMimeType()` 必须在 `send()` 方法之前，才能保证重写响应的 MIME 类型。
:::

比如，服务器返回的 MIME 类型是 `text/plain`，但数据中实际包含的是 XML。根据 MIME 类型，即使数据是 XML，`responseXML` 属性中仍然是 `null`。通过调用 `overrideMimeType()` 方法，可以保证把响应当作 XML 而非纯文本来处理。

```javascript
var xhr = createXHR();
xhr.open('GET', 'https://cnodejs.org/api/v1/topics', true);
xhr.overrideMimeType("text/xml");
xhr.send(null);
```

## 进度事件

`Progress Events` 规范是 W3C 的一个工作草案，定义了与客户端服务器通信有关的事件，有以下 6 个进度事件：

* loadstart：在接收到响应数据的第一个字节时触发。
* progress：在接收响应期间持续不断地触发。
* error：在请求发生错误时触发。
* abort：在因为调用 `abort()` 方法而终止连接时触发。
* load：在接收到完整的响应数据时触发。
* loadend：在通信完成或者触发 `error`、`abort` 或 `load` 事件后触发。

每个请求都从触发 `loadstart` 事件开始，接下来是一或多个 `progress` 事件，然后触发 `error`、`abort` 或 `load` 事件中的一个，最后以触发 `loadend` 事件结束。

### load 事件

响应接收完毕后将触发 `load` 事件，因此也就没有必要去检查 `readyState` 属性（此时 readyState = 4）。

`onload` 事件处理程序会接收到一个 `event` 对象，其 `target` 属性 就指向 XHR 对象实例，因而可以访问到 XHR 对象的所有方法和属性。

只要浏览器接收到服务器的响应，不管其状态如何，都会触发 `load` 事件。而这意味着你必须要检查 `status` 属性，才能确定数据是否真的已经可用。

### progress 事件

`progress` 事件，这个事件会在浏览器接收新数据期间周期性地触发。

`onprogress` 事件处理程序会接收到一个 `event` 对象，其 `target` 属性是XHR对象，但包含着三个额外的属性：

* `engthComputable` 是一个表示进度信息是否可用的布尔值；
* `position` 表示已经接收的字节数；
* `totalSize` 表示根据 `Content-Length` 响应头部确定的预期字节数。

::: tip
为确保正常执行，必须在调用 `open()` 方法之前添加 `onprogress` 事件处理程序。
:::

## 参考资料

* JavaScript 高级程序设计(第3版)
* [AJAX 教程 | 菜鸟教程](http://www.runoob.com/ajax/ajax-tutorial.html)
