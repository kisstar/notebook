# YDKJS-类型

在 JavaScript 中，类型可以说是值的内部特征，它定义了值的行为，以使其区别于其他值。

目前为止，ECMAScript 标准定义了 8 种数据类型：Boolean、Null、Undefined、Number、BigInt、String、Symbol 和 Object。

## typeof

JavaScript 中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。

我们可以用 `typeof` 运算符来查看值的类型，它返回的是类型的字符串值。

需要注意的是 `typeof` 对 `null` 会返回 `"object"`，对于函数（函数是“可调用对象”，所以它也可以有属性，它的一个内部属性 `[[Call]]` 使其可以被调用）则会返回 `function`。

下面是一个更加完善的类型检查方案：

```js
function type(value) {
  if (value == null) {
    return value + ''
  }

  return typeof value === 'object' || typeof value === 'function'
    ? Object.prototype.toString
        .call(value)
        .replace(/^\[object ([A-z]+)\]$/, '$1')
        .toLowerCase()
    : typeof value
}
```

另外一个令人疑惑的点是：`typeof` 对于未声明的变量或则声明但未赋值的变量都会返回 `"undefined"`。这一点对在浏览器中运行的 JavaScript 代码来说还是很有帮助的：

```js
// 这样会抛出错误
if (variable) {
  // do something
}

// 这样是安全的
if (typeof variable !== 'undefined') {
  // do something
}
```

当然，对于全局变量你也可以将其作为全局对象的属性来判断，还有一些人喜欢使用“依赖注入”设计模式，就是将依赖通过参数显式地传递到函数中。

## 数组

在 JavaScript 中，数组可以容纳任何类型的值，可以是字符串、数字、对象（object），甚至是其他数组（多维数组就是通过这种方式来实现的）。

数组通过数字进行索引，但由于它们也是对象，所以也可以包含字符串键值和属性。如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。

```js
var a = []

a.name = 'test'
console.log(a.length) // 0
a['2'] = 'test'
console.log(a.length) // 3
```

在创建“稀疏”数组（sparse array，即含有空白或空缺单元的数组）时要特别注意，访问其中的“空白单元”（empty slot）会返回 `undefined`，但这与将其显式赋值为 `undefined` 还是有所区别。

另外，对于一些类数组（拥有一组通过数字索引的值并且具备 length 属性的对象）需要转换为真正的数组时，通过数组工具函数（如 indexOf(..)、concat(..)、forEach(..) 等）来实现。

```js
function foo() {
  var arr = Array.prototype.slice.call(arguments)
  arr.push('bam')
  console.log(arr)
}
foo('bar', 'baz') // ["bar", "baz", "bam"]
```

现在，用 ES6 中的内置工具函数 `Array.from(..)` 也能实现同样的功能。

## 字符串

字符串和数组的确很相似，它们都是类数组，都有 `length` 属性以及 `indexOf(..)`（从 ES5 开始数组支持此方法）和 `concat(..)` 方法。但这并不意味着它们都是“字符数组”：

```js
var a = 'xyz'

console.log(a[1]) // y
a[1] = 'b'
console.log(a[1]) // y
```

可见在 JavaScript 中字符串是不可变的，而数组是可变的。

字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值上进行操作。

许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数组的非变更方法来处理字符串：

```js
var a = 'foo'
var c = Array.prototype.join.call(a, '-')
var d = Array.prototype.map
  .call(a, function(v) {
    return v.toUpperCase() + '.'
  })
  .join('')

c // "f-o-o"
d // "F.O.O."
```

如果需要经常以字符数组的方式来处理字符串的话，倒不如直接使用数组。这样就不用在字符串和数组之间来回折腾。可以在需要时使用 `join("")` 将字符数组转换为字符串。

## 数字

在 JavaScript 中, Number 是一种定义为 64 位双精度浮点型（double-precision 64-bit floating point format） (IEEE 754)的数字数据类型。

JavaScript 中的数字常量一般用十进制表示，数字前面的零和小数点后小数部分最后面的零都可以省略。特别大和特别小的数字默认用指数格式显示，与 `toExponential()` 函数的输出结果相同：

```js
var a = 5e10 // 50000000000
var b = a * a

a.toExponential() // "5e+10"
b // 2.5e+21
```

由于数字值可以使用 Number 对象进行封装，因此数字值可以调用 Number 原型上的方法。这些方法不仅适用于数字变量，也适用于数字常量。

不过对于 `.` 运算符需要给予特别注意，因为它是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。

```js
// 无效语法：
42.toFixed( 3 ); // SyntaxError，这里的 `.` 会被识别为小数点

// 有效的语法：
(42).toFixed( 3 ); // "42.000"
0.42.toFixed( 3 ); // "0.420"
42..toFixed( 3 ); // "42.000"
42 .toFixed(3); // "42.000"，42 后面的空格是刻意的，不过这容易引起误会，所以并不推荐
```

二进制浮点数最大的问题（不仅 JavaScript，所有遵循 IEEE 754 规范的语言都是如此），是会出现如下情况：

```js
0.1 + 0.2 === 0.3 // false
```

简单来说就是二进制浮点数中的 0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于 0.3，而是一个比较接近的数字 0.30000000000000004，所以条件判断结果为 `false`。

最常见的解决方案是设置一个误差范围值，通常称为“机器精度”（machine epsilon），对 JavaScript 的数字来说，这个值通常是 2^-52 (2.220446049250313e-16)。从 ES6 开始，该值定义在 `Number.EPSILON` 中。

## 特殊的值

在 JavaScript 中 `undefined` 和 `null` 它们的名称既是类型也是值，前者表示没有值，而后者指空值。

`null` 是一个特殊关键字，不是标识符，我们不能将其当作变量来使用和赋值。然而 `undefined` 却是一个标识符，可以被当作变量来使用和赋值。

最好不要把 `undefined` 当作变量来使用，为了以防万一，我们可以通过一些方式来得到最初的 `undefined`，比如未赋值的参数：

```js
function todo(undef) {
  var oriUndefined = undef
}
todo() // 在不传递参数时，在 todo() 内部就可以取到 undefined 值
```

当谈，也可以通过 `void` 运算符来得到该值，按惯例我们用 `void 0` 来获得 `undefined`。

另外一个特殊的值：NaN，如果数学运算的操作数不是数字类型（或者无法解析为常规的十进制或十六进制数字），就无法返回一个有效的数字，这种情况下返回值为 NaN。

需要注意的是虽然 NaN 用来表示一个不是数字，但使用 `typeof` 进行检查时会返回 `"number"`，换句话说，“不是数字的数字”仍然是数字类型。

而且 NaN 不与任何值相等，包括它自己，识别时可以使用内建的全局工具函数 `isNaN(..)` 来判断一个值是否是 NaN。

```js
var a = 2 / 'foo'
var b = 'foo'

isNaN(a) // true
isNaN(b) // trueP
Number.isNaN(a) // true
Number.isNaN(b) // false
```

可见，全局上的 `isNaN(..)` 方法对于不是数字类型的值也会返回值，所以最好使用 Number 上的 `isNaN(..)` 方法进行判断（Object.is() 方法也可以）。

## 值和引用

JavaScript 对值和引用的赋值/传递在语法上没有区别，完全根据值的类型来决定。

对于基本数据类型总是通过值复制的方式来赋值/传递，复合值（compound value）——对象和函数，则总是通过引用复制的方式来赋值/传递。

```js
var a = 2
var b = a // b 是 a 的值的一个副本
b++
a // 2
b // 3
var c = [1, 2, 3]
var d = c // d 是 [1,2,3] 的一个引用
d.push(4)
c // [1,2,3,4]
d // [1,2,3,4]
```

由于引用指向的是值本身而非变量，所以一个引用无法更改另一个引用的指向。

## 参考

- [void 运算符 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)
