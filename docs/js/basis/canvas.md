# 初识 Canvas

HTML5 新添加 `<canvas>` 元素，这个元素负责在页面中设定一个区域，然后就可以通过 `JavaScript` 动态地在这个区域中绘制图形。

## 基本概念

`<canvas>` 由几组 API 构成，但并非所有浏览器都支持所有这些 API。除了具备基本绘图能力的 2D 上下文，`<canvas>` 还建议了一个名为 WebGL 的 3D 上下文。目前，支持该元素的浏览器都支持 2D 上下文及文本 API，但对 WebGL 的支持还不够好。

要使用 `<canvas>` 元素，必须先设置其 `width` 和 `height` 属性，指定可以绘图的区域大小。出现在开始和结束标签中的内容是后备信息，如果浏览器不支持 `<canvas>` 元素，就会显示这些信息。当然，我们也能通过 CSS 为该元素添加样式。

要在画布（canvas）上绘图，需要调用 `getContext()` 方法并传入上下文的名字来取得绘图上下文。传入 "2d"，就可以取得 2D 上下文对象。

使用 `toDataURL()` 方法，可以导出在 `<canvas>` 元素上绘制的图像。这个方法接受一个参数，即图像的 MIME 类型格式，而且适合用于创建图像的任何上下文。

```javascript
let drawing = document.getElementById("drawing");
//确定浏览器支持<canvas>元素
if (drawing.getContext){
    //取得图像的数据 URI
    let imgURI = drawing.toDataURL("image/png");
    //显示图像
    let image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);
}
```

## 基本API

绘制矩形的相关 API：这三个方法都能接收 4 个参数：矩形的 `x` 坐标、矩形的 `y` 坐标、矩形宽度和矩形高度，这些参数的单位都是像素。

| 方法 | 描述 |
| :-- | :-- |
| fillRect | 在画布上绘制的矩形会填充指定的颜色。填充的颜色通过 fillStyle 属性指定。 |
| strokeRect | 在画布上绘制的矩形会使用指定的颜色描边。描边颜色通过 strokeStyle 属性指定。 |
| clearRect | 用于清除画布上的矩形区域。本质上，这个方法可以把绘制上下文中的某一矩形区域变透明。 |

绘制路径的相关 API：要绘制路径，首先必须调用 `beginPath()` 方法，表示要开始绘制新路径。如果想绘制一条连接到路径起点的线条，可以调用 `closePath()`。

| 方法 | 描述 |
| :-- | :-- |
| arc(x, y, radius, startAngle, endAngle, counterclockwise) | 以 (x,y) 为圆心绘制一条弧线，弧线半径为 radius，起始和结束角度（用弧度表示）分别为 startAngle 和 endAngle。最后一个参数表示 startAngle 和 endAngle 是否按逆时针方向计算，值为 false 表示按顺时针方向计算。 |
| arcTo(x1, y1, x2, y2, radius) | 从上一点开始绘制一条弧线，到 (x2,y2) 为止，并且以给定的半径 radius 穿过 (x1,y1)。 |
| bezierCurveTo(c1x, c1y, c2x, c2y, x, y) | 从上一点开始绘制一条曲线，到 (x,y) 为止，并且以 (c1x,c1y) 和 (c2x,c2y) 为控制点。 |
| lineTo(x, y) | 从上一点开始绘制一条直线，到 (x,y) 为止。 |
| moveTo(x, y) | 将绘图游标移动到 (x,y)，不画线。 |
| quadraticCurveTo(cx, cy, x, y) | 从上一点开始绘制一条二次曲线，到 (x,y) 为止，并且以 (cx,cy) 作为控制点。 |
| rect(x, y, width, height) | 从点 (x,y) 开始绘制一个矩形，宽度和高度分别由 width 和 height 指定。这个方法绘制的是矩形路径，而不是 strokeRect() 和  fillRect() 所绘制的独立的形状。 |

绘制文本的相关 API：前两个两个方法都可以接收 4 个参数：要绘制的文本字符串、`x` 坐标、`y` 坐标和可选的最大像素宽度。

| 属性 | 描述 |
| :-- | :-- |
| fillText | 使用 fillStyle 属性绘制文本。 |
| strokeText | 使用 strokeStyle 属性为文本描边。 |
| measureText | 利用 font、textAlign 和 textBaseline 的当前值计算指定文本的大小。 |

绘制文本的这前两个两个方法都以下列 3 个属性为基础：

| 方法 | 描述 |
| :-- | :-- |
| font | 表示文本样式、大小及字体，用 CSS 中指定字体的格式来指定，例如 "10px Arial"。 |
| textAlign | 表示文本对齐方式。可能的值有 "start"、"end"、"left"、"right" 和 "center"。 |
| textBaseline | 表示文本的基线。可能的值有 "top"、"hanging"、"middle"、"alphabetic"、"ideographic" 和 "bottom"。 |

## 绘制时钟

```html
<canvas id="drawing" width=" 200" height="200">A drawing of something.</canvas>
```

```javascript
let drawing = document.querySelector("#drawing");
// 调用 getContext() 方法并传入上下文的名字
if (drawing.getContext) {
    // 传入"2d"，就可以取得 2D 上下文对象
    let context = drawing.getContext('2d');

    // 设置默认样式
    context.strokeStyle = "#000000";
    context.fillStyle = "#c0c0c0";

    // 开始路径
    context.beginPath();
    // 绘制圆
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);
    // 绘制分针
    context.moveTo(100, 100);
    context.lineTo(100, 25);
    // 绘制时针
    context.moveTo(100, 100);
    context.lineTo(45, 100);
    // 描边路径
    context.stroke();

    // 绘制文本
    let fontSize = 12;
    context.font = fontSize + "px Arial";
    while(context.measureText("12").width > 200){
        fontSize--;
        context.font = fontSize + "px Arial";
    }
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("12", 100, 12);
}
```

## 参考资料

* JavaScript高级程序设计(第三版）
