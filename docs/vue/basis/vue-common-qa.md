# Vue 中的常见问题

## v-if vs v-show

- `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- `v-if` 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- `v-show` 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
- `v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

## v-if 与 v-for 有什么值得注意的

<!-- node_modules\vue\src\compiler\codegen\index.js genElement 65 -->

永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。

通常，我们会在两种情况下会有这样做：

- 隐藏整个列表。
- 过滤列表中的项目。

由于 `v-for` 的优先级比 `v-if` 的优先级高，如果把 `v-if` 和 `v-for` 同时用在同一个元素上，那么不论这个列表是否显示，整个循环也会执行。

针对第一种情况，通过 `template` 我们可以把 `v-if` 提升到上一级，以避免无意义的计算。

针对第二种情况，我们可以采用计算属性，只对过滤得到的结果进行遍历，这样就无需才做判断。

## 为什么 Vue 组件的 data 必须是函数

<!-- node_modules\vue\src\core\instance\state.js initData 114 -->

通常，Vue 组件是由 `Vue.extend` 方法创建出来的一个构造函数，最后会通过 `new` 关键字来调用。

所以，一个 Vue 组件可能存在多个实例，如果使用对象形式定义 `data`，则会导致它们共用一个 `data` 对象。那么，状态的改变将会影响所有的组件实例。

采用函数式定义 `data`，在 `initData` 时会将其作为工厂函数返回全新的 `data` 对象，有效的避免了多个实例之间状态污染的问题。

在 Vue 根实例的创建过程中则不存在此限制，因为根实例只有一个。

## Vue 中 key 的作用和工作原理

<!-- node_modules\vue\src\core\vdom\patch.js updateChildren 404 -->

Key 的作用主要是为了高效的更新虚拟 DOM，其原理是 Vue 在 `patch` 的过程中会通过 `key` 来判断两个节点是否是同一个，从而避免频繁的更新不同元素，使得整个 `patch` 过程更加高效，减少 DOM 操作，提高性能。

另外，若不设置 `key` 还可能导致在列表更新时引发一些隐蔽的 BUG。

而且，Vue 中在使用相同标签名元素做过度切换时，也会用到 `key` 属性，其目的是为了让 Vue 可以却分它们，否则 Vue 内部只会替换内部属性，而不会触发过度效果。

## 怎么理解 Vue 中的 diff 算法

Diff 算法是虚拟 DOM 技术的必然产物：通过新旧虚拟 DOM 的比较，将变化的地方更新在真实的 DOM 上；另外，也需要 `diff` 高效的执行对比过程，从而降低时间复杂度。

Vue 2.x 中为了降低 `watch` 的粒度，每个组件只有一个渲染 `watcher` 与之对应，只有引入 `diff` 才能精确地找到变化的地方。

Vue 中 `diff` 执行的时刻是组件实例执行其更新函数时，它会对比上一次渲染结果 `oldVnode` 和新的渲染结果 `newVnode`，此过程称为 `patch`。

Duff 过程遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或文本节点做不同的操作。

比较两组子节点是算法的重点，基本流程为头比头、尾比尾、头比尾、尾比头，如果没有找到相同的节点就照通用的方式遍历查找，查找结束再按情况处理剩下的节点。

借助 `key` 通常可以精确的找到相同的节点，因此整个 `patch` 过程会很高效。

## 对 Vue 组件化的理解

组件是独立和可复用的代码组织单元。它使开发者可以使用小型、独立和通常可复用的组件来组件大型应用。

组件化开发能大幅度的提高应用的开发效率、测试性和复用性等（工作粒度可以更小的划分，减小之间的耦合度、组件公用的组件库）。

组件一般可以划分为：页面组件、业务组件和通用组件。

组件系统是 Vue 中核心特性之一，在 Vue 中组件是基于配置的，我们通常编写的组件都是组件的配置项，而非真正的组件。Vue 会在后续根据配置生成相应的构造函数，它们基于 VueComponent，扩展于 Vue。

Vue 中常见的组件技术包括：属性 `props`、自定义事件和插槽等，它们主要用域组件的通信和扩展。

合理的划分组件，有助于提高应用的性能（Vue 是组件级的更新，每个组件对应一个渲染 watcher）。

组件实现了高内聚、低耦合。

遵循单项数据流的原则。

## 对 Vue 设计原则的理解

Vue 是一个渐进式的 JavaScript 框架，特点是易用、灵活和高效。

与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用，其核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

易用性：

Vue 提供了数据响应式、声明式渲染和基于配置的组件系统等核心特性。这些使得我们只需要关注应用的核心业务即可，只用 HTML、CSS 和 JavaScript 就能编写 Vue 应用。

灵活性：

如果程序足够小，我们可以只使用 Vue 的核心库。随着应用发展，根据项目的需要，我们可以按需的增加路由、状态管理和 `vue-cli` 等库或工具。

高效性：

采用虚拟 DOM 和高效的 Diff 算法使我们的应用拥有极好的性能表现。在 Vue 3 中，引入了 `proxy` 来对响应式系统进行改进，也会让 Vue 或者说应用变得更加高效。

## Vue 中的性能优化方法

- 路由懒加载。
- 第三方插件的按需引入（babel-plugin-import）。
- keep-alive。
- 长列表渲染优化：让纯粹的显示数据避开响应式（Object.freeze），采用虚拟列表（vue-virtual-scroller），只渲染部分可见区域的内容。
- 图片懒加载（vue-lazyload）。
- 避免同级同时使用 v-for 和 v-if。
- v-show 复用 DOM。
- 将无状态组件标记为函数组件。
- 拆分组件为更小的粒度。
- 消除定时器和事件绑定。
- SSR。

## 对 Vue 3.0 的新特性有没有了解

更快：虚拟 DOM 重写优化 `slots` 的生成静态树提升静态属性提升基于 `proxy` 的响应式系统。

更小：通过摇树优化核心库体积。

更易维护：TypeScript + 模块化。

更加优化：跨平台 - 编译器核心和运行时核心与平台无关。

更易使用：对 TypeScript 的支持独立的响应式模块 Composition API。
