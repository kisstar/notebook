# 执行上下文和作用域

**执行上下文**（execution context，为简单起见，有时也称为“环境” ）是 JavaScript 中最为重要的一个概念。而作用域链保证了对执行环境有权访问的所有变量和函数的有序访问。

## 执行上下文

执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。

全局执行环境是最外围的一个执行环境。在 Web 浏览器中，全局环境被认为是 `window` 对象，因此所有全局变量和函数都是作为 `window` 对象的属性和方法创建的。

当 JavaScript 解释器初始化执行代码时，它首先默认进入全局执行环境，从此刻开始，函数的每次调用都会创建一个新的执行环境。

Javascript 引擎以推栈的方式（后进先出）处理执行环境，栈底永远是全局环境，栈顶是当前执行的上下文。某个执行环境中的所有代码执行完毕后，就会出栈，该环境被销毁，保存在其中的所有变量和函数定义也会随之被销毁。

全局执行环境直到应用程序退出（例如关闭网页或浏览器）时才会被销毁。

## 执行上下文干了什么

执行环境分为两个阶段：

- 执行上下文初始阶段，变量对象按如下的顺序填充:
  1. 进行 `this` 赋值。
  2. 函数参数赋值（若未传入，初始化值为 `undefined`）。
  3. 函数声明（每找到一个函数声明，就在变量对象中用函数名建立一个属性，值指向该函数在内存中的地址的一个引用人，若以函数名为属性名已经存在在变量对象中，则会被覆盖）。
  4. 变量声明（初始化值为 `undefined`，若命名重复则忽略）。
- 代码执行阶段：执行函数中的代码，给变量对象中的变量属性赋值。

### 变量提升和函数提升

变量声明提升：通过 `var` 定义（声明）的变量，在定义语句之前就可以访问到值：`undefined`。

```javascript
console.log(name) // undefined
var name = 'Anani'
```

函数声明提升：通过 `function` 声明的函数，在定义之前就可以调用。

```javascript
sayHi() // hello
function sayHi() {
  console.log('hello')
}
```

产生上面的结果正是因为在执行上下文的初始阶段就完成了变量声明和函数声明。

## 作用域

当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的作用就是隔离变量，使得不同作用域下的同名变量不会有冲突。

**作用域主要包括全局作用域和函数作用域，没有块级作用域。**

作用域链的前端，始终都是当前执行的代码所在环境的变量对象。

如果这个环境是函数，则将其活动对象（activation object）作为变量对象。活动对象在最开始时只包含一个变量，即 `arguments` 对象（这个对象在全局环境中是不存在的）。

作用域链中的下一个变量对象来自包含（外部）环境，而再下一个变量对象则来自下一个包含环境。这样，一直延续到全局执行环境；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

标识符解析是沿着作用域链一级一级地搜索标识符的过程。搜索过程始终从作用域链的前端开始，然后逐级地向后回溯，直至找到标识符为止（如果找不到标识符，通常会导致错误发生）。

作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

## 作用域和执行上下文

我们可以这样理解作用域，它相当于一块地盘，一段代码所存在的区域。

作用域是静态的，只要函数定义好了就一直存在，且不会变化。

执行上下文是动态的，在调用函数时创建，函数调用结束后上下文环境就会被释放。

另外对于执行上下文来说，当函数执行时就会被创建，所以一个函数可能会对应多个执行上下文。而除全局作用域外，每个函数有且只有一个自己的作用域。

## Show me the code

```javascript
console.log('begin with' + i)
var i = 0

function fn(i) {
  if (i === 4) {
    return
  }
  console.log('foo() begin with' + i)
  fn(i + 1)
  console.log('foo() end with' + i)
}

fn(i)
console.log('end with' + i)

// begin withundefined
// VM49:8 foo() begin with0
// VM49:8 foo() begin with1
// VM49:8 foo() begin with2
// VM49:8 foo() begin with3
// VM49:10 foo() end with3
// VM49:10 foo() end with2
// VM49:10 foo() end with1
// VM49:10 foo() end with0
// VM49:14 end with0
```

第一行主要是考察的是变量提升的问题，而最后一行主要是说明外层作用域通常并不能访问内部作用域的变量，而且函数作用域在函数执行完成后就直接销毁了。

其中的几行输出体现了函数运行时压栈和出栈的特点。

```javascript
function fn() {}
var fn
console.log(typeof fn) // function
```

就像上面所说的，函数提升遇到同名的会覆盖，而变量提升遇到同等情况则会忽略。换句话说，相当于先执行变量声明再执行函数声明。

```javascript
if (!('Name' in window)) {
  var Name = 'Anani'
}
console.log(Name) // undefined
```

这里主要涉及的也是变量提升的问题，在代码执行前，在全局作用域的变量都已经声明为了 `undefined`。

```javascript
var fn = 'Anani'
function fn(fn) {
  console.log(fn)
}

fn('Sharon') // fn is not a function
```

因为存在变量提升和函数提升，所以赋值语句是在这两者之后执行，当上面的代码执行到第五行时，`fn` 已经是一个字符串咯，下面使它真正执行是的步骤：

```javascript
var fn = 'Anani'
function fn(fn) {
  console.log(fn)
}
fn = 'Anani'
fn('Sharon') // fn is not a function
```

这样看起来就很明确了。

```javascript
var name = 'Anani'
function fn() {
  console.log(name)
}
function show(fn) {
  var name = 'Sharon'
  fn()
}

show(fn)
```

这里需要注意的就是，函数作用域在函数定义时就已经确定了，并无关它在哪里执行。由于函数 `fn` 是在全局作用域定义的，所以在访问变量时，如果自身作用域不存在，就会在全局作用域中查找。

```javascript
// 第一种
var fn = function() {
  console.log(fn)
}
fn() // 打印函数

// 第二种
var obj = {
  fn: function() {
    console.log(fn)
  },
}
obj.fn() // fn is not undefined
```

第一种比较简单就不提了，第二种也不难，在函数 `fn` 中没有找到变量，那么就去外层作用域中查找，也就是全局作用域，由于此时我们定义在全局中的变量只有 `obj`，所以根本不会找到读取的变量，从而导致报错。

## 参考资料

- [JavaScript 闭包](https://dongwanhong.github.io/BlogV1.0.0/blog-js/2017/10/closure.html)
- JavaScript 高级程序设计(第 3 版)
