# YDKJS-This

`this` 是 JavaScript 中一个很特别的关键字，被自动定义在所有函数的作用域中。

对于 `this` 常见的错误理解认为它指向函数本身或则是函数的作用域，事实上，`this` 是在运行时进行绑定的，它的绑定和函数声明位置没有任何关系，只取决于函数的调用方式。

## 默认绑定

最常用的函数调用类型：独立函数调用。

```js
function foo() {
  console.log(this.a)
}

var a = 2 // 等同于 window.a = 2

foo() // 2
```

直接调用的函数的 `this` 在非严格模式下遵循默认绑定指向 `window`，而在严格模式下为 `undefined`。

## 隐式绑定

当函数作为对象里的方法被调用时，`this` 被设置为调用该函数的对象。

```js
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo,
}

obj.foo() // 2
```

可见这样的行为完全不会受函数定义方式或位置的影响，函数可以预先被申明然后再赋值给对象，只要保证最后是作为对象上的方法进行调用就可以了。

不过这里存在一个的隐式丢失的问题，这通常发生在我们将对象上的一个方法作为值进行传递时：

```js
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  fn()
}

var obj = {
  a: 2,
  foo: foo,
}
var a = 'oops, global' // a 是全局对象的属性

doFoo(obj.foo) // "oops, global"
```

就像我们看到的那样，它并没有像我们所想的那样将 `this` 指向 `obj`，即使 `fn` 函数和 `obj.foo` 方法指向的是同一个函数，但 `fn` 在执行是已经和 `obj` 对象没有任何关系了。

## 显式绑定

多数情况下你可以通过 `call(..)` 和 `apply(..)` 方法指定 `this` 的绑定对象，我们称之为显式绑定。

```js
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
}

foo.call(obj) // 2
```

此处，通过 f`oo.call(..)`，我们可以在调用 `foo` 时强制把它的 `this` 绑定到 `obj` 上。

如果你传入了一个原始值来当作 `this` 的绑定对象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者 new Number(..)）。这通常被称为“装箱”。

### 硬绑定

显式绑定仍然无法解决我们之前提出的丢失绑定问题，但其变种硬绑定可以：

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
}
var bar = function() {
  foo.call(obj)
}

bar() // 2
setTimeout(bar, 100) // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window) // 2
```

由于硬绑定是一种非常常用的模式，所以 ES5 提供了内置的方法 `Function.prototype.bind`，它和 `bar` 异曲同工：

```js
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
}
var bar = foo.bind(obj)

bar() // 2
setTimeout(bar, 100) // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call(window) // 2
```

## New 绑定

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 `[[Prototype]]` 连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

```js
function foo(a) {
  this.a = a
}

var bar = new foo(2)
console.log(bar.a) // 2
```

使用 `new` 来调用 `foo(..)` 时，我们会构造一个新对象并把它绑定到 `foo(..)` 调用中的 `this` 上。`new` 是最后一种可以影响函数调用时 `this` 绑定行为的方法，我们称之为 `new` 绑定。

## 优先级

现在我们已经了解了函数调用中 `this` 绑定的四条规则，如果同一处出现多条规则它们的优先级又是怎么样的呢？

毫无疑问，默认绑定的优先级是最低的，其次是隐私绑定。后两者由于`new` 和 `call/apply` 无法一起使用，因此无我们需要通过硬绑定来测试它俩的优先级。

```js
function foo(something) {
  this.a = something
}
var obj1 = {}
var bar = foo.bind(obj1)

bar(2)
console.log(obj1.a) // 2
var baz = new bar(3)
console.log(obj1.a) // 2
console.log(baz.a) // 3
```

在示例代码中，如果硬绑定的优先级更高的话，使用 `new` 调用构造函数 `bar` 之后 `obj1.a` 的值应该是 3，显然结果并不是这样。所以可以按照下面的顺序来进行判断：

1. 函数是否在 `new` 中调用？如果是的话 `this` 绑定的是新创建的对象。
2. 函数是否通过 `call`、`apply`（显式绑定）或者硬绑定调用？如果是的话，`this` 绑定的是指定的对象。
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，`this` 绑定的是那个上下文对象。
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 `undefined`，否则绑定到全局对象。

## 规则之外

如果你把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则：

```js
function foo() {
  console.log(this.a)
}
var a = 2

foo.call(null) // 2
```

如果在给一个函数预先传递一些参数而不关心 `this` 的情况下这种方式确实很有用。但总是使用 `null` 来忽略 `this` 绑定可能产生一些副作用。

如果某个函数确实使用了 `this`（比如第三方库中的一个函数），那默认绑定规则会把 `this` 绑定到全局对象（在浏览器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。

为了防止串改全局对象，你可以总是给函数指定一个名为 `ø` 的 MDZ 对象。

## 软绑定

硬绑定这种方式可以把 `this` 强制绑定到指定的对象（除了使用 new 时），防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 `this`。

我们需要的是可以给默认绑定指定一个全局对象和 `undefined` 以外的值，同时保留隐式绑定或者显式绑定修改 `this` 的能力：

```js
;(function() {
  if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
      var fn = this
      // 捕获所有 curried 参数
      var curried = [].slice.call(arguments, 1)
      var bound = function() {
        return fn.apply(
          !this || this === (window || global) ? obj : this,
          curried.concat.apply(curried, arguments),
        )
      }
      bound.prototype = Object.create(fn.prototype)
      return bound
    }
  }
})()
```

`softBind` 会对指定的函数进行封装，首先检查调用时的 `this`，如果 `this` 绑定到全局对象或者 `undefined`，那就把指定的默认对象 `obj` 绑定到 `this`，否则不会修改 `this`。

## 箭头函数

箭头函数并不是使用 `function` 关键字定义的，而是使用被称为“胖箭头”的操作符 => 定义的。箭头函数不使用 `this` 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 `this`。

```js
function foo() {
  // 返回一个箭头函数
  return a => {
    // this 继承自 foo()
    console.log(this.a)
  }
}
var obj1 = {
  a: 2,
}
var obj2 = {
  a: 3,
}

var bar = foo.call(obj1)
bar.call(obj2) // 2, 不是 3
```

箭头函数最常用于回调函数中，例如事件处理器或者定时器，因为它可以像 `bind(..)` 一样确保函数的 `this` 被绑定到指定对象。

## 其它

无论是否在严格模式下，在全局执行环境中（在任何函数体外部）`this` 都指向全局对象。

当函数被用作事件处理函数时，它的 `this` 指向事件绑定的元素（一些浏览器在使用非 addEventListener 的函数动态地添加监听函数时不遵守这个约定？？？）。

```js
// 被调用时，将关联的元素变成蓝色
function bluify(e) {
  // Event.currentTarget 表示事件绑定的元素，而 Event.target 则是事件触发的元素
  console.log(this === e.currentTarget) // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target)
  this.style.backgroundColor = '#A5D9F3'
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*')

// 将 bluify 作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false)
}
```

当代码被内联 `on-event` 处理函数调用时，它的 `this` 指向监听器所在的 DOM 元素：

```js
<button onclick="alert(this.tagName.toLowerCase());">Show this</button>
```

点击按钮上面 `alert` 会显示 `button`。

另外，类的方法内部如果含有 `this`，它默认指向类的实例。如果静态方法包含 `this` 关键字，这个 `this` 指的是类，而不是实例。
