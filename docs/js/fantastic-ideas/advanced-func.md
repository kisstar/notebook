# 高级函数

函数是 JavaScript 中最有趣的部分之一。

除了函数相关的基础知识外，掌握一些高级函数并应用起来，可以是代码看起来更为精简，而且性能更高。

## 作用域安全的构造函数

构造函数其实就是一个使用 `new` 操作符调用的函数。当使用 `new` 调用时，构造函数内用到的 `this` 对象会指向新创建的对象实例。

但是，当我们不使用 `new` 操作符进行调用时，此时函数中的 `this` 会映射到全局对象 `window` 上，导致错误对象属性的意外增加，污染全局作用域。

作用域安全的构造函数就是用来解决这个问题，它在进行任何更改前，首先确认 `this` 对象是正确类型的实例。如果不是，那么会创建新的实例并返回。

```javascript
function Person(age) {
  if (!(this instanceof Person)) return new Person(age)
  this.name = 'Anani'
  this.age = age
  this.getName = function() {
    console.log(this.name)
  }
}
```

实现这个模式后，就锁定了可以调用构造函数的环境。

但你使用构造函数窃取模式的继承且不使用原型链，那么这个继承很可能被破坏。如果构造函数窃取结合使用原型链或者寄生组合则可以解决这个问题。

```javascript
function SonPerson(job) {
  Person.call(this, 24)
  this.job = job
  this.getAge = function() {
    console.log(this.age)
  }
}

// 没有下面这行代码，Person.call(this, 24); 会返回一个不曾使用的对象
// SonPerson 构造函数中的 this 对象并没有得到增强
// 而下面这行代码让 SonPerson 的实例同时也称为 Person 的实例
// 如此 Person.call(this, 24); 就会照常执行，得到经典继承的效果
SonPerson.prototype = new Person()

var grandsonPerson = new SonPerson('programmer')
console.log(grandsonPerson)
```

## 惰性载入函数

因为浏览器之间行为的差异，或者对于一些初始化的函数，多数代码中包含了大量的 `if` 语句，将执行引导到正确的代码中。

对于其中的一些判断语句，可能每次执行的结果都是相同的，但还是每次重复的执行，导致程序运行变慢。

为了解决上述问题，引入了一种名为惰性载入的技巧：函数执行的分支仅会发生一次。它主要包括两种方式：

- **在函数被调用时再处理函数。**

```javascript
function lazyLoading() {
  if (true || false) {
    // 在这里可以进行功能性检测
    lazyLoading = function() {
      console.log('Anani')
    }
  } else {
    lazyLoading = function() {
      console.log('Sharon')
    }
  }
  return lazyLoading()
}

function lazyLoading() {
  // 在这里执行唯一一次的初始化等等
  lazyLoading = function() {
    console.log('Sharon')
  }
  return lazyLoading()
}
```

两种形式的使用其实都是运用了同一种思想，在功能检测或初始化工作完成执行，覆盖原本的函数，最后调用新赋的函数。后续调用时就不会像往常一样重复执行判断语句中的代码。

- **声明函数时就指定适当的函数。**

创建一个匿名、自执行的函数，用以确定应该使用哪一个函数实现，其优点在于只在执行分支代码时牺牲一点儿性能。

```javascript
var lazyLoading = (function() {
  if (true || false) {
    // 在这里可以进行功能性检测
    return function() {
      console.log('Anani')
    }
  } else {
    return function() {
      console.log('Sharon')
    }
  }
})()
```

## 函数绑定

函数绑定要创建一个函数，可以在特定的 `this` 环境中以指定参数调用另一个函数。该技巧常常和回调函数与事件处理程序一起使用，以便在将函数作为变量传递的同时保留代码执行环境。

这个可以将函数绑定到指定环境的函数就是 `bind()`，它接受一个函数和一个环境，并返回一个在给定环境中调用给定函数的函数，并且将所有参数原封不动传递过去。

```javascript
/**
 * @param {function} fn 原函数
 * @param {object} context 指定的执行环境
 * @returns {function} 绑定了执行环境的新函数
 */
function bind(fn, context) {
  return function() {
    // 注意这里使用的 arguments 对象是内部函数的
    return fn.apply(context, arguments)
  }
}
```

ECMAScript 5 为所有函数定义了一个原生的 `bind()` 方法，主要用于事件处理程序以及 `setTimeout()` 和 `setInterval()`。

由于被绑定函数与普通函数相比有更多的开销，它们需要更多内存，同时也因为多重函数调用稍微慢一点，所以最好只在必要时使用。

## 函数柯里化

函数柯里化它用于创建已经设置好了一个或多个参数的函数，其基本方法和函数绑定是一样的：使用一个闭包返回一个函数。

柯里化函数通常由以下步骤动态创建：

- 调用另一个函数。
- 传入要柯里化的函数和必要参数。

```javascript
/**
 * @param fn 要进行柯里化的函数
 * @returns {function} 柯里化后的函数
 */
function curry(fn) {
  // 获取外层第一个参数之后的所有参数
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // 获取内层所有参数
    var innerArgs = Array.prototype.slice.call(arguments)
    // 获取总的参数
    var finalArgs = args.concat(innerArgs)
    return fn.apply(null, finalArgs)
  }
}
```

函数柯里化还常常作为函数绑定的一部分包含在其中，构造出更为复杂的 `bind()` 函数。如果除了 `event` 对象再额外给事件处理程序传递参数时，这非常有用：

```javascript
function bind(context, fn) {
  // 获取外层第二个参数之后的所有参数
  var args = Array.prototype.slice.call(arguments, 2)
  return function() {
    // 获取内层所有参数
    var innerArgs = Array.prototype.slice.call(arguments)
    // 获取总的参数
    var finalArgs = innerArgs.concat(args)
    return fn.apply(context, finalArgs)
  }
}

var obj = {
  name: 'anani',
  getInfo: function(event, age) {
    console.log(event.type, this.name, age)
  },
}

var getInfo = bind(obj, obj.getInfo, 24)

window.addEventListener('click', getInfo)
```

## 参考资料

- JavaScript 高级程序设计(第 3 版)
