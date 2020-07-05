# RequireJS（一）

非常小巧的 JavaScript 模块载入框架。

## 简介

随着网站功能逐渐丰富，网页中的 JavaScript 也变得越来越复杂和臃肿，原有通过 `script` 标签来导入一个个的 JavaScript 文件这种方式已经不能满足现在互联网开发模式。

原始写法一个很明显的缺陷，加载多个文件的时候，浏览器会停止网页渲染，加载文件越多，网页失去响应的时间就会越长；其次，由于 JavaScript 文件之间存在依赖关系，因此必须严格保证加载顺序，依赖性最大的模块一定要放到最后加载，当依赖关系很复杂的时候，代码的编写和维护都会变得困难。

AMD 提出了一种基于模块的异步加载 JavaScript 代码的机制，它推荐开发人员将 JavaScript 代码封装进一个个模块，对全局对象的依赖变成了对其他模块的依赖，无须再声明一大堆的全局变量。通过延迟和按需加载来解决各个模块的依赖关系。模块化的 JavaScript 代码好处很明显，各个功能组件的松耦合性可以极大的提升代码的复用性、可维护性。

这种非阻塞式的并发式快速加载 JavaScript 代码，使 Web 页面上其他不依赖 JavaScript 代码的UI元素，如图片、CSS 以及其他 DOM 节点得以先加载完毕，WEB 页面加载速度更快，用户也得到更好的体验。

RequireJS 是一个非常小巧的JavaScript模块载入框架，是 AMD 规范最好的实现者之一。

让我们先来看一段没有使用 RequireJS 的代码的情况。

```html
<!-- demo.html -->
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="js/say.hello.js"></script>
    </head>
    <body>
        <div>Hello world</div>
    </body>
</html>
```

```javascript
// say.hello.js
(function () {
    function sayHello () {
        alert('Hello');
    }

    sayHello();
})()
```

如上所示的代码，当执行 `sayHello` 函数时，页面会是一片空白，`Hello world` 的字样并不会被渲染出来，只有当点击确认弹出框后，才会继续渲染页面，这便是 JS 阻塞浏览器渲染导致的结果。

## 加载 RequireJS

首选去官网下载 [RequireJS](https://requirejs.org/)。

然后以传统的方式通过 `script` 标签的 `src` 属性引入，并把它放在 JavaScript 子目录下面：

```html
<!--
    async属性表明这个文件需要异步加载，避免网页失去响应。IE 不支持这个属性，只支持 defer
    这样的写法是避免加载这个文件，造成网页失去响应
    当然把它放在网页底部加载也可以避免
 -->
<script src="js/require.js" defer async="true"></script>
```

此时我们用 RequireJS 再来实现上面的事情：

```html
<!-- demo.html -->
<!DOCTYPE html>
<html>
    <head>
        <script type="text/javascript" src="js/require.js" defer async="true"></script>
        <script type="text/javascript">
            require(["js/say.hello"]);
        </script>
    </head>
    <body>
        <div>Hello world</div>
    </body>
</html>
```

```javascript
// say.hello.js
define(function () {
    function sayHello () {
        alert('Hello');
    }

    sayHello();
})()
```

现在当弹出框弹出时，浏览器并不是一片空白，`Hello world` 的字样会直接显示。所以我们现在可以更加直观地感受 RequireJS 带来的好处：

* 使用程序调用的方式加载 JavaScript，防止页面一排 `script` 标签引入外部 JavaScript 的情况发生。
* 防止 JavaScript 加载阻塞页面渲染。

## 参考资料

* [菜鸟教程](http://www.runoob.com/w3cnote/requirejs-tutorial-1.html)
* [IBM](https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/index.html)
* [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
* [慕课网](https://www.imooc.com/learn/787)
