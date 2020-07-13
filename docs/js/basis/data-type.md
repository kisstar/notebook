# 数据类型检测

在 JavaScript 中包括两种数据类型：

- **基本数据类型**(值类型)：字符串（String）、数字(Number)、布尔(Boolean)、对空（Null）、未定义（Undefined）、Symbol 等。
- **引用数据类型**：对象(Object)、数组(Array)、函数(Function)等。

## 类型检测的方法

目前数据类型的检查通常需要三种方法来配合使用，常见的对基本数据类型的检查主要使用 `typeof` 操作符，而对引用数据类型的检查主要使用 `instanceof` 操作符。

值得注意的是用 `instanceof` 操作符检测引用数据类型时存在一个弊端，在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。

多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。比如，如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数。

为了解决上面的问题，我们引进了 `toString()` 方法，由于原生数组的构造函数名与全局作用域无关，因此使用 `toString()` 就能保证返回一致的值。

之所以能使用 `toString()` 方法来检测主要也是因为在任何值上调用 `Object` 原生的 `toString()` 方法，都会返回一个 `[object NativeConstructorName]` 格式的字符串。每个类在内部都有一个 `[[Class]]` 属性，这个属性中就指定了前面字符串中的构造函数名。

请注意，`Object.prototpye.toString()` 本身也可能会被修改。

## 用法实例

- 检测字符串

```javascript
// 方式一：
function isString(value) {
  return 'string' === typeof value
}
// 方式二：
function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]'
}
```

- 检测数字

```javascript
// 方式一：
function isNumber(value) {
  return 'number' === typeof value
}
// 方式二：
function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]'
}
```

- 检测布尔值

```javascript
// 方式一：
function isBoolean(value) {
  return 'boolean' === typeof value
}
// 方式二：
function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]'
}
```

- 检测 Undefined

```javascript
// 方式一：
function isUndefined(value) {
  return undefined === value
}
// 方式二：
function isUndefined(value) {
  return 'undefined' === typeof value
}
// 方式三：
function isUndefined(value) {
  return Object.prototype.toString.call(value) === '[object Undefined]'
}
```

- 检测 Null

```javascript
// 方式一：
function isNull(value) {
  return null === value
}
// 方式二：
function isNull(value) {
  return Object.prototype.toString.call(value) === '[object Null]'
}
```

- 检测对象

```javascript
function isObject(value) {
  return null !== value && 'object' === typeof value
}
```

- 检测数组

```javascript
// 方式一：
function isArray(value) {
  return Array.isArray(value)
}
// 方式二：
function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}
// 方式三：
function isArray(value) {
  return value instanceof Array
}
```

- 检测函数

```javascript
function isFunction(value) {
  return typeof value === 'function'
}
// 判断是否是原生函数
function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]'
}
```

::: warning

- 开发人员定义的任何构造函数都将返回 `[object Object]`。
- 对于在 IE 中以 COM 对象形式实现的任何函数，它们不是原生的 JavaScript 函数。

:::

## undefined 和 null 的区别

通俗来讲就是 `undefined` 是定义了但是未赋值，而 `null` 是定义了只是赋值为 `null`。

事实上，当一个声明了一个变量未初始化时，这个变量的值就是 `undefined`，而 `null` 值则是表示空对象指针，即一个不存在的对象的占位符。

在开发工作中 `null` 的典型用法有：

- 作为对象原型链的终点。
- 通常我们在声明一个变量时，如果将来它是一个对象，我们就可以把它的值初始化为 `null`。
- 当函数的参数期望是对象时，用作参数传入，或当函数的返回期望值是对象时， 用作返回值传出。
- 数据不再有用时，最好将其值设置为 `null` 来释放引用，这个方法被称为“解除引用”。

## 参考资料

- [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- JavaScript 高级程序设计(第 3 版)
- [JavaScript 对象参考手册](http://www.runoob.com/jsref/jsref-tutorial.html)
