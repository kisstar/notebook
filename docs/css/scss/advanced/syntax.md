# 进阶

Sass 是一个 CSS 预处理器，它完全兼容所有版本的 CSS 并做出了一些扩展。

## 数组

数组 (Lists) 指 Sass 如何处理 CSS 中 `margin: 10px 15px 0 0` 或者 `font-face: Helvetica, Arial, sans-serif` 这样通过空格或者逗号分隔的一系列的值。

事实上，独立的值也被视为数组 —— 只包含一个值的数组。

数组中可以包含子数组，比如 `1px 2px, 5px 6px` 是包含 `1px 2px` 与 `5px 6px` 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 `(1px 2px) (5px 6px)`。

基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。

## Maps

Maps 可视为键值对的集合，键被用于定位值。

和 Lists 不同，Maps 须被圆括号包围，键值对被都好分割。其中的 `keys` 和 `values` 可以是 SassScript 的任何对象。

Maps 可用于任何 Lists 可用的地方，在 List 函数中 Map 会被自动转换为 List，如 `(key1: value1, key2: value2)` 会被 List 函数转换为 `key1 value1, key2 value2`，反之则不能。

## 控制指令

SassScript 提供了一些基础的控制指令，主要与混合指令 (mixin) 配合使用。

### @if

当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码。

```scss
// 编译前
p {
  @if 1 + 1 == 2 {
    border: 1px solid;
  }
  @if 5 < 3 {
    border: 2px dotted;
  }
  @if null {
    border: 3px double;
  }
}

// 编译后
p {
  border: 1px solid;
}
```

和大多数语言中的流程控制语句一样，`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。

### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。主要包含两种格式：

- `@for $var from <start> through <end>`
- `@for $var from <start> to <end>`

区别在于 `through` 与 `to` 的含义：

- 使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值
- 使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值。

另外，`$var` 只是一个变量的名称，可以按需求替换，比如 `$i`；需要注意的是 `<start>` 和 `<end>` 必须是整数值。

```scss
// 编译前
@for $i from 1 through 3 {
  .h#{$i} {
    font-size: 1em * $i;
  }
}

// 编译后
.h1 {
  font-size: 1em;
}
.h2 {
  font-size: 2em;
}
.h3 {
  font-size: 3em;
}
```

### @each

`@each` 指令的格式是 `@each $var in <list>,` `$var` 可以是任何变量名，比如 `$length` 或者 `$name`，而 `<list>` 是一连串的值，也就是值列表。

```scss
// 编译前
@each $animal in sea-slug, egret {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// 编译后
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
}
.egret-icon {
  background-image: url('/images/egret.png');
}
```

### @while

`@while` 指令重复输出格式直到表达式返回结果为 `false`。

```scss
// 编译前
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}

// 编译后
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

## 混合指令

混合指令（Mixin）用于定义可重复使用的样式。

通过给变量赋值的方法可以给参数设定默认值，当这个指令被引用的时候，如果没有给参数赋值，则自动使用默认值。

```scss
@mixin common-border($width: 1px, $color: #000, $style: solid) {
  border: {
    width: $width;
    style: $style;
    color: $color;
  }
}
```

同时，混合指令也可以使用关键词参数，结合参数默认值，在引用指令时我们可以只传递指定的参数。

```scss
// 编译前
.border {
  @include common-border($color: #ddd);
}

// 编译后
.border {
  border-width: 1px;
  border-style: solid;
  border-color: #ddd;
}
```

当不能确定混合指令需要使用多少个参数时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理。

```scss
// 编译前
@mixin box-shadow($shadows...) {
  box-shadow: $shadows;
}
.shadows {
  @include box-shadow(0px 4px 5px #666, 2px 6px 10px #999);
}

// 编译后
.shadowed {
  box-shadow: 0px 4px 5px #666, 2px 6px 10px #999;
}
```
