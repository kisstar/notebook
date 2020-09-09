# YDKJS-语法

“句子”（sentence）是完整表达某个意思的一组词，由一个或多个“短语”（phrase）组成，它们之间由标点符号或连接词（and 和 or 等）连接起来。

短语可以由更小的短语组成。有些短语是不完整的，不能独立表达意思；有些短语则相对完整，并且能够独立表达某个意思。这些规则就是英语的语法。

JavaScript 的语法也是如此。语句相当于句子，表达式相当于短语，运算符则相当于标点符号和连接词。

```js
var a = 3 * 6 // 声明语句：声明了变量，赋值表达式：对变量进行了赋值
b // 表达式语句
```

## 语句的结果值

语句都有一个结果值（statement completion value，undefined 也算）。

获得结果值最直接的方法是在浏览器开发控制台中输入语句，默认情况下控制台会显示所执行的最后一条语句的结果值。

以赋值表达式 `b = a` 为例，其结果值是赋给 `b` 的值（18），但规范定义 `var` 的结果值是 `undefined`。如果在控制台中输入 `var a = 42` 会得到结果值 `undefined`，而非 42。

但我们在代码中通常没有办法获得这个结果值的：

```js
var b
if (true) {
  b = 4 + 38
}

// 这样是行不通的
var a, b;
a = if (true) {
 b = 4 + 38;
};

// 这样可行，但是强烈不推荐
var a, b
a = eval('if (true) { b = 4 + 38; }')
a // 42
```

可见，代码块的结果值就如同一个隐式的返回，即返回最后一个语句的结果值。

## 表达式的副作用

最常见的有副作用（也可能没有）的表达式是函数调用：

```js
function foo() {
  a = a + 1
}
var a = 1
foo() // 结果值：undefined。副作用：a的值被改变
```

递增运算符 `++` 和递减运算符 `--` 都是一元运算符，它们既可以用在操作数的前面，也可以用在后面。结合赋值操作，前置时会先赋值再运算：

```js
var a = 42
var b = a++

a // 43
b // 42
```

也就是说 `++` 在前面时，如 `++a`，它的副作用（将 a 递增）产生在表达式返回结果值之前，而 `a++` 的副作用则产生在之后。

如果不想使用前置递增或递减运算，也可以使用语句系列逗号运算符（statement-series comma operator）将多个独立的表达式语句串联成一个语句：

```js
var a = 42,
  b
b = (a++, a)

a // 43
b // 43
```

另外，`delete` 运算符的副作用就是属性被从对象中删除，更有趣的是赋值运算符：

```js
var a, b, c
a = b = c = 42 // 注意它和 var a = b = 42，后者如果 b 未声明非严格模式会自动声明一个全局变量，严格模式则会报错
```

## 上下文规则

在 JavaScript 语法规则中，有时候同样的语法在不同的情况下会有不同的解释。

譬如，大括号通常会在我们声明一个变量的时候遇到：

```js
// 假定函数bar()已经定义
var a = {
  foo: bar(),
}
```

如果将上例中的 `var a =` 去掉会发生什么情况呢？

```js
{
  foo: bar()
}
```

在这里大括号只是一个普通的代码块，更重要的是其中的 `foo: bar()` 是合法的， `foo:` 会被识别为一个标签。标签通常会在循环中被用到，结合 `continue` 和 `break` 语句实现类似于 `goto` 的语法。

标签也能用于非循环代码块，但只有 `break` 才可以。我们可以对带标签的代码块使用 `break ___`，但是不能对带标签的非循环代码块使用 `continue ___`，也不能对不带标签的代码块使用 `break`。

```js
// 标签为 bar 的代码块
function foo() {
  bar: {
    console.log('Hello')
    break bar
    console.log('never runs')
  }
  console.log('World')
}
foo()
// Hello
// World
```

还有一个坑常被提到：

```js
console.log([] + {}) // "[object Object]"
console.log({} + []) // 0
```

第一行代码中，`{}` 出现在 `+` 运算符表达式中，因此它被当作一个值（空对象）来处理。`[]` 会被强制类型转换为 `""`，而 `{}` 会被强制类型转换为 `"[object Object]"`。

但在第二行代码中，`{}` 被当作一个独立的空代码块（不执行任何操作）。代码块结尾不需要分号，所以这里不存在语法上的问题。最后 `+ []` 将 `[]` 显式强制类型转换为 0。

另外还有一个很深的误会是认为 JavaScript 中有 `else if`，因为我们经常会写出下面这样的代码：

```js
if (a) {
  // ..
} else if (b) {
  // ..
} else {
  // ..
}
```

事实上 JavaScript 没有 else if，但 if 和 else 只包含单条语句的时候可以省略代码块的，所以上面的代码实际上实际上是这样的：

```js
if (a) {
  // ..
} else {
  if (b) {
    // ..
  } else {
    // ..
  }
}
```

从 ES6 开始，`{ .. }` 也可用于“解构赋值”（destructuring assignment）。

## 运算符优先级

运算符的优先级决定了表达式中运算执行的先后顺序，优先级高的运算符最先被执行。

逗号运算符对它的每个操作数求值（从左到右），并返回最后一个操作数的值。在 JavaScript 中，它的优先级最低。

```js
let x = 1

x = (x++, x)
console.log(x) // 2
x = (2, 3)
console.log(x) // 3
```

对 `&&` 和 `||` 来说，如果从左边的操作数能够得出结果，就可以忽略右边的操作数。我们将这种现象称为“短路”（即执行最短路径）。和条件运算符一起使用时，它们都会优先被计算。

关联性决定了拥有相同优先级的运算符的执行顺序。左关联（左到右）相当于把左边的子表达式加上小括号 `(a OP b) OP c`，右关联（右到左）相当于 `a OP (b OP c)`。

常见的条件运算符和赋值运算符都是右关联的。

如果运算符优先级/关联规则能够令代码更为简洁，就使用运算符优先级/关联规则；而如果 `( )`（圆括号，在 JavaScript 中拥有最高优先级） 有助于提高代码可读性，就使用 `( )`。

## 自动分号

有时 JavaScript 会自动为代码行补上缺失的分号，即自动分号插入（Automatic Semicolon Insertion，ASI）。

```js
function foo(a) {
  if (!a) return
  a *= 2
  // ..
}
```

由于 ASI 会在 `return` 后面自动加上 `;`，所以这里 `return` 语句并不包括第二行的 `a \*= 2`。

`return` 语句的跨度可以是多行，但是其后必须有换行符以外的代码：

```js
/*

function foo(a) {
 return (
  a * 2 + 3 / 12
 );
}

*/
```

建议在所有需要的地方加上分号，将对 ASI 的依赖降到最低。

## 错误

JavaScript 不仅有各种类型的运行时错误（TypeError、ReferenceError、SyntaxError 等），它的语法中也定义了一些编译时错误，这些在编译阶段发现的代码错误叫作“早期错误”。

比如在严格模式中，使用同名的函数参数、对象中包含同名的属性、非法的正则表达式都会产生早起错误。

这些错误在代码执行之前是无法用 `try..catch` 来捕获的，相反，它们还会导致解析/编译失败。

ES6 规范定义了一个新概念，叫作 TDZ（Temporal Dead Zone，暂时性死区：指的是由于代码中的变量还没有初始化而不能被引用的情况）。最直观的例子是 ES6 规范中的 `let` 块作用域：

```js
{
  a = 2 // ReferenceError!
  let a
}
```

有意思的是，对未声明变量使用 `typeof` 不会产生错误，但在 TDZ 中却会报错：

```js
{
  typeof a // undefined
  typeof b // ReferenceError! (TDZ)
  let b
}
```

## 函数参数

另一个 TDZ 违规的例子是 ES6 中的参数默认值：

```js
var b = 3
function foo(a = 42, b = a + b + 5) {
  // ..
}
```

`b = a + b + 5` 在参数 `b`（= 右边的 b，而不是函数外的那个）的 TDZ 中访问 `b`，所以会出错。而访问 `a` 却没有问题，因为此时刚好跨出了参数 `a` 的 TDZ。

对 ES6 中的参数默认值而言，参数被省略或被赋值为 `undefined` 效果都一样，都是取该参数的默认值。然而某些情况下，它们之间还是有区别的：

```js
function foo(a = 42, b = a + 1) {
  console.log(arguments.length, a, b, arguments[0], arguments[1])
}
foo() // 0 42 43 undefined undefined
foo(10) // 1 10 11 10 undefined
foo(10, undefined) // 2 10 11 10 undefined
foo(10, null) // 2 10 null 10 null
```

虽然参数 `a` 和 `b` 都有默认值，但是函数不带参数时，`arguments` 数组为空。

相反，如果向函数传递 `undefined` 值，则 `arguments` 数组中会出现一个值为 `undefined` 的单元，而不是默认值。

ES6 参数默认值会导致 `arguments` 数组和相对应的命名参数之间出现偏差，ES5 也会出现这种情况：

```js
function foo(a) {
  a = 42
  console.log(arguments[0])
}

foo(2) // 42 (linked)
foo() // undefined (not linked)
```

向函数传递参数时，`arguments` 数组中的对应单元会和命名参数建立关联（linkage）以得到相同的值。相反，不传递参数就不会建立关联。但是，在严格模式中并没有建立关联这一说。

所以，在开发中不要依赖这种关联机制。需遵守一个原则，即不要同时访问命名参数和其对应的 `arguments` 数组单元。

## try..finally

`finally` 中的代码总是会在 `try` 之后执行，如果有 `catch` 的话则在 `catch` 之后执行。也可以将 `finally` 中的代码看作一个回调函数，即无论出现什么情况最后一定会被调用。

```js
function foo() {
  try {
    return 42
  } finally {
    console.log('Hello')
  }
  console.log('never runs')
}
console.log(foo())
// Hello
// 42
```

虽然在 `try` 语句块中执行 `return` 了，但 `finally` 中的代码依然会执行。而且，`finally` 中的 `return` 会覆盖 `try` 和 `catch` 中 `return` 的返回值。

如果在 `try` 语句块中通过 `throw` 抛出错误也是如此，在 `continue` 和 `break` 等控制语句中也不例外：

```js
for (var i = 0; i < 10; i++) {
  try {
    continue
  } finally {
    console.log(i)
  }
}
// 0 1 2 3 4 5 6 7 8 9
```

如果 `finally` 中抛出异常（无论是有意还是无意），函数就会在此处终止。如果此前 `try` 中已经有 `return` 设置了返回值，则该值会被丢弃。

事实上，还可以将 `finally` 和带标签的 `break` 混合使用：

```js
function foo() {
  bar: {
    try {
      return 42
    } finally {
      // 跳出标签为 bar 的代码块
      break bar
    }
  }
  console.log('Crazy')
  return 'Hello'
}
console.log(foo())
// Crazy
// Hello
```

如你所见，但切勿这样操作。利用 `finally` 加带标签的 `break` 来跳过 `return` 只会让代码变得晦涩难懂。

## switch

使用 `switch` 语句首先需要设置表达式 `n`（通常是一个变量）。随后表达式的值会与结构中的每个 `case` 的值做比较。如果存在匹配，则与该 `case` 关联的代码块会被执行。直到 `break`、`return` 或者 `switch` 代码块结束。

```js
switch (n) {
  case 1:
    // 执行代码块 1
    break
  case 2:
    // 执行代码块 2
    break
  default:
  // 与 case 1 和 case 2 不同时执行的代码
}
```

其中的比较方式将会采用严格相等。如果需要通过强制类型转换来进行相等比较，这时就需要做一些特殊处理：

```js
switch (true) {
  case n == 1:
    // 执行代码块 1
    break
  case n == 2:
    // 执行代码块 2
    break
  default:
  // 与 case 1 和 case 2 不同时执行的代码
}
```

最后，`default` 是可选的，`break` 相关规则对 `default` 仍然适用：

```js
var a = 10
switch (a) {
  case 1:
  case 2:
  // 永远执行不到这里
  default:
    console.log('default')
  case 3:
    console.log('3')
    break
  case 4:
    console.log('4')
}
// default
// 3
```

这里首先遍历并找到所有匹配的 `case`，如果没有匹配则执行 `default` 中的代码。因为其中没有 `break`，所以继续执行已经遍历过的 `case 3` 代码块，直到 `break` 为止。

## 参考

- [运算符优先级 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
