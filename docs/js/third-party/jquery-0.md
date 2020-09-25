# jQuery 的整体结构

jQuery 的实现以一个 IIFE 开始，如此以隐藏内部实现、规避冲突。

匿名函数接受两个参数，分别是全局对象和一个工厂函数，后者负责返回需要导出的内容（jQuery 函数）。

```js
;(function(global, factory) {
  'use strict'

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // See ticket #14549 for more info.
    module.exports = global.document
      ? factory(global, true)
      : function(w) {
          if (!w.document) {
            throw new Error('jQuery requires a window with a document')
          }
          return factory(w)
        }
  } else {
    factory(global)
  }
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
  var jQuery = function(selector, context) {}
  // ...

  return jQuery
})
```

在函数体内主要进行了模块化处理，对于符合（或则类） CommonJS 规范的环境，如果拥有包含 `document` 属性的全局对象将执行工厂函数获取 jQuery 进行暴露，否则将暴露包装后的工厂函数，待使用时再传入符合要求的全局对象。

对于其它环境则会直接执行工作函数，同时在工厂函数的底部也做了一些模块化相关的处理 (L10832)：

```js
;(function(window, noGlobal) {
  var jQuery = function(selector, context) {}
  // ...

  if (typeof define === 'function' && define.amd) {
    define('jquery', [], function() {
      return jQuery
    })
  }

  // ...

  if (typeof noGlobal === 'undefined') {
    window.jQuery = window.$ = jQuery
  }

  return jQuery
})
```

如你所见，在支持 AMD 规范的环境中 jQuery 将自动注册为一个模块。由于依赖 jQuery 的其他库通常将 `"jquery"` 用作依赖项的约定名称，所以 jQuery 并没有注册为规范中推荐的匿名模块，这允许那些其他依赖项共享同一模块实例。

当然不仅仅是为此，jQuery 通常被其他第三方 JavaScript 库使用。如果这些第三方库自行加载了（非 AMD 脚本加载程序加载）它，当存在匿名定义调用时，则可能导致加载错误，因为匿名定义调用无法与加载程序期望的名称绑定。

另外，在 AMD 规范中同时建议不要再声明其它的全局变量，但 jQuery 依然这么做了。因为许多其它依赖 jQuery 的库都假定了它在全局可用，如果 jQuery 在调用 `define` 时未注册全局变量，则第三方代码可能会中断。

同时，在 CommonJS 规范下的浏览器模拟环境和其它环境（通常是浏览器）下 jQuery 也会自动暴露在全局中，为了避免全局作用域中的变量冲突 jQuery 提供了 `noConflict` 方法（L10841）：

```js
;(function(window, noGlobal) {
  var jQuery = function(selector, context) {}
  // ...

  var _jQuery = window.jQuery,
    _$ = window.$

  jQuery.noConflict = function(deep) {
    if (window.$ === jQuery) {
      window.$ = _$
    }

    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery
    }

    return jQuery
  }

  // ...
})
```

在方法内默认会检查当前全局变量 `$` 是否是暴露的 jQuery，如果是的话就会将其还原为缓存的加载前的 `$` 的值，否则说明加载后 `$` 的值已经被用户重新覆盖了，那么直接返回 jQuery 就可以了。

另外，如果向方法传入一个真值的话，它还会检查全局变量 jQuery。

目前来看，我们拿到的 jQuery 总是一个函数。根据我们的使用经验其内部应该返回了一个包含许多属性和方法的对象，并且还支持链式调用，那么具体是怎么做到的呢？事实上我们通常使用的 jQuery 对象是被 `init` 构造函数“增强过的”（L153）：

```js
var version = '3.5.1',
  jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context)
  }
```

如此，我们在使用的过程中就无须自己通过 `new` 关键字来进行调用，使用起来更加方便。不过现在看起来还不是很明确，继续查看会发现其实 `jQuery.fn` 就是 jQuery 的原型对象：

```js
jQuery.fn = jQuery.prototype = {
  // The current version of jQuery being used
  jquery: version,
  // 改正 constructor 的指向
  constructor: jQuery,
}
```

现在还不够，我们是使用 `init` 函数来创建实例的，所以我们要改变它的原型对象指向 jQuery 的原型对象（L3133）：

```js
var init = (jQuery.fn.init = function(selector, context, root) {
  // ...
})

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn
```

这样 jQuery 的整体结构就算完成了，当我们扩展 jQuery 的原型时，通过 `init` 函数创建的实例也能通过原型访问到。

## 附录

为什么将 `window` 直接传入，而不是在其中直接访问？

- 由于作用域链的机制，将其作为局部变量可以提高变量的查找速度。
- 利于压缩，直接使用 `window` 在压缩过程不能以单个的字母替代。

如何在 AMD 规范下避免声明 jQuery 相关的全局变量？

```js
// see https://requirejs.org/docs/jquery.html#noconflictmap
requirejs.config({
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': { jquery: 'jquery-private' },

    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    'jquery-private': { jquery: 'jquery' },
  },
})

// and the 'jquery-private' module, in the
// jquery-private.js file:
define(['jquery'], function(jq) {
  return jq.noConflict(true)
})
```

现在，你可以照常使用 `"jquery"` 模块名来引用 jQuery，而相关的全局变量已经被移除了。

## 备注

- 文中 `(L10832)` 表示相关代码出现在 10832 行附近。
- 代码中 `// ...` 表示省略了一些代码。

## 参考

- [Updating existing libraries · requirejs/requirejs Wiki](https://github.com/requirejs/requirejs/wiki/Updating-existing-libraries#anon)
- [Common Errors - RequireJS](https://requirejs.org/docs/errors.html#mismatch)
- [javascript - 在 RequireJS 中 - 不能在路径中别名 jQuery 名称](https://stackoverrun.com/cn/q/2268691)
- [requireJS 在同一个 HTML/JSP 页面,加载不同版本的 jquery_aty-CSDN 博客](https://blog.csdn.net/aitangyong/article/details/41286171)
- [RequireJS](https://requirejs.org/)
