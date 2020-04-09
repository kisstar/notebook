# 组件间的通信方式

在 Vue 中，所有的 `prop` 都使得其父子 `prop` 之间形成了一个单向下行绑定：父级 `prop` 的更新会向下流动到子组件中，但是反过来则不行。

这样可以防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

## 父传子

- **通过属性传递**

父级通过属性指定要传递数据，然后子级在 `props` 属性中接受数据。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Son value="Hello" />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  }
}
</script>

<!-- Son.vue -->
<template>
  <div v-cloak>Son {{ value }}</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  }
}
</script>
```

## 子传父

- **调用父类的方法**

在属性传递的基础上，我们可以把父级的函数传递给子级，子级可以在调用该函数时来向父级传递数据。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Son :value="value" :input="msg => (value = msg)" />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      value: 'Hello'
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    <div v-cloak>Son {{ value }}</div>
    <button @click="input('Hello too')">更改信息</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    input: {
      type: Function
    }
  }
}
</script>
```

示例中，我们通过调用父级传下来的 `input` 方法，将数据('Hello too')传到了父级中。

- **触发事件**

我们可以在父级中给子级添加监听事件和对应的处理函数。当子级触发该事件时，除了事件名外的参数都会被父级指定的函数获取到。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Son :value="value" @input="msg => (value = msg)" />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      value: 'Hello'
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    <div v-cloak>Son {{ value }}</div>
    <button @click="$emit('input', 'Hello too')">更改信息</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  }
}
</script>
```

注意：这里绑定在 Son(组件) 上的并不是原生事件，如果想要在一个组件的根元素上直接监听一个原生事件，你可以使用 `v-on` 的 `.native` 修饰符。

## 双向绑定

在 Vue 中，一个组件上的 `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件。这和触发事件的原理几乎如出一辙，我们可以简单的修改一下父级的结构：

```html
<!-- form -->
<Son :value="value" @input="msg => (value = msg)" />
<!-- to -->
<Son v-model="value" />
```

它依然工作的很好。不仅仅如此，你还可以自定义 `v-model` 利用的属性和事件，比如修改为 `msg` 属性和 `change` 事件：

```html
<!-- Son.vue -->
<template>
  <div>
    <div v-cloak>Son {{ msg }}</div>
    <button @click="$emit('change', 'Hello too')">更改信息</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'msg',
    event: 'change'
  },
  props: {
    msg: {
      type: String
    }
  }
}
</script>
```

现在，它不仅可以正常工作，而且更具灵活性，略微有些遗憾的就是用法显得有些复杂。

为了让双向绑定使用更加方便，官方提供了`.sync` 修饰符来解决这个问题。使用时只需在绑定属性时添加 `.sync` 修饰符，然后在子级中通过触发 “update:prop_name” 事件来修改数据。

```html
<!-- Parent -->
<template>
  <div>
    Parent
    <Son :value.sync="msg" />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Son -->
<template>
  <div>
    <div v-cloak>Son {{ value }}</div>
    <button @click="$emit('update:value', 'Hello too')">更改信息</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  }
}
</script>
```

## 直接访问

- **ref**

通过 `ref` 这个 `attribute` 为子组件赋予一个 ID 引用，这样你可以在 JavaScript 里直接访问一个子组件。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent {{ value }}
    <Son ref="son" />
    <button @click="change">获取子级信息</button>
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    change() {
      const { son } = this.$refs
      this.value = son.msg
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>Son</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>
```

- **$children 属性**

在每个 `new Vue` 实例的组件中，可以通过 `$children` 属性来访问当前实例的直接子组件。需要注意 `$children` 并不保证顺序，也不是响应式的。

```html
<!-- Parent.vue -->
<template>
  <div>
    <div v-cloak>Parent {{ value }}</div>
    <Son />
    <button @click="change">获取子级信息</button>
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    change() {
      const [son] = this.$children
      this.value = son.msg
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>Son</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>
```

因为这里只有一个子组件，所以数据的来源很明确。如果一个组件下存在多个子组件的话，可以给每个组件添加一个名字，然后父组件在遍历子组件通过实例的 `$options.name` 的值来判断要操作目标。

- **$parent 属性**

与 `$children` 属性 类似，`$parent` 属性可以用来访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 `prop` 的方式传入子组件的方式。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Son />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div v-cloak>Son {{ $parent.msg }}</div>
</template>
```

## 跨组件传递

- **props 传透**

最简单的方式，就是在父传子的基础上再加上一层(甚至更多)，也就是父传子，子传孙。这样很好理解，但太过于麻烦。

- **依赖注入**

为了更方便的跨级传递数据，官方提供了 `provide/inject` 来做这样的事情。

`provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。

`inject` 显得要更复杂一些，你可以在申明你需要的数据，点击 [provide-inject][provide-inject] 查看更多相关的信息。

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent
    <Son />
  </div>
</template>

<script>
import Son from './Son'

export default {
  components: {
    Son
  },
  provide() {
    return {
      parent: this
    }
  },
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    Son
    <GrandSon />
  </div>
</template>

<script>
import GrandSon from './GrandSon'

export default {
  components: {
    GrandSon
  }
}
</script>

<!-- GrandSon.vue -->
<template>
  <div v-cloak>GrandSon {{ parent.msg }}</div>
</template>

<script>
export default {
  inject: ['parent']
}
</script>
```

- **$dispatch & $broadcast**

在 Vue 1.0 版本中，为了实现基于组件树结构的事件流通信，曾实现了这一对方法。由于种种缺陷，在 Vue 2.0 中又被移除了。

一些基于 Vue 的 UI 框架中依然存在对其的封装，接下来我们就来一版简单的实现。

调用 `$dispatch` 时先会在自己实例本身上触发指定事件，然后沿父链向上传播。当它触发指定父组件上的事件侦听器时传播即会停止。任何其他参数都将传递给侦听器的回调函数。

```javascript
/**
 * @param {string} 触发的事件名称
 * @param {string} “响应”的组件名称
 * @param {any[]} 额外的参数
 */
Vue.prototype.$dispatch = function $dispatch(
  eventName,
  componentName,
  ...args
) {
  let parent = this.$parent
  this.$emit.call(this, eventName, ...args)

  while (parent) {
    if (parent.$options.name === componentName) {
      parent.$emit.call(parent, eventName, ...args)
      break
    }
    parent = parent.$parent
  }
}
```

```html
<!-- Parent.vue -->
<template>
  <div>
    <div v-cloak>Parent {{ value }}</div>
    <Son />
  </div>
</template>

<script>
import Son from './Son'

export default {
  name: 'Parent',
  components: {
    Son
  },
  data() {
    return {
      value: ''
    }
  },
  beforeCreate() {
    this.$on('change-value', function(newValue) {
      console.log(this.$options.name)
      this.value = newValue
    })
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    Son
    <GrandSon />
  </div>
</template>

<script>
import GrandSon from './GrandSon'

export default {
  name: 'Son',
  components: {
    GrandSon
  },
  beforeCreate() {
    this.$on('change-value', function() {
      console.log('这里的事件不会被触发!')
    })
  }
}
</script>

<!-- GrandSon.vue -->
<template>
  <div>
    GrandSon
    <button @click="change">触发事件</button>
  </div>
</template>

<script>
export default {
  methods: {
    change() {
      this.$dispatch('change-value', 'Parent', 'Hello')
    }
  }
}
</script>
```

与 `$dispatch` 相反，`$broadcast` 负责向下传播到当前实例的所有后代。当它触发指定子组件上的事件侦听器时，每个路径的传播将会停止。

```javascript
Vue.prototype.$broadcast = function $broadcast(
  eventName,
  componentName,
  ...args
) {
  this.$children.some(child => {
    const { name } = child.$options

    if (name === componentName) {
      child.$emit.call(child, eventName, ...args)
      return true
    } else {
      $broadcast.call(child, eventName, componentName, ...args)
    }
  })
}
```

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent <button @click="change">广播事件</button>
    <Son />
  </div>
</template>

<script>
import Son from './Son'

export default {
  name: 'Parent',
  components: {
    Son
  },
  methods: {
    change() {
      this.$broadcast('change-value', 'GrandSon', 'Hello')
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    Son
    <GrandSon />
  </div>
</template>

<script>
import GrandSon from './GrandSon'

export default {
  name: 'Son',
  components: {
    GrandSon
  },
  beforeCreate() {
    this.$on('change-value', function() {
      console.log('这里的事件不会被触发!')
    })
  }
}
</script>

<!-- GrandSon.vue -->
<template>
  <div v-cloak>GrandSon {{ value }}</div>
</template>

<script>
export default {
  name: 'GrandSon',
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    this.$on('change-value', function(newValue) {
      this.value = newValue
    })
  }
}
</script>
```

- **EventBus**

此种方案和事件触发的方式基本一致，不过之前我们为每一个实例都维护了一套完整的事件订阅和触发机制，现在我们让整个项目共用一套机制。

如此以来，只要你订阅了一种事件，当该事件被出发时，无论是在何处触发的，所有的点阅者都会收到通知，对应的处理函数将会被执行。

```javascript
Vue.prototype.$bus = new Vue()
```

```html
<!-- Parent.vue -->
<template>
  <div>
    Parent <button @click="change">广播事件</button>
    <Son />
  </div>
</template>

<script>
import Son from './Son'

export default {
  name: 'Parent',
  components: {
    Son
  },
  methods: {
    change() {
      this.$bus.$emit('change-value', 'GrandSon', 'Hello')
    }
  }
}
</script>

<!-- Son.vue -->
<template>
  <div>
    Son
    <GrandSon />
  </div>
</template>

<script>
import GrandSon from './GrandSon'

export default {
  name: 'Son',
  components: {
    GrandSon
  },
  beforeCreate() {
    this.$bus.$on('change-value', function() {
      console.log('这里的事件也会被触发!')
    })
  }
}
</script>

<!-- GrandSon.vue -->
<template>
  <div v-cloak>GrandSon {{ value }}</div>
</template>

<script>
export default {
  name: 'GrandSon',
  data() {
    return {
      value: ''
    }
  },
  mounted() {
    this.$bus.$on('change-value', function(newValue) {
      this.value = newValue
    })
  }
}
</script>
```

## 参考

- [介绍 — Vue.js](https://cn.vuejs.org/v2/guide/)

[provide-inject]: https://cn.vuejs.org/v2/api/#provide-inject
