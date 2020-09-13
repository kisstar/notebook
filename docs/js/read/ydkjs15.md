# YDKJS-程序性能

异步对 JavaScript 来说真的很重要，最显而易见的原因就是性能。现在我们不再局限于局部化的异步模式，而是将在程序级别上讨论更大图景下的性能细节。

## Web Worker

JavaScript 当前并没有任何支持多线程执行的功能，但是，像你的浏览器这样的环境，很容易提供多个 JavaScript 引擎实例，各自运行在自己的线程上，这样你可以在每个线程上运行不同的程序。

程序中每一个这样的独立的多线程部分被称为一个（Web）Worker。这种类型的并行化被称为任务并行，因为其重点在于把程序划分为多个块来并发运行。

从 JavaScript 主程序（或另一个 Worker）中，可以这样实例化一个 Worker：

```js
var w1 = new Worker('http://some.url.1/mycoolworker.js')
```

这个 URL 应该指向一个 JavaScript 文件的位置，这个文件将被加载到一个 Worker 中。然后浏览器启动一个独立的线程，让这个文件在这个线程中作为独立的程序运行。

Worker 之间以及它们和主程序之间，不会共享任何作用域或资源，而是通过一个基本的事件消息机制相互联系。

Worker `w1` 对象是一个事件侦听者和触发者，可以通过订阅它来获得这个 Worker 发出的事件以及发送事件给这个 Worker。

以下是如何侦听事件（其实就是固定的 "message" 事件）：

```js
w1.addEventListener('message', function(evt) {
  // evt.data
})
```

也可以发送 "message" 事件给这个 Worker：

```js
w1.postMessage('something cool to say')
```

在这个 Worker 内部，收发消息是完全对称的：

```js
// "mycoolworker.js"
addEventListener('message', function(evt) {
  // evt.data
})
postMessage('a really cool reply')
```

通常由主页面应用程序创建 Worker，但若是需要的话，Worker 也可以实例化它自己的子 Worker，称为 `subworker`。有时候，把这样的细节委托给一个“主”Worker，由它来创建其他 Worker 处理部分任务。

要在创建 Worker 的程序中终止 Worker，可以调用 Worker 对象（就像前面代码中的 w1）上的 `terminate()`。突然终止 Worker 线程不会给它任何机会完成它的工作或者清理任何资源。这就类似于通过关闭浏览器标签页来关闭页面。

### Worker 环境

Worker 内部是无法访问主程序的任何资源的。这意味着你不能访问它的任何全局变量，也不能访问页面的 DOM 或者其他资源。记住，这是一个完全独立的线程。

但是，你可以执行网络操作（Ajax、WebSockets）以及设定定时器。还有，Worker 可以访问几个重要的全局变量和功能的本地复本，包括 `navigator`、`location`、JSON 和 `applicationCache`。

你还可以通过 importScripts(..) 向 Worker 加载额外的 JavaScript 脚本：

```js
// 在Worker内部
importScripts('foo.js', 'bar.js')
```

这些脚本加载是同步的。也就是说，`importScripts(..)` 调用会阻塞余下 Worker 的执行，直到文件加载和执行完成。

Web Worker 通常应用于哪些方面呢？

- 处理密集型数学计算
- 大数据集排序
- 数据处理（压缩、音频分析、图像处理等）
- 高流量网络通信

### 数据传递

在大多数应用中有一个共性，就是需要在线程之间通过事件机制传递大量的信息，可能是双向的。

在早期的 Worker 中，唯一的选择就是把所有数据序列化到一个字符串值中。除了双向序列化导致的速度损失之外，另一个主要的负面因素是数据需要被复制，这意味着两倍的内存使用（及其引起的垃圾收集方面的波动）。

现在，如果要传递一个对象，可以使用[结构化克隆算法][structured_clone_algorithm]（structured clone algorithm）把这个对象复制到另一边。这个算法非常高级，甚至可以处理要复制的对象有循环引用的情况。

如此一来就不用付出 `to-string` 和 `from-string` 的性能损失了，但是这种方案还是要使用双倍的内存。IE10 及更高版本以及所有其他主流浏览器都支持这种方案。

还有一个更好的选择，特别是对于大数据集而言，就是使用 [Transferable 对象][transferable_obj]。这时发生的是对象所有权的转移，数据本身并没有移动。一旦你把对象传递到一个 Worker 中，在原来的位置上，它就变为空的或者是不可访问的，这样就消除了多线程编程作用域共享带来的混乱。

当然，所有权传递是可以双向进行的。

如果选择 Transferable 对象的话，其实不需要做什么。任何实现了 [Transferable 接口][transferable_interface] 的数据结构就自动按照这种方式传输（Firefox 和 Chrome 都支持）。

举例来说，像 Uint8Array 这样的带类型的数组就是 Transferable。下面是如何使用 `postMessage(..)` 发送一个 Transferable 对象：

```js
// 比如 foo 是一个 Uint8Array
postMessage(foo.buffer, [foo.buffer])
```

第一个参数是一个原始缓冲区，第二个是一个要传输的内容的列表。不支持 Transferable 对象的浏览器就降级到结构化克隆，这会带来性能下降而不是彻底的功能失效。

### 共享 Worker

如果你的站点或 `app` 允许加载同一个页面的多个 `tab`（一个常见的功能），那你可能非常希望通过防止重复专用 Worker 来降低系统的资源使用。

在这一方面最常见的有限资源就是 `socket` 网络连接，因为浏览器限制了到同一个主机的同时连接数目。当然，限制来自于同一客户端的连接数也减轻了你的资源压力。

在这种情况下，创建一个整个站点或 `app` 的所有页面实例都可以共享的中心 Worker 就非常有用。这称为 SharedWorker，可通过下面的方式创建（只有 Firefox 和 Chrome 支持这一功能）：

```js
var w1 = new SharedWorker('http://some.url.1/mycoolworker.js')
```

因为共享 Worker 可以与站点的多个程序实例或多个页面连接，所以这个 Worker 需要通过某种方式来得知消息来自于哪个程序。这个唯一标识符称为端口（port），可以类比网络 `socket` 的端口。因此，调用程序必须使用 Worker 的 `port` 对象用于通信：

```js
w1.port.addEventListener('message', handleMessages)
// ..
w1.port.postMessage('something cool')
```

还有，端口连接必须要初始化，形式如下：

```js
w1.port.start()
```

在共享 Worker 内部，必须要处理额外的一个事件："connect"。这个事件为这个特定的连接提供了端口对象。保持多个连接独立的最简单办法就是使用 `port` 上的闭包，就像下面的代码一样，把这个链接上的事件侦听和传递定义在 "connect" 事件的处理函数内部：

```js
// 在共享 Worker 内部
addEventListener("connect", function(evt){
 // 这个连接分配的端口
 var port = evt.ports[0];
 port.addEventListener("message", function(evt){
 // ..
 port.postMessage( .. );
 // ..
 });
 // 初始化端口连接
 port.start();
});
```

除了这个区别之外，共享和专用 Worker 在功能和语义方面都是一样的。

## 备注

单指令多数据（SIMD）是一种数据并行（data parallelism）方式，与 Web Worker 的任务并行（task parallelism）相对，因为这里的重点实际上不再是把程序逻辑分成并行的块，而是并行处理数据的多个位。

对 JavaScript 性能影响最大的因素是内存分配、垃圾收集和作用域访问。`asm.js` 对这些问题提出的一个解决方案就是，声明一个更正式的 `asm.js` “模块”，不要和 ES6 模块混淆。

此处，略过了 SIMD 和 `asm.js` 的进一步介绍。

[structured_clone_algorithm]: https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm
[transferable_obj]: http://updates.html5rocks.com/2011/12/Transferable-Objects-Lightning-Fast
[transferable_interface]: http://developer.mozilla.org/en-US/docs/Web/API/Transferable
