# YDKJS-Promise

通过回调表达程序异步和管理并发的两个主要缺陷：缺乏顺序性和可信任性。

因为我们用回调函数来封装程序中的 `continuation`，然后把回调交给第三方（甚至可能是外部代码），接着期待其能够调用回调，实现正确的功能。

但是，如果我们能够把控制反转再反转回来，会怎样呢？如果我们不把自己程序的 `continuation` 传给第三方，而是希望第三方给我们提供了解其任务何时结束的能力，然后由我们自己的代码来决定下一步做什么，那将会怎样呢？

这种范式就称为 Promise。

## 什么是 Promise

当编写代码要得到某个值的时候，比如通过数学计算，不管你有没有意识到，你都已经对这个值做出了一些非常基本的假设，那就是，它已经是一个具体的现在值：

```js
var x,
  y = 2
console.log(x + y) // NaN <-- 因为x还没有设定
```

然而事实并非总是如此，那么如何能够实现“把 x 和 y 加起来，但如果它们中的任何一个还没有准备好，就等待两者都准备好呢？回调？

```js
function add(getX, getY, cb) {
  var x, y
  getX(function(xVal) {
    x = xVal
    // 两个都准备好了？
    if (y != undefined) {
      cb(x + y) // 发送和
    }
  })
  getY(function(yVal) {
    y = yVal
    // 两个都准备好了？
    if (x != undefined) {
      cb(x + y) // 发送和
    }
  })
}

// fetchX() 和 fetchY() 是同步或者异步函数
add(fetchX, fetchY, function(sum) {
  console.log(sum) // 是不是很容易？
})
```

除了代码不够优雅之外，这个粗糙的基于回调的方法还有很多不足。那么 Promise 呢？

```js
function add(xPromise, yPromise) {
  // Promise.all([ .. ]) 接受一个 promise 数组并返回一个新的 promise，
  // 这个新 promise 等待数组中的所有 promise 完成
  return (
    Promise.all([xPromise, yPromise])
      // 这个 promise 决议之后，我们取得收到的 X 和 Y 值并加在一起
      .then(function(values) {
        // values 是来自于之前决议的 promise 的消息数组
        return values[0] + values[1]
      })
  )
}

// fetchX() 和 fetchY() 返回相应值的 promise，可能已经就绪，
// 也可能以后就绪
add(fetchX(), fetchY())
  // 我们得到一个这两个数组的和的 promise
  // 现在链式调用 then(..) 来等待返回 promise 的决议
  .then(function(sum) {
    console.log(sum) // 这更简单
  })
```

从外部看，由于 Promise 封装了依赖于时间的状态——等待底层值的完成或拒绝，所以 Promise 本身是与时间无关的。因此，Promise 可以按照可预测的方式组成（组合），而不用关心时序或底层的结果。

如你所见，通过 Promise，调用 `then(..)` 实际上可以接受两个函数，第一个用于完成情况（如前所示），第二个用于拒绝情况。

### 完成事件

单独的 Promise 展示了未来值的特性。但是，也可以从另外一个角度看待 Promise 的决议：一种在异步任务中作为两个或更多步骤的流程控制机制，时序上的 this-then-that。

假定要调用一个函数 `foo(..)` 执行某个任务。我们不知道也不关心它的任何细节。这个函数可能立即完成任务，也可能需要一段时间才能完成。我们只需要知道 `foo(..)` 什么时候结束，这样就可以进行下一个任务。

```js
function foo(x) {
  // 开始做点可能耗时的工作
  // 构造一个 listener 事件通知处理对象来返回
  return listener
}

var evt = foo(42)
evt.on('completion', function() {
  // 可以进行下一步了
})
evt.on('failure', function(err) {
  // 啊，foo(..)中出错了
})
```

相对于面向回调的代码，这里没有把回调传给 `foo(..)`，而是返回一个名为 `evt` 的事件注册对象，由它来接受回调。

回调本身就表达了一种控制反转，所以对回调模式的反转实际上是对反转的反转，或者称为反控制反转——把控制返还给调用代码。

现在我们可以把这个事件侦听对象提供给代码中多个独立的部分；在 `foo(..)` 完成的时候，它们都可以独立地得到通知。

事实上，事件侦听对象 `evt` 就是 Promise 的一个模拟：

```js
function bar() {
  // foo(..)肯定已经完成，所以执行 bar(..) 的任务
}
function oopsBar() {
  // 啊，foo(..) 中出错了
}

// 对于 baz() 和 oopsBaz() 也是一样
var p = foo(42)
p.then(bar, oopsBar)
p.then(baz, oopsBaz)
```

同事件侦听对象一样，这里的 Promise 示例 `p` 可以提供给代码中的多个独立部分，在 `foo(..)` 完成的时候，它们也都可以独立地得到通知。

## 具有 then 方法的鸭子类型

在 Promise 领域，一个重要的细节是如何确定某个值是不是真正的 Promise。或者更直接地说，它是不是一个行为方式类似于 Promise 的值？

识别 Promise（或者行为类似于 Promise 的东西）就是定义某种称为 `thenable` 的东西，将其定义为任何具有 `then(..)` 方法的对象和函数。我们认为，任何这样的值就是 Promise 一致的 `thenable`。

根据一个值的形态（具有哪些属性）对这个值的类型做出一些假定。这种类型检查一般用术语鸭子类型来表示——“如果它看起来像只鸭子，叫起来像只鸭子，那它一定就是只鸭子”。于是，对 `thenable` 值的鸭子类型检测就大致类似于：

```js
if (
  p !== null &&
  (typeof p === 'object' || typeof p === 'function') &&
  typeof p.then === 'function'
) {
  // 假定这是一个thenable!
} else {
  // 不是thenable
}
```

除了在多个地方实现这个逻辑有点丑陋之外，如果你试图使用恰好有 `then(..)` 函数的一个对象或函数值完成一个 Promise，但并不希望它被当作 Promise 或 `thenable`，可能会遇到麻烦。

## Promise 信任问题

回顾一下只用回调编码的信任问题。把一个回调传入工具 `foo(..)` 时可能出现如下问题：

- 调用回调过早；
- 调用回调过晚（或不被调用）；
- 调用回调次数过少或过多；
- 未能传递所需的环境和参数；
- 吞掉可能出现的错误和异常。

### 调用早晚

根据定义，Promise 就不必担心调用过早（如一个任务有时同步完成，有时异步完成）问题，因为即使是立即完成的 Promise，提供给 `then(..)` 的回调也总会被异步调用。

解决调用过晚和前面一点类似，Promise 创建对象调用 `resolve(..)` 或 `reject(..)` 时，这个 Promise 的 `then(..)` 注册的观察回调就会被自动调度。可以确信，这些被调度的回调在下一个异步事件点上一定会被触发。

如果两个 `romise` `p1` 和 `p2` 都已经决议，那么 `p1.then(..)` `p2.then(..)` 应该最终会先调用 `p1` 的回调，然后是 `p2` 的那些。但还有一些微妙的场景可能不是这样的，比如以下代码：

```js
var p3 = new Promise(function(resolve, reject) {
  resolve('B')
})
var p1 = new Promise(function(resolve, reject) {
  resolve(p3)
})

p2 = new Promise(function(resolve, reject) {
  resolve('A')
})
p1.then(function(v) {
  console.log(v)
})
p2.then(function(v) {
  console.log(v)
})
// A B
```

如你所见，`p1` 不是用立即值而是用另一个 `promise` `p3` 决议，后者本身决议为值 "B"。规定的行为是把 `p3` 展开到 `p1`，但是是异步地展开。所以，在异步任务队列中，`p1` 的回调排在 `p2` 的回调之后。

要避免这样的细微区别带来的噩梦，你永远都不应该依赖于不同 Promise 间回调的顺序和调度。

### 回调未调用

没有任何东西（甚至 JavaScript 错误）能阻止 Promise 向你通知它的决议（如果它决议了的话）。如果你对一个 Promise 注册了一个完成回调和一个拒绝回调，那么 Promise 在决议时总是会调用其中的一个。

但是，如果 Promise 本身永远不被决议呢？即使这样，Promise 也提供了解决方案，其使用了一种称为竞态的高级抽象机制：

```js
// 用于超时一个 Promise 的工具
function timeoutPromise(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('Timeout')
    }, delay)
  })
}

// 设置 foo() 超时
Promise.race([
  foo(), // 试着开始 foo()
  timeoutPromise(3000), // 给它 3 秒钟
]).then(
  function() {
    // foo(..) 及时完成
  },
  function(err) {
    // 或者 foo() 被拒绝，或者只是没能按时完成
    // 查看 err 来了解是哪种情况
  },
)
```

很重要的一点是，我们可以保证一个 `foo()` 有一个输出信号，防止其永久挂住程序。

### 调用次数/参数传递

根据定义，回调被调用的正确次数应该是 1。“过少”的情况就是调用 0 次，和前面解释过的“未被”调用是同一种情况。

“过多”的情况很容易解释。由于 Promise 只能被决议一次，所以任何通过 `then(..)` 注册的（每个）回调就只会被调用一次。

如果出于某种原因，Promise 创建代码试图调用 `resolve(..)` 或 `reject(..)` 多次，或者试图两者都调用，那么这个 Promise 将只会接受第一次决议，并默默地忽略任何后续调用。

当然，如果你把同一个回调注册了不止一次（比如 p.then(f); p.then(f);），那它被调用的次数就会和注册次数相同。。

对于参数或环境值的传递，在 Promise 至多只能有一个决议值（完成或拒绝）。

如果你没有用任何值显式决议，那么这个值就是 `undefined`，而不管这个值是什么，无论当前或未来，它都会被传给所有注册的（且适当的完成或拒绝）回调。

如果要传递多个值，你必须要把它们封装在单个值中传递，比如通过一个数组或对象。

对环境来说，JavaScript 中的函数总是保持其定义所在的作用域的闭包，所以它们当然可以继续访问你提供的环境状态。当然，对于只用回调的设计也是这样，因此这并不是 Promise 特有的优点——但不管怎样，这仍是我们可以依靠的一个保证。

### 吞掉错误或异常

如果拒绝一个 Promise 并给出一个理由（也就是一个出错消息），这个值就会被传给拒绝回调。

如果在 Promise 的创建过程中或在查看其决议结果过程中的任何时间点上出现了一个 JavaScript 异常错误，比如一个 TypeError 或 ReferenceError，那这个异常就会被捕捉，并且会使这个 Promise 被拒绝。

但是，如果 Promise 完成后在查看结果时（then(..) 注册的回调中）出现了 JavaScript 异常错误会怎样呢？即使这些异常不会被丢弃，但你会发现，对它们的处理方式还是有点出乎意料：

```js
var p = new Promise(function(resolve, reject) {
  resolve(42)
})

p.then(
  function fulfilled(msg) {
    foo.bar()
    console.log(msg)
  },
  function rejected(err) {
    // 永远也不会到达这里
  },
)
```

`p.then(..)` 调用本身返回了另外一个 `promise`，正是这个 `promise` 将会因这里 TypeError 异常而被拒绝。

### 是可信任的 Promise 吗

Promise 并没有完全摆脱回调。它们只是改变了传递回调的位置。我们并不是把回调传递给 `foo(..)`，而是从 `foo(..)` 得到某个东西（外观上看是一个真正的 Promise），然后把回调传给这个东西。

但是，为什么这就比单纯使用回调更值得信任呢？关于 Promise 的很重要但是常常被忽略的一个细节是，Promise 对这个问题已经有一个解决方案。下面两者的行为是完全一样的：

```js
var p1 = new Promise(function(resolve, reject) {
  resolve(42)
})
var p2 = Promise.resolve(42)
```

如果向 `Promise.resolve(..)` 传递一个非 Promise、非 `thenable` 的立即值，就会得到一个用这个值填充的 `promise`。而如果向 `Promise.resolve(..)` 传递一个真正的 Promise，就只会返回同一个 `promise`。

更重要的是，如果向 `Promise.resolve(..)` 传递了一个非 Promise 的 `thenable` 值，前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类 Promise 的最终值。

## 链式流

Promise 并不只是一个单步执行 this-then-that 操作的机制，我们可以把多个 Promise 连接到一起以表示一系列异步步骤，源于：

- 每次你对 Promise 调用 `then(..)`，它都会创建并返回一个新的 Promise，我们可以将其链接起来；
- 不管从 `then(..)` 调用的完成回调（第一个参数）返回的值是什么，它都会被自动设置为被链接 Promise（第一点中的）的完成。

```js
Promise.resolve(21)
  .then(function(v) {
    console.log(v) // 21
    return v * 2
  })
  .then(function(v) {
    console.log(v) // 42
  })
```

现在第一个 `then(..)` 就是异步序列中的第一步，第二个 `then(..)` 就是第二步。这可以一直任意扩展下去。只要保持把先前的 `then(..)` 连到自动创建的每一个 Promise 即可。

如果要步骤 2 等待步骤 1 异步来完成一些事情怎么办？`Promise.resolve(..)` 会直接返回接收到的真正 Promise，或展开接收到的 `thenable` 值，并在持续展开 `thenable` 的同时递归地前进。

从完成（或拒绝）处理函数返回 `thenable` 或者 Promise 的时候也会发生同样的展开。

```js
Promise.resolve(21)
  .then(function(v) {
    console.log(v) // 21
    // 创建一个 promise 并将其返回
    return new Promise(function(resolve, reject) {
      resolve(v * 2)
    })
  })
  .then(function(v) {
    console.log(v) // 42
  })
```

如果这个 Promise 链中的某个步骤出错了怎么办？错误和异常是基于每个 Promise 的，这意味着可能在链的任意位置捕捉到这样的错误，而这个捕捉动作在某种程度上就相当于在这一位置将整条链“重置”回了正常运作。

## 错误处理

对多数开发者来说，错误处理最自然的形式就是同步的 `try..catch` 结构。遗憾的是，它只能是同步的，无法用于异步代码模式：

```js
function foo() {
  setTimeout(function() {
    baz.bar()
  }, 100)
}

try {
  foo()
  // 后面从 `baz.bar()` 抛出全局错误
} catch (err) {
  // 永远不会到达这里
}
```

在回调中，一些模式化的错误处理方式已经出现，最值得一提的是 `error-first` 回调风格，严格说来，这一类错误处理是支持异步的，但完全无法很好地组合。

多级 `error-first` 回调交织在一起，再加上这些无所不在的 `if` 检查语句，都不可避免地导致了回调地狱的风险。

Promise 没有采用流行的 `error-first` 回调设计风格，而是使用了分离回调（split-callback）风格。一个回调用于完成情况，一个回调用于拒绝情况。

默认情况下，它假定你想要 Promise 状态吞掉所有的错误。如果你忘了查看这个状态，这个错误就会默默地在暗处凋零死掉。

为了避免丢失被忽略和抛弃的 Promise 错误，一些开发者表示，Promise 链的一个最佳实践就是最后总以一个 `catch(..)` 结束。但新的 `catch(..)` 它很可能也会失败，怎么破？

## Promise 模式

在经典的编程术语中，门（gate）是这样一种机制要等待两个或更多并行 / 并发的任务都完成才能继续。它们的完成顺序并不重要，但是必须都要完成，门才能打开并让流程控制继续。

在 Promise API 中，这种模式被称为 `all([ .. ])`。

`Promise.all([ .. ])` 需要一个参数，是一个数组，通常由 Promise 实例组成。从 `Promise.all([ .. ])` 调用返回的 `promise` 会收到一个完成消息。这是一个由所有传入 `promise` 的完成消息组成的数组，与指定的顺序一致（与完成顺序无关）。

从 `Promise.all([ .. ])` 返回的主 `promise` 在且仅在所有的成员 `promise` 都完成后才会完成。如果这些 `promise` 中有任何一个被拒绝的话，主 `promise` 就会立即被拒绝，并丢弃来自其他所有 `promise` 的全部结果。

尽管 `Promise.all([ .. ])` 协调多个并发 Promise 的运行，并假定所有 Promise 都需要完成，但有时候你会想只响应“第一个跨过终点线的 Promise”，而抛弃其他 Promise。

这种模式传统上称为门闩，但在 Promise 中称为竞态。

`Promise.race([ .. ])` 也接受单个数组参数。这个数组由一个或多个 Promise、`thenable` 或立即值组成。一旦有任何一个 Promise 决议为完成，`Promise.race([ .. ])` 就会完成；一旦有任何一个 Promise 决议为拒绝，它就会拒绝。

那些被丢弃或忽略的 `promise` 会发生什么呢？从性能的角度来看，通常最终它们会被垃圾回收。从行为的角度（副作用等）来看，Promise 不能被取消，也不应该被取消，所以它们只能被默默忽略。

Promise 提供了 `finally()` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

### 并发迭代

有些时候会需要在一列 Promise 中迭代，并对所有 Promise 都执行某个任务，非常类似于对同步数组可以做的那样（比如 forEach(..)、map(..)、some(..) 和 every(..)）。如果要对每个 Promise 执行的任务本身是同步的：

```js
if (!Promise.map) {
  Promise.map = function(vals, cb) {
    return Promise.all(
      vals.map(function(val) {
        return new Promise(function(resolve) {
          cb(val, resolve)
        })
      }),
    )
  }
}

var p1 = Promise.resolve(21)
var p2 = Promise.resolve(42)
var p3 = Promise.reject('Oops')
// 把列表中的值加倍，即使是在 Promise 中
Promise.map([p1, p2, p3], function(pr, done) {
  // 保证这一条本身是一个 Promise
  Promise.resolve(pr).then(
    // 提取值作为v
    function(v) {
      // map 完成的 v 到新值
      done(v * 2)
    },
    // 或者 map 到 promise 拒绝消息
    done,
  )
}).then(function(vals) {
  console.log(vals) // [42, 84, "Oops"]
})
```

## 局限性

Promise 链中的错误很容易被无意中默默忽略掉。

当在 `then(..)` 中指定了错误回调，那么这个错误将不会触发后续由 `catch(..)` 指定的回调。如果这个错误已经被 `try...catch` 捕获，那么这个错误将不会影响到 Promise 的状态。

Promise 只能有一个完成值或一个拒绝理由。

通常的建议是构造一个值封装（比如一个对象或数组）来保持这样的多个信息。有时候你可以把这一点当作提示你可以/应该把问题分解为两个或更多 Promise 的信号。

Promise 只能被决议一次（完成或拒绝）。

在许多异步情况中，你只会获取一个值一次，所以这可以工作良好，但一些类似于事件和/或数据流的模式可能没法很好的处理。

Promise 提供了一种不同的范式，因此，编码方式的改变程度从某处的个别差异到某种情况下的截然不同都有可能。你需要刻意的改变，因为 Promise 不会从目前的编码方式中自然而然地衍生出来。

多数 Promise 库提供了辅助工具，让一些格式的回调转换为支持 Promise 的函数。

Promise 一旦创建并为其注册了完成和/或拒绝处理函数，如果出现某种情况使得这个任务悬而未决的话，你也没有办法从外部停止它的进程。

一种选择是侵入式地定义你自己的决议回调。

Promise 中需要移动的部分数量相对于基本的基于回调的异步任务链来进行比较，很显然，它进行的动作要多一些，这自然意味着它也会稍慢一些。

虽然稍慢一些，但是作为交换，你得到的是大量内建的可信任性、对 Zalgo 的避免以及可组合性。

## 参考

- [Promise 对象 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/promise)
