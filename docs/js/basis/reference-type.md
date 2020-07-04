# 引用类型

引用类型的值（对象）是引用类型的一个实例。

在 `ECMAScript` 中，引用类型是一种数据结构，用于将数据和功能组织在一起。它也常被称为类，但这种称呼并不妥当。

尽管 `ECMAScript` 从技术上讲是一门面向对象的语言，但它不具备传统的面向对象语言所支持的类和接口等基本结构。

## Object 类型

有时候也被称为对象定义，描述的是一类对象所具有的属性和方法对象是某个特定引用类型的实例。

创建 `Object` 实例的方式有两种。第一种是使用 `new` 操作符后跟 `Object` 构造函数：

```javascript
var person = new Object();
person.name = 'Anani';
person.age = 24;
```

另一种方式是使用对象字面量表示法：

```javascript
var person = {
    name: 'Anani',
    age: 24
};
```

`ECMAScript` 中赋值操作符表示后面是一个值，而表达式上下文指的是能够返回一个值（表达式）。所以对象字面量表示法中左边的花括号表示对象字面量的开始，因为它出现在表达式上下文中。同样的花括号如果出现在语句的后面则表示语句块的开始。

通常访问对象属性时使用的都是点表示法，然而，在 `JavaScript` 中也可以使用方括号表示法来访问对象的属性。在使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中。另外后者还具有以下特点：

- 方括号语法的主要优点是可以通过变量来访问属性。
- 如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法。

::: tip

- 通常，除非必须使用变量来访问属性，否则我们建议使用点表示法。
- 所有对象都具有 `toLocaleString()`、`toString()`和`valueOf()`方法。

:::

## Array 类型

`ECMAScript` 数组与其他语言中的数组都是数据的有序列表，不同的是，它每一项可以保存任何类型的数据。

创建数组的基本方式有两种。第一种是使用 `Array` 构造函数：

```javascript
// 可以给构造函数传递数量，该数量会自动变成 length 属性的值
// 也可以向 Array 构造函数传递数组中应该包含的项，多项以逗号分隔
// 在使用 Array 构造函数时也可以省略 new 操作符
vai features = new Array();
```

创建数组的第二种基本方式是使用数组字面量表示法，数组字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开：

```javascript
var values = [1, 2,];   // 会创建一个包含 2 或在 IE8 及更早版包含 3 项的数组
var options = [,,,,,];  // 会创建一个包含 5 或在 IE8 及更早版包含 6 项的数组
```

在读取和设置数组的值时，要使用方括号并提供相应值的基于 0 的数字索引，数组的项数保存在其 `length` 属性中，这个属性始终会返回 0 或更大的值。该属性还具有以下特征：

- 数组的 `length` 属性不是只读的。通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。
- 如果将其 `length` 属性设置为大于数组项数的值，则新增的每一项都会取得 `undefined` 值。
- 当把一个值放在超出当前数组大小的位置上时，数组就会重新计算其长度值。
- 当设置 `length` 的值为零时，则清空整个数组。

如果数组中的某一项的值是 `null` 或者 `undefined`，那么该值在 `join()`、`toLocaleString()`、`toString()`和`valueOf()`方法返回的结果中以空字符串表示。

## Date 类型

`Date` 类型使用自 UTC（Coordinated Universal Time，国际协调时间）1970 年 1 月 1 日午夜（零时）开始经过的毫秒数来保存日期。

创建一个日期对象，使用 `new` 操作符和 `Date` 构造函数即可：

```javascript
var now = new Date();
```

如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数(即从 UTC 时间 1970 年 1 月 1 日午 夜起至该日期止经过的毫秒数)，。为了简化这一计算过程，`ECMAScript` 提供了两个方法：`Date.parse()` 和 `Date.UTC()`。

`Date.parse()` 方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。

<font class="text-muted"><code>ECMA-262</code> 没有定义 <code>Date.parse()</code> 应该支持哪种日期格式，因此这个方法的行为因实现而异，而且通常是因地区而异。</font>

如果传入 `Date.parse()` 方法的字符串不能表示日期，那么它会返回 NaN。实际上，如果直接将表示日期的字符串传递给 `Date` 构造函数，也会在后台调用 `Date.parse()`。

```javascript
// 如为 2004年 5 月 25 日创建一个日期对象
// 可以使用下面的代码：
var someDate = new Date(Date.parse("May 25, 2004"));
// 与下面的代码等价
var someDate = new Date("May 25, 2004");
```

`Date.UTC()` 方法同样也返回表示日期的毫秒数，但它与 `Date.parse()` 在构建值时使用不同的信息。

`Date.UTC()` 的参数分别是年份、基于 0 的月份（一月是 0，二月是 1，以此类推）、月中的哪一天 （1 到 31） 、小时数（0 到 23） 、分钟、秒以及毫秒数。

在这些参数中，只有前两个参数（年和月）是必需的。如果没有提供月中的天数，则假设天数为 1；如果省略其他参数，则统统假设为 0。

```javascript
// 本地时间 2005 年5 月 5 日下午 5:55:55
var allFives = new Date(2005, 4, 5, 17, 55, 55);
```

`ECMAScript 5` 添加了 `Data.now()` 方法，返回表示调用这个方法时的日期和时间的毫秒数。

## RegExp 类型

`ECMAScript` 通过 `RegExp` 类型来支持正则表达式。使用下面类似 `Perl` 的语法，就可以创建一个正则表达式：

```javascript
// pattern 部分可以是任何简单或复杂的正则表达式
// 每个正则表达式都可带有一或多个标志(flags)，用以标明正则表达式的行为
var expression = /pattern/flags;
```

正则表达式的匹配模式支持下列 3 个标志：

- **g**：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止。
- **i**：表示不区分大小写（case-insensitive）模式。
- **m**：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

::: tip
模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：`( [ { \ ^ $ | ) ? * + .]}`
:::

前面我们使用的是字面量形式定义的正则表达式，另一种创建正则表达式的方式就是使用 `RegExp` 构造函数，它接收两个参数：

- 一个是要匹配的字符串模式。
- 另一个是可选的标志字符串。

```javascript
// 匹配第一个"bat"或"cat"，不区分大小写
var pattern = new RegExp("[bc]at", "i");
```

`RegExp` 构造函数的模式参数是字符串，所以在某些情况下要对字符进行双重转义。所有元字符都必须双重转义，那些已经转义过的字符也是如此。

| 字面量模式 | 等价的字符串 |
| :--- | :---|
| `/\[bc\]at/` | `"\\[bc\\]at"` |
| `/\.at/` | `"\\.at"` |
| `/name\/age/` | `"name\\/age"` |
| `/\d.\d{1,2}/` | `"\\d.\\d{1,2}"` |
| `/\w\\hello\\123/` | `"\\w\\\\hello\\\\123"` |

## Function 类型

函数实际上是对象。每个函数都是 `Function` 类型的实例，而且都与其他引用类型一样具有属性和方法。因此函数名实际上也是一个指向函数对象的指针，不会与某个函数绑定。

函数通常是使用函数声明语法定义的，就像下面这样：

```javascript
function sayHello(name) {
    console.log('Hello' + name);
}
```

其与函数表达式定义函数的方式相差无几：

```javascript
var sayHello = function(name) {
    console.log('Hello' + name);
}
```

后一种定义函数的方式是使用 `Function` 构造函数。 `Function` 构造函数可以接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。

```javascript
// 该语法会导致解析两次代码（第一次是解析常规 ECMAScript 代码，第二次是解析传入构造函数中的字符串）
var sayHello = new Function("name", "console.log('Hello' + name);");
```

解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。

## 基本包装类型

`ECMAScript` 还提供了 3 个特殊的引用类型：`Boolean`、`Number` 和 `String`。每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。

读取模式中访问字符串时，后台都会自动完成下列处理(这三个步骤也分别类似地适用于 Boolean 和 Number 类型对应的布尔值和数字值)：

1. 创建 String 类型的一个实例；
2. 在实例上调用指定的方法；
3. 销毁这个实例。

当然，可以显式地调用 `Boolean`、`Number`和`String`来创建基本包装类型的对象。不过，应该在绝对必要的情况下再这样做，另外 `Object` 构造函数也会像工厂方法一样，根据传入值的类型返回相应基本包装类型的实例。

```javascript
var obj = new Object("some text");
console.log(obj instanceof String);   //true
```

尽管我们不建议显式地创建基本包装类型的对象，但它们操作基本类型值的能力还是相当重要的。而每个基本包装类型都提供了操作相应值的便捷方法。

### Boolean 类型

`Boolean` 类型是与布尔值对应的引用类型。要创建 `Boolean` 对象，可以像下面这样调用 `Boolean` 构造函数并传入 `true` 或 `false` 值：

```javascript
// 如果布尔对象无初始值或者其值为:0 -0 null "" false undefined NaN 那么对象的值为 false
// 否则，其值为 true
var booleanObject = new Boolean(true);
```

### Number 类型

`Number` 是与数字值对应的引用类型。要创建 `Number` 对象，可以在调用 `Number` 构造函数时向其中传递相应的数值。下面是一个例子：

```javascript
var numberObject = new Number(10);
```

### String 类型

`String` 类型是字符串的对象包装类型，可以像下面这样使用 `String` 构造函数来创建：

```javascript
var stringObject = new String("hello world");
```

`String` 类型的每个实例都有一个 `length` 属性，表示字符串中包含多个字符。应该注意的是，即使字符串中包含双字节字符（不是占一个字节的 ASCII字符），每个字符也仍然算一个字符。

## 单体内置对象

`ECMA-262` 对内置对象的定义是：“由 `ECMAScript` 实现提供的、不依赖于宿主环境的对象，这些对象在 `ECMAScript` 程序执行之前就已经存在了。”。

比如前面介绍的 `Object`、`Array` 和 `String`，另外还有两个单体内置对象：`Global` 和 `Math`。

### Global 对象

`ECMAScript` 中的 `Global` 对象在某种意义上是作为一个终极的“兜底儿对象”，不属于任何其他对象的属性和方法，最终都是它的属性和方法。诸如 `isNaN()`、`isFinite()`、`parseInt()`以及`parseFloat()`等，实际上全都是 `Global` 对象的方法。

`ECMAScript` 虽然没有指出如何直接访问 `Global` 对象，但 `Web` 浏览器都是将这个全局对象作为 `window` 对象的一部分加以实现的。在全局作用域中声明的所有变量和函数，就都成为了 `window` 对象的属性。

另一种取得 Global 对象的方法是使用以下代码：

```javascript
var global = function() {
    return this;
}();
```

### Math 对象

`ECMAScript` 还为保存数学公式和信息提供了一个公共位置，即 `Math` 对象。

`Math` 对象提供了很多属性和方法，用于辅助完成复杂的数学计算任务。

## 参考资料

- [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- JavaScript 高级程序设计(第3版)
- [JavaScript 对象参考手册](http://www.runoob.com/jsref/jsref-tutorial.html)
