# CSS 让盒子水平垂直居中的方案

在之前的项目中经常会遇到这样的需求，一般使用的解决方案是 .....

后来，发现了 CSS3 中出现了 `xxx` 新技术，然后就开始使用这种技术，因为它更加 .....

最后，在逛一些博客的时候又发现了 `xxx` 等方案，感觉很有意思，于是 .....

## 基础

示例的 HTML 结构：

```html
<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
```

基础样式以便观察：

```css
body {
  padding: 100px;
}

.parent {
  width: 100px;
  height: 100px;
  background-color: darkgray;
}

.child {
  width: 50px;
  height: 50px;
  background-color: aqua;
}
```

## 知父子宽高

使用外边距：

```css
.parent {
  display: flow-root; /* establishes a new block formatting context */
}

.child {
  margin: 25px;
}
```

使用内边距：

```css
.parent {
  padding: 25px;
}
```

两者在水平和垂直方向上任意结合。

也可以使用定位：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 25px;
  left: 25px;
}
```

## 知父宽高

表格布局：

```css
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.child {
  display: inline-block;
}
```

缺陷是父级必须有确定的宽高（相对宽高不生效）。

## 知子宽高

使用定位：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
}
```

上面使用的是负外边距，其实配合 `calc` 也可以：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
```

## 未知宽高

### 定位

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

虽然它不关心父/子的宽高，但是当子级没有指定宽/高时将会将对应方向的距离拉得和父级一样。

结合 CSS3 中提供的 `transform` 则可以避免这样的问题：

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

### 弹性盒子

```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### 网格布局

```css
.parent {
  display: grid;
  align-items: center;
  justify-content: center;
}
```

### JavaScript

当然，可行和通常都不会采用的就是使用 JavaScript 来获取父子的宽高，然后设置相应的样式来达到居中的目的。

```javascript
// 仅供参考

const parent = $('.parent'),
  child = $('.child'),
  pw = parent.clientWidth,
  ph = parent.clientHeight,
  cw = child.clientWidth,
  ch = child.clientHeight

parent.style.position = 'relative'
child.style.cssText = `position: absolute; top: ${(ph - ch) / 2}px; left: ${(pw - cw) / 2}px;`

function $(selecter) {
  return document.querySelector(selecter)
}
```

## 附录

文本水平垂直居中：

```css
.child {
  line-height: 50px; /* 和高度保持一致 */
  text-align: center;
}
```

多行文本时需要在 `child` 元素中加上一层结构并指定以下样式：

```css
.grandson {
  display: inline-block;
  line-height: 1.5;
  vertical-align: middle;
}
```

图片水平居中：

```css
img {
  display: block;
  margin: 0 auto;
}
```

块级元素水平居中（需要有宽度，可以是相对宽度）：

```css
.child {
  margin-right: auto;
  margin-left: auto;
}
```

块级元素垂直居中：

```css
.parent {
  display: table-cell;
  vertical-align: middle; /* 通常用来使行内元素盒模型与其行内元素容器垂直对齐，如文案和图片之间 */
}
```

行内块元素水平居中：

```css
.parent {
  text-align: center;
}

.child {
  display: inline-block; /* inline-flex | inline-grid | inline-table | -webkit-inline-box */
}
```
