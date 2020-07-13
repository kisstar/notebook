# 错误处理

错误处理在程序设计中相当重要。

任何有影响力的 Web 应用程序都需要一套完善的错误处理机制，同时考虑类型、频率，或者其他重要的标准对错误进行分类。这样，开发人员才能解决应用程序可能会出现的问题。

## try-catch 语句

`try-catch` 语句是 JavaScript 中处理异常的一种标准方式，我们把所有可能会抛出错误的代码都放在 `try` 语句块中，然后把那些用于错误处理的代码放在 `catch` 块中。

```javascript
try {
  // do someing
} catch (error) {
  // 处理错误
}
```

如果 `try` 块中的任何代码发生了错误，就会立即执行 `catch` 块中的代码，`catch` 块会接收到一个包含错误信息的对象。

**与在其他语言中不同的是，即使不使用这个错误对象，也要给它起个名字**。这个对象中包含的实际信息会因浏览器而异，但共同的是有一个保存着错误消息的 `message` 属性。ECMA-262 还规定了一个保存错误类型的 `name` 属性。

## finally 子句

`finally` 子句在 `try-catch` 语句中是可选的，但 `finally` 子句一经使用，其代码无论如何都会执行。无论 `try` 或 `catch` 语句块中包含什么代码——甚至 `return` 语句，都不能阻止。

```javascript
function testFinally() {
  try {
    console.log(NonexistentVariable)
  } catch (error) {
    return error
  } finally {
    console.log('something')
  }
}
```

另外，如果提供 `finally` 子句，则 `catch` 子句就成了可选的（catch 或 finally 有一个即可）。

## 错误类型

CMA-262 定义了下列 7 种错误类型：

- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

其中，`Error` 是基类型，其他错误类型都继承自该类型。`Error` 类型的错误很少见，如果有也是浏览器抛出的，这个基类型的主要目的是供开发人员抛出自定义错误。

`EvalError` 类型的错误会在使用 `eval()` 函数而发生异常时被抛出：如果没有把 `eval()` 当成函数调用，就会抛出错误。

```javascript
new eval() //抛出EvalError
eval = foo //抛出EvalError
```

`RangeError` 类型的错误会在数值超出相应范围时触发。

```javascript
var items1 = new Array(-20) //抛出RangeError
var items2 = new Array(Number.MAX_VALUE) //抛出RangeError
```

`ReferenceError` 在找不到对象的情况下（"object expected" 浏览器错误）便会发生。

```javascript
var obj = x //在 x 并未声明的情况下抛出 ReferenceError
```

`SyntaxError` 在把语法错误的 JavaScript 字符串传入 `eval()` 函数时就会出现。

```javascript
eval('a ++ b') //抛出SyntaxError
```

`TypeError` 类型在 JavaScript 中会经常用到，在变量中保存着意外的类型时，或者在访问不存在的方法时，都会导致这种错误。

```javascript
var o = new 10()
```

`URIError` 错误在使用 `encodeURI()` 或 `decodeURI()` 时，而 URI 格式不正确时，就会导致。

要想知道错误的类型，可以在 `try-catch` 语句的 `catch` 语句中使用 `instanceof` 操作符。

## 合理使用 try-catch

当 `try-catch` 语句中发生错误时，浏览器会认为错误已经被处理了，因而不会记录或报告错误，以能够让我们实现自己的错误处理机制。

使用 `try-catch` 最适合处理那些我们无法控制的错误。

比如，我们在调用第三方库的方法时，如果有意无意地抛出一些错误，由于我们不能修改这个库的源代码，所以大可将对该函数的调用放在 `try-catch` 语句当中，这样就可以恰当地处理它们。

在明明白白地知道自己的代码会发生错误时，再使用 `try-catch` 语句就不需要这样多此一举了。

## 抛出错误

与 `try-catch` 语句相配的还有一个 `throw` 操作符，用于随时抛出自定义错误。抛出错误时，必须要给 `throw` 操作符指定一个值，这个值是什么类型，没有要求。

在遇到 `throw` 操作符时，代码会立即停止执行。仅当有 `try-catch` 语句捕获到被抛出的值时，代码才会继续执行。

通过使用某种内置错误类型，可以更真实地模拟浏览器错误。每种错误类型的构造函数接收一个参数，即实际的错误消息。

在创建自定义错误消息时最常用的错误类型是 `Error`、`RangeError`、`ReferenceError` 和 `TypeError`。

另外，利用原型链还可以通过继承 `Error` 来创建自定义错误类型。

```javascript
function CustomError(message) {
  this.name = 'CustomError'
  this.message = message
}

CustomError.prototype = new Error()
throw new CustomError('Error message')
```

浏览器对待继承自 `Error` 的自定义错误类型，就像对待其他错误类型一样。如果要捕获自己抛出的错误并且把它与浏览器错误区别对待的话，创建自定义错误是很有用的。

::: tip

- 通常，应该在出现某种特定的已知错误条件，导致函数无法正常执行时抛出错误。
- 捕获错误的目的在于避免浏览器以默认方式处理它们；而抛出错误的目的在于提供错误发生具体原因的消息。

:::

## 错误（error）事件

任何没有通过 `try-catch` 处理的错误都会触发 `window` 对象的 `error` 事件。`onerror` 事件处理程序都不会创建 `event` 对但它可以接收三个参数：错误消息、错误所在的 URL 和行号。

只要发生错误，无论是不是浏览器生成的，都会触发 `error` 事件并执行这个事件处理程序。然后，浏览器像往常一样显示出错误消息。如果在事件处理程序中返回 `false`，就可以阻止浏览器报告错误的默认行为。

```javascript
window.onerror = function(message, url, line) {
  console.log(message)
  return false
}
```

图像也支持 `error` 事件，只要图像的 `src` 特性中的 URL 不能返回可以被识别的图像格式，就会触发 `error` 事件。此时的 `error` 事件遵循 DOM 格式，会返回一个以图像为目标的 `event` 对象。

```javascript
var image = new Image()
image.onload = function() {}
image.onerror = function() {}
image.src = 'doraemon.png'
```

当加载图像失败时就会执行错误处理程序。需要注意的是，发生 `error` 事件时，图像下载过程已经结束，也就是说不能再重新下载了。

## 常见的错误类型

- **类型转换错误**

类型转换错误发生在使用某个操作符，或者使用其他可能会自动转换值的数据类型的语言结构时。

容易发生类型转换错误的另一个地方，就是流控制语句。像 `if` 之类的语句在确定下一步操作之前，会自动把任何值转换成布尔值。尤其是 `if` 语句，如果使用不当，最容易出错。

```javascript
function concat(str1, str2, str3) {
  var result = str1 + str2
  if (str3) {
    // 绝对不要这样，建议使用：'string' === typeof str3
    result += str3
  }
  return result
}
```

- **数据类型错误**

JavaScript 是松散类型的，也就是说，在使用变量和函数参数之前，不会对它们进行比较以确保它们的数据类型正确。

比如，在一些函数中，对传入的参数没有进行类型检测，然后调用数组具有的一些方法做一些业务上的处理。当传入的参数是字符串时，那么对其调用数组特有的方法就会报错。

- **通信错误**

最常见的问题是在将数据发送给服务器之前，没有使用 `encodeURIComponent()` 对数据进行编码，对于查询字符串，应该记住必须要使用 `encodeURIComponent()` 方法。

## 调试技术

- **将消息记录到当前页面**

在页面中开辟一小块区域，用以显示消息。这个区域通常是一个元素，而该元素可以总是出现在页面中，但仅用于调试目的。

```javascript
function log(message) {
  var console = document.getElementById('debuginfo')
  if (console === null) {
    console = document.createElement('div')
    console.id = 'debuginfo'
    console.style.background = '#dedede'
    console.style.border = '1px solid silver'
    console.style.padding = '5px'
    console.style.width = '400px'
    console.style.position = 'absolute'
    console.style.right = '0px'
    console.style.top = '0px'
    document.body.appendChild(console)
  }
  console.innerHTML += '<p>' + message + '</p>'
}
```

这种技术在不支持 JavaScript 控制台的 IE7 及更早版本或其他浏览器中十分有用，它先检测是否已经存在调试元素，如果没有则会新创建一个 `<div>` 元素，并为该元素应用一些样式，以便与页面中的其他元素区别开。然后，又使用 `innerHTML` 将消息写入到这个 `<div>` 元素中。结果就是页面中会有一小块区域显示错误消息。

- **将消息记录到控制台**

通过 `console` 对象向 JavaScript 控制台中写入消息，这个对象具有下列方法：

- error(message)：将错误消息记录到控制台。
- info(message)：将信息性消息记录到控制台。
- log(message)：将一般消息记录到控制台。
- warn(message)：将警告消息记录到控制台。

错误消息带有红色图标，而警告消息带有黄色图标。

- **抛出错误**

抛出错误也是一种调试代码的好办法，自定义的错误通常都使用 `assert()` 函数抛出。这个函数接受两个参数，一个是求值结果应该为 `true` 的条件，另一个是条件为 `false` 时要抛出的错误。

```javascript
function assert(condition, message) {
  if (!conditin) throw new Error(message)
}

// 使用方式
function divide(dividend, divisor) {
  assert(
    typeof dividend == 'number' && typeof divisor == 'number',
    'divide(): Both arguments must be numbers.',
  )

  return dividend / divisor
}
```

可见，使用 `assert()` 函数可以减少抛出错误所需的代码量，而且也比前面的代码更容易看懂。

## 参考资料

- JavaScript 高级程序设计(第 3 版)
