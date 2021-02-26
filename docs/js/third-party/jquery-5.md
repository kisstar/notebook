# jQuery 中的回调

通过 `jQuery.Callbacks()` 函数可以得到一个多用途的回调函数列表对象，提供了一种强大的方式来管理一组回调函数。

`jQuery.Callbacks()` 函数接受一个可选的参数，结构为一个用空格分隔的字符列表 (比如：jQuery.Callbacks('unique stopOnFalse'))，用来改变回调列表中的行为：

| 参数 | 描述 |
| :-- | :-- |
| once | 确保这个回调列表只执行一次 |
| memory | 缓存上一次 `fire` 时的参数值，当 `add()` 添加回调函数时，直接用上一次的参数值立刻调用新加入的回调函数 |
| unique | 一个回调只会被添加一次，不会重复添加 |
| stopOnFalse | 某个回调函数返回 `false` 之后中断后面的回调函数 |

事实上传递的参数也可以是一个对象，可选的属性就是上面列举的四个参数，值为一个布尔值。从源码中可以清晰的看到这点：

```js
jQuery.Callbacks = function(options) {
  // 如果接收到的是一个字符串，则通过 createOptions() 函数得到我们真正需要的配置
  // 否则我们将通过 jQuery.extend() 方法来获取配置，所以这里可以接受一个对象
  options = typeof options === 'string' ? createOptions(options) : jQuery.extend({}, options)
  // ...
}
```

其实，当你传递的是一个字符串时，在内部，最后加工得到的也是一个对象：

```js
var rnothtmlwhite = /[^\x20\t\r\n\f]+/g

// Convert String-formatted options into Object-formatted ones
function createOptions(options) {
  var object = {}
  // 对通过字符串的 match() 方法得到的字符串数组进行遍历，然后将每个字符串作为属性、true 作为值写入结果对象中
  jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
    object[flag] = true
  })
  return object
}
```

现在我们自己来创建一个列表来记录后续注册的回调函数，并提供相应的方法来进行添加回调：

```js
var list = [],
  self = {
    // Handle: add(fn)
    add: function(fn) {
      if (list) {
        if (typeof fn === 'function') {
          list.push(fn)
        }
      }
    },
  }
```

为了支持同时添加多个回调我们可以借助 `arguments` 来实现：

```js
self = {
  // Handle: add(fn1, fn2)
  add: function() {
    if (list) {
      ;[].slice.call(arguments).forEatch(function(fn) {
        if (typeof fn === 'function') {
          list.push(fn)
        }
      })
    }
  },
}
```

那么如果用户想使用数组来直接添加一组回调呢，那么就创建一个辅助函数来完成吧，然后添加一层对各个参数类型的判断，如果是数组则进行递归调用：

```js
self = {
  // Handle: add(fn1, [fn2])
  add: function() {
    if (list) {
      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            list.push(fn)
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)
    }
  },
}
```

现在添加回调的方法是否差不多了，接下来就开始支持触发吧。最简单的就是遍历列表调用回调，同时将 `fire()` 方法接受的第一个参数传递给每个回调：

```js
self = {
  fire: function(value) {
    for (var i = 0; i < list.length; i++) {
      list[i](value)
    }
  },
}
```

试试下面的例子，已经可以开始工作了：

```js
function fn1(value) {
  console.log('fn1: ' + value)
  return false
}
function fn2(value) {
  console.log('fn2: ' + value)
}
function fn3(value) {
  console.log('fn3: ' + value)
}

self.add(fn1)
self.add(fn2)
self.add(fn2)
self.add(fn3)
self.fire()
```

基本的功能实现后再来看看几个配置参数吧，上面我们已经详细介绍了参数的处理方式，这里我们就简单的使用对象形式来进行配置，首先是 `unique` 选项，它确定了一个回调只会被添加一次，不会重复添加。

这个几乎是最简单的选项了。我们只需要在添加之前查看当前列表中是否已经包含了当前回调，只在没有时才添加（和源码一样我们添加一个辅助方法 has 来判断）：

```js
self = {
  // Handle: add(fn1, [fn2])
  add: function() {
    if (list) {
      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            // support unique
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)
    }
  },
  has(fn) {
    return !!~list.indexOf(fn)
  },
}
```

除此之外，再简单的就是 `stopOnFalse` 选项了，它在某个回调函数返回 `false` 之后中断后面的回调函数，所以我们来修改一下 `fire()` 方法：

```js
self = {
  fire: function(value) {
    for (var i = 0; i < list.length; i++) {
      var ret = list[i](value)

      // support stopOnFalse
      if (options.stopOnFalse && ret === false) {
        break
      }
    }
  },
}
```

好的，接着是 `once` 选项，其实这个也很简单，只需要在调用一次 `fire()` 方法后就组织再次调用即可，为此我们可以设置一个标志：

```js
var fired,
  self = {
    fire: function(value) {
      // support once
      if (options.once && fired) {
        return
      }
      fired = true

      for (var i = 0; i < list.length; i++) {
        var ret = list[i](value)
        if (options.stopOnFalse && ret === false) {
          break
        }
      }
    },
  }
```

最后，是一个让人稍微有点疑惑的 `memory` 选项。使用之后会缓存上一次 `fire()` 时的参数值，当 `add()` 添加回调函数时，直接用上一次的参数值立刻调用新加入的回调函数。

因此，首先我们在 `fire()` 执行时记住传递的参数：

```js
var executeData,
  self = {
    fire: function(value) {
      if (options.once && fired) {
        return
      }
      fired = true
      // 记住传递的参数
      executeData = value

      for (var i = 0; i < list.length; i++) {
        var ret = list[i](value)
        if (options.stopOnFalse && ret === false) {
          break
        }
      }
    },
  }
```

接着 `add()` 方法中添加完之后自动触发回调执行：

```js
self = {
  add: function() {
    if (list) {
      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)

      if (options.memory) {
        self.fire(executeData)
      }
    }
  },
}
```

看起来好像可以了，但事实上使用起来会非常的乱。为了实现我们想要的效果其实还需要记录一下我们上次执行到哪个回调了，这样下次触发时只需从上次结束的地方继续。

所以首先在 `add()` 方法中我们设置一下这个值（回调列表的最后一项的索引）：

```js
var firingIndex = -1,
  self = {
    add: function() {
      if (list) {
        // 如果 fire() 函数还没有执行过那么 memory 参数是没有意义的，所以我们在 executeData 有值时在进行处理
        if (options.memory && executeData) {
          firingIndex = list.length - 1
        }

        ;(function add(args) {
          ;[].slice.call(args).forEach(function(fn) {
            if (typeof fn === 'function') {
              if (!options.unique || !self.has(fn)) {
                list.push(fn)
              }
            } else if (Array.isArray(fn)) {
              add(fn)
            }
          })
        })(arguments)

        if (options.memory && executeData) {
          self.fire(executeData)
        }
      }
    },
  }
```

然后就是让 `fire()` 方法在正确的地方开始执行回调（在执行完成后需要重置，以便我们再次调用 fire 方法）：

```js
var self = {
  fire: function(value) {
    if (options.once && fired) {
      return
    }
    fired = true
    executeData = value

    // 将 firingIndex 置为开始的索引
    for (var i = ++firingIndex; i < list.length; i++) {
      var ret = list[i](value)
      if (options.stopOnFalse && ret === false) {
        break
      }
    }

    // 重置 firingIndex，否则回调列表的函数只能触发一次
    firingIndex = -1
  },
}
```

现在似乎好多了，但在 `fire()` 函数中对 `stopOnFalse` 选项的支持出现了新的问题，因为它总是在执行一个回调之后才会去判断是否执行后续的回调，这意味着当我们启用 `options.memory` 选项后，通过 `add()` 方法添加的函数将总是被执行。

一个解决的方法就是在禁止后续回调执行的同时将 `options.memory` 选项置为 `false`，这样后续添加时就不会自动触发回调。但为了不改变用户传入的配置，我们需要使用一个变量来配合工作。

事实上，这个变量已经存在了（就是 executeData），因为在改变回调执行位置和自动触发回调之前，我们都对 `executeData` 进行了判断，如果我们将其置为 `fasle` 的话，那么后续的回调也就不会自动执行了。

为了具备更好的语义，我们就将当前的 `executeData` 变量改名为 `memory` 吧，而在 `add()` 函数中对 `options.memory` 的检查也就可以去掉了：

```js
// 将 executeData 更名为 memory
var memory,
  self = {
    add: function() {
      if (list) {
        // 移除 options.memory
        if (memory) {
          firingIndex = list.length - 1
        }

        ;(function add(args) {
          ;[].slice.call(args).forEach(function(fn) {
            if (typeof fn === 'function') {
              if (!options.unique || !self.has(fn)) {
                list.push(fn)
              }
            } else if (Array.isArray(fn)) {
              add(fn)
            }
          })
        })(arguments)

        // 移除 options.memory
        if (memory) {
          self.fire(memory)
        }
      }
    },
  }
```

同时，更换在 `fire()` 函数中的 `executeData` 变量，并且在停止执行时修改 `memory` 的值。

不仅如此，我们还需要在循环体外根据用户的配置来修改 `memory` 的值，否则它将总是支持 `options.memory` 选项，即使用户并没有传递相应的配置：

```js
var self = {
  fire: function(value) {
    if (options.once && fired) {
      return
    }
    fired = true
    memory = value

    for (var i = ++firingIndex; i < list.length; i++) {
      var ret = list[i](value)
      if (options.stopOnFalse && ret === false) {
        // Jump to end and forget the data so .add doesn't re-fire
        firingIndex = list.length // 目前这行代码没什么用，在源码中它被用来跳出内部循环，而我们这里使用的是 break 关键字
        memory = false
        break
      }
    }

    firingIndex = -1

    // 如果用户没有启用 options.memory 选项，那么我们就应该将 memory 变量置为 false，以免后续自动触发回调
    if (!options.memory) {
      memory = false
    }
  },
}
```

另外，在 `memory` 和 `once` 配合使用时也存在一些问题。

对于选项 `once` 目前确实控制了用户只能触发一次回调，但需要注意的是在配合 `memory` 时，在第一轮触发后添加的函数仍属于第一轮触发，所以它们仍需要被立即触发。

在我们的逻辑中，如果配置了 `once` 选项，那么一旦 `fire()` 方法被调用过就不能再执行后续的回调了，所以我们现在需要作出一些调整。

既然我们需要多次触发，而用户只能调用一次 `fire()` 方法，那么我们就对 `fire()` 方法继续拆分，这里我们将现有的 `fire()` 方法的逻辑移动到一个名为 `fire()` 的私有函数中：

```js
var self = {
  // 提供给用户的方法
  fire: function(value) {
    if (fired) {
      return
    }
    fire(value)
  },
}

// 内部真正用于执行回调的函数
function fire(value) {
  fired = options.once
  memory = value

  for (var i = ++firingIndex; i < list.length; i++) {
    var ret = list[i](value)
    if (options.stopOnFalse && ret === false) {
      firingIndex = list.length
      memory = false
      break
    }
  }

  firingIndex = -1

  if (!options.memory) {
    memory = false
  }
}
```

对应的在 `add()` 方法中我们不再使用现在的 `fire()` 方法而是 `fire()` 函数：

```js
var self = {
  add: function() {
    if (list) {
      if (memory) {
        firingIndex = list.length - 1
      }

      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)

      if (memory) {
        // 改用 fire() 函数
        fire(memory)
      }
    }
  },
}
```

改过之后，基本工作算是可以完成了。问题是，我们在支持 `options.memory` 选项时，有点过于依赖用户的输入了，因为内部的变量 `memory` 指代的是用户触发时传递的参数，如果用户没有传递呢？

这会导致什么问题呢？即使用户将 `options.memory` 置为 true，他也不会得到想要的效果，因为在 `add()` 函数中判断 `memory` 为假时就不会自动触发回调执行了。

怎么解决这个问题呢？答案就是我们将 `memory` 构造成一个对象，里面记录着用户传递的值，这样即使用户触发时传递了假值，`options.memory` 选项的工作依然可以正常工作。

而且，此时我们还可以对现有功能进行扩展，我们不仅可以让用户指定回调执行时得到的参数，同时还可以指定回调执行时的上下文。为了我们提供给用户一个 `fireWith()` 方法，顾名思义就是用什么上下文和参数进行触发：

```js
var self = {
  // Call all callbacks with the given context and arguments
  fireWith: function(context, args) {
    if (!fired) {
      args = args || []
      // 将用户传递的参数包装成一个数组
      args = [context, args.slice ? args.slice() : args]
      memory = args
      fire()
    }
    return this
  },
}
```

对应的，在触发回调执行时需要对上下文和参数进行修改：

```js
function fire() {
  fired = options.once

  for (var i = ++firingIndex; i < list.length; i++) {
    // 绑定指定的 this 值，并提供参数
    var ret = list[i].apply(memory[0], memory[1])
    if (options.stopOnFalse && ret === false) {
      firingIndex = list.length
      memory = false
      break
    }
  }

  firingIndex = -1

  if (!options.memory) {
    memory = false
  }
}
```

之前的 `fire()` 方法的话，内部之前调用现在的 `fireWith()` 方法就可以了：

```js
var self = {
  // Call all the callbacks with the given arguments
  fire: function() {
    self.fireWith(this, arguments)
    return this
  },
}
```

而且，在 `add()` 方法中对于 `options.memory` 选项的支持，自动触发时就不必传递参数了：

```js
var self = {
  add: function() {
    if (list) {
      if (memory) {
        firingIndex = list.length - 1
      }

      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)

      if (memory) {
        // 不必传递参数
        fire()
      }
    }
  },
}
```

离成功又近了一步，不过新的问题又来了。如果我们在某个注册的回调逻辑中增加触发回调的逻辑呢？在触发回调之后会怎么样？

```js
function fn1(value) {
  alert('fn1: ' + value)
}
function fn2(value) {
  alert('fn2: ' + value)
  self.fire('fire inner')
}
function fn3(value) {
  alert('fn3: ' + value)
}

self.add(fn1)
self.add(fn2)
self.add(fn3)
self.fire('fire outter')
```

示例中的代码会进入死循环吗？这里本应该会，但目前的逻辑并不会。因为我们每次都会在一轮回调执行结束之后才会去重置 `firingIndex` 的值，如果在中途再次触发回调的话 ，根据 `firingIndex` 的值会从上次执行的地方继续向后执行。

这样一来 `firingIndex` 总有大于列表长度的时候，那时就会停止执行回调。听起来是否不错（毕竟避免了无限循环），但是它会让回调执行的很乱，用户很难搞清楚自己添加的回调是以怎样的顺序被执行的。

解决方案就是每触发一次回调执行，就检查当前是否在执行回调，如果没有就按部就班的触发回调；否则，内部先将指定的触发参数用队列保存起来，在一轮回调执行结束执行再去查看还有没有剩余的参数需要用来触发，如果有则使用对应的参数再来执行一遍回调。

```js
var firing, // 是否正在执行回调的标志
  queque = [], // 存储指定的触发参数
  self = {
    fireWith: function(context, args) {
      if (!fired) {
        args = args || []
        args = [context, args.slice ? args.slice() : args]

        // 总是先将指定的触发参数保存起来
        queue.push(args)

        // 只在非执行状态才直接执行回调，这样如果在执行过程中某个回调中再次触发就仅仅是添加对应的触发参数到队列中
        if (!firing) {
          fire()
        }
      }
      return this
    },
  }
```

那么接下来就是修改 `fire()` 函数在每轮结束后检查参数队列了，很关键的一点就是在每轮执行后我们必须重置 `firingIndex`，否则它还是会像之前一样进行累加：

```js
function fire() {
  fired = options.once

  // 在执行回调前将正在执行的标志置为 true
  firing = true

  // 遍历参数队列，这样就可以在每轮结束后判断其中是否还有需要被用来触发回调的参数
  for (; queue.length; ) {
    memory = queue.shift()

    for (var i = ++firingIndex; i < list.length; i++) {
      // 绑定指定的 this 值，并提供参数
      var ret = list[i].apply(memory[0], memory[1])
      if (options.stopOnFalse && ret === false) {
        firingIndex = list.length
        memory = false
        break
      }
    }

    // 重置 firingIndex，如果在每轮之前重置将会导致 add() 方法中对 firingIndex 的修改变得毫无意义
    firingIndex = -1
  }

  // 回调执行结束修正正在执行的标志
  firing = false

  if (!options.memory) {
    memory = false
  }
}
```

不错，现在上面的例子执行起来清晰多了，它总是会按顺序循环执行添加的三个回调。但对 `options.memory` 选项的支持又出现问题了。

我们在 `add()` 方法中通过对 `memory` 进行判断，如果为真就先记录上次执行的位置，然后在添加完成之后就立即调用 `fire()` 函数进行执行。

首先，如果当前正处于执行状态，那么这里记录执行位置和手动触发是完全没有必要的，因为让其自然添加完成之后，就会在当前轮的后面被自动调用。

其次，单纯的记录位置后调用 `fire()` 函数执行是没有任何意义的，因为在触发时检查的是存储执行参数的队列中还有没有值，所以我们不仅要记录执行位置，同时还要将对应的执行参数放到队列中：

```js
var self = {
  add: function() {
    if (list) {
      // 只在非执行状态才记录位置和保存数据
      if (memory && !firing) {
        firingIndex = list.length - 1
        queue.push(memory)
      }

      ;(function add(args) {
        ;[].slice.call(args).forEach(function(fn) {
          if (typeof fn === 'function') {
            if (!options.unique || !self.has(fn)) {
              list.push(fn)
            }
          } else if (Array.isArray(fn)) {
            add(fn)
          }
        })
      })(arguments)

      // 只在非执行状态才自动触发回调执行
      if (memory && !firing) {
        fire()
      }
    }
  },
}
```

到目前为止，整个回调管理的核心逻辑已经完成了。为了高度还原源代码我们再来看一下我们的 `fire()` 函数，在其内部使用了两个 `for` 循环，而源码中使用的是 `for` 和 `while` 循环，现在我们来调整一下我们的代码：

```js
function fire() {
  fired = options.once

  firing = true

  for (
    ;
    queue.length;
    firingIndex = -1 /* 根据 for 的工作机制，这里重置的逻辑同样会在每轮循环后才执行，和之前的写法是一致的 */
  ) {
    memory = queue.shift()

    while (++firingIndex < list.length) {
      if (options.stopOnFalse && list[firingIndex].apply(memory[0], memory[1]) === false) {
        firingIndex = list.length // 之前我们用 break 来跳出内部循环，所以这行代码实际上没什么用，但现在它被用在这里来跳出内部循环
        memory = false
      }
    }
  }

  firing = false

  if (!options.memory) {
    memory = false
  }
}
```

接着就是一些扩展功能了，其中 `lock()` 方法通过改变 `locked` 变量的值来禁止用户再触发回调。

现阶段我们使用的是 `fired` 变量要来禁止用户再触发回调的，不过事实上 `fired` 变量的指责仅仅是记录当前回调队列有没有被执行过，具体的拦截工作需要交给 `locked` 变量来完成，所以需要做一些调整：

```js
var locked,
  self = {
    fireWith: function(context, args) {
      if (!locked /* 替换 fired 为 locked，根据 locked 的值来决定是否继续触发回调 */) {
        args = args || []
        args = [context, args.slice ? args.slice() : args]

        queue.push(args)

        if (!firing) {
          fire()
        }
      }
      return this
    },
  }

function fire() {
  // 如果没有被锁住，那么将根据用户传递的参数来决定是否可以进行后续的触发
  locked = locked || options.once

  // 只要调用过 fire 函数，那么就说明已经触发过，所以将 fired 的值置为 true
  fired = firing = true

  for (; queue.length; firingIndex = -1) {
    memory = queue.shift()

    while (++firingIndex < list.length) {
      if (options.stopOnFalse && list[firingIndex].apply(memory[0], memory[1]) === false) {
        firingIndex = list.length
        memory = false
      }
    }
  }

  firing = false

  if (!options.memory) {
    memory = false
  }
}
```

现在，我们只需要将 `locked` 变量变为一个真值就可以阻止再次触发回调了：

```js
var self = {
  // Disable .fire
  lock: function() {
    locked = []
  },
}
```

不仅如此，它还会把保存着触发参数的队列清空，同时在没有启用 `options.memory` 选项的情况下禁用 `add()` 方法（因为此时再添加方法是毫无意义的，锁住后用户没法再进行触发）：

```js
var self = {
  lock: function() {
    // Disable .fire & Abort any pending executions
    locked = queue = []
    // Also disable .add unless we have memory (since it would have no effect)
    if (!memory && !firing) {
      list = memory = ''
    }
    return this
  },
}
```

在上面的实现中，我们只在没有启用 `options.memory` 选项和非执行状态才进行重置。与此对应的 `disable()` 方法，无论当前是否启用了 `options.memory` 选项、此时是什么状态都会直接重置：

```js
var self = {
  // Disable .fire and .add
  // Abort any current/pending executions
  // Clear all callbacks and values
  disable: function() {
    locked = queue = []
    list = memory = ''
    return this
  },
}
```

后者很好理解，但前者如果当前在执行状态就不禁用 `add()` 方法了吗？这和我们之前描述的不太一样啊，事实上，该部分逻辑将会在 `fire()` 函数中执行完回调队列后进行处理：

```js
function fire() {
  locked = locked || options.once
  fired = firing = true

  for (; queue.length; firingIndex = -1) {
    memory = queue.shift()

    while (++firingIndex < list.length) {
      if (options.stopOnFalse && list[firingIndex].apply(memory[0], memory[1]) === false) {
        firingIndex = list.length
        memory = false
      }
    }
  }

  firing = false

  if (!options.memory) {
    memory = false
  }

  // Clean up if we're done firing for good
  if (locked) {
    // Keep an empty list if we have data for future add calls
    if (memory) {
      list = []

      // Otherwise, this object is spent
    } else {
      list = ''
    }
  }
}
```

另外，值得一提的就是用来移除指定回调的 `remove()` 方法。如果被移除的回调的位置在 `firingIndex` 的前面，那么就需要将 `firingIndex` 减一，因为从移除的位置开始，后续的所有项的都会往前移：

```js
function inArray(elem, arr, i) {
  return arr == null ? -1 : indexOf.call(arr, elem, i)
}

var self = {
  // Remove a callback from the list
  remove: function() {
    for (var i = 0; i < arguments.length; i++) {
      var index
      while ((index = inArray(arg, list, index)) > -1) {
        list.splice(index, 1)

        // Handle firing indexes
        if (index <= firingIndex) {
          firingIndex--
        }
      }
    }
    return this
  },
}
```

其它的工具方法就相当比较简单了：

```js
var self = {
  empty: function() {
    if (list) {
      list = []
    }
    return this
  },
  disabled: function() {
    return !list
  },
  locked: function() {
    return !!locked
  },
  fired: function() {
    return !!fired
  },
}
```

现在，完成了。撒花...
