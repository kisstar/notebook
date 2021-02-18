# jQuery 中的工具函数和方法

文中涉及到 jQuery 暴露的接口：

- jQuery.fn.toArray
- jQuery.fn.get
- jQuery.fn.pushStack
- jQuery.fn.each
- jQuery.fn.map
- jQuery.fn.slice
- jQuery.fn.first
- jQuery.fn.last
- jQuery.fn.even
- jQuery.fn.odd
- jQuery.fn.eq
- jQuery.fn.end
- jQuery.fn.push
- jQuery.fn.sort
- jQuery.fn.splice
- jQuery.error
- jQuery.noop
- jQuery.isEmptyObject
- jQuery.globalEval
- jQuery.find（未作详细说明）
- jQuery.expr（未作详细说明）
- jQuery.camelCase
- jQuery.isArray
- jQuery.parseJSON
- jQuery.nodeName
- jQuery.isFunction
- jQuery.isWindow
- jQuery.type
- jQuery.now
- jQuery.trim
- jQuery.isNumeric
- jQuery.parseXML
- jQuery.proxy

相关属性：

- jQuery.fn.jquery
- jQuery.fn.constructor
- jQuery.fn.length
- jQuery.expando
- jQuery.isReady
- jQuery.support
- jQuery.guid

其它私有函数：

- access
- swap

jQuery 在修改其原型时同时还制定了一系列的属性和方法（L160）：

```js
;(function(window, noGlobal) {
  var version = '3.5.1'
  var arr = []
  push = arr.push

  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,

    constructor: jQuery,

    // The default length of a jQuery object is 0
    length: 0,

    toArray: function() {
      return slice.call(this)
    },

    // 获取匹配的元素，可以指定索引，默认以数组返回所有的元素
    // 如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推
    get: function(num) {
      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this)
      }

      // Return just the one element from the set
      return num < 0 ? this[num + this.length] : this[num]
    },

    // 将指定的元素集合推入栈顶，并返回栈顶 jQuery 对象
    pushStack: function(elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems)

      // 创建一个属性指向栈中下一层的 jQuery 对象
      // 有点链表的味道，不过这里结合下面的 end() 方法模拟的是栈的结构
      ret.prevObject = this

      // Return the newly-formed element set
      return ret
    },

    // 类似于数组的 forEach()，内部实际上使用的是 jQuery 的静态方法，它同时支持对类数组和对象进行遍历
    each: function(callback) {
      return jQuery.each(this, callback)
    },

    map: function(callback) {
      return this.pushStack(
        jQuery.map(this, function(elem, i) {
          return callback.call(elem, i, elem)
        }),
      )
    },

    slice: function() {
      return this.pushStack(slice.apply(this, arguments))
    },

    first: function() {
      return this.eq(0)
    },

    last: function() {
      return this.eq(-1)
    },

    even: function() {
      return this.pushStack(
        jQuery.grep(this, function(_elem, i) {
          return (i + 1) % 2
        }),
      )
    },

    odd: function() {
      return this.pushStack(
        jQuery.grep(this, function(_elem, i) {
          return i % 2
        }),
      )
    },

    eq: function(i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0)
      return this.pushStack(j >= 0 && j < len ? [this[j]] : [])
    },

    end: function() {
      return this.prevObject || this.constructor()
    },

    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice,
  }
})
```

其中的 `map` 方法调用了同名的静态方法，这个静态方法和数组的 `map` 依然很像，不过它同时支持对类数组和对象进行处理，并且对于最后的结果还会进行深度为一层的拍平处理（L454）：

```js
jQuery({
  map: function(elems, callback, arg) {
    var length,
      value,
      i = 0,
      ret = []

    // 通过 for 循环取出其中的每一项交给回调函数进行处理，并把处理结果存储到新的数组中
    if (isArrayLike(elems)) {
      length = elems.length
      for (; i < length; i++) {
        value = callback(elems[i], i, arg)

        if (value != null) {
          ret.push(value)
        }
      }

      // 如果是非类数组对象则通过 for-in 进行遍历
    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg)

        if (value != null) {
          ret.push(value)
        }
      }
    }

    // Flatten any nested arrays
    return flat(ret)
  },
})
```

另外，还有一个类似数组 `filter` 方法的 `grep` 方法，它将根据指定的回调检测数值元素，并返回符合条件所有元素的数组（L434）：

```js
jQuery({
  grep: function(elems, callback, invert /* 是否对指定的条件取反 */) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert // 通过对 invert 取反得到一个布尔值

    // 仅返回通过函数校验的元素
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i) // 对回调的结果进行取反得到一个布尔值
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i])
      }
    }

    return matches
  },
})
```

这里同时对参数 `invert` 和回调函数取反，不仅得到了两者的布尔值，同时保证了结果的一致性，可谓一举两得。

其它方法看起来就比较明确了，紧接着 jQuery 又向自身扩展了一些静态方法，除了前面已经见过的外，还包括（L325）：

```js
;(function(window, noGlobal) {
  var support = {}

  jQuery.extend({
    // Unique for each copy of jQuery on the page
    // 后续用作 HTMLElement 或 JS 对象的属性名
    expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),

    // 当前版本 jQuery 已经被分成了多个模块，当没有引入 ready 模块时则假设已经就绪
    isReady: true,

    error: function(msg) {
      throw new Error(msg)
    },

    noop: function() {},

    isEmptyObject: function(obj) {
      var name

      for (name in obj) {
        return false
      }
      return true
    },

    // 在提供的上下文中执行脚本；如果未指定，则在全局执行
    globalEval: function(code, options, doc) {
      DOMEval(code, { nonce: options && options.nonce }, doc)
    },

    // 对象的全局 GUID 计数器
    guid: 1,

    // jQuery.support 中记录了一些兼容性的情况，在核心模块中它是空的
    // 在需要的模块中将会对其进行扩展，所以在此先行声明
    support: support,
  })
})
```

对于支持 Symbol 的环境，jQuery 还会在原型添加一个生成器，该生成器可以被 `for...of` 循环使用：

```js
;(function(window, noGlobal) {
  if (typeof Symbol === 'function') {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator]
  }
})
```

再然后就是 Sizzle 部分了，主要对 jQuery 扩展了几个静态方法（L2978）：

```js
;(function(window, noGlobal) {
  jQuery.find = Sizzle
  jQuery.expr = Sizzle.selectors

  // Deprecated
  jQuery.expr[':'] = jQuery.expr.pseudos
  jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort
  jQuery.text = Sizzle.getText
  jQuery.isXMLDoc = Sizzle.isXML
  jQuery.contains = Sizzle.contains
  jQuery.escapeSelector = Sizzle.escape
})
```

由于 Sizzle 模块不小，且随着 JavaScript 对选择器的支持，我们对它的依赖也越来越小，所以在这里先不展开了，在需要时则先对相应的方法进行模拟，以完成基本的工作。

在 Sizzle 之后又陆续地添加了一些静态方法，其中包括一些直接指向元素的方法，以及一些前面了解过的函数：

```js
;(function(window, noGlobal) {
  jQuery.camelCase = camelCase
  jQuery.isArray = Array.isArray
  jQuery.parseJSON = JSON.parse
  jQuery.nodeName = nodeName
  jQuery.isFunction = isFunction
  jQuery.isWindow = isWindow
  jQuery.type = toType
  jQuery.now = Date.now
})
```

其中一个转驼峰的函数 `camelCase`，不一样的是它对 IE 的前缀样式做了特殊的处理（#9572）：

```js
var rmsPrefix = /^-ms-/,
  rdashAlpha = /-([a-z])/g

// Used by camelCase as callback to replace()
function fcamelCase(_all, letter) {
  return letter.toUpperCase()
}

function camelCase(string) {
  return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase)
}
```

接下来一个从一个字符串的两端删除空白字符的 `trim()` 方法：

```js
// Make sure we trim BOM（\uFEFF） and NBSP（\xA0：HTML 中经常用到的 &nbsp;）
// Unicode3.2 之前，\uFEFF 表示零宽不换行空格（Zero Width No-Break Space）；
// Unicode3.2 新增了 \u2060 用来表示零宽不换行空格，\uFEFF 就只用来表示字节次序标记，也就是 BOM
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

jQuery.trim = function(text) {
  return text == null ? '' : (text + '').replace(rtrim, '')
}
```

其中主要分为三步：1、将空值取为空字符串，2、将非字符串转为字符串，3、通过正则清除空白（包括 BOM 和 NBSP）。

另外，jQuery 提供了 `isNumeric()` 方法检查它的参数是否代表一个数值（L10798）：

```js
jQuery.isNumeric = function(obj) {
  var type = jQuery.type(obj)
  return (type === 'number' || type === 'string') && !isNaN(obj - parseFloat(obj))
}
```

通过 `parseFloat` 方法对给定的参数进行转换，如果返回的结果是 NaN 基本上就可以说是非数字了。不过对于 Infinity 它还是返回其本身，所以我们还需要让参数和自身相减，这样如果是 Infinity 也会返回 NaN。

接着要介绍了的是一个解析 XML 文档的方法（L8858）：

```js
jQuery.parseXML = function(data) {
  var xml
  if (!data || typeof data !== 'string') {
    return null
  }

  // Support: IE 9 - 11 only
  // IE throws on parseFromString with invalid input.
  try {
    xml = new window.DOMParser().parseFromString(data, 'text/xml')
  } catch (e) {
    xml = undefined
  }

  // 如果解析失败, DOMParser 不会抛出任何异常，而是会返回一个给定的错误文档，其中包含 parsererror 标签
  if (!xml || xml.getElementsByTagName('parsererror').length) {
    jQuery.error('Invalid XML: ' + data)
  }
  return xml
}
```

可见内部采用了原生解析函数 DOMParser 来将存储在字符串中的 XML 源代码解析为一个 DOM Document。你也可以使用 XMLSerializer 接口提供 `serializeToString()` 方法来构建一个代表 DOM 树的 XML 字符串。

在 jQuery 中还有一个名为 `proxy` 的方法，它的机制几乎和 `bind` 函数一样，根据它的注释也可以知晓这点。虽然它已经不被推荐使用了，但暂时还不会被移除：

```js
jQuery.proxy = function(fn, context) {
  var tmp, args, proxy

  // 这里主要是处理一种简写形式：如果我们要将对象的一个方法的 this 绑定为所在的对象，这可以指定第一个参数为对象，第二个为字符串的方法名
  // Handle: var obj = { test() {} }; jQuery.proxy(obj, 'test')
  if (typeof context === 'string') {
    tmp = fn[context]
    context = fn
    fn = tmp
  }

  // Quick check to determine if target is callable, in the spec
  // this throws a TypeError, but we will just return undefined.
  if (!isFunction(fn)) {
    return undefined
  }

  args = slice.call(arguments, 2)
  proxy = function() {
    // 通过 apply 改变原函数的 this 指向，同时将预存参数和新接受的参数一起传递给原函数
    return fn.apply(context || this, args.concat(slice.call(arguments)))
  }

  // 通过设置为与原始处理程序相同且唯一的 guid，以便后期可以删除它
  proxy.guid = fn.guid = fn.guid || jQuery.guid++

  return proxy
}
```

接下来是一个略微复杂的 `access` 函数，它主要在内部使用，用于处理像 `attr`，`prop`，`css` 这些方法的取值和设置值的问题，比如通过它 `attr` 方法就可以有以下几种用法：

```js
$('div').attr('title')
$('div').attr('title', '标题')
$('div').attr({ title: '标题' })
$('div').attr('title', function() {
  return '标题'
})
```

可见其最大的特点就是模拟实现了函数的重载（L4143）：

```js
var access = function(
  /* 操作的元素集合 */
  elems,
  /* 具体工作的函数，如 attr, css 等 */
  fn,
  /* 设置属性的 key，也可能是个对象 */
  key,
  /* 要设置的值，可以不指定 */
  value,
  /* 是否可以继续链式调用，除了可以通过参数指定外，内部在设置值的情况下都会将其置为 true */
  chainable,
  /* 如果 jQuery 没有选中到元素的返回值 */
  emptyGet,
  /* 是否为原始数据 */
  raw,
) {
  var i = 0,
    len = elems.length,
    bulk = key == null /* 是否是批量操作，此时没有表面要设置或获取特定的属性 */

  // 如果参数 key 是对象，表示要设置多个属性，则遍历参数 key 调用 access 方法
  // Handle: $("div").attr({ title: "标题" });
  if (toType(key) === 'object') {
    chainable = true
    for (i in key) {
      // 此处递归调用时需要注意把参数 chainable 直接传递 true，因为这里已经确定了是在存储值，要避免在递归里面去执行获取值的逻辑
      access(elems, fn, i, key[i], true, emptyGet, raw)
    }

    // 到这里已经确定了 key 不是对象（但不一定有值）
    // 如果 key 不是对象且 value 有值则说明是在设置单个值
  } else if (value !== undefined) {
    chainable = true

    if (!isFunction(value)) {
      raw = true
    }

    // 批量操作针对整个集合运行
    if (bulk) {
      // 对于原始值我们将把工作函数的 this 指向选中的集合，并把设置的值传递给它
      // 调用完毕之后，同时将 fn 设置为空
      if (raw) {
        fn.call(elems, value)
        fn = null

        // 如果 value 此时是个函数，则对其进行一层包装，并将工具函数传递给它
      } else {
        bulk = fn
        fn = function(elem, _key, value) {
          return bulk.call(jQuery(elem), value)
        }
      }
    }

    // 基本上，批量操作 + value 是一个函数、非批量操作两种情况都会进入这个分支
    if (fn) {
      for (; i < len; i++) {
        fn(
          elems[i],
          key,
          /* 如果时原始值则直接将其作为值进行设置，如果是函数则将返回值作为设置的值 */
          raw
            ? value
            : value.call(
                elems[i],
                i,
                /* 将当前项和 key 传递给工具函数，通常是在获取值 */
                fn(elems[i], key),
              ),
        )
      }
    }
  }

  // 如果 chainable 为 true，说明是在设置值，此时返回 elems 实现链式调用
  if (chainable) {
    return elems
  }

  // 能走到这里说明执行的是取值操作
  // 同样对于批量操作会将集合作为 this 指向来调用工具函数，并将结果作为返回值
  if (bulk) {
    return fn.call(elems)
  }

  // 如果选中的元素是多个，那么获取值时只会通过工具函数获取第一个元素的值
  // 如果没有取到值则返回默认的空值
  return len ? fn(elems[0], key) : emptyGet
}
```

根据上面对代码的只是应该就能大概理解其工作原理，比较令人疑惑的就是在批量操作且 `value` 为一个函数时的处理：它将原来的工具函数包装为一个和非批量操作时一样的处理函数。

后面在遍历选中项时会先通过新的工具函数获取参数（此时它接受两个参数，而第二个参数在内部没有用，所以内部调用之前的函数时只是改变了 this 指向没有传递任何参数）。

通过得到的参数在此调用新的工具函数时，传递了三个参数，对应到内部原始工具函数，除了改变了 `this` 指向外，还得到了刚刚得到的参数。为什么要这么需要得到使用到的时候在做细说了。

最后再来说说我们的 `swap` 函数吧，这个函数在内部并不是用来调换位置什么的，而是通过暂存样式来做一些操作，之后再还原回去（L6424）：

```js
var swap = function(elem, options, callback) {
  var ret,
    name,
    old = {}

  // Remember the old values, and insert the new ones
  for (name in options) {
    old[name] = elem.style[name]
    elem.style[name] = options[name]
  }

  ret = callback.call(elem)

  // Revert the old values
  for (name in options) {
    elem.style[name] = old[name]
  }

  return ret
}
```

比较好理解的一个用法就是用来获取一个隐藏元素的高度（display: none），由于通过这种方式隐藏的元素是不占据位置的，所以我们无法获取它的高度，但是我们可以把它临时换成 `visible` 的方式来进行隐藏（当然还有许多细节要处理），在执行完获取高度的回调函数后再将之前的样式还原回去。

## 参考

- [JQuery - Sizzle 选择器引擎原理分析 - SegmentFault 思否](https://segmentfault.com/a/1190000003933990)
- [BOM 和 JavaScript 中的 trim | JerryQu 的小站](https://imququ.com/post/bom-and-javascript-trim.html)
