# 闭包

闭包（closure）是 JavaScript 语言的一个难点，也是它的特色，很多高级应用都需要依靠闭包实现。

在业界有句号叫做 Javascript 中有两大神兽，一个是原型，另一个就是闭包，由此可见闭包的重要性。

## 抛砖引玉

我们有一组按钮，现在我们需要个每个按钮添加一个点击事件，该事件主要是打印它们排列顺序的下标。在实现这个需求时，我们通常会想到的代码就是：

```html
<body>
  <button>测试 0</button>
  <button>测试 1</button>
  <button>测试 2</button>

  <script type="text/javascript">
    var btns = document.querySelectorAll('button')
    var len = btns.length

    for (var i = 0; i < len; i++) {
      btns[i].onclick = function() {
        console.log(i)
      }
    }
  </script>
</body>
```

但是事与愿违，点击上面的三个按钮，结果都会打印 3。因为整个代码中变量 `i` 只有全局作用域中的一个。当我们触发点击事件时，触发的函数中的作用域中都没有变量 `i`，所以就会去外部作用域中查找，而此时全局作用域的的变量 `i` 已经变成 3 了，所以点击任何一个按钮都会返回 3。

### 解决方案壹

首先，我们可以把变量的值存储在对应的 DOM 对象 `btn` 上，并通过 `this` 进行读取即可：

```javascript
var btns = document.querySelectorAll('button')
var len = btns.length

for (var i = 0; i < len; i++) {
  btns[i].index = i
  btns[i].onclick = function() {
    console.log(this.index)
  }
}
```

### 解决方案贰

当然，上面的做法是可以的，但今天它并不是我们的主角，现在重点是下面这种解决方法，也就是利用闭包：

```javascript
var btns = document.querySelectorAll('button')
var len = btns.length

for (var i = 0; i < len; i++) {
  ;(function(i) {
    btns[i].onclick = function() {
      console.log(i)
    }
  })(i)
}
```

那么，为什么这样就能解决呢？现在，我们就来认识一下闭包。

## 闭包的概念

闭包是指在 JavaScript 中，内部函数总是可以访问其所在外部函数中申明的参数和变量，即使在其外部函数被返回（寿命终结）之后。

创建闭包的常见方式，就是在一个函数内创建个另一函数：在嵌套函数中，如果内部函数引用了外部函数的变量时就产生了闭包。所以产生闭包的条件包括：

- 函数嵌套
- 内部函数引用了外部函数的变量

值得注意的是产生闭包并不需要外部函数调用，因为在这之前，也就是在内部函数定义的地方，闭包就产生了。

## 常见的闭包

我们常见的闭包一般包含两种情况，其中一种就是将函数作为另一个函数的返回值。

```javascript
function fn1() {
  var name = 'Anani'
  return function fn2() {
    console.log(name)
  }
}

var fn = fn1()
fn() // Anani
```

另一种，就是将函数作为实参传递给另一个函数使用。

```javascript
function showDelay(name) {
  setTimeout(function() {
    console.log(name)
  }, 1000)
}

showDelay('name')
```

## 闭包的作用

函数执行完成后，在该函数内部声明的变量都会被销毁，除非它身处闭包中，所以闭包的其中一个作用就是延长了局部变量的生命周期。

另外，在函数内部声明的变量通常外部函数并不难进行访问，而闭包打破了这个常规。

通常我们会使用闭包来定义一个 JavaScript 模块：一个具有特点功能的 JavaScript 文件，将所有的数据和功能都封装到一个函数内部，只向外提供调用内部函数或访问数据的接口。

## 闭包的生命周期

闭包的产生是在嵌套的内部函数定义执行完成时就产生了，而只在解除了对内部函数的引用时才会被销毁。

```javascript
function fn1() {
  // 由于存在函数提升，因此此时闭包已经产生
  var name = 'Anani'
  function fn2() {
    console.log(name)
  }

  return fn2
}

var fn = fn1()
fn() // Anani
fn = null // 解除引用
```

## 内存泄露和内存溢出

**内存溢出**：

- 程序运行时出现的一种错误。
- 当程序运行所需要的内存小于系统剩余的内存时，就会出现内存溢出的错误。

**内存泄露**：

- 占用的内存没有及时释放。
- 内存泄露累计多了就可能会导致内存溢出。

在 JavaScript 中常见的内存溢出：

- 意外的全局变量。
- 没有及时清理的计时器或回调函数。
- 闭包。

## Show me the code

```javascript
var name = 'Anani'
var object = {
  name: 'Sharon',
  getNameFunc: function() {
    return function() {
      return this.name
    }
  },
}

console.log(object.getNameFunc()()) // Anani（非严格模式）
```

调用 `object.getNameFunc()` 返回的实际上是一个匿名函数，最后直接调用这个函数，所以其中的 `this` 值指向全局对象。

当然，把外部作用域中的 `this` 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了。

```javascript
var name = 'Anani'
var object = {
  name: 'Sharon',
  getNameFunc: function() {
    var that = this
    return function() {
      return that.name
    }
  },
}

console.log(object.getNameFunc()()) // Anani（非严格模式）
```

这里我们需要重点关注的两点就是：

- 在非严格模式下，匿名函数的 `this` 指向的都是全局对象，因为匿名函数都是直接执行的（简单调用）。
- 每个函数在被调用时都会自动取得两个特殊变量：`this` 和 `arguments`。内部函数在搜索这两个变量时，只会搜索到其活动对象为止。

```javascript
function fn(m, n) {
  console.log(n)
  return {
    fn: function(o) {
      return fn(o, m)
    },
  }
}

var a = fn(0)
a.fn(1)
a.fn(2)
a.fn(3) // undefined 0 0 0
var b = fn(0)
  .fn(1)
  .fn(2)
  .fn(3) // undefined 0 1 2
var c = fn(0).fn(1)
c.fn(2)
c.fn(3) // undefined 0 1 1
```

这个比较绕的是里外函数的名字都一样，实际上内部的函数最终调用的还是内部函数，只是在其中一个参数作为闭包被存储了起来。每次调用外部的函数或外部函数时都会产生新的闭吧，至于会打印什么值，主要是看创建闭包时那个被存储起来的参数是多少。

## 参考资料

- JavaScript 高级程序设计(第 3 版)
