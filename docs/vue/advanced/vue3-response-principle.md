# Vue3 响应式原理

Vue 是一套用于构建用户界面的开源 JavaScript 渐进式框架，它被设计为可以自底向上逐层应用。

在 Vue 中，关注的核心是 MVC 模式中的视图层，并制定了一套非侵入性的响应式系统，开发者只需将视图与对应的模型进行绑定，Vue 便能自动观测模型的变动，并重绘视图。

## 观察者模式

无论是 Vue2 还是 Vue3，响应式系统都是基于观察者模式实现的。在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。

<img :src="$withBase('/images/vue/advanced/subobject-observe.png')" alt="subobject_observe">

此处的目标对象可以类比我们传递给 Vue 的 `data` 选项，而观察者对象则是我们直接书写或者编译生成的渲染函数。

但是，在项目的实际开发中我们并没有手动的去为数据添加任何依赖，也没有在改变数据时去触发任何更新，整个流程是如何运转起来的呢？答案便是数据劫持。

## 核心 API - Proxy

当把一个普通的 JavaScript 对象作为 `data` 选项传给应用或组件实例的时候，Vue 会使用带有 `getter` 和 `setter` 的处理程序遍历其所有属性并将其转换为 Proxy。

在 Vue 2 中主要使用的是 `Object.defineProperty()` 方法，而在 Vue 3 中则是使用更强大的 Proxy 对象。

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : 666
  },
}

const p = new Proxy({}, handler)

console.log('c' in p, p.c) // false, 666
```

从上面的示例代码来看 Proxy 和 `Object.defineProperty()` 方法是极其相似的，当然绝非如此简单，但目前这样理解就可以了。

## 数据劫持

在 Proxy 的帮助下我们可以很容易地感知到用户对对象采取的相关操作（包括对属性的读取、更改，甚至是删除），并且重新定义原本的行为。

```js
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)

      // TODO: 依赖收集
      return isObject(res) ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)

      // TODO: 触发更新
      return result
    },
  }

  return new Proxy(target, handler)
}
```

如此一来，我们便可以在用户无感知的情况下去收集依赖，并在数据后续发生改变时得到通知。这就是 Vue 响应式系统的本质。

## 依赖收集

当从组件中的 `data()` 返回一个对象时，它在内部交由 `reactive()` 函数使其成为响应式对象。模板会被编译成能够使用这些响应式属性的渲染函数，当函数调用时并开始收集依赖。

那么谁来调用函数，又发现依赖呢？此处需要了解的是一个 `effect()` 函数，它类似于 Vue 2 中的 Watcher 会自动包装和调用传入的函数。

```js
// 作为一个追踪渲染函数的变量，以便知道当前的依赖是谁并进行收集
let activeEffect = null

function effect(fn) {
  const effect = createReactiveEffect(fn)

  effect()

  return effect
}

function createReactiveEffect(fn) {
  const effect = function() {
    activeEffect = effect
    fn()
  }

  return effect
}
```

这里的 `fn()` 就类似我们的渲染函数，当它运行时会把当前被包装后的渲染函数记录到 `activeEffect`。这样如果在渲染函数中访问了我们的响应式对象，我们在 `getter()` 函数中就会得到通知，此时便可收集依赖。

```js
function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)

      track(target, key)
      return isObject(res) ? reactive(res) : res
    },
  }
  // ...
}

// 最终 targetMap 的数据结果为 { [target]: { [key]: set[] } }
// 表示存储着 target 对象的 key 属性的依赖集合
const targetMap = new WeakMap()

function track(target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)

  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  dep.add(activeEffect)
}
```

现在依赖收集就算是完成了，接下来就是要在数据改变的时候进行更新。

## 触发更新

在数据对象变成响应式对象后，数据的变更都会被我们的 `setter()` 函数所感知到，因此触发更新的操作就是从这里开始的。

```js
function reactive(target) {
  const handler = {
    //...
    set(target, key, value, receiver) {
      const hadKey =
        isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key)
      const result = Reflect.set(target, key, value, receiver)

      if (hadKey) {
        trigger(target, 'set', key, value)
      } else {
        trigger(target, 'add', key, value)
      }

      return result
    },
  }
  //...
}

function isIntegerKey(key) {
  return '' + parseInt(key, 10) === key
}
```

首先，我们判断本次触发的操作是修改还是新增。对于普通对象而言我们直接用 `hasOwnProperty()` 方法判断当前对象是否拥有这个属性即可，而对于数组则有些特殊。

如果操作的是像 `length` 这样的属性的话可以将数组按照普通对象处理，但当操作的属性是索引的时候，我们还需要判断操作的索引是否小于当前数组的长度，如果小于则表示这个索引是已经存在的。

判断好本次操作后，接着便是真正的触发更新了。

```js
function trigger(target, type, key, newValue) {
  const depsMap = targetMap.get(target)
  const effects = depsMap.get(key)

  effects && effects.forEach(effect => effect())
}
```

目前为止，一个简单的响应式流程就完成了，可以试试下面的例子，页面上的 666 将在一秒后自动变为 999，你也可以继续尝试将 `state.des` 改为其它值。

```js
const state = reactive({ name: '手艺人', des: 666 })

effect(() => {
  document.body.innerHTML = `${state.name}: ${state.des}`
})

setTimeout(() => {
  state.des = 999
}, 1000)
```

## 聊聊数组

我们知道 Vue 2 中的响应式系统在数组方面存在一些缺陷。比如，当你修改数组的长度，或者用索引直接设置一个数组项时，Vue 是无法检测到数组的变动的。

Proxy 对象的出现让这些问题迎刃而解，不过目前我们的实现还有所欠缺，比如在下面实例中，页面并不会发生改变。

```js
const state = reactive({
  members: ['x'],
})

effect(() => {
  document.body.innerHTML = state.members[0] || 'y'
})

setTimeout(() => {
  state.members.length = 0
}, 1000)
```

这是因为在我们函数中并没有访问 `length` 属性，也就没有收集到任何依赖，但它的改变确实导致了我们引用的第一个元素改变了，因此我们需要对其进行特殊处理。

现在，我们获取依赖不能简单的通过属性去获取，因为如果将 `length` 属性的值设置为比当前元素个数更小时，依赖那些被删除的元素的函数也应该被再次执行。

```js
function trigger(target, type, key, newValue) {
  const depsMap = targetMap.get(target) // 还记得我们存储依赖的结构吗？下面我们创建 add() 函数来协助完成依赖收集
  const effects = new Set()
  const add = effectsToAdd => {
    effectsToAdd && effectsToAdd.forEach(effect => effects.add(effect))
  }

  if (key === 'length' && isArray(target)) {
    depsMap.forEach((dep, key) => {
      // 如果当前的索引小于 length 的值，相关的依赖也应该被收集
      if (key === 'length' || key >= newValue) {
        add(dep)
      }
    })
  } else {
    add(depsMap.get(key))
  }

  effects && effects.forEach(effect => effect())
}
```

好像好起来了，但是反过来如果我们通过索引新增了一些元素呢？

```js
const state = reactive({
  members: ['x'],
})

effect(() => {
  document.body.innerHTML = state.members.length
})

setTimeout(() => {
  state.members[9] = 'y'
}, 1000)
```

此时的 `length` 也会发生改变，所以我们应该讲 `length` 相关的依赖也添加进去。

```js
function trigger(target, type, key, newValue) {
  //  ...

  if (key === 'length' && isArray(target)) {
    // ...
  } else {
    add(depsMap.get(key))

    switch (type) {
      case 'set':
        add(depsMap.get('length'))
    }
  }

  effects && effects.forEach(effect => effect())
}
```

好了，响应式系统就先聊到这吧。

## 总结

简单回顾一下，Vue 中的响应式系统都是基于观察者模式实现的，其中观察者的添加和将变化通知观察者的操作皆由带有 `getter` 和 `setter` 的处理程序自动处理。

在初始化时，Vue 先对组件的数据对象进行数据劫持，然后在后续的渲染当中完成依赖收集，最后在数据发生变化时触发页面更新。

<img :src="$withBase('/images/vue/advanced/reactive.png')" alt="reactive">

事实上，上面我们已经基于这个思路实现了一个简版的响应式系统。
