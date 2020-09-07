# 原生函数

JavaScript 的内建函数（built-in function），也叫原生函数（native function），常见的原生函数有：

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

原生函数可以被当作构造函数来使用，通过构造函数（如 new String("abc")）创建出来的是封装了基本类型值（如 "abc"）的封装对象。

## 内部属性 [[Class]]

所有 `typeof` 返回值为 `"object"` 的对象（如数组）都包含一个内部属性 `[[Class]]`。这个属性无法直接访问，一般通过 `Object.prototype.toString(..)` 来查看。

多数情况下，对象的内部 `[[Class]]` 属性和创建该对象的内建原生构造函数相对应，但并非总是如此。

对于 `Null()` 和 `Undefined()` 这样的原生构造函数并不存在，但是内部 `[[Class]]` 属性值仍然是 `"Null"` 和 `"Undefined"`。

其他基本类型值（如字符串、数字和布尔）的情况也有所不同，通常称为“包装”：

```js
Object.prototype.toString.call('abc')
// "[object String]"
Object.prototype.toString.call(42)
// "[object Number]"
Object.prototype.toString.call(true)
// "[object Boolean]"
```

示例中基本类型值被各自的封装对象自动包装，所以它们的内部 `[[Class]]` 属性值分别为 `"String"`、`"Number"` 和 `"Boolean"`。

## 包装与拆封

封装对象扮演着十分重要的角色。由于基本类型值没有 `.length` 和 `.toString()` 这样的属性和方法，需要通过封装对象才能访问，此时 JavaScript 会自动为基本类型值包装一个封装对象。

使用封装对象时有些地方需要特别注意：

```js
var a = new Boolean(false)

if (!a) {
  console.log('Oops') // 执行不到这里
}
```

如果想要得到封装对象中的基本类型值，可以使用 `valueOf()` 函数：

```js
var a = new String('abc')
var b = new Number(42)
var c = new Boolean(true)
var d = a + '' // 隐式拆封，d 的值为 "abc"
a.valueOf() // "abc"
b.valueOf() // 42
c.valueOf() // true
typeof d // "string"
```

通常不推荐直接使用封装对象。

## Array(..)

当我们通过构造函数来创建数组时，可以通过传递多个参数来初始化数组的值，只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。

为了能够总是将传递的参数作为数组的元素，在 ES6 中提供了 `Array.of(...)` 方法：

```js
var a = Array(1)
var b = Array.of(1)

a // []
b // [1]
a.length === b.length // true
```

另外，对于“稀疏数组”（包含至少一个“空单元”的数组）还有一些可能和预期不太符的行为：

```js
var a = new Array(3) // 稀疏数组
var b = [undefined, undefined, undefined]

a.join('-') // "--"
b.join('-') // "--"
a.map(function(v, i) {
  return i
}) // [ undefined x 3 ]
b.map(function(v, i) {
  return i
}) // [ 0, 1, 2 ]
```

我们可以通过下述方式来创建包含 `undefined` 单元（而非“空单元”）的数组：

```js
var a = Array.apply(null, { length: 3 })
a // [ undefined, undefined, undefined ]
```

在 ES6 中，你也可以使用 `Array.from({ length: 3 })` 来进行创建。

## 原生原型

原生构造函数有自己的原型对象，如 `Array.prototype`、`String.prototype` 等。这些对象包含其对应子类型所特有的行为特征。

然而，有些原生原型（native prototype）并非普通对象那么简单：

```js
typeof Function.prototype // "function"
Function.prototype() // 空函数

RegExp.prototype.toString() // "/(?:)/" —— 空正则表达式
'abc'.match(RegExp.prototype) // [""]
```

而且，我们甚至可以修改它们（不仅仅是添加属性）：

```js
Array.isArray(Array.prototype) // true
Array.prototype.push(1, 2, 3) // 3
Array.prototype // [1, 2, 3]
// 需要将 Array.prototype 设置回空，否则会导致问题
Array.prototype.length = 0
```

这样对未赋值的变量来说，它们是很好的默认值，但不要试图修改它们。
