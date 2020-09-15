# YDKJS-asynquence 库

它并不是异步编程的唯一好选择，在这个领域的确有很多非常好的库。但是，通过把所有这些模式中最好的部分组合到单个库中，`asynquence` 提供了一个独特的视角，而且它还是建立在单个基本抽象之上的：（异步）序列。

通过 `asynquence` 使得 Promise 风格语义的异步流程控制编程完成起来非常简单。

## 序列与抽象设计

理解 `asynquence` 要从理解一个基本的抽象开始：一个任务的一系列步骤，不管各自是同步的还是异步的，都可以整合起来看成一个序列（sequence）。换句话说，一个序列代表了一个任务的容器，由完成这个任务的独立（可能是异步）的步骤组成。

序列中的每个步骤在形式上通过一个 Promise 控制。也就是说，添加到序列中的每个步骤隐式地创建了一个 Promise 连接到之前序列的尾端。由于 Promise 的语义，序列中每个单个步骤的运行都是异步的，即使是同步完成这个步骤也是如此。

另外，序列通常是从一个步骤到一个步骤线性处理的，也就是说步骤 2 要在步骤 1 完成之后开始，以此类推。

当然，可以从现有的序列分叉（fork）出新的序列，这意味着主序列到达流程中的这个点上就会发生分叉。也可以通过各种方法合并序列，包括在流程中的特定点上让一个序列包含另一个序列。

序列有点类似于 Promise 链。然而，通过 Promise 链没有“句柄”可以拿到整个链的引用。拿到的 Promise 引用只代表链中当前步骤以及后面的其他步骤。本质上说，你无法持有一个 Promise 链的引用，除非你拿到链中第一个 Promise 的引用。

很多情况下，持有到整个序列的引用是非常有用的。其中最重要的就是序列的停止或取消。就像我们在第 3 章扩展讨论过的，Promise 本身永远不应该可以被取消，因为这违背了一个基本的设计规则：外部不可变性。

但对序列来说，并没有这样的不可变设计原则，主要是因为序列不会被作为需要不可变值语义的未来值容器来传递。因此，序列是处理停止或取消行为的正确抽象层级。

`asynquence` 序列可以在任何时间被 `abort()`，序列会在这个时间点停止，不会因为任何理由继续进行下去。

## asynquence API

创建序列（一个 asynquence 实例）的方法是通过函数 `ASQ(..)`。没有参数的 `ASQ()` 调用会创建一个空的初始序列，而向 `ASQ(..)` 函数传递一个或多个值，则会创建一个序列，其中每个参数表示序列中的一个初始步骤。

### 步骤

如果一个函数表示序列中的一个普通步骤，那调用这个函数时第一个参数是 `continuation` 回调，所有后续的参数都是从前一个步骤传递过来的消息。直到这个 `continuation` 回调被调用后，这个步骤才完成。一旦它被调用，传给它的所有参数将会作为消息传入序列中的下一个步骤。

要向序列中添加额外的普通步骤，可以调用 `then(..)`（这本质上和 ASQ(..) 调用的语义完全相同）：

```js
ASQ(
  // 步骤1
  function(done) {
    setTimeout(function() {
      done('Hello')
    }, 100)
  },
  // 步骤2
  function(done, greeting) {
    setTimeout(function() {
      done(greeting + ' World')
    }, 100)
  },
)
  // 步骤3
  .then(function(done, msg) {
    setTimeout(function() {
      done(msg.toUpperCase())
    }, 100)
  })
  // 步骤4
  .then(function(done, msg) {
    console.log(msg) // HELLO WORLD
  })
```

通过 `then(..)` 定义的每个步骤都被假定为异步的。如果你有一个同步的步骤，那你可以直接调用 `done(..)`，也可以使用更简单的步骤辅助函数 `val(..)`：

```js
// 步骤1（同步）
ASQ(function(done) {
  done('Hello') // 手工同步
})
  // 步骤2（同步）
  .val(function(greeting) {
    return greeting + ' World'
  })
  // 步骤3（异步）
  .then(function(done, msg) {
    setTimeout(function() {
      done(msg.toUpperCase())
    }, 100)
  })
  // 步骤4（同步）
  .val(function(msg) {
    console.log(msg)
  })
```

可以把 `val(..)` 看作一个表示同步的“只有值”的步骤，可以用于同步值运算、日志记录及其他类似的操作。

### 错误

与 Promise 相比，`asynquence` 一个重要的不同之处就是错误处理。

通过 Promise，链中每个独立的 Promise（步骤）都可以有自己独立的错误，接下来的每个步骤都能处理（或者不处理）这个错误。这个语义的主要原因（再次）来自于对单独 Promise 的关注而不是将链（序列）作为整体。

多数时候，序列中某个部分的错误通常是不可恢复的，所以序列中后续的步骤也就没有意义了，应该跳过。因此，在默认情况下，一个序列中任何一个步骤出错都会把整个序列抛入出错模式中，剩余的普通步骤会被忽略。

如果你确实需要一个错误可恢复的步骤，有几种不同的 API 方法可以实现，比如 `try(..)` 或者 `until(..)`（一个重试循环，会尝试步骤直到成功或者你手工使用 break()）。`asynquence` 甚至还有 `pThen(..)` 和 `pCatch(..)` 方法，它们和普通的 Promise 的 `then(..)` 和 `catch(..)` 的工作方式完全一样。因此，如果你愿意的话，可以定制序列当中的错误处理。

关键在于，你有两种选择，但根据我的经验，更常用的是默认的那个。在 Promise 链中需要小心地避免在任意步骤中注册拒绝处理函数。否则的话，这个错误就会因被当作已经处理的而被吞掉，同时这个序列可能会继续（很可能是出乎意料的）。

和使用 Promise 类似，所有的 JavaScript 异常都成为了序列错误，或者你也可以编写代码来发送一个序列错误信号：

```js
var sq = ASQ(function(done) {
  setTimeout(function() {
    // 为序列发送出错信号
    done.fail('Oops')
  }, 100)
})
  .then(function(done) {
    // 不会到达这里
  })
  .or(function(err) {
    console.log(err) // Oops
  })
  .then(function(done) {
    // 也不会到达这里
  })
// 之后
sq.or(function(err) {
  console.log(err) // Oops
})
```

如你所见，`asynquence` 为注册一个序列错误通知处理函数提供了一个 `or(..)` 序列方法。这个方法还有一个别名，`onerror(..)`。你可以在序列的任何地方调用这个方法，也可以注册任意多个处理函数。这很容易实现多个不同的消费者在同一个序列上侦听，以得知它有没有失败。从这个角度来说，它有点类似错误事件处理函数。

在 Promise 中，对于出现的错误如果没有注册拒绝处理函数，那么被拒绝 Promise 就会默默地持有（即吞掉）这个错误。你需要记得总要在链的尾端添加一个最后的 `catch(..)`。而在 asynquence 中，如果一个序列中发生了错误，并且此时没有注册错误处理函数，那这个错误就会被报告到控制台。

可能在一些情况下你会想创建一个序列，这个序列可能会在你能够注册处理函数之前就进入了出错状态。在这样的情况下，你可以选择通过对这个序列调用 `defer()` 来避免这个序列实例的错误报告。应该只有在确保你最终会处理这种错误的情况下才选择关闭错误报告：

```js
var sq1 = ASQ(function(done) {
  doesnt.Exist() // 将会向终端抛出异常
})
var sq2 = ASQ(function(done) {
  doesnt.Exist() // 只抛出一个序列错误
})
  // 显式避免错误报告
  .defer()
setTimeout(function() {
  sq1.or(function(err) {
    console.log(err) // ReferenceError
  })
  sq2.or(function(err) {
    console.log(err) // ReferenceError
  })
}, 100)
// ReferenceError (from sq1)
```

### 并行步骤

并非序列中的所有步骤都恰好执行一个（异步）任务。序列中的一个步骤中如果有多个子步骤并行执行则称为 `gate(..)`（还有一个别名 all(..)，如果你愿意用的话），和原生的 `Promise.all([..])` 直接对应。

如果 `gate(..)` 中所有的步骤都成功完成，那么所有的成功消息都会传给下一个序列步骤。如果它们中有任何一个出错的话，整个序列就会立即进入出错状态。

```js
ASQ(function(done) {
  setTimeout(done, 100)
})
  .gate(
    function(done) {
      setTimeout(function() {
        done('Hello')
      }, 100)
    },
    function(done) {
      setTimeout(function() {
        done('World', '!')
      }, 100)
    },
  )
  .val(function(msg1, msg2) {
    console.log(msg1) // Hello
    console.log(msg2) // [ "World", "!" ]
  })
```

## 序列分叉

关于 Promise，有一个可能会非常有用的特性，那就是可以附加多个 `then(..)` 处理函数注册到同一个 promise；在这个 promise 处有效地实现了分叉流程控制：

```js
var p = Promise.resolve(21)
// 分叉1（来自p）
p.then(function(msg) {
  return msg * 2
}).then(function(msg) {
  console.log(msg) // 42
})
// 分叉2 （来自p）
p.then(function(msg) {
  console.log(msg) // 21
})
```

在 `asynquence` 里可使用 `fork()` 实现同样的分叉：

```js
var sq = ASQ(..).then(..).then(..);
var sq2 = sq.fork();
// 分叉1
sq.then(..)..;
// 分叉2
sq2.then(..)..;
```

## 合并序列

如果要实现 `fork()` 的逆操作，可以使用实例方法 `seq(..)`，通过把一个序列归入另一个序列来合并这两个序列：

```js
var sq = ASQ(function(done) {
  setTimeout(function() {
    done('Hello World')
  }, 200)
})
ASQ(function(done) {
  setTimeout(done, 100)
})
  // 将sq序列纳入这个序列
  .seq(sq)
  .val(function(msg) {
    console.log(msg) // Hello World
  })
```

正如这里展示的，`seq(..)` 可以接受一个序列本身，或者一个函数。如果它接收一个函数，那么就要求这个函数被调用时会返回一个序列。

这个步骤也可以通过 `pipe(..)` 来完成：

```js
// ..
.then( function(done){
 // 把sq加入done continuation回调
 sq.pipe( done );
} )
// ..
```

如果一个序列被包含，那么它的成功消息流和出错流都会输入进来。

## 值与错误序列

如果序列的某个步骤只是一个普通的值，这个值就映射为这个步骤的完成消息：

```js
var sq = ASQ(42)
sq.val(function(msg) {
  console.log(msg) // 42
})
```

如果你想要构建一个自动出错的序列：

```js
var sq = ASQ.failed('Oops')
ASQ()
  .seq(sq)
  .val(function(msg) {
    // 不会到达这里
  })
  .or(function(err) {
    console.log(err) // Oops
  })
```

## Promise 与回调

通过实例方法 `promise(..)` 很容易把一个 `promise`（比如一个 thenable）归入到一个序列中：

```js
var p = Promise.resolve(42)
ASQ()
  .promise(p) // 也可以： function(){ return p; }
  .val(function(msg) {
    console.log(msg) // 42
  })
```

你还可能想要为某个工具创建一个序列封装的版本，类似于 `promisory` 和 `thunkory`，`asynquence` 为此提供了 `ASQ.wrap(..)`：

```js
var coolUtility = ASQ.wrap(someAsyncFuncWithCB)
coolUtility(1, 2)
  .val(function(msg) {
    // ..
  })
  .or(function(err) {
    // ..
  })
```

## 可迭代序列

序列的一般范式是每个步骤负责完成它自己，这也是使序列前进的原因。Promise 的工作方式也是相同的。

不幸的是，有时候需要实现对 Promise 或步骤的外部控制，这会导致棘手的 capability extraction 问题。

```js
var domready = new Promise(function(resolve, reject) {
  // 不需把这个放在这里，因为逻辑上这属于另一部分代码
  document.addEventListener('DOMContentLoaded', resolve)
})
// ..
domready.then(function() {
  // DOM就绪
})
```

使用 Promise 的 capability extraction 反模式看起来类似如下：

```js
var ready
var domready = new Promise(function(resolve, reject) {
  // 提取resolve()功能
  ready = resolve
})
// ..
domready.then(function() {
  // DOM就绪！
})
// ..
document.addEventListener('DOMContentLoaded', ready)
```

`asynquence` 提供了一个反转的序列类型，我称之为可迭代序列，它把控制能力外部化了（对于像 domready 这样的用例非常有用）：

```js
// 注：这里的domready是一个控制这个序列的迭代器
var domready = ASQ.iterable()
// ..
domready.val(function() {
  // DOM就绪
})
// ..
document.addEventListener('DOMContentLoaded', domready.next)
```

## 运行生成器

在 `asynquence` 也内建有叫作 `runner(..)` 的工具用于运行生成器。

```js
function doublePr(x) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(x * 2)
    }, 100)
  })
}
function doubleSeq(x) {
  return ASQ(function(done) {
    setTimeout(function() {
      done(x * 2)
    }, 100)
  })
}

ASQ(10, 11)
  .runner(function*(token) {
    var x = token.messages[0] + token.messages[1]
    // yield一个真正的promise
    x = yield doublePr(x)
    // yield一个序列
    x = yield doubleSeq(x)
    return x
  })
  .val(function(msg) {
    console.log(msg) // 84
  })
```

你也可以创建一个自封装的生成器，也就是说，通过 `ASQ.wrap(..)` 包装实现一个运行指定生成器的普通函数，完成后返回一个序列。
