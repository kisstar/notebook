# 进阶

走进诸如函数、条件判断等高阶用法。

## 变量的就近原则和懒加载

我们需要知道变量的作用域其实就是就近原则，而且变量的加载是懒加载的。

```less
@color: #f00;
.outter {
  color: @color;
  .inner {
    @color: #0f0;
    color: @color;
    @color: #00f;
  }
}

// 编译后的CSS
.outter {
  color: #f00;
}
.outter .inner {
  color: #00f; // 因为懒加载最后得到的值是 #00f 而不是 #00f
}
```

## 命名空间

在原生的 CSS 中 `>` 选择器，选择的是直接子元素，当然这在 Less 里面依然支持。不过在引入命令空间时，如使用 `>` 选择器，它表示引入所指空间下的规则。

利用这一点，你可以对混合（mixins）进行分组。

```less
.container() {
  background: #0f0;
  .text {
    color: #f00;
  }
}
p {
  background: #000;
  .container > .text; // 引用 .container 下 .text 的规则，.container.text 也有效
}

// 编译结果
p {
  background: #000;
  color: #f00;
}
```

另外有几点需要注意：

- 父元素不能加括号。
- 必须先引入命名空间，才能使用其中方法，不得单独使用。
- 子方法可以使用上一层传进来的方法。

```less
.container() {
  background: #0f0;
  .p(@width: 50%) {
    width: @width;
    .text(@color) {
      color: @color;
      width: @width;
    }
  }
}
.result1 {
  .container();
}
.result2 {
  .container > .p(100%);
}
// .container > .p > .text(#f00); 或者 .container > .p(100%) > .text(#f00); // 都会报错，父级不能使用参数
// .p() // 错误，不能直接调用子方法
```

## 匹配参数的混合

就像下面这样，第一个参数 `top` 和 `bottom` 要先找到方法中的匹配，如果匹配，将全部选择。如果想要对任何匹配都匹配中，可以在混合函数中使用 `@_`。

```less
// mixin.less
.triangle(@_, @width, @color) {
  width: 0;
  height: 0;
  overflow: hidden;
}
.triangle(top, @width, @color) {
  border-width: @width;
  border-color: transparent transparent @color transparent;
  border-style: dashed dashed solid dashed;
}
.triangle(bottom, @width, @color) {
  border-width: @width;
  border-color: @color transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}

// triangle.less
@import '../pathto/mixin.less';

.triangle {
  .top {
    .triangle(top, 50px, #f00);
  }
  .bottom {
    .triangle(bottom, 50px, #f00);
  }
}

// 编译后的CSS
.triangle .top {
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 50px;
  border-color: transparent transparent #f00 transparent;
  border-style: dashed dashed solid dashed;
}
.triangle .bottom {
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 50px;
  border-color: #f00 transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
```

当然，上面的结果（编译后的 CSS）并不是最优的，实际开发中会把上面公共的样式放在 `.triangle` 中，这里只是为匹配功能做示范。

## 属性的合并

- 在需要合并的属性的 `;` 加上 `+` 就可以完成合并，合并后的属性以 `,` 分隔。

```less
.mixin() {
  box-shadow+: 10px 10px 5px #cccccc;
}
.box-shadow {
  .mixin();
  box-shadow+: 10px 10px 5px #888888;
}

// 编译结果
.box-shadow {
  box-shadow: 10px 10px 5px #cccccc, 10px 10px 5px #888888;
}
```

- 另外，还可以使用 `+_`，结果以空格进行合并。

```less
.mixin() {
  background+_: #f00;
}
.background {
  .mixin();
  background+_: url('../pathto/file-name.png');
}

// 编译结果
.background {
  background: #f00 url('../pathto/file-name.png');
}
```

## 函数

Less 内置了许多函数，比如一些类型检测函数。

```less
isnumber(9) // true
isstring("string"); // true
iscolor(#ff0);     // true
isurl(url(...)); // true
iskeyword(keyword);
```

单位检测函数。

```less
ispixel(56px); // true
isem(7.8em);    // true
ispercentage(7.8%);     // true

// value - a value or variable being evaluated.
// unit - a unit identifier (optionally quoted) to test for.
isunit(value, unit);
```

[查看更多内置函数](http://lesscss.org/functions/)。

## 条件表达式

在 Less 中使用比较运算符（>, >=, =, <, <=）来进行判断，根据不同的结果输出不同的值得。需要注意的是除去关键字 `true` 以外的值都被视为 `false`。

```less
.mixin(@num) when(isnumber(@num)) {
  // 当 @num 为数字时，使用该规则
  background: #f00;
}
.mixin(@num) when(@num > 50) {
  // 当 @num 为数字时且大于 50，使用该规则
  color: #000;
}
.mixin(@num) when(@num <=50) {
  // 当 @num 为数字时且小于 50，使用该规则
  color: #00f;
}
.mixin(@num) {
  // 只要传入了一个参数就使用该规则
  font-size: 12px;
}
.result {
  .mixin(50);
}

// 编译结果
.result {
  background: #f00;
  color: #00f;
  font-size: 12px;
}
```

除此之外，你还可以像与运算、或运算和非运算似的操作符。

```less
// and 运算符相当于与运算，必须条件全部符合才会匹配，使用里面的规则
.mixin(@width, @style, @color) when (@width > 5) and (@style = solid) {
  border: @width @style @color;
}
.border {
  .mixin(6px, solid, #f00);
}

// 编译结果
.border {
  border: 6px solid #f00;
}

// not 运算符和逗号分隔符使用方式和上面一致
// 逗号分隔符：相当于或运算，只要有一个符合条件就会匹配
// not 运算符：相当于非运算，与其后面指定的条件相反就会匹配
```

## 循环

在 Less 中，混合可以调用自身。这样当一个混合递归的调用自己，再结合 Guard 表达式和模式匹配这两个特性，就可以写出循环结构。

```less
.loop(@num) when(@num > 0) {
  // 退出循环的条件
  .loop(@num - 1); // 递归调用
  width: 10px * @num; // 每次循环产生样式的代码
}
.result {
  .loop(2);
}

// 编译结果
.result {
  width: 10px;
  width: 20px;
}
```

## 经典用法

记录官方的使用案例，体验 Less 的优雅之处。

```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}
div {
  .average(16px, 50px); // 调用 方法
  padding: @average; // 使用返回值
}

// 生成的 CSS
div {
  padding: 33px;
}
```

```less
.generate-cols(@n, @i: 1) when (@i =< @n) {
  .col-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-cols(@n, (@i + 1));
}
.generate-cols(4);

// 生成的 CSS
.col-1 {
  width: 25%;
}
.col-2 {
  width: 50%;
}
.col-3 {
  width: 75%;
}
.col-4 {
  width: 100%;
}
```

## 参考资料

- [Less 中文网](http://lesscss.cn/)
- [CSS 选择器 | 菜鸟教程](http://www.runoob.com/cssref/css-selectors.html)
- [学习 Less-看这篇就够了](https://segmentfault.com/a/1190000012360995?utm_source=tag-newest)
