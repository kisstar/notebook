# YDKJS-对象

在 JavaScript 中包含字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol 六种基本数据类型和一种引用数据类型（Object，对象）。

同时 JavaScript 中还有一些对象子类型，通常被称为内置对象：

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

内置对象从表现形式来说很像其他语言中的类型（type）或者类（class），但在 JavaScript 中，它们实际上只是一些内置函数。这些内置函数可以当作构造函数来使用，从而可以构造一个对应子类型的新对象。

其中 `null` 和 `undefined` 没有对应的构造形式，它们只有文字形式。相反，Date 只有构造，没有文字形式。

## 基础

创建对象最常见的两种方式是使用对象字面量或构造函数。

在对象中，属性名永远都是字符串。如果你使用其他值作为属性名，那它首先会被转换为一个字符串。即使是数字也不例外，虽然在数组下标中使用的的确是数字，但是在对象属性名中数字会被转换成字符串。

ES6 增加了可计算属性名，可以在文字形式中使用 `[]` 包裹一个表达式来当作属性名。

数组也支持 `[]` 访问形式，不过就像我们之前提到过的，数组有一套更加结构化的值存储机制。数组期望的是数值下标，也就是说值存储的位置（通常被称为索引）是非负整数。

数组也是对象，所以虽然每个下标都是整数，你仍然可以给数组添加属性，甚至完全可以把数组当作一个普通的键/值对象来使用。

## 拷贝

在 JavaScript 中对于对象的拷贝通常分为欠拷贝和深拷贝两种。思考下面这个对象：

```js
function anotherFunction() {
  /*..*/
}
var anotherObject = {
  c: true,
}
var anotherArray = []
var myObject = {
  a: 2,
  b: anotherObject, // 引用，不是复本！
  c: anotherArray, // 另一个引用！
  d: anotherFunction,
}
```

对于浅拷贝来说，复制出的新对象中 `a` 的值会复制旧对象中 `a` 的值，也就是 2，但是新对象中 `b`、`c`、`d` 三个属性其实只是三个引用，它们和旧对象中 `b`、`c`、`d` 引用的对象是一样的。

对于深复制来说，除了复制 `myObject` 以外还会复制 `anotherObject` 和 `anotherArray`。这时问题就来了，`anotherArray` 引用了 `anotherObject` 和 `myObject`，所以又需要复制 `myObject`，这样就会由于循环引用导致死循环。

我们是应该检测循环引用并终止循环（不复制深层元素）？还是应当直接报错或者是选择其他方法？除此之外，我们“复制”一个函数意味着什么？

这些问题似乎没有一个明确统一的答案，对于 JSON 安全的对象来说，有一种巧妙的复制方法：

```js
var newObj = JSON.parse(JSON.stringify(someObj))
```

当然，这种方法需要保证对象是 JSON 安全的，所以只适用于部分情况。

相比深复制，浅复制非常易懂并且问题要少得多，所以 ES6 定义了 `Object.assign(..)` 方法来实现浅复制。

## 属性描述符

从 ES5 开始，所有的属性都具备了属性描述符，我们可以通过 `Object.getOwnPropertyDescriptor(object, prop)` 来查看：

```js
var myObject = {
  a: 2,
}
Object.getOwnPropertyDescriptor(myObject, 'a')
```

在创建普通属性时属性描述符会使用默认值，我们也可以使用 `Object.defineProperty(..)` 来添加一个新属性或者修改一个已有属性（如果它是 configurable）并对特性进行设置。

```js
var myObject = {}
Object.defineProperty(myObject, 'a', {
  value: 2, // 值
  writable: false, // 是否可写
  configurable: false, // 是否可配置，如果为假则后续无法再使用 defineProperty 方法进行修改，同时还会禁止删除这个属性
  enumerable: false, // 是否可枚举
})
myObject.a // 2
```

示例中我们定义了一个不可变的属性，有时候你会希望属性或者对象是不可改变，此时可以同时使用：

- `Object.preventExtensions(..)`：禁止一个对象添加新属性并且保留已有属性。
- `Object.seal(..)`：创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 `Object.preventExtensions(..)` 并把所有现有属性标记为 `configurable:false`。
- `Object.freeze(..)`：调用 `Object.seal(..)` 并把所有“数据访问”属性标记为 `writable:false`。

你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 `Object.freeze(..)`，然后遍历它引用的所有对象并在这些对象上调用 `Object.freeze(..)`。

## Getter 和 Setter

在 ES5 中可以使用 `getter` 和 `setter` 改写属性读取和修改的默认操作，但是只能应用在单个属性上，无法应用在整个对象上。`getter` 是一个隐藏函数，会在获取属性值时调用。`setter` 也是一个隐藏函数，会在设置属性值时调用。

当你给一个属性定义 `getter`、`setter` 或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。对于访问描述符来说，JavaScript 会忽略它们的 `value` 和 `writable` 特性，取而代之的是关心 `set` 和 `get`（还有 configurable 和 enumerable）特性。

```js
var myObject = {
  // 给 a 定义一个 getter
  get a() {
    return this._a_
  },
  // 给 a 定义一个 setter
  set a(val) {
    this._a_ = val * 2
  },
}
myObject.a = 2
myObject.a // 4
```

当然，你也可以通过 `defineProperty(..)` 显式定义其中之一或两者。

## 存在性

返回一个对象的属性时可能会返回 `undefined`，如何区分是是否不存在还是本身存储的就是 `undefined` 的呢？

```js
var myObject = {
  a: 2,
}

'a' in myObject // true
'b' in myObject // false
myObject.hasOwnProperty('a') // true
myObject.hasOwnProperty('b') // false
```

`in` 操作符会检查属性是否在对象及其 `[[Prototype]]` 原型链中。相比之下，`hasOwnProperty(..)` 只会检查属性是否在 `myObject` 对象中，不会检查 `[[Prototype]]` 链。

## 枚举

对象中不可枚举的属性不会出现在 `for..in` 循环中（尽管可以通过 in 操作符来判断是否存在）。

```js
var myObject = {}
Object.defineProperty(
  myObject,
  'a',
  // 让 a 像普通属性一样可以枚举
  { enumerable: true, value: 2 },
)
Object.defineProperty(
  myObject,
  'b',
  // 让 b 不可枚举
  { enumerable: false, value: 3 },
)
myObject.b // 3
'b' in myObject // true
myObject.hasOwnProperty('b') // true
// .......
for (var k in myObject) {
  console.log(k, myObject[k])
}
// "a" 2
```

在数组上应用 `for..in` 循环有时会产生出人意料的结果，因为这种枚举不仅会包含所有数值索引，还会包含所有可枚举属性。最好只在对象上应用 `for..in` 循环。

另外，通过 `propertyIsEnumerable(..)` 可以检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足 `enumerable:true`。

`Object.keys(..)` 会返回一个数组，包含所有可枚举属性，`Object.getOwnPropertyNames(..)` 会返回一个数组，包含所有属性，无论它们是否可枚举。

## 遍历

ES6 增加了一种用来遍历数组的 `for..of` 循环语法（如果对象本身定义了迭代器的话也可以遍历对象）：

```js
var myArray = [1, 2, 3]
for (var v of myArray) {
  console.log(v)
}
// 1
// 2
// 3
```

`for..of` 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的 `next()` 方法来遍历所有返回值：

```js
var myArray = [1, 2, 3]
var it = myArray[Symbol.iterator]()
it.next() // { value:1, done:false }
it.next() // { value:2, done:false }
it.next() // { value:3, done:false }
it.next() // { done:true }
```

普通的对象没有内置的 `@@iterator`，所以无法自动完成 `for..of` 遍历。但你可以给任何想遍历的对象定义 `@@iterator`，举例来说：

```js
var myObject = {
  a: 2,
  b: 3,
}
Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: idx > ks.length,
        }
      },
    }
  },
})
```

你甚至可以定义一个“无限”迭代器，它永远不会“结束”并且总会返回一个新值（比如随机数、递增值、唯一标识符，等等）。
