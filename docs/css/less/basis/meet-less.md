# 基础

`Less` 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、`Mixin`、函数等特性，使 CSS 更易维护和扩展。

## 注释

在 Less 支持单行注释以 `//` 开头，不会编译到最后的 CSS 文件中，通常是用来给开发人员看的。

多行注释以 `/*` 开始，以 `*/` 结尾，会保留在最后编译后的 CSS 文件中。

## 嵌套

对于 CSS 中后代选择器的使用是非常常见的，特别是在后期修改时，为了缩小影响的范围几乎无所不在。传统的写法会导致整个匹配规则书写得特别的臃肿，可读写也级差。

### 基本用法

在 Less 中提供了嵌套的写法，可以很好的解决上面的问题。

```less
// 传统的写法
.container p {
  margin-bottom: 0.5rem;
}

// Less
.container {
  p {
    margin-bottom: 0.5rem;
  }
}
```

### `&` 符号

另外，还有一些伪类选择器在使用时需要注意，如果我们在嵌套的结果中直接书写，编译过后的 CSS 代码中，与前面的选择器之间会存在一个空客，可以使用 `&` 解决这个问题。

比如 `:hover`：

```less
// 传统的写法
.container p:hover {
  color: #f00;
}

// Less
.container {
  p {
    &:hover {
      color: #f00;
    }
  }
}
```

可见 `&` 符号，代表的是上一层选择器的名字。它的应用并不只能用于解决伪类，在实际开发中使用得其实很频繁，比如子元素选择器和相邻兄弟选择器等。

## 变量

变量：以 `@` 开头定义变量，并且使用时直接键入 `@名称`。

```less
// 传统用法
p {
  color: pink;
}

// Less
@color: pink; // 定义变量
p {
  color: @color;
}
```

在平时工作中，我们就可以把常用的变量封装到一个文件中，这样利于代码组织维护。特别是在一个项目需要支持多个颜色主体时，显得尤为重要。

### 属性和选择器变量

或者将属性名或选择器设为变量，在使用时需要用括号包裹起来。

```less
// 传统用法
.container {
  width: 80%;
}

// 定义变量
@selector: .container;
@wth: width;
// 使用
@{selector} {
  @{wth}: 80%;
}
```

### URL 变量

另外，在我们也可以定义一些 URL 变量，在更换域名或图片路径时显得特别有用。

```less
@images: './pathto/';
body {
  background: url('@{images}image_name.png'); // 变量名必须使用大括号包裹
}

// 编译后的CSS
body {
  background: url('./pathto/image_name.png');
}
```

### 进阶用法

还有一种类似混合的用法。

```less
@p {
  margin-bottom: 0.5rem;
  background-color: #f00;
}
p {
  @p();
}

// 编译后的CSS
p {
  margin-bottom: 0.5rem;
  background-color: #f00;
}
```

### 用变量代替变量

```less
@text: 'Hello Less!';
@var: 'text';
.P-text {
  &::after {
    content: @@var; // @@var => @text
  }
}

// 编译后的CSS
.P-text::after {
  content: 'Hello Less!';
}
```

## 运算

Less 的变量运算非常的强大，在处理加减法时结果以第一个数据的单位为基准，而做乘除法时 注意单位一定要统一。

```less
// Less
@width: 100px;
@color: #f00;
p {
  width: @width - 50;
  height: @width - 10 * 5;
  margin: (@width - 98) * 5;
  color: @color * 2;
  background-color: @color + #0f0;
}

// 编译后的CSS
p {
  width: 50px;
  height: 50px;
  margin: 10px;
  color: #ff0000;
  background-color: #ffff00;
}
```

## @import

`@import` 支持使用绝对或相对地址指定导入的外部文件。你可以把它放在代码中的任何位置，导入文件时的处理方式取决于文件的扩展名

```less
@import <pathto file>;
```

另外，为了在将 Less 文件编译生成 CSS 文件时，提高对外部文件的操作灵活性，还为 `@import` 指令提供了一些配置项。

| 选项 | 含义 |
| :-- | :-- |
| reference | 使用文件，但不会输出其内容（比如，使用引入文件的变量编译当前文件，但是会忽略引入文件的其他内容） |
| inline | 对文件的内容不作任何处理，直接输出 |
| less | 无论文件的扩展名是什么，都将作为 LESS 文件被输出 |
| css | 无论文件的扩展名是什么，都将作为 CSS 文件被输出 |
| once | 文件仅被导入一次 （这也是默认行为） |
| multiple | 文件可以被导入多次 |
| optional | 当文件不存在时，继续编译（即该文件是可选的） |

其使用方式也很简单。

```less
@import (keyword) <pathto file>;
```

## important

在调用的混合集后面追加 `!important` 关键字，就可以使得混合集里所有的属性都继承 `!important` 。

```less
.danger() {
  font-size: 12px;
  color: #f00;
}
p {
  .danger() !important;
}

// 编译结果
p {
  font-size: 12px !important;
  color: #f00 !important;
}
```

## 媒体查询

传统的写法会讲同一个元素在不同媒体情况下的样式写在相应的位置，而 Less 提供了更方便的方式，缺点就是每一个元素都会编译出自己 `@media` 声明，并不会合并。

```less
// 传统的写法
.container {
  width: 80%;
}
@media screen and (maxwidth: 768px) {
  width: 100%;
}

// Less
.container {
  width: 100%;
  @media screen {
    @media (maxwidth: 768px) {
      width: 100%;
    }
  }
}
```

## 混合

混合是一种将一系列属性从一个规则集引入(“混合”)到另一个规则集的方式。

### 普通混合

混合的声明，通常以 `.` 开头（# 也行），所以普通的混合和一个类（或 ID）选择器一样。

```less
.triangle {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
.triangle {
  .triangle(); // 这里的括号是可选的，但在后续可能会变成必须的
}

// 编译后的CSS
.triangle {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
.triangle {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
```

### 干净的混合

可见普通的混合会存在重复的代码，通常情况下我们会使用干净的混合，也就是在混合声明处加上 `()` 即可。

```less
.triangle() {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
.triangle {
  .triangle();
}

// 编译后的CSS
.triangle {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
```

### 带参数的混合

我们也可以给混合方法传递参数，并且支持给形参设置默认值。另外，像 Javascript 给函数传递参数时必须挨个传递，而 Less 支持给指定函数传参。

就像下面这样，我们让第一个变量使用默认值，直接给第二个参数进行传参数。

```less
.triangle(@width: 50px, @color) {
  width: 0;
  height: 0;
  border-width: @width;
  border-color: transparent transparent @color transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
.triangle {
  .triangle(@color: #f00);
}

// 编译后的CSS
.triangle {
  width: 0;
  height: 0;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
  overflow: hidden;
}
```

### arguments 变量

在混合函数的内部，支持一个名为 `arguments` 的变量，它是所有实参的集合，我们可以像下面这样使用它。

```less
.border(@width, @style, @color) {
  border: @arguments;
}
.border {
  .border(50px, solid, #f00);
}

// 编译后的CSS
.border {
  border: 50px solid #f00;
}
```

另外，当方法接受数量不定的参数，你可以使用 `...`，编译后的 CSS 与上面的一样。

```less
.border(...) {
  border: @arguments;
}
.border {
  .border(50px, solid, #f00);
}
```

## 继承

混合固然很强大，但是选择器中 `element,element` 的形式却是它的短板，好在我们可以使用继承来解决这个问题。

```less
.center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  &:hover {
    background: #f00 !important;
  }
}

.outter {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #000;
  .inner {
    &:nth-child(1) {
      &:extend(.center);
      width: 150px;
      height: 150px;
      background: pink;
    }
    &:nth-child(2) {
      &:extend(.center);
      width: 50px;
      height: 50px;
      background: deeppink;
    }
  }
}

// 编译后的CSS
.center,
.outter .inner:nth-child(1),
.outter .inner:nth-child(2) {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.center:hover {
  background: #f00 !important;
}
.outter {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid #000;
}
.outter .inner:nth-child(1) {
  width: 150px;
  height: 150px;
  background: pink;
}
.outter .inner:nth-child(2) {
  width: 50px;
  height: 50px;
  background: deeppink;
}
```

可见，上面并没能匹配到伪类 `:hover` 的规则，如果我们需要使用 `all`。

```less
&:extend(.center all);
```

## 避免编译

我们知道原生的 CSS 中也支持一些函数，比如常见的 `cacl()`，在 Less 中直接使用时，Less 编译时会将括号中的值进行计算，然后输出到 CSS 文件中，然而这便不是我们想要的结果。

为了避免这个情况我们可以将函数用双引号包裹起来，然后在前面加上符号 `~`。

```less
.content {
  height: ~'cacl(100% - 60px)';
}

// 编译后的CSS
.content {
  height: cacl(100% - 60px);
}
```

此时，如果我们要使用变量的化，就需要使用像属性变量一样的方式，在变量具体的名称放在花括号中。

```less
// 编译的结果和上面的一样
@width: 60px;
.content {
  height: ~'cacl(100% - @{width})';
}
```

## 参考资料

- [Less 中文网](http://lesscss.cn/)
- [CSS 选择器 | 菜鸟教程](http://www.runoob.com/cssref/css-selectors.html)
- [学习 Less-看这篇就够了](https://segmentfault.com/a/1190000012360995?utm_source=tag-newest)
