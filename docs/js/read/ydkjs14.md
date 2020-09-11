# YDKJS-生成器

JavaScript 开发者在代码中几乎普遍依赖的一个假定：一个函数一旦开始执行，就会运行到结束，期间不会有其他代码能够打断它并插入其间。不过 ES6 引入了一个新的函数类型，它并不符合这种运行到结束的特性。这类新的函数被称为生成器。

```js
var x = 1
function bar() {
  x++
}
function* foo() {
  x++
  yield // 暂停
  console.log('x: ', x)
}
```

生成器就是一类特殊的函数，可以一次或多次启动和停止，并不一定非得要完成。

## 输入和输出

生成器函数虽然特殊，但它仍然是一个函数，这意味着它仍然有一些基本的特性没有改变。比如，它仍然可以接受参数（即输入），也能够返回值（即输出）。

调用生成器会得到一个迭代器对象，通过上面的 `next(..)` 方法可以让生成器开始执行，然后停在下一个 `yield` 处或者直到生成器结束。

其中 `next(..)` 调用的结果是一个对象，它有一个 `value` 属性，持有从生成器中返回的值（如果有的话）。换句话说，`yield` 会导致生成器在执行过程中发送出一个值，这有点类似于中间的 `return`。

除了能够接受参数并提供返回值之外，生成器甚至提供了更强大更引人注目的内建消息输入输出能力，通过 `yield` 和 `next(..)` 实现：

```js
function* foo(x) {
  var y = x * (yield 1)
  return y
}
var it = foo(6)
it.next().value // 1
var res = it.next(7)
res.value // 42
```

消息是双向传递的——`yield..` 作为一个表达式可以发出消息响应 `next(..)` 调用，`next(..)` 也可以向暂停的 `yield` 表达式发送值。

## 多个迭代器

从语法使用的方面来看，通过一个迭代器控制生成器的时候，似乎是在控制声明的生成器函数本身。但有一个细微之处很容易忽略：每次构建一个迭代器，实际上就隐式构建了生成器的一个实例，通过这个迭代器来控制的是这个生成器实例。

```js
function* foo() {
  var x = yield 2
  z++
  var y = yield x * z
  console.log(x, y, z)
}
var z = 1
var it1 = foo()
var it2 = foo()
var val1 = it1.next().value // 2 <-- yield 2
var val2 = it2.next().value // 2 <-- yield 2
val1 = it1.next(val2 * 10).value // 40 <-- x:20, z:2
val2 = it2.next(val1 * 5).value // 600 <-- x:200, z:3
it1.next(val2 / 2)
// 20 300 3
it2.next(val1 / 4)
// 200 10 3
```

通过生成器让函数交替执行（甚至在语句当中）已成为可能。

## 生成器产生值

假定你要产生一系列值，其中每个值都与前面一个有特定的关系。要实现这一点，需要一个有状态的生产者能够记住其生成的最后一个值。

```js
var gimmeSomething = (function() {
  var nextVal
  return function() {
    if (nextVal === undefined) {
      nextVal = 1
    } else {
      nextVal = 3 * nextVal + 6
    }
    return nextVal
  }
})()

gimmeSomething() // 1
gimmeSomething() // 9
gimmeSomething() // 33
gimmeSomething() // 105
```

示例直接使用函数闭包来实现，实际上，这个任务是一个非常通用的设计模式，通常通过迭代器来解决。

迭代器是一个定义良好的接口，用于从一个生产者一步步得到一系列值。JavaScript 迭代器的接口，与多数语言类似，就是每次想要从生产者得到下一个值的时候调用 `next()`。

可以为我们的数字序列生成器实现标准的迭代器接口：

```js
var something = (function(max) {
  var nextVal
  return {
    // for..of循环需要
    [Symbol.iterator]: function() {
      return this
    },
    // 标准迭代器接口方法
    next: function() {
      if (nextVal === undefined) {
        nextVal = 1
      } else {
        nextVal = 3 * nextVal + 6
      }
      if (nextVal >= max) {
        return { done: true, value: nextVal }
      }
      return { done: false, value: nextVal }
    },
  }
})(1000)

something.next().value // 1
something.next().value // 9
something.next().value // 33
something.next().value // 105
```

ES6 还新增了一个 `for..of` 循环，这意味着可以通过原生循环语法自动迭代标准迭代器。

### iterable

前面例子中的 `something` 对象叫作迭代器，因为它的接口中有一个 `next()` 方法。而与其紧密相关的一个术语是 `iterable`（可迭代），即指一个包含可以在其值上迭代的迭代器的对象。

从 ES6 开始，从一个 `iterable` 中提取迭代器的方法是：`iterable` 必须支持一个函数，其名称是专门的 ES6 符号值 `Symbol.iterator`。调用这个函数时，它会返回一个迭代器。通常每次调用会返回一个全新的迭代器，虽然这一点并不是必须的。

生成器本身并不是 `iterable`，尽管非常类似——当你执行一个生成器，就得到了一个迭代器：

```js
function* something() {
  var nextVal
  while (true) {
    if (nextVal === undefined) {
      nextVal = 1
    } else {
      nextVal = 3 * nextVal + 6
    }
    yield nextVal
  }
}
```

这里的 `something` 就是生成器，并不是 `iterable`。我们需要调用 `something()` 来构造一个生产者供 `for..of` 循环迭代：

```js
for (var v of something()) {
  console.log(v)
  // 不要死循环
  if (v > 500) {
    break
  }
}
// 1 9 33 105 321 969
```

看起来似乎 `*something()` 生成器的迭代器实例在循环中的 `break` 调用之后就永远留在了挂起状态。

其实有一个隐藏的特性会帮助你管理此事。`for..of` 循环的“异常结束”（也就是“提前终止”），通常由 `break`、`return` 或者未捕获异常引起，会向生成器的迭代器发送一个信号使其终止。

尽管 `for..of` 循环会自动发送这个信号，但你可能会希望向一个迭代器手工发送这个信号。可以通过调用 `return(..)` 实现这一点。

```js
var it = something()
for (var v of it) {
  console.log(v)
  if (v > 500) {
    console.log(it.return('Hello World').value)
    // 这里不需要 break
  }
}
```

调用 `it.return(..)` 之后，它会立即终止生成器。如果生成器内部有 `try...finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会导致立刻进入 `finally` 代码块，执行完以后，整个函数才会结束。

事实上，如果生成器内有 `try..finally` 语句，它将总是运行，即使生成器已经外部结束。

## 异步迭代生成器

同样的功能我们使用迭代器来实现：

```js
function foo(x, y, cb) {
  ajax('http://some.url.1/?x=' + x + '&y=' + y, cb)
}
foo(11, 31, function(err, text) {
  if (err) {
    console.error(err)
  } else {
    console.log(text)
  }
})

function foo(x, y) {
  ajax('http://some.url.1/?x=' + x + '&y=' + y, function(err, data) {
    if (err) {
      // 向 *main() 抛出一个错误
      it.throw(err)
    } else {
      // 用收到的 data 恢复 *main()
      it.next(data)
    }
  })
}
function* main() {
  try {
    var text = yield foo(11, 31)
    console.log(text)
  } catch (err) {
    console.error(err)
  }
}
var it = main()
// 这里启动
it.next()
```

从本质上而言，我们把异步作为实现细节抽象了出去，使得我们可以以同步顺序的形式追踪流程控制：“发出一个 Ajax 请求，等它完成之后打印出响应结果。”

当然，我们只在这个流程控制中表达了两个步骤，而这种表达能力是可以无限扩展的，以便我们无论需要多少步骤都可以表达。

更精彩的部分在于 `yield` 暂停使我们不仅能够从异步函数调用得到看似同步的返回值，还可以同步捕获来自这些异步函数调用的错误。

## 生成器 +Promise

对于 `yield` 的出来的 `promise`，迭代器会侦听这个 `promise` 的决议（完成或拒绝），然后要么使用完成消息恢复生成器运行，要么向生成器抛出一个带有拒绝原因的错误。

```js
function foo(x, y) {
  return request('http://some.url.1/?x=' + x + '&y=' + y)
}
function* main() {
  try {
    var text = yield foo(11, 31)
    console.log(text)
  } catch (err) {
    console.error(err)
  }
}

var it = main()
var p = it.next().value
// 等待 promise p 决议
p.then(
  function(text) {
    it.next(text)
  },
  function(err) {
    it.throw(err)
  },
)
```

现在，我们利用了已知 `*main()` 中只有一个需要支持 Promise 的步骤这一事实。如果想要能够实现 Promise 驱动的生成器，不管其内部有多少个步骤呢？

### 支持 Promise 的 Generator Runner

我们当然不希望每个生成器手工编写不同的 Promise 链，所以需要有一种方法可以实现重复（即循环）迭代控制：

```js
function run(gen) {
  var args = [].slice.call(arguments, 1),
    it
  // 在当前上下文中初始化生成器
  it = gen.apply(this, args)

  // 返回一个 promise 用于生成器完成
  return Promise.resolve().then(function handleNext(value) {
    // 对下一个 yield 出的值运行
    var next = it.next(value)
    return (function handleResult(next) {
      // 生成器运行完毕了吗？
      if (next.done) {
        return next.value
      }
      // 否则继续运行
      else {
        return Promise.resolve(next.value).then(
          // 成功就恢复异步循环，把决议的值发回生成器
          handleNext,
          // 如果 value 是被拒绝的 promise，
          // 就把错误传回生成器进行出错处理
          function handleErr(err) {
            return Promise.resolve(it.throw(err)).then(handleResult)
          },
        )
      }
    })(next)
  })
}
```

现在，这种运行 `run(..)` 的方式，它会自动异步运行你传给它的生成器，直到结束。

### 生成器中的 Promise 并发

到目前为止，我们已经展示的都是 Promise+ 生成器下的单步异步流程。但是，现实世界中的代码常常会有多个异步步骤：你需要从两个不同的来源获取数据，然后把响应组合在一起以形成第三个请求，最终把最后一条响应打印出来。

```js
function* foo() {
  var r1 = yield request('http://some.url.1')
  var r2 = yield request('http://some.url.2')
  var r3 = yield request('http://some.url.3/?v=' + r1 + ',' + r2)
  console.log(r3)
}

run(foo)
```

这段代码可以完成我们的需求，但是不是最优的。现在的逻辑中第二个请求必须等待第一个请求完成才会发起，而更好的效果是前面两个请求可以同时触发。

但是 `yield` 只是代码中一个单独的暂停点，并不可能同时在两个点上暂停。如何才能让两个请求并发运行呢？最自然有效的答案就是让异步流程基于 Promise：

```js
function* foo() {
  // 让两个请求"并行"
  var p1 = request('http://some.url.1')
  var p2 = request('http://some.url.2')
  // 等待两个 promise 都决议
  var r1 = yield p1
  var r2 = yield p2
  var r3 = yield request('http://some.url.3/?v=' + r1 + ',' + r2)
  console.log(r3)
}

run(foo)
```

作为一个风格方面的提醒：要注意你的生成器内部包含了多少 Promise 逻辑。我们介绍的使用生成器实现异步的方法的全部要点在于创建简单、顺序、看似同步的代码，将异步的细节尽可能隐藏起来。

比如，这可能是一个更简洁的方案：

```js
function bar(url1, url2) {
  return Promise.all([request(url1), request(url2)])
}
function* foo() {
  // 隐藏 bar(..) 内部基于 Promise 的并发细节
  var results = yield bar('http://some.url.1', 'http://some.url.2')
  var r1 = results[0]
  var r2 = results[1]
  var r3 = yield request('http://some.url.3/?v=' + r1 + ',' + r2)
  console.log(r3)
}

run(foo)
```

## 生成器委托

你可能会从一个生成器调用另一个生成器，使用辅助函数 `run(..)`，就像这样：

```js
function* foo() {
  var r2 = yield request('http://some.url.2')
  var r3 = yield request('http://some.url.3/?v=' + r2)
  return r3
}
function* bar() {
  var r1 = yield request('http://some.url.1')
  // 通过 run(..) "委托"给 *foo()
  var r3 = yield run(foo)
  console.log(r3)
}

run(bar)
```

还有一个更好的方法可以实现从 `*bar()` 调用 `*foo()`，称为 yield 委托：

```js
function* foo() {
  var r2 = yield request('http://some.url.2')
  var r3 = yield request('http://some.url.3/?v=' + r2)
  return r3
}
function* bar() {
  var r1 = yield request('http://some.url.1')
  // 通过 yeild* "委托"给 *foo()
  var r3 = yield* foo()
  console.log(r3)
}
run(bar)
```

`yield*` 暂停了迭代控制，而不是生成器控制。当你调用 `*foo()` 生成器时，现在 `yield` 委托到了它的迭代器。一旦迭代器控制消耗了整个 `*foo()` 迭代器就会自动转回控制 `*bar()`。

实际上，`yield` 委托甚至并不要求必须转到另一个生成器，它可以转到一个非生成器的一般 `iterable`。比如：

```js
function* bar() {
  console.log('inside *bar():', yield 'A')
  // yield 委托给非生成器
  console.log('inside *bar():', yield* ['B', 'C', 'D'])
  console.log('inside *bar():', yield 'E')
  return 'F'
}
var it = bar(),
  i = 0,
  next

while (!(next = it.next(i++)).done) {
  console.log('outside:', next.value)
}
console.log('outside:', next.value)
```

这里没有为迭代器没有显式的返回值，所以 `yield*` 表达式完成后得到的是一个 `undefined`。

另外，和 `yield` 委托透明地双向传递消息的方式一样，错误和异常也是双向传递的。

当然，`yield` 委托可以跟踪任意多委托步骤，只要你把它们连在一起。甚至可以使用 `yield` 委托实现异步的生成器递归，即一个 `yield` 委托到它自身的生成器：

```js
function* foo(val) {
  if (val > 1) {
    // 生成器递归
    val = yield* foo(val - 1)
  }
  return yield request('http://some.url/?v=' + val)
}
function* bar() {
  var r1 = yield* foo(3)
  console.log(r1)
}

run(bar)
```

## 生成器并发

两个同时运行的进程可以合作式地交替运作，而很多时候这可以产生（双关，原文为 yield：既指产生又指 yield 关键字）非常强大的异步表示：其中两个不同并发 Ajax 响应处理函数需要彼此协调，以确保数据交流不会出现竞态条件。

```js
// request(..) 是一个支持 Promise 的 Ajax 工具
var res = []
function* reqData(url) {
  var data = yield request(url)
  // 控制转移
  yield
  res.push(data)
}
var it1 = reqData('http://some.url.1')
var it2 = reqData('http://some.url.2')
var p1 = it.next()
var p2 = it.next()
p1.then(function(data) {
  it1.next(data)
})
p2.then(function(data) {
  it2.next(data)
})
Promise.all([p1, p2]).then(function() {
  it1.next()
  it2.next()
})
```

现在 `*reqData(..)` 的两个实例确实是并发运行了，而且（至少对于前一部分来说）是相互独立的。而且还可以做的更好，设想一下创建一个称为 `runAll(..)` 的工具：

```js
var res = []
runAll(
  function*() {
    var p1 = request('http://some.url.1')
    // 控制转移
    yield
    res.push(yield p1)
  },
  function*() {
    var p2 = request('http://some.url.2')
    // 控制转移
    yield
    res.push(yield p2)
  },
)
```

## 形实转换程序

有一个早期的前 JavaScript 概念，称为形实转换程序（thunk）：指一个用于调用另外一个函数的函数，没有任何参数。

简而言之，你用一个函数定义封装函数调用，包括需要的任何参数，来定义这个调用的执行，那么这个封装函数就是一个形实转换程序。之后在执行这个 `thunk` 时，最终就是调用了原始的函数。

```js
function foo(x, y) {
  return x + y
}
function fooThunk() {
  return foo(3, 4)
}
// 将来
console.log(fooThunk()) // 7
```

但如果是异步的 `thunk` 呢？我们可以把这个狭窄的 `thunk` 定义扩展到包含让它接收一个回调。

```js
function foo(x, y, cb) {
  setTimeout(function() {
    cb(x + y)
  }, 1000)
}
function fooThunk(cb) {
  foo(3, 4, cb)
}
// 将来
fooThunk(function(sum) {
  console.log(sum) // 7
})
```

你并不会想手工编写 `thunk`。所以，我们发明一个工具来做这部分封装工作：

```js
function thunkify(fn) {
  var args = [].slice.call(arguments, 1)
  return function(cb) {
    args.push(cb)
    return fn.apply(null, args)
  }
}
var fooThunk = thunkify(foo, 3, 4)
// 将来
fooThunk(function(sum) {
  console.log(sum) // 7
})
```

事实上，在 JavaScript 中使用 thunk 的典型方案是由 `thunkify(..)` 工具产生一个生成 `thunk` 的函数：

```js
function thunkify(fn) {
  return function() {
    var args = [].slice.call(arguments)
    return function(cb) {
      args.push(cb)
      return fn.apply(null, args)
    }
  }
}
```

这和 `promisify(..)` 很类似，所以可以 `yield` 出 Promise 以获得异步性的生成器，也可以为异步性而 `yield thunk`。为此我们所需要的只是一个更智能的 `run(..)` 工具能够向 `yield` 出来的 `thunk` 提供回调：

```js
// ..
// 我们收到返回的 thunk 了吗？
else if (typeof next.value == "function") {
  return new Promise(function (resolve, reject) {
    // 用 error-first 回调调用这个 thunk
    next.value(function (err, msg) {
      if (err) {
        reject(err);
      } else {
        resolve(msg);
      }
    });
  }).then(handleNext, function handleErr(err) {
    return Promise.resolve(it.throw(err)).then(handleResult);
  });
}
```

## 参考

- [Generator 函数的语法 - ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/generator)
