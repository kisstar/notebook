# YDKJS-混合环境 JavaScript

如果 JavaScript 程序仅仅是在引擎中运行的话，它会严格遵循规范并且是可以预测的。

但是 JavaScript 程序几乎总是在宿主环境中运行，这使得它在一定程度上变得不可预测。

## Annex B（ECMAScript）

JavaScript 语言的官方名称是 ECMAScript（指的是管理它的 ECMA 标准），JavaScript 是该语言的通用称谓，更确切地说，它是该规范在浏览器上的实现。

官方 ECMAScript 规范包括 Annex B，其中介绍了由于浏览器兼容性问题导致的与官方规范的差异，下面是主要的兼容性差异：

- 在非严格模式中允许八进制数值常量存在，如 0123（即十进制的 83）。
- `window.escape(..)` 和 `window.unescape(..)` 让你能够转义和回转带有 `%` 分隔符的十六进制字符串。
- `String.prototype.substr` 和 `String.prototype.substring` 十分相似，除了前者的第二个参数是结束位置索引（非自包含），后者的第二个参数是长度（需要包含的字符数）。

### Web ECMAScript

Web ECMAScript 规范（<https://javascript.spec.whatwg.org>）中介绍了官方 ECMAScript 规范和目前基于浏览器的 JavaScript 实现之间的差异。

- `<!--` 和 `-->` 是合法的单行注释分隔符。
- `String.prototype` 中返回 HTML 格式字符串的附加方法：`anchor(..)`、`big(..)`、`blink(..)`、`bold(..)`、`fixed(..)`、`fontcolor(..)`、`fontsize(..)`、`italics(..)`、`link(..)`、`small(..)`、`strike(..)` 和 `sub(..)`。
- RegExp 扩展：`RegExp.$1 .. RegExp.$9`（匹配组）和 `RegExp.lastMatch/RegExp["$&"]`（最近匹配）。
- `Function.prototype` 附加方法：`Function.prototype.arguments`（别名为 arguments 对象）和 `Function.caller`（别名为 arguments.caller）。

## 宿主对象

JavaScript 中有关变量的规则定义得十分清楚，但也不乏一些例外情况，比如自动定义的变量，以及由宿主环境（浏览器等）创建并提供给 JavaScript 引擎的变量——所谓的“宿主对象”（包括内建对象和函数）。

```js
var a = document.createElement('div')
typeof a // "object"--正如所料
Object.prototype.toString.call(a) // "[object HTMLDivElement]"
a.tagName // "DIV"
```

示例中，`a` 不仅仅是一个 `object`，还是一个特殊的宿主对象，因为它是一个 DOM 元素。其内部的 `[[Class]]` 值（为 `"HTMLDivElement"`）来自预定义的属性（通常也是不可更改的）。

其他需要注意的宿主对象的行为差异有：

- 无法访问正常的 object 内建方法，如 toString();
- 无法写覆盖；
- 包含一些预定义的只读属性；
- 包含无法将 this 重载为其他对象的方法；
- 其他 ...

## 全局 DOM 变量

声明一个全局变量（使用 var 或者不使用）的结果并不仅仅是创建一个全局变量，而且还会在 `global` 对象（在浏览器中为 window）中创建一个同名属性。

还有一个不太为人所知的事实是：由于浏览器演进的历史遗留问题，在创建带有 `id` 属性的 DOM 元素时也会创建同名的全局变量。例如：

```html
<div id="foo"></div>

<script>
  console.log(foo) // HTML元素
</script>
```

这也是尽量不要使用全局变量的一个原因。如果确实要用，也要确保变量名的唯一性，从而避免与其他地方的变量产生冲突，包括 HTML 和其他第三方代码。

## 原生原型

在 JavaScript 中一个广为人知的最佳实践是：不要扩展原生原型。

例如向 `Array.prototype` 中加入新的方法和属性，假设它们确实有用，设计和命名都很得当，那它最后很有可能会被加入到 JavaScript 规范当中。这样一来你所做的扩展就会与之冲突。

```js
// Netscape 4没有Array.push
Array.prototype.push = function(item) {
  this[this.length - 1] = item
}
```

问题在于 `Array.prototype.push` 加入规范规范后，和这段代码不兼容。标准的 `push(..)` 可以一次加入多个值。而这段代码中的 `push` 方法则只会处理第一个值。

在扩展原生方法时需要加入判断条件（因为你可能无意中覆盖了原来的方法）。对于前面的例子，下面的处理方式要更好一些：

```js
if (!Array.prototype.push) {
  // Netscape 4没有Array.push
  Array.prototype.push = function(item) {
    this[this.length - 1] = item
  }
}
```

但它并非万全之策，并且存在着一定的隐患。通常来说，在老版本的（不符合规范的）运行环境中扩展原生方法是唯一安全的，因为环境不太可能发生变化。

另外就是对于将来可能成为标准的功能，按照大部分人赞同的方式来预先实现能和将来的标准兼容的 `polyfill`，我们称为 `prollyfill`（probably fill）。

有些功能可能没法提供完整的 `polyfill`，所以在处理这些情况的时候需要格外小心，要编写健壮的代码，并且写好文档。

## script

绝大部分网站 / Web 应用程序的代码都存放在多个文件中，然后在网页中使用 `script` 标签来引入，引入的代码的运行方式像是相互独立的 JavaScript 程序，但同时又共享一个全局对象。

如果 `script` 中的代码（无论是内联代码还是外部代码）发生错误，它会像独立的 JavaScript 程序那样停止，但是后续的 `script` 中的代码依然会接着运行，不会受影响。

你可以使用代码来动态创建 `script`，将其加入到页面的 DOM 中，效果是一样的：

```js
var greeting = 'Hello World'
var el = document.createElement('script')

el.text =
  'function foo(){ alert( greeting );\
 } setTimeout( foo, 1000 );'
document.body.appendChild(el)
```

内联代码和外部文件中的代码之间有一个区别，即在内联代码中不可以出现 `</script>` 字符串，一旦出现即被视为代码块结束。

## 保留字

ES5 规范定义了一些“保留字”，我们不能将它们用作变量名。这些保留字有四类：“关键字”、“预留关键字”、`null` 常量和 `true`/`false` 布尔常量。

像 `function` 和 `switch` 都是关键字。预留关键字包括 `enum` 等，它们中很多已经在 ES6 中被用到（如 class、extend 等）。另外还有一些在严格模式中使用的保留字，如 `interface`。

在 ES5 之前，保留字也不能用来作为对象常量中的属性名称或者键值，但是现在已经没有这个限制。

```js
// 例如，下面的情况是不允许的
var import = '42'

// 但是下面的情况是允许的
var obj = { import: '42' }
console.log(obj.import)
```

需要注意的是，在一些版本较老的浏览器中（主要是 IE），这些规则并不完全适用，有时候将保留字作为对象属性还是会出错。所以需要在所有要支持的浏览器中仔细测试。

## 实现中的限制

JavaScript 规范对于函数中参数的个数，以及字符串常量的长度等并没有限制；但是由于 JavaScript 引擎实现各异，规范在某些地方有一些限制。

```js
function addAll() {
  var sum = 0
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}
var nums = []
for (var i = 1; i < 100000; i++) {
  nums.push(i)
}
addAll(2, 4, 6) // 12
addAll.apply(null, nums) // 应该是: 499950000
```

在一些 JavaScript 引擎中你会得到正确答案 499950000，而另外一些引擎（如 Safari 6.x）中则会产生错误“RangeError: Maximum call stack size exceeded”。

下面列出一些已知的限制：

- 字符串常量中允许的最大字符数（并非只是针对字符串值）；
- 可以作为参数传递到函数中的数据大小（也称为栈大小，以字节为单位）；
- 函数声明中的参数个数；
- 未经优化的调用栈（例如递归）的最大层数，即函数调用链的最大长度；
- JavaScript 程序以阻塞方式在浏览器中运行的最长时间（秒）；
- 变量名的最大长度。

我们不会经常碰到这些限制，但应该对它们有所了解，特别是不同的 JavaScript 引擎的限制各异。
