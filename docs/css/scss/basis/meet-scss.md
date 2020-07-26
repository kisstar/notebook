# 基础

Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量、嵌套、混合、导入等高级功能。

Sass 支持 Sass(.sass) 和 Scss(.scss) 两种语法格式，前者使用“缩进”代替“花括号”表示属性属于某个选择器，用“换行”代替“分号”分隔属性，书写起来比较方便。

Scss 格式仅在 CSS3 语法的基础上进行拓展，所有 CSS3 语法在 SCSS 中都是通用的，同时加入 Sass 的特色功能。

## 嵌套

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器。而且，你可以用 `&` 代表嵌套规则外层的父选择器。

```scss
// 编译前
a {
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  body.firefox & {
    font-weight: normal;
  }
}

// 编译后
a {
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
body.firefox a {
  font-weight: normal;
}
```

有些 CSS 属性遵循相同的命名空间 (namespace)，Sass 允许将属性嵌套在命名空间中。

```scss
// 编译前
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

// 编译后
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

## 占位符选择器

占位符选择器与常用的 `id` 与 `class` 选择器写法相似，但必须通过 @extend 指令进行调用。

```scss
// 编译前
%heading {
  margin-top: 0;
}
h1 {
  @extend %heading;
}

// 编译后
h1 {
  margin-top: 0;
}
```

## 变量

变量以美元符号开头，赋值方法与 CSS 属性的写法一样。

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。

```scss
// 编译前
$width: 3em; // 全局变量
#main {
  $width: 5em;
  width: $width; // 局部变量
}
#sidebar {
  width: $width;
}

// 编译后
#main {
  width: 5em;
}
#sidebar {
  width: 3em;
}
```

结合 `!default` 可以给一个变量设置默认值，变量的值是 `null` 空值时也会启用申明的默认值。

## @-Rules 与指令

Sass 支持所有的 CSS3 @-Rules，以及 Sass 特有的“指令”。

### @import

Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件：

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 Media Queries。

如果导入的 Sass 文件的名称以下划线开头，那么其中的申明的变量和混合是可用的，但内容并不会出现在编译的结果中。

将 `@import` 嵌套进 CSS 样式或者 `@media` 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中。

```scss
// other.scss
.example {
  color: red;
}

// main.scss
#main {
  @import 'example';
}

// 编译 main.css 后
#main .example {
  color: red;
}
```

在混合指令或控制指令中嵌套 `@import` 是不被允许的。

### @media

在 Sass 中允许其在 CSS 规则中进行嵌套，包括 Queries。

```scss
// 编译前
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

.sidebar {
  width: 300px;
  @media #{$media} {
    @media ($feature: $value) {
      .sidebar {
        width: 500px;
      }
    }
  }
}

// 编译后
.sidebar {
  width: 300px;
}
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar .sidebar {
    width: 500px;
  }
}
```

可见编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。

### @extend

使用 `@extend` 可告诉 Sass 将一个选择器下的所有样式继承给另一个选择器。

```scss
// 编译前
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 编译后
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

## 混合指令

混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 `class`。它可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

在引用混合样式时，需要使用 `@include` 指令，格式是在其后添加混合名称，以及需要的参数（可选）。

```scss
// 编译前
@mixin clearfix {
  &::after {
    display: block;
    clear: both;
    content: '';
  }
}
.clearfix {
  @include clearfix;
}

// 编译后
.clearfix::after {
  display: block;
  clear: both;
  content: '';
}
```

参数用于给混合指令中的样式设定变量，并且赋值使用。在定义混合指令的时候，按照变量的格式，通过逗号分隔，将参数写进圆括号里。引用指令时，按照参数的顺序，再将所赋的值对应写进括号。

```scss
// 编译前
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p {
  @include sexy-border(blue, 1in);
}

// 编译后
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed;
}
```

## 插值语句

利用 `#{}` 插值语句也可以在属性值中插入 SassScript。

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#{}` 插值语句将变量包裹。

在有引号的文本字符串中使用 `#{}` 插值语句可以添加动态的值。
