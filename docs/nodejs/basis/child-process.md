# child_process

`child_process` 模块提供了衍生子进程的能力。

## 单进程

进程是程序的运行实例，是系统进行资源分配和调度的基本单位，是操作系统结构的基础。

Node.js 是一个单线程、事件驱动 I/O 的服务端 JavaScript 环境。

```javascript
const http = require('http')

http
  .createServer((req, res) => {
    if ('/sum' === req.url) {
      for (let i = 0; i < 10000000000; i++) {}
      res.end('Calculate End')
    } else {
      res.end('Hello World')
    }
  })
  .listen(3000)
```

如上所示，当一个请求到来时，如果单次处理占用的时间过长，将会导致下一个请求一直处于等待中。

## 子进程

Node.js 中的 `child_process` 模块提供了衍生子进程（以一种与 [popen(3)][linux_popen_3] 类似但不相同的方式）的能力。 此功能主要由 `child_process.spawn()` 方法提供：

```js
// calculate.js
console.log("I'm child process")

// app.js
const { spawn } = require('child_process')

const cp = spawn('node', ['calculate.js'])

cp.stdout.on('data', data => {
  console.log(`stdout: ${data}`)
})

cp.stderr.on('data', data => {
  console.error(`stderr: ${data}`)
})

cp.on('close', code => {
  console.log(`子进程退出，退出码 ${code}`)
})
```

默认情况下，`stdin`、`stdout` 和 `stderr` 的管道会在父进程和衍生的子进程之间建立。并且这些管道具有有限的（且平台特定的）容量。

如果子进程写入 `stdout` 时超出限制且没有捕获输出，则子进程会阻塞并等待管道缓冲区接受更多的数据。这与 `shell` 中的管道的行为相同。

## 进程间通信

对于 `child_process.spawn()` 方法，运行时可接受第三个配置选项，其中 `options.stdio` 选项用于配置在父进程和子进程之间建立的管道。

默认情况下，子进程的 `stdin`、`stdout` 和 `stderr` 会被重定向到 `ChildProcess` 对象上相应的 `subprocess.stdin`、`subprocess.stdout` 和 `subprocess.stderr` 流。这相当于将 `options.stdio` 设置为 `['pipe', 'pipe', 'pipe']`。

不仅如此，`options.stdio` 可以是以下字符串之一：

- `'pipe'` - 相当于 `['pipe', 'pipe', 'pipe']`（默认值）。
- `'ignore'` - 相当于 `['ignore', 'ignore', 'ignore']`。
- `'inherit'` - 相当于 `['inherit', 'inherit', 'inherit']` 或 `[0, 1, 2]`。

或则，`options.stdio` 的值也可以是一个数组，其中每个索引对应于子进程中的 `fd`。 值可以是以下之一：

- `'pipe'` - 在子进程和父进程之间创建一个管道。管道的父端作为 `child_process` 对象上的 `subprocess.stdio[fd]` 属性暴露给父进程。
- `'ignore'` - 忽略子进程中的 `fd`（虽然 Node.js 将会始终为它衍生的进程打开 `fd` 0 - 2，但将 `fd` 设置为 `'ignore'` 将会导致 Node.js 打开 `/dev/null` 并将其附加到子进程的 `fd`）。
- `'inherit'` - 将相应的 `stdio` 流传给父进程或从父进程传入。在前三个位置中，这分别相当于 `process.stdin`、`process.stdout` 和 `process.stderr`。在任何其他位置中，则相当于 `'ignore'`。
- `'ipc'` - 创建一个 IPC 通道，用于在父进程和子进程之间传递消息或文件描述符。一个 ChildProcess 最多可以有一个 IPC stdio 文件描述符。设置此选项会启用 `subprocess.send()` 方法。 如果子进程是一个 Node.js 进程，则 IPC 通道的存在将会启用 `process.send()` 和 `process.disconnect()` 方法、以及子进程内的 `'disconnect'` 和 `'message'` 事件。
- `<Stream>` 对象 - 与子进程共享指向 `tty`、文件、`socket` 或管道的可读或可写流。流的底层文件描述符在子进程中会被复制到与 `stdio` 数组中的索引对应的 `fd`。该流必须具有一个底层的描述符（文件流直到触发 'open' 事件才需要）。
- 正整数 - 整数值会被解释为当前在父进程中打开的文件描述符。它与子进程共享，类似于共享 `<Stream>` 对象的方式。在 Windows 上不支持传入 `socket`。
- `null` 或 `undefined` - 使用默认值。对于 `stdio` 的 `fd` 0、1 和 2（换句话说，stdin、stdout 和 stderr），将会创建一个管道。对于 `fd` 3 及更大的值，则默认为 `'ignore'`。

就像上面所说的，当 `option.stdio` 设置为 `'inherit'` 时，相当于将 `process.stdin`、`process.stdout` 和 `process.stderr` 共享给子进程，在子进程中打印的信息将显示在终端。

但是这样的输出无法在父进程得到并加以使用，改用 `'pipe'` 则可以像上面的例子一样使用，更便捷的是创建一个 IPC 通道：

```js
// calculate.js
console.log('Can you see me?')
process.send("I'm child process")

// app.js
const { spawn } = require('child_process')

const cp = spawn('node', ['calculate.js'], {
  stdio: ['ipc'],
})

cp.on('message', data => {
  console.log(data)
})

cp.on('close', code => {
  console.log(`子进程退出，退出码 ${code}`)
})
```

当然，也可以保持子进程的打印功能：

```js
const cp = spawn('node', ['calculate.js'], {
  stdio: [0, 1, 2, 'ipc'],
})
```

## 解决阻塞问题

通过进程间的通信，我们可以把复杂的计算交给子进程去处理，等到完成后再通知主进程，还是上面请求阻塞问题：

```js
// calculate.js
for (let i = 0; i < 10000000000; i++) {}
process.send('End')

// app.js
const { spawn } = require('child_process')
const http = require('http')

http
  .createServer((req, res) => {
    if ('/sum' === req.url) {
      const cp = spawn('node', ['calculate.js'], {
        stdio: ['ipc'],
      })
      cp.on('message', () => {
        res.end('Calculate End')
      })
    } else {
      res.end('Hello World')
    }
  })
  .listen(3000)
```

现在，访问 `/sum` 路径后的计算不会影响到其它路径的请求响应。

## fork

与 `child_process.spawn()` 方法类似，`child_process.fork()` 方法其实是对前者的封装，它专门用于衍生新的 Node.js 进程，返回的 ChildProcess 会内置额外的通信通道，允许消息在父进程和子进程之间来回传递。

由于 Node.js 进程，所有它接受的第一个参数不是命令，而是要在子进程中运行的模块。

```js
const { fork } = require('child_process')
const http = require('http')

http
  .createServer((req, res) => {
    if ('/sum' === req.url) {
      const cp = fork('calculate.js')
      cp.on('message', () => {
        res.end('Calculate End')
      })
    } else {
      res.end('Hello World')
    }
  })
  .listen(3000)
```

其中新增的 `option.silent` 选项为一个布尔值，如果为 `true`，则子进程的 `stdin`、`stdout` 和 `stderr` 会被 `pipe` 到父进程，否则它们会继承自父进程。

## exec

同样是对 `child_process.spawn` 方法的封装，`child_process.execFile` 方法主要用于运行的可执行文件。不同的是，执行的结果将以回调的方式给出。

```js
const { execFile } = require('child_process')
const child = execFile('node', ['--version'], (error, stdout, _stderr) => {
  if (error) {
    throw error
  }
  console.log(stdout)
})
```

类似的 `child_process.exec` 方法是对 `child_process.execFile` 方法的封装，主要用于运行命令，参数直接使用空格分隔。

```js
const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function lsExample() {
  const { stdout, stderr } = await exec('ls')
  console.log('stdout:', stdout)
  console.error('stderr:', stderr)
}
lsExample()
```

有些不同的是，`exec` 会衍生 `shell` 并且在 `shell` 中运行命令。

## 独立的子进程

目前，子进程在父进程生命周期结束后将自动关闭，如果要独立运行需要做一些额外的操作：

- 开启时，设置 `option.stdio` 为 `'ignore'` 忽略子进程的 `fd`
- 同时，设置 `options.detached` 为 `true` 使子进程在父进程退出后继续运行
- 最后，为了防止父进程等待 `subprocess`，应调用 `subprocess.unref()` 方法，使父进程的事件循环不再将子进程包含在其引用计数中，这样父进程就可以独立于子进程退出，除非子进程和父进程之间建立了 IPC 通道

```js
// calculate.js
while (true) {}

// app.js
const { spawn } = require('child_process')

const cp = spawn('node', ['calculate.js'], {
  stdio: 'ignore',
  detached: true,
})

console.log(cp.pid)

cp.unref()
```

你可以通过打印的 `pid` 手动关闭该进程。

## 附录

**`fd` 是什么？**

文件描述符在形式上是一个非负整数。

实际上，它是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。

在程序设计中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一概念往往只适用于 UNIX、Linux 这样的操作系统。

每个 Unix 进程（除了可能的守护进程）应均有三个标准的 POSIX 文件描述符，对应于三个标准流：标准输入（文件描述符：0）、标准输出（1）、标准错误输出（2）。

## 参考

- [child_process | Node.js API 文档](http://nodejs.cn/api/child_process.html)
- [文件描述符 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E6%8F%8F%E8%BF%B0%E7%AC%A6)

[linux_popen_3]: https://man7.org/linux/man-pages/man3/popen.3.html
