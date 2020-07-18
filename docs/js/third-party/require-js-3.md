# RequireJS (四)

RequireJS 实现 JSONP 服务。

## 传统的 JSONP 服务

由于浏览器同源策略的影响，Ajax 请求不能跨域获取数据。

所谓"同源"指的是"三个相同"：

- 协议相同
- 域名相同
- 端口相同

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。如果非同源，共有三种行为受到限制：

- Cookie、LocalStorage 和 IndexDB 无法读取。
- DOM 无法获得。
- AJAX 请求不能发送。

那么 Ajax 请求如何规避这个限制呢？JSONP 就是服务器与客户端跨源通信的常用方法。

JSONP 的基本思想是，网页通过添加一个 `<script>` 元素，向服务器请求 JSON 数据，由于这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

```javascript
/**
 * @param src 请求地址
 * @param callback 请求完成后执行的回调函数的函数名，这里设置为 loaded
 */
function getDataByJsonp(src, callback) {
  var url = src + '?callback=' + callback
  var script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.src = url
  document.body.appendChild(script)
}

// 后台接收到请求后返回立即执行的函数，函数名为请求中所带参数指定的函数(callback)，本次实例即为 loaded
// 并把需要获取的数据以参数的形式传入该函数
// 后台返回的数据形式
loaded({
  id: 1,
  userName: 'Anani',
  age: 24,
})

// 最后申明一个 callback 函数，这里即为 loaded 函数，它将会在请求成功后立即执行
function loaded(arg) {
  console.log(arg)
}
```

## RequireJS 的 JSONP 服务

前面介绍到 RequireJS 的运行机制是通过 `script` 标签来加载模块，所以我们也可以通过 RequireJS 来实现 JSONP 服务。

在使用 RequireJS 实现 JSONP 服务时，我们需要把后台返回的数据写成 `define()` 函数的形式。

```javascript
// 后台的数据形式
define({
  id: 1,
  userName: 'Anani',
  age: 24,
})

// RequireJS 跨域获取数据
require(['url'], function(arg) {
  console.log(arg)
})
```

## 参考资料

- [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [慕课网](https://www.imooc.com/learn/787)
