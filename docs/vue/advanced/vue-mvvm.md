# 从无到有，理清 Vue 中的响应式原理

作为 `Vue` 最独特的特性之一，非侵入性的响应式系统帮助我们在状态改变时实时的更新视图，让我们可以更多的专注于业务逻辑，使开发变得更加顺利。

接下来，我们会根据响应式原理着手实现一个简单的响应式系统，从而进一步了解 `Vue` 中响应式系统的工作方式。

## Object.defineProperty

由于 `Vue2.x` 中的响应式系统是基于 `Object.defineProperty()` 方法实现的，因此我们有必要对它进行学习和掌握。

通过 `Object.defineProperty()` 方法可以精确地添加或修改对象的某个属性。对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。

对于存取描述符而言，我们可以控制属性是否可枚举、是否可配置，更关键的是可以设置 `getter-setter` 函数。

如果我们没有设置相应的 `getter-setter` 函数的话，则默认为 `undefined`。当我们设置了 `getter` 函数时，访问其对应的属性时，该函数将会执行，函数的返回值也就是我们读取到的属性值。

相应的，当我们修改一个属性时，其对应的 `setter` 函数就会执行，此时我们就可以对 `getter` 函数的返回值做一些修改，当然也可以是其它的。

结合一个例子，来看看它们是如何设置和执行的。

```javascript
const obj = Object.defineProperty(Object.create(null), 'name', {
  configurable: true, // 可配置
  enumerable: true, // 可枚举
  // 由于设置了 getter-setter 函数，所以该属性描述符为存取描述符
  get: function() {
    console.log('获取属性')
    return this._value
  },
  set: function(newValue) {
    console.log('设置属性')
    this._value = newValue
  },
})

obj.name = 'Sharon' // 设置属性
console.log(obj.name) // 获取属性 // Sharon
```

现在当我们获取或设置 `obj` 对象上的 `name` 属性时，其实就是在操作对象上的 `_value` 属性，相当于我们在中间劫持了原本的工作模式，重要的是现在我们可以在 `getter-setter` 函数中做更多的事情。

## 更进一步

显然，如果我们要在数据模型（普通的 JavaScript 对象）改变时同步更新视图，那么我们只需要用在数据发生改变时执行更新视图的程序就可以了，而上面的 `setter` 函数刚好可以做到这一点。

比如，现在我们有一个普通的对象，当我们改变该对象上的 `name` 属性时，想要调用 `updateView` 函数对视图进行更新，只需要像下面这样。

```javascript
const updateView = () => console.log('视图更新')

const obj = Object.defineProperty(Object.create(null), 'name', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this._value
  },
  set: function(newValue) {
    if (newValue === this._value) {
      return
    }
    this._value = newValue
    updateView() // 当属性值改变时，调用更新视图的函数
  },
})

obj.name = 'Anani' // 视图更新
```

现在每当改变 `name` 属性的值时就可以正确的提示视图更新了。当然我们也做了一点优化，如果新值和旧值相同的话，刷新视图是毫无意义的，因此我们排除了这种情况。

然而，现在也只能在 `name` 属性的值发生变化时同步更新视图，再进一步我们需要提取出一些公共的逻辑，让一个对象的任一个属性值发生改变时都能触发视图更新。

## 劫持多个属性

接下来，我们实现一个 `observe` 函数来对接收到的对象进行数据劫持，并将核心的逻辑提取到 `defineReactive` 函数中。

```javascript
const defineReactive = (target, key, value) => {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      value = newValue
      updateView()
    },
  })
}

const observe = target => {
  if (!target || typeof target !== 'object') {
    return
  }

  // 遍历获取对象属性，使每个属性成为 reactive 属性
  Object.entries(target).forEach(([key, value]) => {
    defineReactive(target, key, value)
  })
}
```

来测试一下吧。

```javascript
const obj = {
  name: 'Anani',
  age: 18,
}
observe(obj)
obj.name = 'Sharon' // 视图更新
obj.age = 17 // 视图更新
```

和我们预想的一样，在我们改变 `name` 和 `age` 属性时都提示了视图更新。

## 嵌套对象

虽然 `observe` 函数可以让对象的属性值在改变时同步更新视图，但却只能是第一层的属性，当我们改变第二层的属性是得不到任何响应的。

```javascript
const obj = {
  name: {
    firstName: 'Anani',
  },
}
observe(obj)
obj.name.firstName = 'Sharon' // 目前，这里的改动将得不到提示
```

如果想要对深层的属性进行劫持，我们就需要遍历对象的属性，然后对每个属性的值再次调用 `observe` 函数。

```javascript
const defineReactive = (target, key, value) => {
  observe(value) // 递归实现深度观察
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      value = newValue
      updateView()
    },
  })
}
```

现在，上面的例子又可以正常工作了。

## 新的对象

对于普通对象现在已经工作得很好了，但如果我们将一个属性的值指向另一个新的对象时，操作这个新的对象的属性，依然会得不到任何提示。

```javascript
const obj = {
  name: {
    firstName: 'Anani',
  },
}
observe(obj)
obj.name = {
  firstName: 'Sharon',
}
obj.name.firstName = 'Eleven' // 目前，这里的改动将得不到提示
```

因此，我们需要在改变属性时，对新值调用 `observe` 函数。

```javascript
const defineReactive = (target, key, value) => {
  observe(value)
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      // 观察新增属性值
      observe(newValue)
      value = newValue
      updateView()
    },
  })
}
```

很好，这个问题也被解决了。

## 数组方法

目前，普通对象已经可以适应多种情况了，但是对于数组而言，调用一些可以改变原数组的原型方法时我们却得不到提示。

```javascript
const obj = {
  name: ['Anani', 'Sharon'],
}
observe(obj)
obj.name.push('Eleven') // 目前，这里的改动将得不到提示
```

为了解决这个问题，我们需要对数组原型上的几个方法进行劫持，以在改变时通知视图改变。

当然，我们不必改变所有数组的原型方法，只需要在 `observe` 函数中，对需要被观察的数组进行函数劫持就可以了。

```javascript
const arrayProto = Array.prototype
const newProto = Object.create(arrayProto)
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
methodsToPatch.forEach(method => {
  newProto[method] = function(...args) {
    const result = arrayProto[method].call(this, ...args)
    // 在调用原生的方法之后，调用更新视图的函数
    updateView()
    return result
  }
})

const observe = target => {
  if (!target || typeof target !== 'object') {
    return
  }
  if (Array.isArray(target)) {
    Object.setPrototypeOf(target, newProto)
    target.forEach(item => observe(item))
  } else {
    Object.entries(target).forEach(([key, value]) => {
      defineReactive(target, key, value)
    })
  }
}
```

现在，已经解决好了吗？

## 数组新增元素

上面我们已经对数组的特定方法做了改变，看起来好像可以正确的更新视图了，但是，当我们更改数组中新增对象元素的属性时，却无法得到提示，因为我们并没有对其进行观察。

```javascript
const obj = {
  name: ['Anani', 'Sharon'],
}
observe(obj)
obj.name.push({
  firstName: '',
})
obj.name[obj.name.length - 1].firstName = 'Eleven' // 目前，这里的改动将得不到提示
```

现在，我们就来添加对新增的元素的处理。

```javascript
methodsToPatch.forEach(method => {
  newProto[method] = function(...args) {
    let inserted // 新增元素
    const result = arrayProto[method].call(this, ...args)
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {
      // 观察新增元素
      inserted.forEach(item => observe(item))
    }
    updateView()
    return result
  }
})
```

再试试吧。

## 观察者模式

到此，我们已经通过数据劫持实现了数据改动触发视图更新的逻辑，但是这里更新视图的函数（updateView）却是被写死的，因此我们需要将它提取出来，以解决更多的问题。

在进一步实现之前，我们需要了解一下观察者模式，它属于软件设计模式的一种。

在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。

现在我们使用一个 `Dep` 类创建目标对象来管理所有相依于它的观察者对象。

```javascript
class Dep {
  // 任意时刻活动的 Watcher 只有一个，所以可放在静态属性上，以便设置或获取
  static target = null

  constructor() {
    this.subs = []
  }

  addDep(wtcher) {
    this.subs.push(wtcher)
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}
```

以及一个 `Watcher` 类来创建观察者对象。

```javascript
class Watcher {
  constructor() {
    Dep.target = this
  }

  update() {
    console.log('视图更新')
  }
}
```

那么这与响应式系统有何关系呢？就像上面所说的，对于一个响应式对象，其中一个属性的变更影响的往往不仅是一个 `updateView` 函数这么简单，我们需要把更多的依赖项收集起来，以便在改变时发出通知。

所以，我们为每个属性创建一个 `Dep` 实例来管理依赖，而这些依赖项对应的其实就是一个 `Watcher` 的实例。

接着，就来将前面实现的响应式基础和观察者模式结合起来吧。

## 依赖收集

首先，如何才能知道谁会关心当前属性的变更呢？其实不难想象，谁读取了当前属性，那么就可以被理解为是依赖当前属性的，这时候 `getter` 函数就发挥它的作用了。

由于每个 `getter` 函数会在读取对应的属性时被执行，所以我们只需要在此时将当前的 `Watcher` 加入到订阅队列中，然后在改变时发布通知就可以了。

```javascript
const defineReactive = (target, key, value) => {
  observe(value)

  // 每个属性对应一个管理 Watcher 们的目标对象
  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target)
      }
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      observe(newValue)
      value = newValue
      // 当属性改变时同时每个 Watcher 执行
      dep.notify()
    },
  })
}
```

如何使用？

```javascript
const obj = {
  name: 'Anani',
}
observe(obj)
new Watcher() // 在构造函数中将 Dep.targe 指向当前 Watcher 实例
obj.name // 触发 name 属性的 getter 函数，添加当前 Dep.targe 到依赖（subs）中
// 改变属性，依赖数组中的 watcher 将会被执行
obj.name = 'Sharon' // 视图更新
```

它如想象般正确执行了，但在一些数组方法中，我们又失去了提醒视图更新的功能，因为我们无法拿到当前属性对应的 `Dep` 实例，也就无法调用其上的 `notify` 方法。

## Observer

现在，我们创建一个 `Observer` 类来结合前面几部分的工作。

首先需要改变一下现在 `observer` 函数的实现，因为其中部分工作是在 `Observer` 类中完成的，它只是负责检查和调用的工作。

```javascript
const observe = target => {
  if (!target || typeof target !== 'object') {
    return
  }

  // 我们会为每一个响应式数据添加一个 __ob__ 属性
  // 所以通过这个属性我们可以判断接受的目标是否已经存在 observer
  // 如果存在则直接返回现有的
  if (target.hasOwnProperty('__ob__') && target.__ob__ instanceof Observer) {
    return target.__ob__
  }

  // 否则创建一个新的，并返回结果
  return new Observer(target)
}
```

随后，将观察的工作移植到了 `Observer` 类中实现。

需要注意的是我们不仅将 `Observer` 的实例定义到了该对象的 `__ob__` 属性上，而且还在 `Observer` 的实例上添加了一个 `Dep` 的实例，这也是数组改变能够通知视图变化的关键。

```javascript
class Observer {
  constructor(target) {
    this.dep = new Dep()
    Object.defineProperty(target, '__ob__', {
      value: this,
      enumerable: false,
      writable: true,
      configurable: true,
    }) // 指定指向 Observer 实例的特有属性

    if (Array.isArray(target)) {
      Object.setPrototypeOf(target, newProto)
      target.forEach(item => observe(item))
    } else {
      Object.entries(target).forEach(([key, value]) => {
        defineReactive(target, key, value)
      })
    }
  }
}
```

现在在特定的数组方法中我们就可以取到 `Dep` 的实例了。

## 更进一步的数组方法

```javascript
methodsToPatch.forEach(method => {
  newProto[method] = function(...args) {
    let inserted
    // 获取 Observer 实例
    const ob = this.__ob__
    const result = arrayProto[method].call(this, ...args)
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {
      inserted.forEach(item => observe(item))
    }
    // 通知变化
    ob.dep.notify()
    return result
  }
})
```

测试一下。

```javascript
const obj = {
  name: ['Anani'],
}
observe(obj)
new Watcher()
obj.name.push('Sharon')
```

好吧，好像并没有什么输出，这是为什么呢？

## 再进一步

因为我们在调用改写后的数组方法时，其中获取的 `this.__ob__.dep.subs` 中并没有 `Wtcher` 实例，也就是说没有正确的添加上依赖，所以是得不到通知的。

回想一下调用 `observe` 函数后的执行过程，当我们在 `defineReactive` 函数中为 `name` 属性设置 `getter/setter` 时，递归的将它的值传给了 `observer` 函数。

由于对于数组我们只会改变其原型上的特定方法，所以不会走到 `defineReactive` 函数中去添加依赖，那么如何让其得到正确的依赖关系呢？

我们知道每次调用 `observe` 函数后，对于对象总是会返回它的 `Observe` 实例，所以我们可以在上一层中调用 `observe` 函数时拿到结果，然后进行判断，如果存在则向其中也添加依赖。

```javascript
const defineReactive = (target, key, value) => {
  // 拿到下层的 Observer 实例
  let childOb = observe(value)

  const dep = new Dep()
  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.addDep(Dep.target)

        if (childOb) {
          // 同时向下层添加依赖
          childOb.dep.addDep(Dep.target)
        }
      }
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      //  对新 val 创建新的 childOb
      childOb = observe(newValue)
      value = newValue
      dep.notify()
    },
  })
}
```

另外，当我们的值改变时，会创建新的 `Observer` 实例，因此我们需要将 `childOb` 指向这个新的实例。

万幸，现在再次恢复正常了。

## renderWatcher

我们何时才会调用 `Watcher` 去添加依赖呢？

在 `Vue` 中，无论你是使用节点还是模板，最后都会被转换为一个 `render` 函数，`render` 函数会接受一个参数，这个参数同样也是一个函数，用来将接受到的节点描述信息构建成一个虚拟节点。

最后，我们再将得到的虚拟节点转换为真实的 DOM 元素，从调用 `render` 函数到转换为真实 DOM 的整个过程我们会包装在一个函数中，并将这个函数传递给 `Watcher` 进行调用。

通常我们会成这种 `Watcher` 为 `renderWatcher`，如果其中用到了被观察的数据，我们就会收集到依赖了。

那么 `renderWatcher` 又是在何时被调用的呢？就是在通过 `$mount` 函数进行挂载的时候，由于其中涉及了诸多关于编译和虚拟 DOM 相关的内容，下面我们以一个简单的示例来说明这个过程。

```javascript
class Vue {
  constructor(options) {
    this.$options = options

    // 初始化过程会对传入的 data 进行观察
    observe(options.data)
  }

  $mount(el) {
    // 创建一个 renderWatcher
    new Watcher(() => {
      document.querySelector('.name').value = opt.data.message
      document.querySelector('#name').textContent = opt.data.message
    })
  }
}
```

试一试吧。

```html
<input class="name" type="text" />
<div id="name"></div>
```

```javascript
const opt = {
  data: {
    message: 'Hello world!',
  },
}
new Vue(opt).$mount('#app')
```

现在当我们改变 `opt.data.message` 的值时，它将会同时显示在页面中。

## v-model

我们已经简单的实现了数据驱动视图的功能，现在只需要让视图的改变来修改数据，然后又由于 `renderWatcher` 的原因更新视图，就可以实现双向绑定了。

对于双向绑定我们最常见的就是结合文本输入框，因为通过监听其 `input` 事件我们就可以去更新数据。

```javascript
document.querySelector('.name').oninput = e => (opt.data.message = e.target.value)
```

现在，当我们改变输入框的值时，就可以看到其值会同步显示在下面了。

其实，这就是 `v-model` 所做的核心工作，当然对于不同的表单元素绑定事件和值会略有差异，一个组件上的 `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件。

```html
<input v-model="searchText" />

<!-- 等价于 -->

<input v-bind:value="searchText" v-on:input="searchText = $event.target.value" />
```

所以，从本质上来讲，`v-model` 就是一个语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

## Vue.set || this.\$set

## 缺点

- Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。
- 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
- 由于我们需要递归的对对象的属性设置 getter/setter，所以当观察的对象层次非常深时，可能会造成些微的性能问题。
- 通过 length 改变数组的值时无法得到响应式效果。
  <!-- https://github.com/creeperyang/blog/issues/45 -->
  <!-- https://segmentfault.com/a/1190000009054946 -->
  <!-- https://juejin.im/post/5b66e3296fb9a04f9e23321c -->
  <!-- https://juejin.im/entry/5a7c3e826fb9a0635c0468cc -->

## 参考

- [深入响应式原理 — Vue.js][1]
- [Object.defineProperty() - JavaScript | MDN][2]
- [观察者模式 - 维基百科，自由的百科全书][3]

[1]: https://cn.vuejs.org/v2/guide/reactivity.html
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
[3]: https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F
