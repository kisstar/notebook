# 正则表达式

正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。

所以，你可以调用 RegExp 对象的构造函数来构建一个正则表达式：

```js
var patt = new RegExp('pattern', 'flags')
```

## 创建正则表达式

除了使用构造函数创建正则表达式外，你还可以更简单地使用一个正则表达式字面量:

```js
var patt = /pattern/afgls
```

脚本加载后，正则表达式字面量就会被编译。而用构造函数创建的正则表达式，会在脚本运行过程中被编译

当正则表达式保持不变时，使用正则表达式字面量可获得更好的性能。

如果正则表达式将会改变，或者它将会从用户输入等来源中动态地产生，就需要使用构造函数来创建正则表达式。

另外，需要注意的是，由于传递给构造函数的变量是字符串，而字符串中原本就存在转义字符，所以如果你要传递一个真正的反斜杠的话，你应该书写两次。

```js
/*
var patt = new RegExp('\d')
console.log(patt.test(9)) // false
console.log(patt.test('d')) // true
*/

var patt = new RegExp('\\d')
console.log(patt.test(9)) // true
console.log(patt.test('d')) // false
```

## 基础结构

一个正则表达式通常由元字符和修饰符两部分组成。

修饰符包括：

| 修饰符 | 描述                                                   |
| :----- | :----------------------------------------------------- |
| i      | 执行对大小写不敏感的匹配                               |
| g      | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止） |
| m      | 执行多行匹配                                           |
| s      | 允许 `.` 匹配换行符                                    |
| u      | 使用 unicode 码的模式进行匹配                          |
| y      | 执行“粘性(sticky)”搜索,匹配从目标字符串的当前位置开始  |

元字符又包含量词、断言、字符类、Unicode 属性转义、组和范围。

量词元字符包括：

| 元字符 | 描述                                                               |
| :----- | :----------------------------------------------------------------- |
| n+     | 匹配任何包含至少一个 `n` 的字符串                                  |
| n\*    | 匹配任何包含零个或多个 `n` 的字符串                                |
| n?     | 匹配任何包含零个或一个 `n` 的字符串                                |
| n{X}   | 匹配包含 X 个 `n` 的序列的字符串                                   |
| n{X,}  | X 是一个正整数。前面的模式 `n` 连续出现至少 X 次时匹配             |
| n{X,Y} | X 和 Y 为正整数。前面的模式 `n` 连续出现至少 X 次，至多 Y 次时匹配 |

断言包含边界类断言和其他断言。

边界类断言包括；

| 元字符 | 描述                        |
| :----- | :-------------------------- |
| ^n     | 匹配任何开头为 `n` 的字符串 |
| n\$    | 匹配任何结尾为 `n` 的字符串 |
| \b     | 匹配单词边界                |
| \B     | 匹配非单词边界              |

其他断言包括：

| 元字符  | 描述         |
| :------ | :----------- |
| x(?=y)  | 向前断言     |
| x(?!y)  | 向前否定断言 |
| (?<=y)x | 向后断言     |
| (?<!y)x | 向后否定断言 |

字符类包括：

| 元字符                | 描述                                                      |
| :-------------------- | :-------------------------------------------------------- |
| .                     | 查找单个字符，除了换行和行结束符                          |
| \w                    | 查找单词字符                                              |
| \W                    | 查找非单词字符                                            |
| \d                    | 查找数字                                                  |
| \D                    | 查找非数字字符                                            |
| \s                    | 查找空白字符                                              |
| \S                    | 查找非空白字符                                            |
| \0                    | 查找 NULL 字符                                            |
| \n                    | 查找换行符                                                |
| \f                    | 查找换页符                                                |
| \r                    | 查找回车符                                                |
| \t                    | 查找制表符                                                |
| \v                    | 查找垂直制表符                                            |
| [\b]                  | 匹配一个退格(U+0008)                                      |
| \cX                   | 使用脱字符表示法匹配一个控制字符                          |
| \xdd                  | 查找以十六进制数 dd 规定的字符                            |
| \uxxxx                | 查找以十六进制数 xxxx 规定的 Unicode 字符                 |
| \u{hhhh} or \u{hhhhh} | 将字符与 Unicode 值 U+hhhh 或 U+hhhhh（十六进制数字）匹配 |
| \                     | 转义符号                                                  |

组和范围包括：

| 元字符 | 描述 |
| :-- | :-- |
| x \| y | 匹配 "x" 或 "y" 任意一个字符 |
| [xyz] | 字符集。 匹配任何一个包含的字符。您可以使用连字符来指定字符范围，但如果连字符显示为方括号中的第一个或最后一个字符，则它将被视为作为普通字符包含在字符集中的文字连字符。也可以在字符集中包含字符类 |
| [^xyz] | 一个否定的或被补充的字符集。也就是说，它匹配任何没有包含在括号中的字符 |
| (x) | 捕获组: 匹配 `x` 并记住匹配项 |
| \n | 其中 `n` 是一个正整数。对正则表达式中与 `n` 括号匹配的最后一个子字符串的反向引用(计算左括号) |
| (?&lt;Name&gt;x) | 具名捕获组: 匹配 "x" 并将其存储在返回的匹配项的 `groups` 属性中，该属性位于 &lt;Name&gt; 指定的名称下。尖括号(< 和 >) 用于组名。 |
| (?:x) | 非捕获组: 匹配 “x”，但不记得匹配。不能从结果数组的元素中收回匹配的子字符串 |

最后的 **Unicode 属性转义** 正则表达式支持根据 Unicode 属性进行匹配。

例如我们可以用它来匹配出表情、标点符号、字母(甚至适用特定语言或文字)等。同一符号可以拥有多种 Unicode 属性，属性则有 `binary` ("boolean-like") 和 `non-binary` 之分。

更多信息可点击查看 [Unicode property escapes - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes)。

## 常用元字符

^n：匹配任何开头为 `n` 的字符串。

n\$：匹配任何结尾为 `n` 的字符串。

```js
// 当不使用这两个字符时，只需要包含符合规则的内容
var str1 = 'Test666test'
var str2 = '666'
var patt = /\d+/ // 匹配连续的数字

console.log(patt.test(str1)) // true
console.log(patt.test(str2)) // true

// 加上两者后则必须完全符合规则
var str1 = 'Test666test'
var str2 = '666'
var patt = /^\d+$/ // 匹配以数字开头和结尾的数字（也就是全是数字）

console.log(patt.test(str1)) // false
console.log(patt.test(str2)) // true
```

转义符号（\）：在特殊字符之前的反斜杠表示下一个字符不是特殊字符，应该按照字面理解。

```js
var str1 = '2.3'
var str2 = '2@3'
var patt = /2.3/ // 由于 . 默认匹配除换行符之外的任何单个字符，所以不仅仅会匹配小树 2.3

console.log(patt.test(str1)) // true
console.log(patt.test(str2)) // true

// 如果想要精确的匹配小树 2.3，我们需要对 . 进行转义
var str1 = '2.3'
var str2 = '2@3'
var patt = /2\.3/

console.log(patt.test(str1)) // true
console.log(patt.test(str2)) // false
```

x|y|z：查找任何指定的选项。

```js
// 单独使用可能会造成令人疑惑的结果
var patt = /^12|34$/

console.log(patt.test('12')) // true
console.log(patt.test('34')) // true
console.log(patt.test('1234')) // true
console.log(patt.test('124')) // true
console.log(patt.test('134')) // true
console.log(patt.test('123')) // true
console.log(patt.test('234')) // true

// 所以通常会和分组一起使用
var patt = /^(12|34)$/

console.log(patt.test('12')) // true
console.log(patt.test('34')) // true
console.log(patt.test('1234')) // false
console.log(patt.test('124')) // false
console.log(patt.test('134')) // false
console.log(patt.test('123')) // false
console.log(patt.test('234')) // false
```

在中括号中的字符通常都表示字符本身（但 `\d` 和连字符仍然具备特俗的含义），而且不存在多位数。

```js
var patt1 = /^[@+]$/

console.log(patt1.test('@')) // true
console.log(patt1.test('+')) // true
console.log(patt1.test('@@')) // false

var patt2 = /^[\d]$/

console.log(patt2.test('1')) // true
console.log(patt2.test('@')) // false

var patt3 = /^[a-c]$/

console.log(patt3.test('b')) // true
console.log(patt3.test('z')) // false
```

## 常用正则表达式

验证是否为有效数字，规则分析：

- 可能存在正负号
- 主体内容由数字组成，多位数是不能以零开头
- 可能存在小数点，存在时后面必须跟着数字

```js
var patt = /^[+-]?(\d|([1-9]\d+))(\.\d+)?$/
```

验证密码是否合法，基础规则：

- 由数字、字母和下划线组成
- 长度在 6-16 位之间

```js
var patt = /^\w{6,16}$/
```

验证中文名，基本规则：

- 应当仅包含中文
- 长度在 2-10 之间
- 可能会存在译名（用 · 连接），并且最多只能出现两次

```js
var patt = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/
```

验证邮箱，规则分析：

- 左边部分可以有数字、字母、下划线和英语句号
- 右边部分是域名，按照域名的规则，可以有数字、字母、短横线和英语句号
- 域名可能存在多级

```js
var patt = /^\w+((-\w+)|(\.\w+))*@[A-z\d]+((\.|-)[A-z\d]+)*\.[A-z\d]+$/

// 纯数字
console.log(patt.test('1234@qq.com'))
// 纯字母
console.log(patt.test('test@126.com'))
// 数字、字母混合
console.log(patt.test('test123@126.com'))
// 多级域名
console.log(patt.test('test123@vip.163.com'))
// 含下划线 _
console.log(patt.test('test_email@outlook.com'))
// 含英语句号 .
console.log(patt.test('test.email@gmail.com'))
```

## 正则的懒惰性

以正则的 `exec()` 方法为例，默认情况下，无论该方法执行多少次都只能捕获到第一个匹配的数据，这种现象就叫正则的懒惰性。

```js
// 运行代码，会发现两次的匹配结果完全一致
const str = 'kisstar2020@2021start'
const reg = /\d+/
console.log(reg.lastIndex) // 0
console.log(reg.exec(str))
console.log(reg.lastIndex) // 0
console.log(reg.exec(str))
```

在上例中，我们发现匹配完成后 `lastIndex` 属性的值并没有发生改变，所以下一次依然会从字符串开头开始查找，所以找的永远都是第一个匹配到的数据。

我们尝试手动更改 `lastIndex` 属性的值，但默认情况下这是无效的：

```js
// 运行代码，会发现两次的匹配结果完全一致
const str = 'kisstar2020@2021start'
const reg = /\d+/
console.log(reg.lastIndex) // 0
console.log(reg.exec(str))
reg.lastIndex = 11 // 尝试手动更改
console.log(reg.lastIndex) // 11
console.log(reg.exec(str))
```

如果使用修饰符 `g` 则每次匹配会自动更改 `lastIndex` 属性的值，如此就解决了正则懒惰性的问题。

```js
const str = 'kisstar2020@2021start'
const reg = /\d+/g
console.log(reg.lastIndex) // 0
console.log(reg.exec(str)[0]) // 2020
console.log(reg.lastIndex) // 11
console.log(reg.exec(str)[0]) /// 2021
```

当全局捕获都已完成以后，再次捕获的结果是 `null`，此时 `lastIndex` 的值将回归到初始值 0。

同理，如果正则表达式设置了全局标志，`test()` 的执行也会改变正则表达式 `lastIndex` 属性，但匹配失败时会重置 `lastIndex` 的值。

## 正则的贪婪性

默认情况下，像 `*` 和 `+` 这样的量词是“贪婪的”，这意味着它们试图匹配尽可能多的字符串。

```js
const str = '2020'
const reg = /\d+/g
console.log(str.match(reg))
```

在上面的案列中，我们想要匹配一个以上的数字，也就是说每遇到一个数字就符合要求，想象中的结果可能是 `[ '2', '0', '2', '0' ]`，但事实上却是 `[ '2020' ]`。

由于正则的贪婪性，既然一个数字也行，两个也行...，那么正则就尽可能多的匹配，有多少就取多少。但是如何匹配到想象中的结果呢？

如果在这些量词的后面加上 `?` 则会使量词变得“非贪婪”：意思是它一旦找到匹配就会停止。

```js
const str = '2020'
const reg = /\d+?/g
console.log(str.match(reg))
```

所以说做人不能太正则，又懒又贪（滑稽）。

## 分组和捕获

在正则表达式中你可以用小括号来指定一个子表达式（捕获组）。形如 `(x)`，表示匹配 “x”，并记住匹配项。

正则表达式可以有多个捕获组，匹配的结果通常会被放置到一个数组中，你可以使用结果元素的索引（[1], ..., [n]）或从预定义的 RegExp 对象的属性（$1, ..., $9）进行获取。

```js
const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`
const regexpNames = /First_Name: (\w+), Last_Name: (\w+)/gm
const match = regexpNames.exec(personList)

console.log(match[1], match[2]) // John Doe
console.log(RegExp.$1, RegExp.$2) // John Doe
```

捕获组会带来性能损失。如果不需要收回匹配的子字符串，请选择使用非捕获组。形如 `(?:x)`，表示匹配 “x”，但不捕获。

```js
const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`
const regexpNames = /First_Name: (?:\w+), Last_Name: (?:\w+)/gm
const match = regexpNames.exec(personList)

console.log(match[1], match[2]) // undefined undefined
console.log(RegExp.$1, RegExp.$2) // "" ""
```

除了普通的捕获外，你还可以使用具名捕获组，形如 `(?<Name>x)`，表示匹配 "x" 并将其存储在返回的匹配项的 `groups` 属性中，该属性位于 `<Name>` 指定的名称下。

```js
const personList = `First_Name: John, Last_Name: Doe
First_Name: Jane, Last_Name: Smith`
const regexpNames = /First_Name: (?<first>\w+), Last_Name: (?<last>\w+)/gm
const match = regexpNames.exec(personList)

console.log(`Hello ${match.groups.first} ${match.groups.last}`) // Hello John Doe
```

此时你依然可以使用结果元素的索引或从预定义的 RegExp 对象的属性来获取分组捕获的结果。

另外，常用分组语法还包括：

<table cellspacing="0">
  <tbody>
    <tr>
      <th scope="col">分类</th>
      <th scope="col">语法</th>
      <th scope="col">说明</th>
    </tr>
    <tr>
      <th rowspan="3">捕获</th>
      <td><span>(exp)</span></td>
      <td><span>匹配 exp，并捕获文本到自动命名的组里</span></td>
    </tr>
    <tr>
      <td><span>(?&lt;name&gt;exp)</span></td>
      <td>
        <span>匹配 exp，并捕获文本到名称为 name 的组里</span>
      </td>
    </tr>
    <tr>
      <td><span>(?:exp)</span></td>
      <td><span>匹配 exp，不捕获匹配的文本，也不给此分组分配组号</span></td>
    </tr>
    <tr>
      <th rowspan="4">零宽断言</th>
      <td><span>(?=exp)</span></td>
      <td><span>匹配 exp 前面的位置</span></td>
    </tr>
    <tr>
      <td><span>(?&lt;=exp)</span></td>
      <td><span>匹配 exp 后面的位置</span></td>
    </tr>
    <tr>
      <td><span>(?!exp)</span></td>
      <td><span>匹配后面跟的不是 exp 的位置</span></td>
    </tr>
    <tr>
      <td><span>(?&lt;!exp)</span></td>
      <td><span>匹配前面不是 exp 的位置</span></td>
    </tr>
    <tr>
      <th rowspan="1">注释</th>
      <td><span>(?#comment)</span></td>
      <td>
        <span>此类分组不对正则表达式的处理产生任何影响，用于提供注释让人阅读</span>
      </td>
    </tr>
  </tbody>
</table>

## 分组引用

后向引用以分组作为前提，所以如果想要实现后向引用，则必须先进行分组。

默认情况下，每个分组会自动拥有一个组号，规则是：从左向右，以分组的左括号为标志，第一个出现的分组的组号为 1，第二个为 2，以此类推。

后向引用用于重复搜索前面某个分组匹配的文本。例如：`\1` 代表分组 `1` 匹配的文本。

```js
const str = 'apple, orange, cherry, peach'
const reg = /apple(,)\sorange\1/ //其中 \1 引用了之前使用（）捕获的逗号
console.log(str.match(reg)[0]) //apple, orange,
```

在这里，你也可以自己指定子表达式的组名，要反向引用这个分组捕获的内容，你可以使用形如 `\k<Word>` 的语法：

```js
const str = 'apple, orange, cherry, peach'
const reg = /apple(?<comma>,)\sorange\k<comma>/ //其中 \1 引用了之前使用（）捕获的逗号
console.log(str.match(reg)[0]) //apple, orange,
```

## 零宽断言

正向预查形如 `x(?=y)`，也叫零宽度正预测先行断言，它断言 `x` 出现的位置的后面能匹配表达式 `y`，换句话说，`x` 被 `y` 跟随时则匹配 `x`。

```js
const str = 'I am singing while you are dancing.'
const reg = /\b\w+(?=ing\b)/g
console.log(reg.exec(str))
console.log(reg.exec(str))
```

示例中将会匹配以 `ing` 结尾的单词的前半部分，结果中并不会包含分组中的内容。

与此相关的一个招聘题目要求对一串数字使用千分制表示，利用正向预查可以很容易做到：

```js
const str = '99999999999'
const ret = str.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
console.log(ret) // 99,999,999,999
```

向后断言形如 `(?<=y)x`，也叫零宽度正回顾后发断言，它断言 `x` 出现的位置的前面能匹配表达式 `y`，换言之，`x` 跟随 `y` 的情况下匹配 `x`。

## 负向零宽断言

向前否定断言形如 `x(?!y)`，也叫零宽度负预测先行断言，它断言 `x` 的后面不能匹配表达式 `y`，换言之，`x` 没有被 `y` 紧随时匹配 `x`。

```js
// 例如，对于 `/\d+(?!\.)/`，数字后没有跟随小数点的情况下才会得到匹配
console.log(/\d+(?!\.)/.exec(3.141)[0]) // 141
```

同理，我们也可以用向后否定断言（零宽度负回顾后发断言，形如 `(?<!y)x`）来断言 `x` 的前面不能匹配表达式 `y`，也就是说 `x` 不跟随 `y` 时匹配 `x`。

```js
// 对于 /(?<!-)\d+/，数字紧随-符号的情况下才会得到匹配
console.log(/(?<!-)\d+/.exec(3)[0]) // 3
console.log(/(?<!-)\d+/.exec(-3)) // null
```

## 参考

- [正则表达式 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
- [JavaScript RegExp 对象 | 菜鸟教程](https://www.runoob.com/jsref/jsref-obj-regexp.html)
- [脱字符表示法 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E8%84%B1%E5%AD%97%E7%AC%A6%E8%A1%A8%E7%A4%BA%E6%B3%95)
- [正则表达式 30 分钟入门教程](https://deerchao.cn/tutorials/regex/regex.htm)
- [javascript 正则表达式---正向预查 - chenby - 博客园](https://www.cnblogs.com/dh-dh/p/5261044.html)
