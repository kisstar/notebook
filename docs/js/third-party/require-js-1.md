# RequireJS (二)

RequireJS 的基本使用方法。

## 基本 API

**RequireJS 会定义三个变量：`define`，`require`，`requirejs`，其中 `require === requirejs`，由于 `require` 更加简短，语义化也更好，所以我们一般见到和用得最多的就是 `require`。**

`define()` 函数是用来定义一个模块，可以接受三个参数：

- 第一个参数是模块名，一般模块名不需要被指定，由相关工具自动为其命名；
- 第二个参数是一个数组，指明了此模块的依赖；
- 第三个参数就是此模块的具体实现。它大概就像下图一样：

<img :src="$withBase('/images/js/require_define.png')" alt="require_define">

如果我们定义了模块名，则在指定依赖这个模块时，必须使用同名模块名。

`require()` 函数接受两个参数：

- 第一个参数是一个数组，表示所依赖的模块；
- 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

`require` 通过异步加载依赖的模块，从而解决了 JS 阻塞页面渲染，另外指定的回调函数会在其依赖的所有模块加载完之后再执行，从而又解决了依赖性的问题。

## 主模块

**"主模块"，意思是整个网页的入口代码，所有代码都从这儿开始运行。**

我们可以在主模块里设置 `require` 的全局配置，并通过设置脚本的 `script` 标签的 `data-main` 属性来引入主模块，因为这个属性指定的 JavaScript 文件将在加载完 `reuqire.js` 后处理，在我们把 `require.config` 的配置加入到其中后，就可以使每一个页面都使用这个配置。

另外，`data-main` 属性还有一个重要的功能，当在 `script` 标签指定 `data-main` 属性时，`require` 会默认的将 `data-main` 指定的 JavaScript 为根路径。

当然我们也可以直接再使用另外一个 `script` 标签来引入主模块，不过此时默认的根路径则为页面所在的路径。

就像下面这个例子一样：

```markdown
# 目录结构

└─ test.html └─text.txt └─js └─main.js └─ require.js └─say.hello.js
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>RequireJS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 通过 script 标签的 src 属性引入 RequireJS -->
    <!-- 通过 script 标签的 data-main 属性引入主模块，此时根路径为 js 目录 -->
    <!-- 加载完 reuqire.js 后执行 main.js -->
    <script src="js/require.js" data-main="js/main"></script>
  </head>
  <body>
    <div>Hello world</div>
  </body>
</html>
```

## 模块的加载

在加载本地的模块时，我们可以在 `require()` 函数的第一个参数里指明模块的加载路径。比如上面在 `main.js` 文件里依赖 `say.hello.js` 文件，我们可以这样写：

```javascript
// main.js
require(['say.hello'], function() {
  console.log('success')
})
```

```javascript
// say.hello.js
define(function() {
  function sayHello() {
    alert('Hello')
  }

  sayHello()
})
```

安装如前展示的目录将几个文件对应放置后，用浏览器打开 `test.html` 文件，此时会在加载完 `require.js` 文件后执行 `main.js`(主模块)，由于主模块依赖 `say.hello.js`(其它模块) 文件，所以主模块中的回调函数会在其它它依赖模块加载完后执行，也就是只有当我们确认弹出框后，控制台才会打印 `success`。

## 基本配置

首先我们前面提到的，根据主模块引入方式的差异，RequireJS 的根路径也会存在不同，那么有没有什么方法让它不受引入方式的影响呢，这就需要使用到 RequireJS 的 `require.config()` 方法来进行配置。

自然我们也可以在每个页面中加入配置，但那样会显得十分麻烦，所以可以把全局配置写在主模块里。

配置模块路径：简单点说就是给模块起一个更短更好记的名字，不需要在写依赖时写一串的路径。

比如我们需要下载 CDN 上的 `jQuery` 时，我们可以照下面这样写：

```javascript
// main.js
require.config({
  paths: {
    // 本地文件可以配置
    // 配置的路径可以是一个
    sayHello: 'say.hello',
    // 服务器上的也可以配置
    // 配置的路径也可以是一个数组，如果前一个路径获取失败会尝试依次从后面的路径下载
    // 直到下载成功或读取完整个数组
    // 注意配置的路径中不能有 .js 后缀
    jquery: ['https://cdn.bootcss.com/jquery/1.10.2/jquery.min'],
  },
})
require(['jquery', 'sayHello'], function($) {
  $(function() {
    console.log('success')
  })
})
```

在使用 RequireJS 时，加载模块时不能写 `.js` 后缀。

上面例子中的 `callback` 函数中发现有 `$` 参数，这个就是依赖的 `jquery` 模块的输出变量，如果你依赖多个模块，可以依次写入多个参数来使用，由于 `sayHello` 模块不存在输出变量，所以上面的回调函数只有一个参数。参数的放置顺序应该与前面依赖模块的书写顺序一致。

## 参考资料

- [菜鸟教程](http://www.runoob.com/w3cnote/requirejs-tutorial-1.html)
- [IBM](https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/index.html)
- [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [慕课网](https://www.imooc.com/learn/787)
