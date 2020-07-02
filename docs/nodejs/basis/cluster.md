# cluster

单个 Node.js 实例运行在单个线程中。为了充分利用多核系统，有时需要启用一组 Node.js 进程去处理负载任务。

通过 `cluster` 模块可以创建共享服务器端口的子进程。

## 多进程

那么如何做到呢？

Node.js 中的 `child_process` 模块提供了衍生子进程的能力，通过其提供的 `fork` 方法创建新的子进程可以很方便的实现进程间的通信。

这里我们将利用 `fork` 方法开启多个进程来监听同一个服务，需要注意的是 `fork` 的次数并非越多越好，最好是与服务器的 CPU 数相同。

```js
// cs.js
const http = require('http')

process.on('message', (_, server) => {
  http
    .createServer((_req, res) => {
      res.end(`Child: ${process.pid}`)
    })
    .listen(server)
})

// app.js
const { fork } = require('child_process')
const http = require('http')
const numCPUs = require('os').cpus().length // 获取 CPU 数

const server = http
  .createServer((_req, res) => {
    res.end(`Parent: ${process.pid}`)
  })
  .listen(3000)
console.log(`Server start: ${process.pid}`)

for (let i = 1; i < numCPUs; i++) {
  const child = fork('./cs.js')
  child.send('server', server) // 传递的第一个参数必须是 'server'，然后才是 server 实例
  console.log(`Server start: ${child.pid}`)
}
```

现在，通过运行 `app.js` 启动服务，将会有多个进程中的应用同时监听着 3000 端口，当其中一个进程挂掉时，请求就会交给下一个进程去处理。

## 集群

实现同样的功能，使用 `cluster` 模块要方便得多。

在 `cluster` 模块中同样提供了 `fork` 方法，如果在文件中调用 `fork` 方法，那么该文件将会再此被运行，通过 `cluster.isMaster` 属性可以区别当前是否是主进程。

```js
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  http
    .createServer((_req, res) => {
      res.end(`Child: ${process.pid}`)
    })
    .listen(3000)
  console.log(`Server start: ${process.pid}`)
}
```

运行上面的代码可以实现和之前如出一辙的功能，你可以根据返回的 PID 手动停止该服务进行测试。

## 守护进程

守护进程(daemon)是一类在后台运行的特殊进程，这里的主进程就可以让其成为一个守护进程，负责在某个子进程挂掉之后进行自动重启。

```js
const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  // 当任何一个工作进程关闭的时候，`cluster` 模块都将会触发 'exit' 事件
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      '工作进程 %d 关闭 (%s). 重启中...',
      worker.process.pid,
      signal || code
    )
    cluster.fork() // 重启
  })
} else {
  http
    .createServer((_req, res) => {
      // 模拟偶发性错误，查看进程自动重启
      if (0.5 > Math.random()) {
        throw Error()
      }
      res.end(`Child: ${process.pid}`)
    })
    .listen(3000)
  console.log(`Server start: ${process.pid}`)
}
```

由于各工作进程是独立的进程，它们可以根据需要随时关闭或重新生成，而不影响其他进程的正常运行。只要有存活的工作进程，服务器就可以继续处理连接。

如果没有存活的工作进程，现有连接会丢失，新的连接也会被拒绝。Node.js 不会自动管理工作进程的数量，而应该由具体的应用根据实际需要来管理进程池。

## 工作原理

工作进程由 `child_process.fork()` 方法创建，因此它们可以使用 IPC 和父进程通信，从而使各进程交替处理连接服务。

`cluster` 模块支持两种分发连接的方法：

- 循环法（除 Windows 外所有平台的默认方法），由主进程负责监听端口，接收新连接后再将连接循环分发给工作进程，在分发中使用了一些内置技巧防止工作进程任务过载。
- 主进程创建监听 `socket` 后发送给感兴趣的工作进程，由工作进程负责直接接收连接。

理论上第二种方法应该是效率最佳的。但在实际情况下，由于操作系统调度机制的难以捉摸，会使分发变得不稳定。可能会出现八个进程中有两个分担了 70% 的负载。

另外，Node.js 不支持路由逻辑。 因此在设计应用时，不应该过分依赖内存数据对象，例如 `session` 和登陆等。

## 参考

- [cluster | Node.js API 文档](http://nodejs.cn/api/cluster.html)
- [child_process | Node.js API 文档](http://nodejs.cn/api/child_process.html)
