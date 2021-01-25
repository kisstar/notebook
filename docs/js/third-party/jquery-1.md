# jQuery 中的扩展（拷贝）方式

文中涉及到 jQuery 暴露的接口：

- jQuery.each
- jQuery.extend
- jQuery.isPlainObject
- jQuery.fn.extend

其它私有函数：

- flat
- isFunction
- isWindow
- DOMEval
- toType
- isArrayLike
- isPlainObject

在工厂函数的内部，jQuery 首先声明了一些变量和工具函数：

```js
;(function(window, noGlobal) {
  // ...

  var arr = []

  // ...

  var flat = arr.flat
    ? function(array) {
        return arr.flat.call(array)
      }
    : function(array) {
        return arr.concat.apply([], array)
      }

  // ...

  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === 'function' && typeof obj.nodeType !== 'number'
  }

  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window
  }

  // ...
})
```

其中还提供了 DOMEval 函数来运行代码，它的做法很明确就是将代码放置到动态创建的 `script` 标签中，然后将其添加到文档中运行，之后再将 `script` 标签从文档中移除：

```js
;(function(window, noGlobal) {
  var document = window.document
  // 列举支持的配置项，具体的配置由下面函数的第二个参数提供
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true, // 涉及到 CSP 等相关内容，更多信息可以查看文末的参考链接
    noModule: true, // 标明这个脚本在支持 ES2015 modules 的浏览器中不执行
  }

  function DOMEval(code, node, doc) {
    doc = doc || document

    var i,
      val,
      script = doc.createElement('script')

    script.text = code
    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || (node.getAttribute && node.getAttribute(i))
        if (val) {
          script.setAttribute(i, val)
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script)
  }
})
```

同时，它也支持加载远程资源，具体行为由第二个参数决定。

接下来是一个判断类型的函数，它的功能类似于一个增强版的 `typeof`。原生的 `typeof` 不仅在判断 `null` 时返回 `object`，而且对于一些原生对象给出的判断也不具体。

在 `toType` 函数中借用了对象原型上的 `toString` 方法以返回 `"[object Type]"`（其中 Type 是目标的类型），然后再根据 `class2type` 中的映射关系来得到具体的类型：

```js
;(function(window, noGlobal) {
  var class2type = {}

  var toString = class2type.toString

  function toType(obj) {
    if (obj == null) {
      return obj + ''
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj
  }
})
```

其中 `class2type` 的具体内容是在后续进行扩展的（L498）：

```js
;(function(window, noGlobal) {
  jQuery.each(
    'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
    function(_i, name) {
      class2type['[object ' + name + ']'] = name.toLowerCase()
    },
  )
})
```

这样一来，我们就可以总是得到具体的类型。那么这里的 `jQuery.each` 又是怎么工作的呢？和数组的 `each` 类似，不过它同时还支持对对象进行遍历：

```js
;(function(window, noGlobal) {
  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && 'length' in obj && obj.length,
      type = toType(obj)

    // 函数具有 length 属性，指明函数的形参个数
    // winodw 也具备 length 属性，返回当前窗口中包含的框架数量(框架包括 frame 和 iframe 两种元素)
    if (isFunction(obj) || isWindow(obj)) {
      return false
    }

    return (
      type === 'array' ||
      length === 0 ||
      // 避免对象中存在一个普通的 length 属性而判断为类数组，如果其值为零则无所谓
      (typeof length === 'number' && length > 0 && length - 1 in obj)
    )
  }

  jQuery.extend({
    each: function(obj, callback) {
      var length,
        i = 0

      if (isArrayLike(obj)) {
        length = obj.length
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break
          }
        }
      }

      return obj
    },
  })
})
```

在这个函数中主要通过 `for` 和 `for..in` 来进行遍历，如果其中某一次的处理函数返回 `false` 的话将会停止后续遍历，最后返回遍历的对象。

另外，jQuery 还通过 `call` 改变了处理函数中的 `this` 指向（遍历的当前项）。

最后，`jQuery.extend` 是如何进行扩展的呢？本质上，它可以看作是一个拷贝函数（非完全体），并且支持深拷贝和浅拷贝两种方式。分开来看，在仅支持浅拷贝时：

```js
;(function(window, noGlobal) {
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
      name,
      copy,
      target = arguments[0] || {}, // 默认将被扩展的对象
      i = 1, // 默认从第二个参数开始被视为要扩展的内容
      length = arguments.length

    // 仅接收到一个参数时将直接扩展自身
    // 这里 i === length 可能会让人疑惑，不过现在 i 恒为 1，所以你可以看作是 1 === length
    if (i === length) {
      target = this
      // 此时扩展内容应该从索引零开始取值
      i--
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name]

          // 对于 __proto__ 属性（指向原型对象），我们选择跳过，以免污染原型链
          if (name === '__proto__') {
            continue
          }

          // Don't bring in undefined values
          if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    return target
  }
})
```

在函数中通过 `arguments` 模拟了函数的重载，默认情况下会将第一个参数作为扩展的目标，后续的所有参数都会扩展到目标对象上，但是如果仅有一个参数的话，则将其扩展到 jQuery 自身。

当传入的第一个参数是一个布尔值时将会根据它来决定是否启动深拷贝，后续参数的处理与上面一致：

```js
;(function(window, noGlobal) {
  jQuery.extend = jQuery.fn.extend = function() {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false

    // 当第一个参数是布尔值时将覆盖内部默认的 deep 值以决定是否进行深拷贝
    if (typeof target === 'boolean') {
      deep = target

      // 对应的扩展目标和扩展内容需要后移一位取值
      target = arguments[i] || {}
      i++
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {}
    }

    // 当扩展内容的取值位置和参数的长度一致时，说明并没有提供目标对象（或者说，除了可有可无的布尔值外，额外提供的只有一个参数）
    // 此时将扩展自身
    if (i === length) {
      target = this
      i--
    }

    // 遍历提供扩展内容的若干对象
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        // 遍历提供扩展内容的对象的属性
        for (name in options) {
          copy = options[name]

          // 当拷贝的值是目标对象自身时将跳过，以避免无限循环
          if (name === '__proto__' || target === copy) {
            continue
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name]

            // 走进这个分支是 copy 要么是数组要么是纯粹的对象
            // 如果 copy 是数组，而 src 不是则将 targe 设为数组，而若 copy 是纯对象且 src 不是时，将 target 设为空对象
            if (copyIsArray && !Array.isArray(src)) {
              clone = []
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {}
            } else {
              clone = src
            }
            copyIsArray = false

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }

    return target
  }
})
```

值得一提的是若参数中字段的值就是目标参数，就会停止赋值，以避免循环引用造成无限循环问题：

```js
if (name === '__proto__' || target === copy) {
  continue
}
```

另外，其中还涉及了 `isPlainObject` 方法，用以测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）（L339）：

```js
;(function(window, noGlobal) {
  var getProto = Object.getPrototypeOf
  var toString = class2type.toString
  var hasOwn = class2type.hasOwnProperty
  var fnToString = hasOwn.toString
  var ObjectFunctionString = fnToString.call(Object) // function Object() { [native code] }

  jQuery.extend({
    isPlainObject: function(obj) {
      var proto, Ctor

      if (!obj || toString.call(obj) !== '[object Object]') {
        return false
      }

      proto = getProto(obj)

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      if (!proto) {
        return true
      }

      // Objects with prototype are plain if they were constructed by a global Object function
      Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
      return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
    },
  })
})
```

这也是为什么说它是一个不完全的拷贝函数的原因，因为像正则、日期这样的对象它会直接采用普通的拷贝方式。

## 附录

深拷贝中为什么要重置 `copyIsArray` 为假？

## 备注

- 示例代码并没有完全照着源码的结构呈现，因为这样并利于说明。我们尽量从上至下、抽离相关的代码放在一起进行理解。

## 参考

- [Content Security Policy 入门教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/09/csp.html)
- [Csp Nonce – 守护你的 inline Script | AlloyTeam](http://www.alloyteam.com/2020/08/csp-nonce/)
