# RequireJS (三)

RequireJS 的基本配置。

## 配置 baseUrl

我们知道当我们不使用 `data-main` 属性，也不设置 `baseUrl` 的值时，这时加载模块的路径（baseUrl）默认是在 `.html` 文件所在目录。

当我们使用 `data-main` 属性时，加载 JavaScript 文件的根路径就变成了 `data-main` 属性所指定 JavaScript 文件所在目录。

这里我们将介绍的是如何手动的配置 `baseUrl`，我们可以在前面提到的主模块里进行配置。

```javascript
// main.js
require.config({
  baseUrl: '/js',
})
```

另外需要提到的是 RequireJS 的加载机制：

- RequireJS 使用 `head.appendChild()` 将每一个依赖加载为一个 `script` 标签。
- 加载后立即执行。

## 加载第三方模块

RequireJS 加载的模块，采用 AMD 规范。也就是说，模块必须按照 AMD 的规定来写，也就是使用 `define()` 来申明的模块。

但是部分时候需要加载非 AMD 规范的 JavaScript，比如老版本的 jQuery、Bootstrap 以及 `Modernizr.js`，那么，RequireJS 是否能够加载这些非规范的模块呢？

答案是可以的，不过我们需要对其进行相应的配置，以 `Modernizr.js` 为例来认识以下 `shim`。

<img class="center" height="350" :src="$withBase('/images/js/require-shim.png')" alt="require-shim">

这样配置后，我们就可以在其他模块中引用 Modernizr 模块：

```javascript
require(['Modernizr'], function(Modernizr) {
  // do something
})
```

对于像 Bootstrap 这样只有依赖没有输出的我们只需要注明它的依赖。就像下面这样：

```javascript
// main.js
requirejs.config({
  shim: {
    bootstrap: ['jquery'],
  },
})
```

当然你也可以像下面这么写，不过上面的写法看起来更简洁：

```javascript
// main.js
requirejs.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
    },
  },
})
```

## 配置 map

在项目开发的初期我们使用了模块的最新且稳定的版本，然而模块随时可能会更新，当我们需要相应模块最新版本的功能时，却又担心升级后之前项目依赖的低版本会产生问题，这时候就陷入了两难的抉择。

这时候就需要用到 `map` 配置，在这里我们以需要不同版本的 jQuery 为例。

```javascript
// main.js
requirejs.config({
  map: {
    'app/login': {
      jquery: './lib/jquery',
    },
    'app/index': {
      jquery: './lib/jquery2',
    },
  },
})
```

根据以上的配置虽然 `app/login` 和 `app/index` 这两个模块都加载了 jQuery，但 `app/login` 加载 jQuery 模块时，将加载 `jquery.js`，而 `app/index` 加载 jQuery 模块时，将加载 `jquery2.js`。

```javascript
// main.js
requirejs.config({
  map: {
    '*': {
      jquery: './lib/jquery',
    },
    'app/index': {
      jquery: './lib/jquery2',
    },
  },
})
```

当我们像上面这么配置时，除了加载 `app/index` 模块会加载 `jquery2.js` 外，其它模块加载 jQuery 模块时，都会去加载 `jquery.js`。

## 其它常用配置

- **waitSeconds**：设置加载 JavaScript 的等待时间，默认为 7 秒，超出后将会报错；如果设置为 0，则禁用等待超时。
- **urlArgs**：加载文件时，在 `url` 后面添加额外的 `query` 参数。

## 参考资料

- [菜鸟教程](http://www.runoob.com/w3cnote/requirejs-tutorial-1.html)
- [IBM](https://www.ibm.com/developerworks/cn/web/1209_shiwei_requirejs/index.html)
- [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
- [慕课网](https://www.imooc.com/learn/787)
