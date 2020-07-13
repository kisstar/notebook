# Tapable

在 `Tapable` 中基于发布订阅模式提供了多个类，包括了不同的使用场景：

| 类名 | 执行方式 | 描述 |
| :-- | :-- | :-- |
| SyncHook | 同步 | 按顺序执行订阅函数，不关心函数的执行结果。 |
| SyncBailHook | 同步 | 当其中一个函数的返回值不为 `undefined`，则直接跳过剩下所有的函数。 |
| SyncWaterfallHook | 同步 | 将上一个函数的执行结果传递给下一个函数。 |
| SyncLoopHook | 同步 | 如果某个函数不返回 `undefined` 则从头执行，否则继续向下执行 |
| AsyncParallelHook | 异步并行 | 多个函数并发执行，可以指定在所有任务完成后执行的回调函数 |
| AsyncParallelBailHook | 异步并行 | 当中间回调函数参数不为空时（或则在 Promise 下调用了 reject 函数），直接执行最后的回调函数 |
| AsyncSeriesHook | 异步串行 | 异步函数依次执行 |
| AsyncSeriesBailHook | 异步串行 | 当中间回调函数参数不为空，直接执行最后的回调函数 |
| AsyncSeriesWaterfallHook | 异步串行 | 中间的回调函数当第一个参数不为 `null` 时会直接执行最后的回调，否则其后参数将作为下一个函数的参数 |

接下来我们将简单的理解一下它们的实现，需要注意的是这里并不是源码解读，只是体现核心的实现原理，提供大家思考和理解的方向。

- **`SyncHook`**，按顺序执行订阅函数。

```javascript
class SyncHook {
  constructor(args) {
    // 存储所有点阅
    this.tasks = []
  }

  /**
   * @description
   * 订阅
   * @param {string} name 标识订阅的函数
   * @param {Function} task 响应函数
   */
  tap(name, task) {
    this.tasks.push(task)
  }

  /**
   * @description
   * 发布订阅
   * @param  {any[]} args 传递给响应函数的参数
   */
  call(...args) {
    this.tasks.forEach(task => task(...args))
  }
}

// =============== Usage ===============

// 所有的构造函数都接收一个可选的字符串数组作为参数，每项是对我们后续传入参数的描述
// 后续传入的参数需要和此处 new 实例的个数保持一致，否则获取不到多传的参数
const queue = new SyncHook(['name'])

queue.tap('HTML', name => {
  console.log(1, name)
})
queue.tap('CSS', name => {
  console.log(2, name)
})
queue.tap('JavaScript', name => {
  console.log(3, name)
})

queue.call('Anani')
```

- **`SyncBailHook`**，按顺序执行订阅函数，直到其中一个返回值不为 `undefined` 或所有任务执行完。

```javascript
class SyncBailHook {
  constructor(args) {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const len = this.tasks.length
    let ret,
      index = 0
    do {
      ret = this.tasks[index++](...args)
    } while (ret === undefined && index < len)
  }
}

// =============== Usage ===============

const queue = new SyncBailHook(['name'])

queue.tap('HTML', name => {
  console.log(1, name)
})
queue.tap('CSS', name => {
  console.log(2, name)
  return null
})
queue.tap('JavaScript', name => {
  console.log(3, name)
})

queue.call('Anani')
// 1 'Anani'
// 2 'Anani'
```

- **`SyncWaterfallHook`**，按顺序执行订阅函数，并将将上一个函数的执行结果传递给下一个函数。

```javascript
class SyncWaterfallHook {
  constructor(args) {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    if (!this.tasks.length) return
    const [first, ...others] = this.tasks
    let ret = first(...args)
    others.reduce((a, b) => {
      return b(a, ...args)
    }, ret)
  }
}

// =============== Usage ===============

const queue = new SyncWaterfallHook(['name'])

queue.tap('HTML', name => {
  console.log(1, name)
  return 'HTML'
})
queue.tap('CSS', data => {
  console.log(2, data)
  return 'CSS'
})
queue.tap('JavaScript', data => {
  console.log(3, data)
})

queue.call('Anani')
// 1 'Anani'
// 2 'HTML'
// 3 'CSS'
```

- **`SyncLoopHook`**，按顺序执行订阅函数，如果某个函数不返回 `undefined` 则从头执行，否则继续向下执行。

```javascript
class SyncLoopHook {
  constructor(args) {
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const len = this.tasks.length
    let ret,
      i = 0
    for (; i < len; i++) {
      ret = this.tasks[i](...args)
      if (ret !== undefined) {
        i = -1
      }
    }
  }
}

// =============== Usage ===============

const queue = new SyncLoopHook(['name'])
let count = 0

queue.tap('HTML', name => {
  console.log(1, name)
})
queue.tap('CSS', name => {
  count++
  console.log(2, name)
  return count === 2 ? undefined : 'CSS'
})
queue.tap('JavaScript', name => {
  console.log(3, name)
})

queue.call('Anani')
// 1 'Anani'
// 2 'Anani'
// 1 'Anani'
// 2 'Anani'
// 3 'Anani'
```

- **`AsyncParallelHook`**，无法保证执行顺序，多个异步函数并发执行。不过我们可以指定一个回调函数在所欲任务完成后执行。

因此，为了知道所有的任务何时完成，每个任务必须再异步操作完成后执行一个指定的回调函数。

```javascript
class AsyncParallelHook {
  constructor(args) {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fallCallback = args.pop()
    const len = this.tasks.length
    let index = 0
    function done() {
      index++
      if (index === len) {
        fallCallback()
      }
    }
    this.tasks.forEach(task => task(...args, done))
  }
}

// =============== Usage ===============

const queue = new AsyncParallelHook(['name'])

queue.tapAsync('HTML', (name, cb) => {
  setTimeout(() => {
    console.log(1, name)
    cb()
  }, 1000)
})
queue.tapAsync('CSS', (name, cb) => {
  setTimeout(() => {
    console.log(2, name)
    cb()
  }, 1000)
})
queue.tapAsync('JavaScript', (name, cb) => {
  setTimeout(() => {
    console.log(3, name)
    cb()
  }, 1000)
})

queue.callAsync('Anani', () => {
  console.log('end')
})
// 1 'Anani'
// 2 'Anani'
// 3 'Anani'
// end

// ============================== 基于 Promise 的实现 ==============================

class AsyncParallelHook {
  constructor(args) {
    this.tasks = []
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    return Promise.all(this.tasks.map(task => task(...args)))
  }
}

// =============== Usage ===============

const queue = new AsyncParallelHook(['name'])

queue.tapPromise('HTML', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1, name)
      resolve()
    }, 1000)
  })
})
queue.tapPromise('CSS', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2, name)
      resolve()
    }, 1000)
  })
})
queue.tapPromise('JavaScript', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3, name)
      resolve()
    }, 1000)
  })
})

queue.promise('Anani').then(() => {
  console.log('end')
})
// 1 'Anani'
// 2 'Anani'
// 3 'Anani'
// end
```

- **`AsyncParallelBailHook`**，无法保证执行顺序，多个异步函数并发执行。当中间回调函数参数为真时（或则在 Promise 下调用了 reject 函数传入参数为真），直接执行最后的回调，但并不会阻止其他函数的执行。

```javascript
class AsyncParallelBailHook {
  constructor(args) {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fallCallback = args.pop()
    const len = this.tasks.length
    let index = 0
    let flag = false
    function done(arg) {
      index++
      if (arg) {
        fallCallback(arg)
        return (flag = true)
      }
      if (index === len && !flag) {
        fallCallback()
      }
    }
    this.tasks.forEach(task => task(...args, done))
  }
}

// =============== Usage ===============

const queue = new AsyncParallelBailHook(['name'])

queue.tapAsync('HTML', (name, cb) => {
  setTimeout(() => {
    console.log(1, name)
    cb(!0)
  }, 1000)
})
queue.tapAsync('CSS', (name, cb) => {
  setTimeout(() => {
    console.log(2, name)
    cb()
  }, 1000)
})
queue.tapAsync('JavaScript', (name, cb) => {
  setTimeout(() => {
    console.log(3, name)
    cb()
  }, 1000)
})

queue.callAsync('Anani', err => {
  console.log(err, 'end')
})
// 1 'Anani'
// true 'end'
// 2 'Anani'
// 3 'Anani'

// 同样的 AsyncParallelBailHook 也有 Promise 的调用方式 ...
```

- **`AsyncSeriesHook`**，异步函数依次执行，它的实现和 `AsyncParallelHook` 很像，只是需要保证监听函数的执行顺序。

```javascript
class AsyncSeriesHook {
  constructor(args) {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fallCallback = args.pop()
    const { tasks } = this
    const len = tasks.length
    let index = 0
    function next() {
      if (index === len) {
        return fallCallback()
      }
      tasks[index++](...args, next)
    }
    next()
  }
}

// =============== Usage ===============

const queue = new AsyncSeriesHook(['name'])

queue.tapAsync('HTML', (name, cb) => {
  setTimeout(() => {
    console.log(1, name)
    cb()
  }, 1000)
})
queue.tapAsync('CSS', (name, cb) => {
  setTimeout(() => {
    console.log(2, name)
    cb()
  }, 2000)
})
queue.tapAsync('JavaScript', (name, cb) => {
  setTimeout(() => {
    console.log(3, name)
    cb()
  }, 1000)
})

queue.callAsync('Anani', () => {
  console.log('end')
})
// 1 'Anani'
// 2 'Anani'
// 3 'Anani'
// end

// ============================== 基于 Promise 的实现 ==============================
// 该库并未提供，这里只是提供一种思想
/*
callAsync(...args) {
  const [first, ...others] = this.tasks;
  return others.reduce((prevPromise, nextFunc) => {
    prevPromise.then(nextFunc(...args));
  }, first(...args));
}
*/
```

- **`AsyncSeriesWaterfallHook`**，异步函数依次执行，每个监听函数的回调函数和 `nodejs` 中的回调函数形式类似，当没有错误发生时，第一个参数需要置为假，这样其后的参数将会传递给下一个监听函数；否则，将直接执行最后的回调函数。

```javascript
class AsyncSeriesWaterfallHook {
  constructor(args) {
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const fallCallback = args.pop()
    const { tasks } = this
    const len = tasks.length
    let index = 0
    function next(...args) {
      const [err, ...data] = args
      if (err || index === len) {
        return fallCallback()
      }
      tasks[index++](...data, next)
    }
    tasks[index++](...args, next)
  }
}

// =============== Usage ===============

const queue = new AsyncSeriesWaterfallHook(['name'])

queue.tapAsync('HTML', (name, cb) => {
  setTimeout(() => {
    console.log(1, name)
    cb(null, 'Sharon')
  }, 1000)
})
queue.tapAsync('CSS', (name, cb) => {
  setTimeout(() => {
    console.log(2, name)
    cb(null, 'Eleven')
  }, 2000)
})
queue.tapAsync('JavaScript', (name, cb) => {
  setTimeout(() => {
    console.log(3, name)
    cb(null)
  }, 1000)
})

queue.callAsync('Anani', () => {
  console.log('end')
})
// 1 'Anani'
// 2 'Sharon'
// 3 'Eleven'
// end
```
