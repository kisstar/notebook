# 盒模型

**CSS 基础框盒模型（CSS basic box model）** 是 CSS 规范的一个模块，常被直译为盒子模型、盒模型或框模型。

它定义了一种长方形的盒子，包括它们各自的内边距（padding）与外边距（margin ），并根据视觉格式化模型来生成元素，对其进行布置、编排、布局（layout）。

## 基础概念

当对一个文档进行布局的时候，浏览器的渲染引擎会根据盒模型，将所有元素表示为一个个矩形的盒子。

每个盒子由四个部分（或称区域）组成，其效用由它们各自的边界（Edge）所定义。与盒子的四个组成区域相对应，每个盒子有四个边界：

<img :src="$withBase('/images/css/boxmodel.png')" alt="boxmodel">

- 内容边界（Content edge）：由内容边界限制，容纳着元素的“真实”内容，例如文本、图像等，它的尺寸就是的 `content-box` 的尺寸。
- 内边距边界（Padding Edge）：由内边距边界限制，扩展自内容区域，负责延伸内容区域的背景，填充元素中内容与边框的间距。它的尺寸就是 `padding-box` 的尺寸。
- 边框边界（Border Edge）：由边框边界限制，扩展自内边距区域，是容纳边框的区域。其尺寸就是 `border-box` 的尺寸。
- 外边框边界（Margin Edge）：由外边距边界限制，用空白区域扩展边框区域，以分开相邻的元素。它的尺寸为 `margin-box` 的尺寸。

同几者密切相关的 CSS 属性包括  `box-sizing` 和 `background-clip`。`box-sizing` 属性定义了 `user agent` 应该如何计算一个元素的总宽度和总高度，可能的值主要包括 `content-box`（默认）和 `border-box`。

- 在默认情况（标准盒模型）下，`width` 与 `height` 只包括内容的宽和高， 不包括边框（border），内边距（padding），外边距（margin）。
- 而后者（IE 模型）的 `width` 和 `height` 属性则包括内容，内边距和边框，但不包括外边距。

<img :src="$withBase('/images/css/W3C_and_Internet_Explorer_box_models.png')" alt="W3C_and_Internet_Explorer_box_models">

对于 `background-clip`  属性，它被用来设置元素的背景（背景图片或颜色）是否延伸到边框下面。可能的值主要包括 `border-box`（默认）、`padding-box`、`content-box`。

- 默认情况下（`border-box`），背景延伸至边框外沿，且在边框下层。
- 当设置为 `padding-box` 时，背景延伸至内边距外沿。
- 而对于 `content-box`，背景被裁剪至内容区（content box）外沿。

## 规定元素的盒类型

每个元素都具有默认的盒子模型，但我们仍然可以显式的声明或改变一个元素的盒模型。

当我们把 CSS 属性 `display` 设置为 `block`、`list-item`、`table` 等时就会使元素变为块级元素，每个块级元素生成一个主块级盒来包含子级盒。

对应的，每个行级元素也会生成一个块级盒，行级盒可分布于多行中。当我们把 CSS 属性 `display` 设置为 `inline`，`inline-block` 等时就会使元素变为行级元素。

行级盒子的 `margin-top` 和 `margin-bottom` 不会产生效果，而其 `padding-top` 和 `padding-bottom` 则不会影响布局。

而且，由于行级盒子内容过多时会产生换行，而对于换行后的几行内容仍然属于一个行级盒子，所以我们在对多行的行级盒子设置 `margin-left` 时会发现只对第一行有效。

另外，需要注意的是，当 `display` 设置为 `inline-block` 时，此元素会生成一个行级盒，所以会在行内显示，而同时又为其内容产生了块级盒，所以除了在行内显示外，它表现出的确是块级元素的特征。

## 盒子的嵌套

在块级盒子中：

- 可以包含多个子块级盒子。
- 可以包含多个子行级盒子。
- 其中不在行级元素中的文字，会生成匿名的块级盒。
- 其中不能同时存在块级和行级盒子，遇到此种情况，将会生成匿名的块级盒子来包裹行级盒。

在行级盒子中：

- 可以包含行级盒子。
- 可以包含一个块级盒子，会被块级盒子拆分成两个行级盒子，这两个行级盒子又分别被匿名块级盒子所包含。

## 外边距合并

块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距，其大小取其中的最大者，这种行为称为外边距折叠（margin collapsing），有时也称为外边距合并。

外边距的折叠通常发生在下面三种情况：

- 相邻元素之间

  相邻元素之间的外边距会折叠（除非后一个元素清除之前的浮动）。

- 父元素与其第一个或最后一个子元素之间

    如果在父元素与其第一个子元素之间不存在边框、内边距、行内内容，也没有创建块格式化上下文、或者清除浮动将两者的 `margin-top` 分开；或者在父元素与其最后一个子元素之间不存在边框、内边距、行内内容、`height`、`min-height`、`max-height` 将两者的 `margin-bottom` 分开，那么这两对外边距之间会产生折叠。此时子元素的外边距会“溢出”到父元素的外面。

- 空的块级元素

    如果一个块级元素中不包含任何内容，并且在其 `margin-top` 与 `margin-bottom` 之间没有边框、内边距、行内内容、`height`、`min-height` 将两者分开，则该元素的上下外边距会折叠。

对外边距的含义，可以简单的理解为规定了元素外多大区域内不能摆放其它盒子，这对于理解外边距合并很有用。以相邻元素为例。

```less
.top {
    margin-bottom: 20px;
}

.bottom {
    margin-top: 10px;
}
```

```html
<body>
    <div class="top">top</div>
    <div class="bottom">bottom</div>
</body>
```

此时，因为上面的元素规定其下方 `20px` 内不允许放其它的盒子，下面的元素规定其上方 `10px` 内不允许放置其它盒子，所以两者之间只要保留 `20px` 的距离就同时满足两者的条件了，因此产生了折叠。

另外，还有一些值得注意的地方：

- 浮动元素和绝对定位元素的外边距不会折叠。
- 即使某一外边距为 0，这些规则仍然适用。所以第一个或最后一个子元素的外边距可能会 “溢出” 到父元素的外面。
- 如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距与最小的负边距（即绝对值最大的负边距）的和。
- 如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。这一规则适用于相邻元素和嵌套元素。

## 块格式化上下文（BFC）

**块格式化上下文（Block Formatting Context，BFC）** 是 WEB 页面可视化 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

常见的产生块级上下文的方式包括：

- 浮动元素（元素的 `float` 不是 `none`）。
- 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）。
- `overflow` 值不为 `visible` 的块元素。
- `display` 值为 `inline-block`、`table-cell`、`table-caption`、`flex`、`grid`、`flow-root` 的元素。

由于外边距折叠（Margin collapsing）只会发生在属于同一 BFC 的块级元素之间，因此我们可以通过创建 BFC 来解决外边距合并的问题。

```less
.generate-bfc {
    overflow: hidden;
}

.top {
    margin-bottom: 20px;
}

.bottom {
    margin-top: 10px;
}
```

```html
<body>
    <div class="generate-bfc">
        <div class="top">top</div>
    </div>

    <div class="bottom">bottom</div>
</body>
```

因为，块格式化上下文包含的是创建它的元素内部的所有内容，所以我们在 `.top` 元素的父元素上产生了 BFC，此时两者的外边距将不会产生折叠。

另外，浮动定位和清除浮动时只会应用于同一个 BFC 内的元素，所以利用 BFC 解决由浮动产生的高度塌陷也很简单，只需要在浮动元素的父元素上创建 BFC 就可以让让浮动元素也参与高度计算。

## 参考资料

- [CSS 基础框盒模型 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model)
- [去除inline-block元素间间距的N种方法 « 张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%e5%8e%bb%e9%99%a4%e9%97%b4%e8%b7%9d/)
