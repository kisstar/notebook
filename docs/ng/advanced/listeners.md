# Angular 是如何监听数据变化的（一）

学好一门框架最好的办法，那就是实现它。

接下来我们将借助 Lo-Dash 库来处理一些在数组和对象上的底层操作，慢慢的构建一个简单的 AngularJS 框架，虽然该框架本身并没有使用 Lo-Dash 库，但是这并不影响，我们更多的是应该关注该框架的主要思想和实现方式。

当我们在使用 AngularJS 框架时，几乎无时无刻不在与 `$scope` 对象打交道，那么它到底是什么呢，我们先从框架中 `$digest` 的实现来逐步理解它。事实上，`$scope` 并不神秘，因为它就是一个普通的 JavaScript 对象，我们通过一个构造函数来获取到它。

```javascript
/**
 * @description
 * 顶级作用域的构造函数
 * @returns { object }
 */
function Scope() {}
```

然后，在 AngularJS 中 `$watch` 和 `$digest` 通常是同时存在的，前者指定了你关心的数据和对应的函数，后者则在你关心的数据发生改变时触发对应的函数。多数时候我们关心的数据不止一个，因此我们使用 `$$watchers` 来进行存储，现在改进一下前面的构造函数。

```javascript
/**
 * @description
 * 顶级作用域的构造函数
 * @returns { object }
 */
function Scope() {
  this.$$watchers = []
}
```

然后实现 `$watch` 方法来将关心的数据和对应的方法存储起来。为了将来便于取消监听因此我们返回一个函数，执行该函数时，将此监听器从数组中移除。

```javascript
/**
 * @description
 * @param { function | string } watchFn 指定关注的数据
 * @param { function } listenerFn 在数据变更时执行的函数
 * @returns { function } 运行该函数可以取消对应的监听
 */
Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn,
  }
  this.$$watchers.push(watcher)
  return function() {
    _.remove(self.$$watchers, watcher)
  }
}
```

最后，我们需要 `$digest` 方法来检测数据是否发生了改变，如果发生了改变则触发相应的函数。

```javascript
/**
 * @description
 * 至少调用一次所有在作用域上注册过的监听器
 * @returns { void }
 */
Scope.prototype.$digest = function() {
  var self = this
  _.forEach(this.$$watchers, function(watcher) {
    var newValue = watcher.watchFn(self)
    var oldValue = watcher.last
    if (newValue !== oldValue) {
      watcher.last = newValue
      watcher.listenerFn(newValue, oldValue, self)
    }
  })
}
```

可见在上面的函数中，我们使用 `last` 属性来存储了上一次监听的值，并在每次改变后更新它的值。不过问题是现在它并没有初始值（undefined），当使用的开发者给定的初始值就是 `undefined` 时，那么它是无法检测到变化的。

为了解决上面的问题，我们可以在添加监听相关的信息时，给定 `last` 属性的初始值为一个函数，因为函数在 JavaScript 中只与它自己相等。

```javascript
/**
 * @description
 * 作为监听'对象'的初始值
 */
function initWatchVal() {}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn,
    last: initWatchVal,
  }
  // ... 省略部分代码
}
```

不过我们不能把这个函数暴露给使用的开发者，因为这会造成误解，因此在传递给处理函数时需要进行一次判断。

```javascript
Scope.prototype.$digest = function() {
  var self = this
  _.forEach(this.$$watchers, function(watcher) {
    var newValue = watcher.watchFn(self)
    var oldValue = watcher.last
    if (newValue !== oldValue) {
      watcher.last = newValue
      watcher.listenerFn(newValue, oldValue === initWatchVal ? undefined : oldValue, self)
    }
  })
}
```

现在还有两个显著的问题，我们实现的 `$watch` 目前第一个参数只能接受函数，但是在 AngularJS 中它同时支持字符串，而且第二个参数如果没有传入函数也将会报错，我们需要对这两中清空进行处理。

首先检测第一个参数如果是字符串，则读取当前 `Scope` 对象上对应的值，然后创建一个空函数，如果第二个参数不是函数时就用空函数代替。

```javascript
/**
 * @description
 * 空函数
 */
function noop() {}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var self = this
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn,
    last: initWatchVal,
  }
  if (_.isString(watchFn)) {
    watcher.watchFn = function() {
      return _.get(self, watchFn.split('.'))
    }
  }
  if (!_.isFunction(listenerFn)) {
    watcher.listenerFn = noop
  }
  this.$$watchers.push(watcher)
  // ... 省略部分代码
}
```

现在看起来基本的功能已经实现了，但事实上目前位置如果在处理函数中改变了监听的数据，那么程序是感知不到的，因此我们需要创建 `$digest` 循环，直到监听的所有数据不再发生变化为止。

我们把现在的 `$digest` 函数改名为 `$$digestOnce`，它把所有的监听器运行一次，返回一个布尔值，表示数据是否是脏的。

```javascript
/**
 * @description
 * 数据改变时执行对应的处理函数
 * @returns { boolean } 数据是否是脏的
 */
Scope.prototype.$$digestOnce = function() {
  var self = this
  var dirty = false
  var newValue, oldValue
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self)
    oldValue = watcher.last
    if (newValue !== oldValue) {
      watcher.last = newValue
      dirty = true
      watcher.listenerFn(newValue, oldValue === initWatchVal ? undefined : oldValue, self)
    }
  })
  return dirty
}
```

然后，我们重新定义 `$digest`，它作为一个“外层循环”来运行，当有变更发生的时候，调用 `$$digestOnce` 函数。不过需要注意的是，有时候会发生监听的数据一直在改变的情况，为了防止无休止的 `$digest` 循环，我们需要设置最大的循环次数。

```javascript
var TTL = 10 // 最大循环次数

/**
 * @description
 * 至少调用一次所有在作用域上注册过的监听器
 * 如果数据产生改变则重复调用，直到所有监控的值都不再变化（规定最大次数为 10）
 * @returns { void }
 */
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  do {
    dirty = this.$$digestOnce()
    if (dirty && !ttl--) {
      throw '10 digest iterations reached'
    }
  } while (dirty)
}
```

这里有一个需要优化的地方就是在一次 `$digest` 循环中，我们会把所有的 `watch` 都执行一遍，然后在所有的数据不再改变或到达 TTL 边界之前会继续整个循环。事实上我们可以记录上一次循环中最后一个脏值所在的 `watcher`，后一次脏值检测到该值已经不脏时就可以直接跳出循环了，因为此时所有的数据已经是干净的。

我们使用 `$$lastDirtyWatch` 来记录上一次脏值所在的 `watcher`。

```javascript
function Scope() {
  this.$$watchers = [] // 存储监听器的相关信息，包括监听的数据和对应的处理函数等
  this.$$lastDirtyWatch = null // 前一次循环中最后的脏值所在的 watcher 对象
}
```

在每一次执行 `$digest` 时将 `$$lastDirtyWatch` 置为 `null` 以保证第一轮的完整循环。

```javascript
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  this.$$lastDirtyWatch = null
  // ... 省略部分代码
}
```

在数据发生改变时，将 `$$lastDirtyWatch` 执行对应的 `watcher`，这样就取到了上一次脏值所在的 `watcher`。然后遇到干净的值进行判断，如果等于记录的值则直接退出遍历。

```javascript
Scope.prototype.$$digestOnce = function() {
  // ... 省略部分代码
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self)
    oldValue = watcher.last
    if (newValue !== oldValue) {
      self.$$lastDirtyWatch = watcher
      // ... 省略部分代码
    } else if (self.$$lastDirtyWatch === watcher) {
      return false // exit iteration
    }
  })
  return dirty
}
```

同时为了避免 `$watch` 嵌套（在 `$watch` 的处理函数中添加 `$watch`）使用带来的不良影响（在此次检测第二轮循环中，后者出现在记录的 `watcher` 后面，所以不会被执行），我们需要在每次添加 `watcher` 时重置 `$$lastDirtyWatch`。

```javascript
Scope.prototype.$watch = function(watchFn, listenerFn) {
  // ... 省略部分代码
  this.$$lastDirtyWatch = null
  return function() {
    _.remove(self.$$watchers, watcher)
  }
}
```

回到 `$$digestOnce` 函数中，我们使用了绝对等于来判断值前后是否发生了改变。这存在一个明显的问题，当我们关注的数据是一个对象时，如果该对象上面的属性发生变化时，我们是感知不到的，为了解决这个问题我们通过 `$watch` 函数传入的第三个函数来开启基于值的检测，它会遍历对象的属性来进行对应的判断。

```javascript
Scope.prototype.$watch = function(watchFn, listenerFn, objectEquality) {
  var self = this
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn,
    last: initWatchVal,
    eq: !!objectEquality,
  }
  // ... 省略部分代码
}
```

现在我们在 `$$digestOnce` 中检测相应 `watcher` 的 `eq` 属性的值来使用不同的判断规则。这里有两点需要注意，在 JavaScript 中 `NaN` 和任何值都不相等，包括它自己，所以需要进行特殊判断，否则会触及 TTL；另外，就是在开启对对象进行值的比较时，存储新值的时候不能直接赋值，而是对其进行一次深拷贝。

```javascript
Scope.prototype.$$digestOnce = function() {
  var self = this
  var dirty = false
  var newValue, oldValue, equal
  _.forEach(this.$$watchers, function(watcher) {
    newValue = watcher.watchFn(self)
    oldValue = watcher.last
    equal = watcher.eq
      ? _.isEqual(newValue, oldValue)
      : newValue === oldValue || (_.isNaN(newValue) && _.isNaN(oldValue))
    if (newValue !== oldValue && !equal) {
      self.$$lastDirtyWatch = watcher
      watcher.last = watcher.eq ? _.cloneDeep(newValue) : newValue
      dirty = true
      watcher.listenerFn(newValue, oldValue === initWatchVal ? undefined : oldValue, self)
    } else if (self.$$lastDirtyWatch === watcher) {
      return false // exit iteration
    }
  })
  return dirty
}
```

在 AngularJS 中，有几种方式可以在作用域的上下文上执行代码，最简单的一种就是 `$eval` 函数。它使用一个函数作参数，所做的事情是立即执行这个传入的函数，并且把当前 `Scope` 当作参数传递给它，返回的是这个函数的返回值。`$eval` 也可以有第二个参数，它所做的仅仅是把这个参数传递给这个函数。

```javascript
/**
 * @description
 * 把当前作用域和一个传入的参数作为参数传给传入的函数并立即执行这个函数
 * @param { function } 需要运行的函数或表达式
 * @param { any } 传递给运行函数的参数
 * @returns { any } 取决于传入的函数
 */
Scope.prototype.$eval = function(expr, locals) {
  expr(this, locals)
}
```

其实，我们熟知的 `$apply` 方法就是基于脏值检测和 `$eval` 方法来实现的，使用函数作参数，它用 `$eval` 执行这个函数，最后通过 `$digest` 触发 `digest` 循环。

```javascript
/**
 * @description
 * 执行传入的函数后触发 digest 循环
 * @param { function } 需要被执行的函数
 * @returns { void }
 */
Scope.prototype.$apply = function(expr) {
  try {
    return this.$eval(expr)
  } finally {
    this.$digest()
  }
}
```

但在 AngularJS 中有一种延迟代码的方式，就是使用 `$evalAsync` 函数。它接受一个函数，把它放到队列中，然后在当前正持续的 `digest` 中或者下一次 `digest` 之前执行（你可以在一个监听器的监听函数中延迟执行一些代码，即使它已经被延迟了，仍然会在现有的 `digest` 遍历中被执行）。

实现这个功能，我们使用 `$$asyncQueue` 来记录队列中成员。

```javascript
function Scope() {
  this.$$watchers = [] // 存储监听器的相关信息，包括监听的数据和对应的处理函数等
  this.$$lastDirtyWatch = null // 前一次循环中最后的脏值所在的 watcher 对象
  this.$$asyncQueue = [] // 异步队列，在当前正持续的 digest 中或者下一次 digest 之前执行
}
```

然后，我们实现 `$evalAsync` 函数来将指定的方法加入到队列中。

```javascript
/**
 * @description
 * 将指定的函数加入到异步队列中
 * @param { function } 加入到执行队列的函数
 * @returns { void }
 */
Scope.prototype.$evalAsync = function(expr) {
  this.$$asyncQueue.push({
    scope: this,
    expression: expr,
  })
}
```

最后在 `digest` 之前对队列中的成员进行一次调用。

```javascript
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  this.$$lastDirtyWatch = null
  do {
    while (this.$$asyncQueue.length) {
      var asyncTask = this.$$asyncQueue.shift()
      asyncTask.scope.$eval(asyncTask.expression)
    }
    dirty = this.$$digestOnce()
    if (dirty && !ttl--) {
      throw '10 digest iterations reached'
    }
  } while (dirty)
}
```

目前还存在一个问题，就是如果我们在 `$watch` 中通过 `$evalAsync` 添加成员。

```javascript
var scope = new Scope()
scope.num = 0
scope.asyncEvaluatedTimes = 0
scope.$watch(function(scope) {
  if (scope.asyncEvaluatedTimes < 2) {
    scope.$evalAsync(function(scope) {
      scope.asyncEvaluatedTimes++
      console.log(scope.asyncEvaluatedTimes)
    })
  }
  return scope.num
})
scope.$digest()
```

按理上面 `$$asyncQueue` 中的成员在一次 `$digest` 循环中应该被调用两次，但是由于在第二调用前由于检测到数据是干净的，所有就会退出循环，从而导致队列中的成员也不会被调用了，而我们期望的时，它应该在本次启动的循环中执行，因此我们需要改变一下退出循环的条件。

```javascript
Scope.prototype.$digest = function() {
  // ... 省略部分代码
  do {
    // ... 省略部分代码
  } while (dirty || this.$$asyncQueue.length)
}
```

可见，上面我们列举的例子中我们使用了判断，以确定是否添加队列，如果忘记设定条件，那么队列永远也不会是空的，这样就会一直调用 `$digest` 循环。因此，我们必须设置一个临界点，在达到时也抛出异常。

```javascript
Scope.prototype.$digest = function() {
  // ... 省略部分代码
  do {
    // ... 省略部分代码
    if ((dirty || this.$$asyncQueue.length) && !ttl--) {
      throw '10 digest iterations reached'
    }
  } while (dirty || this.$$asyncQueue.length)
}
```

`$evalAsync` 需要确定要延迟执行的函数队列会“很快”被执行，由于它的执行依赖 `$digest` 循环，因此我们需要知道当前是否有 `$digest` 循环，如果没有则需要启动循环。我们通过 `$$phase` 来记录当前正在执行的工作。

首先我们创建两个函数来控制`$$phase` 的值。

```javascript
/**
 * @description
 * 设置程序所处阶段名称
 * @param { string } phase 设置的阶段名称
 * @returns { void }
 */
Scope.prototype.$beginPhase = function(phase) {
  if (this.$$phase) {
    throw this.$$phase + ' already in progress.'
  }
  this.$$phase = phase
}

/**
 * @description
 * 清除当前程序所在阶段的描述
 * @returns { void }
 */
Scope.prototype.$clearPhase = function() {
  this.$$phase = null
}
```

初始时 `$$phase` 的值应该是空。

```javascript
function Scope() {
  this.$$watchers = [] // 存储监听器的相关信息，包括监听的数据和对应的处理函数等
  this.$$lastDirtyWatch = null // 前一次循环中最后的脏值所在的 watcher 对象
  this.$$asyncQueue = [] // 异步队列，在当前正持续的 digest 中或者下一次 digest 之前执行
  this.$$phase = null // 当前程序所处的阶段
}
```

当处于 `$digest` 循环时，它应该是 `$digest`，并在结束后清除。

```javascript
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  var asyncTask
  this.$$lastDirtyWatch = null
  this.$beginPhase('$digest')
  do {
    while (this.$$asyncQueue.length) {
      asyncTask = this.$$asyncQueue.shift()
      asyncTask.scope.$eval(asyncTask.expression)
    }
    dirty = this.$$digestOnce()
    if ((dirty || this.$$asyncQueue.length) && !ttl--) {
      this.$clearPhase()
      throw '10 digest iterations reached'
    }
  } while (dirty || this.$$asyncQueue.length)
  this.$clearPhase()
}
```

当 `$apply` 调用期间它应该是 `$apply`，并在结束后清除。

```javascript
Scope.prototype.$apply = function(expr) {
  try {
    this.$beginPhase('$apply')
    return this.$eval(expr)
  } finally {
    this.$clearPhase()
    this.$digest()
  }
}
```

最终，把对 `$digest` 的调度放进 `$evalAsync`。它会检测作用域上现有的阶段变量，如果没有（也没有已列入计划的异步任务），就把这个 `digest` 列入计划。

```javascript
Scope.prototype.$evalAsync = function(expr) {
  var self = this
  if (!self.$$phase && self.$$asyncQueue.length) {
    setTimeout(function() {
      if (this.$$asyncQueue.length) {
        this.$digest()
      }
    }, 4)
  }
  self.$$asyncQueue.push({
    scope: self,
    expression: expr,
  })
}
```

现在，我可以保证不管何时、何地，调用 `$evalAsync`，都可以确定有一个 `digest` 会在不远的将来发生。

有时候，特别是在大量的 HTTP 请求存在的地方，我们可能会频繁的调用 `digest`，显然这存在一些不必要的开销。为了处理这种情况引进了 `$$applyAsync` 函数，它有点类似与 `$apply`，但它不会立即执行传入的函数，也不会立即启动 `digest`，它只是将最近的几个 `digest` 合成为一个。

同样的我们一个使用一个属性（\$\$\$applyAsyncQueue ）来记录队列，初始时为一个空数组。

```javascript
function Scope() {
  // ... 省略部分代码
  this.$applyAsyncQueue = [] // 调用队列
}
```

然后实现一个函数来向队列中添加成员，在这个函数中我们把队列中的函数放在一个函数中调用，然后把这个函数给 `$apply` 进行异步调用。

```javascript
/**
 * @description
 * 将指定函数或表达式加入调用队列，进行异步调用
 * 主要目的是优化快速发生的事情($apply())。让他们只需要一个单一的 digest，$$applyAsyncId 正是协助完成此事的
 * @param { function } 将要执行的函数
 * @returns { void }
 */
Scope.prototype.$applyAsync = function(expr) {
  var self = this
  self.$$applyAsyncQueue.push(function() {
    self.$eval(expr)
  })
  setTimeout(function() {
    self.$apply(function() {
      while (self.$$applyAsyncQueue.length) {
        self.$$applyAsyncQueue.shift()()
      }
    })
  }, 4)
}
```

现在为了实现上面提及的优化，我们需要使用一个变量（\$\$applyAsyncId）来记录调用是否已经启动，它的初始值同样为空，然后在调用的时候检测该值，如果未启动则启动异步调用并赋予其值，最后还需要在调用完成后重置该值。

```javascript
function Scope() {
  // ... 省略部分代码
  this.$$applyAsyncId = null // 调用队列的调用 ID
}

Scope.prototype.$applyAsync = function(expr) {
  // ... 省略部分代码
  if (self.$$applyAsyncId === null) {
    self.$$applyAsyncId = setTimeout(function() {
      self.$apply(function() {
        while (self.$$applyAsyncQueue.length) {
          self.$$applyAsyncQueue.shift()()
        }
        self.$$applyAsyncId = null
      })
    }, 4)
  }
}
```

还有一个需要注意的地方，如果一个 `digest` 由于其它原因已经启动了，那么应该在该 `digest` 中执行完调用队列，然后清除计时器。现在先将调用的方法提取出来。

```javascript
/**
 * @description
 * 陆续调用调用队列中的成员后清除
 * @returns { void }
 */
Scope.prototype.$$flushApplyAsync = function() {
  while (this.$$applyAsyncQueue.length) {
    this.$$applyAsyncQueue.shift()()
  }
  this.$$applyAsyncId = null
}
```

然后替换掉最新实现 `$applyAsync` 中的相应部分。

```javascript
Scope.prototype.$applyAsync = function(expr) {
  // ... 省略部分代码
  if (self.$$applyAsyncId === null) {
    self.$$applyAsyncId = setTimeout(function() {
      self.$apply(_.bind(self.$$flushApplyAsync, self))
    }, 4)
  }
}
```

最后，我们需要实现在 `digest` 中执行完调用队列的部分。

```javascript
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  var asyncTask
  this.$$lastDirtyWatch = null
  this.$beginPhase('$digest')
  if (this.$$applyAsyncId) {
    clearTimeout(this.$$applyAsyncId)
    this.$$flushApplyAsync()
  }
  // ... 省略部分代码
}
```

现在在 `digest` 循环前、中都存在相应的函数队列，相应的也存在在 `digest` 循环后执行函数队列，我们使用 `$$postDigestQueue` 来记录。

```javascript
function Scope() {
  // ... 省略部分代码
  this.$$postDigestQueue = [] // 在 digest 循环后执行的函数队列
}
```

我们使用 `$$postDigest` 方法来向其中添加成员。

```javascript
/**
 * @description
 * 向 digest 循环后调用的函数队列中添加成员
 * @param { function } 添加的需要执行的函数
 * @returns { void }
 */
Scope.prototype.$$postDigest = function(fn) {
  this.$$postDigestQueue.push(fn)
}
```

最后，我们在 `digest` 循环的尾部调用队列中的函数。

```javascript
Scope.prototype.$digest = function() {
  // ... 省略部分代码
  this.$clearPhase()
  while (this.$$postDigestQueue.length) {
    this.$$postDigestQueue.shift()()
  }
}
```

目前位置，我们未对传入队列的函数进行过排错处理，它很可能会导致我们的程序出错，显然这是不合理的，我们简单的先将调用函数队列的部分放到 `try-catach` 语句块中，然后把捕获到的错误抛到控制台。

```javascript
Scope.prototype.$$digestOnce = function() {
  var self = this
  var dirty = false
  var newValue, oldValue, equal
  _.forEach(this.$$watchers, function(watcher) {
    try {
      newValue = watcher.watchFn(self)
      oldValue = watcher.last
      equal = watcher.eq
        ? _.isEqual(newValue, oldValue)
        : newValue === oldValue || (_.isNaN(newValue) && _.isNaN(oldValue))
      if (newValue !== oldValue && !equal) {
        self.$$lastDirtyWatch = watcher
        watcher.last = watcher.eq ? _.cloneDeep(newValue) : newValue
        dirty = true
        watcher.listenerFn(newValue, oldValue === initWatchVal ? undefined : oldValue, self)
      } else if (self.$$lastDirtyWatch === watcher) {
        return false // exit iteration
      }
    } catch (err) {
      console.log(err)
    }
  })
  return dirty
}
```

```javascript
Scope.prototype.$digest = function() {
  var ttl = TTL
  var dirty = false
  var asyncTask
  this.$$lastDirtyWatch = null
  this.$beginPhase('$digest')
  if (this.$$applyAsyncId) {
    clearTimeout(this.$$applyAsyncId)
    this.$$flushApplyAsync()
  }
  do {
    while (this.$$asyncQueue.length) {
      try {
        asyncTask = this.$$asyncQueue.shift()
        asyncTask.scope.$eval(asyncTask.expression)
      } catch (err) {
        console.log(err)
      }
    }
    dirty = this.$$digestOnce()
    if ((dirty || this.$$asyncQueue.length) && !ttl--) {
      this.$clearPhase()
      throw '10 digest iterations reached'
    }
  } while (dirty || this.$$asyncQueue.length)
  this.$clearPhase()
  while (this.$$postDigestQueue.length) {
    try {
      this.$$postDigestQueue.shift()()
    } catch (err) {
      console.log(err)
    }
  }
}
```

```javascript
Scope.prototype.$$flushApplyAsync = function() {
  while (this.$$applyAsyncQueue.length) {
    try {
      this.$$applyAsyncQueue.shift()()
    } catch (err) {
      console.log(err)
    }
  }
  this.$$applyAsyncId = null
}
```

还记得我们之前实现的删除监听器的方法吗，它存在一个问题。比如在添加三个监听器时，中间的一个在指定关注的数据后就调用取消监听器的方法，所以在执行到第二个 `watcher` 时，整个 `watcher` 集合都会向左移动，导致在循环中调用不到后一个 `watcher`。

```javascript
var scope = new Scope()
scope.$watch(
  () => {},
  () => console.log(1),
)
var destroyWatch = scope.$watch(
  () => destroyWatch(),
  () => console.log(2),
)
scope.$watch(
  () => {},
  () => console.log(3),
)
scope.$digest()
```

解决的方法就是在添加 `watcher` 时，在整个集合的头部添加，然后从右向左的执行。

```javascript
Scope.prototype.$watch = function(watchFn, listenerFn, objectEquality) {
  // ... 省略部分代码
  this.$$watchers.unshift(watcher)
  this.$$lastDirtyWatch = null
  return function() {
    _.remove(self.$$watchers, watcher)
  }
}

Scope.prototype.$$digestOnce = function() {
  var self = this
  var dirty = false
  var newValue, oldValue, equal
  _.forEachRight(this.$$watchers, function(watcher) {
    // ... 省略部分代码
  })
  return dirty
}
```

现在看起来好像没什么问题了，但是如果我们在第一个 `watcher` 中消除第二个 `watcher` 呢？

```javascript
var scope = new Scope()
scope.$watch(
  () => {},
  () => {
    console.log(1)
    destroyWatch()
  },
)
var destroyWatch = scope.$watch(
  () => {},
  () => console.log(2),
)
scope.$watch(
  () => {},
  () => console.log(3),
)
scope.$digest()
```

上面的例子中，我们成功的检测和执行第一个 `watcher`，然后把其存在了 `$$lastDirtyWatch` 中，紧接着在其处理函数中又消除第二个 `watcher`，所以它会被立即执行第二次，现在由于它关注的值是干净的了，所以同样也不会继续循环，导致从始至终第三个 `watcher` 都没有被执行过。

为了解决这个问题，我们可以在移除 `watcher` 的时候，将 `$$lastDirtyWatch` 的值设置为空。

```javascript
Scope.prototype.$watch = function(watchFn, listenerFn, objectEquality) {
  // ... 省略部分代码
  return function() {
    _.remove(self.$$watchers, watcher)
    self.$$lastDirtyWatch = null
  }
}
```

最后，还有一种情况，如果第一个 `watcher` 不仅仅移除了自己又同时移除了下一个 `watcher` 呢？

```javascript
var scope = new Scope()
var destroyWatch1 = scope.$watch(
  () => {},
  () => {
    console.log(1)
    destroyWatch1()
    destroyWatch2()
  },
)
var destroyWatch2 = scope.$watch(
  () => {},
  () => console.log(2),
)
scope.$watch(
  () => {},
  () => console.log(3),
)
scope.$digest()
```

显然这会导致一个错误（调用不存在的 watcher），解决方法很简单，就是在处理 `watcher` 之前进行一次判断。

```javascript
Scope.prototype.$$digestOnce = function() {
  var self = this
  var dirty = false
  var newValue, oldValue, equal
  _.forEachRight(this.$$watchers, function(watcher) {
    try {
      if (watcher) {
        newValue = watcher.watchFn(self)
        oldValue = watcher.last
        equal = watcher.eq
          ? _.isEqual(newValue, oldValue)
          : newValue === oldValue || (_.isNaN(newValue) && _.isNaN(oldValue))
        if (newValue !== oldValue && !equal) {
          self.$$lastDirtyWatch = watcher
          watcher.last = watcher.eq ? _.cloneDeep(newValue) : newValue
          dirty = true
          watcher.listenerFn(newValue, oldValue === initWatchVal ? undefined : oldValue, self)
        } else if (self.$$lastDirtyWatch === watcher) {
          return false // exit iteration
        }
      }
    } catch (err) {
      console.log(err)
    }
  })
  return dirty
}
```

终于，一次普通的监听处理完成了，不过，有时候我们需要同时监听多个数据，然后具有同一个处理函数。那么要一个个添加吗？

在 AngularJS 还提供了一个 `$watchGroup` 方法来解决这个问题。它的本质就是上面我们说的一个一个的添加，只不过这些工作都是内部自己处理的，我们只需要提供关注的数据和对应的处理函数就好了，现在就来实现它。

```javascript
/**
 * @description
 * 使用一个监听器监听多个数据
 * @param { string[] | function[] } 多个监听对象组成的数组
 * @param { function } 监听对象中有变化时的处理器，可以接受到的参数为新值组成的数组、旧值组成的数组、作用域对象
 * @returns { function } 清除注册的监听组
 */
Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this
  var destroyFunctions = _.map(watchFns, function(watchFn) {
    self.$watch(watchFn, listenerFn)
  })
  return function() {
    _.forEach(destroyFunctions, function(destroyFunction) {
      destroyFunction()
    })
  }
}
```

上面的函数实现得很简单，但它很好得说明了整个原理。

由于我们关注的应该是多个数据，因此我们应该将多个数据变化前后的值都放到一个数组中，以便在处理函数中进行处理，为此我们需要在处理函数下做下改进。

```javascript
Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this
  var newValues = []
  var oldValues = []
  var destroyFunctions = _.map(watchFns, function(watchFn, i) {
    self.$watch(watchFn, function(newValue, oldValue, self) {
      newValues[i] = newValue
      oldValues[i] = oldValue
      listenerFn(newValues, oldValues, self)
    })
  })
  // ... 省略部分代码
}
```

现在关注的数据中任何一个变换都会调用一次处理函数，问题是如果在短时间内，其中的数据多个都发生变换，那么处理函数也将被调用多次，而且新旧值数组中的数据也显得比较混乱，容易使人疑惑。所以我们先把处理函数的调用提取出来，并使用变量（changeReactionScheduled）来记录是否已经调用，如果调用了则不需要再次调用，当然这需要异步来实现，否则直接就执行了，这里我们使用之前实现的 `$evalAsync`。

```javascript
Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this
  var newValues = []
  var oldValues = []
  var changeReactionScheduled = false
  var watchGroupListener = function() {
    listenerFn(newValues, oldValues, self)
    changeReactionScheduled = false
  }
  var destroyFunctions = _.map(watchFns, function(watchFn, i) {
    self.$watch(watchFn, function(newValue, oldValue, self) {
      newValues[i] = newValue
      oldValues[i] = oldValue
      if (!changeReactionScheduled) {
        changeReactionScheduled = true
        self.$evalAsync(watchGroupListener)
      }
    })
  })
  // ... 省略部分代码
}
```

需要注意的是，由于我们用数组记录前后的数据，所以即使第一次数据是相同的，使用者也不能在处理函数中直接用绝对等于来得到为'真'的结果。因此我们需要对第一次做特殊处理，将新旧值都传入同一个对象。

```javascript
Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this
  var newValues = []
  var oldValues = []
  var changeReactionScheduled = false
  var isFirst = true
  var watchGroupListener = function() {
    if (isFirst) {
      isFirst = false
      listenerFn(newValues, newValues, self)
    } else {
      listenerFn(newValues, oldValues, self)
    }
    changeReactionScheduled = false
  }
  // ... 省略部分代码
}
```

最后，对于指定的关注的数据为空时，相当于我们什么也没有做，而在 AngularJS 中它会调用一次指定的监听器，因此我们在这里对参数做一下判断。

```javascript
Scope.prototype.$watchGroup = function(watchFns, listenerFn) {
  var self = this
  var newValues = []
  var oldValues = []
  var changeReactionScheduled = false
  var isFirst = true
  var watchGroupListener = function() {
    if (isFirst) {
      isFirst = false
      listenerFn(newValues, newValues, self)
    } else {
      listenerFn(newValues, oldValues, self)
    }
    changeReactionScheduled = false
  }
  if (!watchFns.length) {
    self.$evalAsync(function() {
      listenerFn(newValues, newValues, self)
    })
    return
  }
  // ... 省略部分代码
}
```

同样的，我们需要对它加上一个类似取消的功能，因此我们对判断的地方进行改进。

```javascript
if (!watchFns.length) {
  var shouldCall = true
  self.$evalAsync(function() {
    if (shouldCall) {
      listenerFn(newValues, newValues, self)
    }
  })
  return function() {
    shouldCall = false
  }
}
```

现在，一个基础的结构已经呈现出来了。
