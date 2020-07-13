# 单线程执行

JavaScript 中有许多操作看起来都像是多线程执行的，比如 AJAX 异步请求、还有定时器等。但事实上 JavaScript 是通过单线程执行的。

## 历史

布兰登·艾奇(Brendan Eich)用了 10 天的时间创造了 JavaScript。当时 JavaScript 只是用来简单和浏览器进行交互，做一些表单验证、操作 DOM。

由于需求并不多，所以并没有必要将运行模式变得复杂，而且多线程往往还会带来许多不必要的麻烦。比如，当我们在一个线程中把某一个 DOM 删除了，而另一个线程却在读取这一个 DOM，并试图对其进行一些操作，所以会发生一些错误。

为了更好的理解单线程，先来了解一下浏览器的内核。

## 浏览器内核

浏览器内核包括许多模块，比如渲染引擎、JavaScript 引擎、定时器模块、事件响应模块、网络请求模块等。

渲染引擎负责获取网页内容、整理信息和计算网页的显示方式，然后输出到显示器或打印机。JavaScript 引擎负责解析和执行 JavaScript 来实现网页的动态交互。

内核不同对于网页的解析也会不同，现在常见的浏览器内核包括：

| 内核    | 浏览器                                                |
| :------ | :---------------------------------------------------- |
| Trident | IE，MaxThon，TT，The World，360，搜狗浏览器等         |
| Gecko   | NETSCAPE6 及以上版本，FF，MozillaSuite / SeaMonkey 等 |
| Presto  | Opera7 及以上                                         |
| Webkit  | Safari，Chrome 等                                     |

虽然内核有多重，但是执行 JavaScript 的方式大同小异，需要注意的是浏览器不是单线程的，比如上面定时器模块、事件响应模块、网络请求模块都是在分线程中完成的。

## 认识单线程

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

```javascript
alert('stop')
console.log('done')
```

上面的代码就是一个很简单的例子，如果我们不点击确认，那么控制台永远不会输出下面的字符串。

## 单线程的 JavaScript

在 JavaScript 中代码可以简单的分为两种代码，即初始化代码和回调代码。

JavaScript 引擎执行代码的基本流程就是先执行初始化代码，包括设置定时器，绑定事件监听和发送 AJAX 请求。

能很好的说明 JavaScript 是单线程执行的例子就是 `setTimeout()` 的回调函数只有在运行栈中的代码执行完成后才会执行。

为了理解回调函数的执行我们需要先来了解一下事件循环模型。

## 事件循环模型

在 JavaScript 中所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入”任务队列”（task queue）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制就像是这样：

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. "执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。里面等待的事件，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

第三步中，主线程从”任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

## Web Workers

`Web worker` 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 `web worker` 在后台运行。

```javascript
// 主线程
if ('undefined' !== typeof Worker) {
  /** 检测浏览器是否支持 */
  if (typeof w == 'undefined') {
    /* 创建一个 Worker */
    WorkerInstance = new Worker('demo_workers.js')
  }
  /** 以事件监听的方式进行交互信息 */
  WorkerInstance.onmessage = function(event) {
    console.log(event.data)
  }

  /** 向分线程中发送数据 */
  WorkerInstance.postMessage(number)
} else {
  console.log('抱歉，你的浏览器不支持 Web Workers...')
}
// 分线程（demo_workers.js）
function fibonacci(number) {
  return arguments.callee(number - 1) + arguments.callee(number - 2)
}
function onmessage(number) {
  // 分线程中启动事件监听
  postMessage(fibonacci(number)) // 向主线程返回数据
}
```

当我们创建 `web worker` 对象后，它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。如需终止 `web worker`，并释放浏览器/计算机资源，请使用 `terminate()` 方法：

```javascript
WorkerInstance.terminate()
WorkerInstance = undefined
```

由于 `web worker` 位于外部文件中，其全局对象不再是 `window`，而且它们无法访问下列 JavaScript 对象：

- `window` 对象
- `document` 对象
- `parent` 对象

所以它不能改变 DOM，也没有改变 JavaScript 是单线程执行的本质。另外，在一个分线程中有多个任务时，一样存在着一个队列，然后挨个处理。

## 参考资料

- [为什么 javascript 是单线程？](https://blog.csdn.net/baidu_24024601/article/details/51861792)
- [Javascript 是单线程的深入分析](https://www.cnblogs.com/Mainz/p/3552717.html)
- [深入理解 JavaScript 执行（单线程的 JS）](https://juejin.im/post/5a7bf0acf265da4e9449a4b1)
