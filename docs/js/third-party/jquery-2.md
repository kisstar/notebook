# jQuery() 是怎么工作的

文中涉及到 jQuery 暴露的接口：

- jQuery.merge
- jQuery.makeArray
- jQuery.parseHTML
- jQuery.htmlPrefilter
- jQuery.inArray
- jQuery.contains（未作详细说明）
- jQuery.fn.remove（未作详细说明）
- jQuery.fn.attr（未作详细说明）
- jQuery.fn.find（未作详细说明）

其它私有函数：

- buildFragment
- isAttached（未作详细说明）
- getAll
- setGlobalEval（未作详细说明）

在指定 `jQuery.fn` 的原型时同时还指定了一系列的基础方法，了解这些方法之前我们需要了解一下运行 `jQuery()` 时做了什么，我们知道 jQuery 函数内实际上是调用了 `init` 函数，所以我们接下来看看这个函数中的内容（L3133）：

```js
;(function(window, noGlobal) {
  var document = window.document
  var rootjQuery

  jQuery.fn.init = function(selector, context, root) {
    // 如果没有传入选择器将会直接返回实例
    if (!selector) {
      return this
    }

    // init 方法接受一个候补的 rootjQuery 以此提供对 jQuery.sub 的支持
    // jQuery.sub 可创建一个新的 jQuery 副本，其属性和方法可以修改，而不会影响原来的 jQuery 对象，本质上类似于原型链继承
    root = root || rootjQuery

    // Handle HTML strings
    if (typeof selector === 'string') {
      // ...
    } else if (selector.nodeType) {
      // 如果参数 selector 含有属性 nodeType，则认为它是一个 DOM 元素
      // 此时设置第一个元素指向该 DOM 元素、属性 length 为 1，然后返回包含了该 DOM 元素引用的 jQuery 对象
      this[0] = selector
      this.length = 1
      return this

      // HANDLE: $(function)
      // 判断 root.ready 是否存在，存在则执行 root.ready(selector)，否则执行该方法，通常情况下 root 就是 rootjQuery
      // 从后面 rootjQuery 的赋值来看，不难发现我们通常使用的 $(function) 就是 $(document).ready(function) 的简写方式
      // 那么 $(document).ready(function) 里面究竟发生了什么？这部分将在 jQuery 的事件部分揭晓 ......
    } else if (isFunction(selector)) {
      return root.ready !== undefined
        ? root.ready(selector)
        : // Execute immediately if ready is not present
          selector(jQuery)
    }

    return jQuery.makeArray(selector, this)
  }

  rootjQuery = jQuery(document)
})
```

函数体内主要包含五个部分：没有传入选择器、传入非空字符串、传入了原生 DOM 以及传入一个函数，最后则是返回 `jQuery.makeArray` 函数处理后的结果。

代码中的注释已经解释了其中接种情况的处理方式，比较疑惑的是判断为 DOM 元素之后的处理方法，为什么这样处理呢？事实上我们通过 jQuery 获取元素时得到元素都是以索引的形式存在与实例中：

```html
<div>1</div>
<div>2</div>
<div>3</div>

<script src="jquery-3.5.1.js"></script>
<script>
  console.log($('div'))
</script>
```

使用下面的结果我们将会得到如图所示的对象结果：

<!-- 图1 -->

所以如果我们已经拿到了 DOM 元素就是直接按照这种形式写入到示例对象中，与此相关的另一种处理就是 `jQuery.makeArray` 函数（L397）：

```js
;(function(window, noGlobal) {
  jQuery.extend({
    // results is for internal usage only
    makeArray: function(arr, results) {
      var ret = results || []

      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr)
        } else {
          push.call(ret, arr)
        }
      }

      return ret
    },
  })
})
```

向外暴露的 `makeArray` 函数主要是转换一个类似数组的对象成为真正的 JavaScript 数组，通过上面的代码我们可以看到其内部又是通过 `jQuery.merge` 方法来实现的（L420）：

```js
;(function(window, noGlobal) {
  jQuery.extend({
    merge: function(first, second) {
      var len = +second.length,
        j = 0,
        i = first.length

      for (; j < len; j++) {
        first[i++] = second[j]
      }

      first.length = i

      return first
    },
  })
})
```

如你所见，这个方法的实现很简单就是遍历后者然后添加在前者中，类似于数组的 `concat` 方法。另外，在 `makeArray` 方法中使用时它的第一个参数总是一个空数组，所以执行结束后我们总可以得到一个真的数组。

回到 `makeArray` 方法，这里更多需要关注的是其在内部的用法。根据提示它的第二个参数（需包含 length 属性）应该只在内部提供，此时对于 `jQuery.makeArray(selector, this)` 来说：

- 如果 `selector` 是数组或伪数组（如 jQuery 对象、字符串），则都合并到当前 jQuery 对象中；
- 如果是其他类型的值，则作为元素放入当前 jQuery 对象中（由 `push.call(ret, arr);` 添加）。

然而，在 init 函数中字符串的参数并不会走到这里，应该在前面的一个条件分支中已经对字符串的参数进行了处理：

```js
;(function(window, noGlobal) {
  var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/

  jQuery.fn.init = function(selector, context, root) {
    // ...

    if (typeof selector === 'string') {
      if (selector[0] === '<' && selector[selector.length - 1] === '>' && selector.length >= 3) {
        // Assume that strings that start and end with <> are HTML and skip the regex check
        match = [null, selector, null]
      } else {
        match = rquickExpr.exec(selector)
      }

      // 如果是 HTML 字符串或则没有指定上下文时的 ID 选择器
      if (match && (match[1] || !context)) {
        // 如果不存在则使用 root，如果 context 是一个 jQuery 对象则使用 context
        // HANDLE: $(expr, $(...))
      } else if (!context || context.jquery) {
        return (context || root).find(selector)

        // HANDLE: $(expr, context)
      } else {
        // 这里 this.constructor 其实就是 jQuery 函数
        return this.constructor(context).find(selector)
      }
    }

    // ...
  }
})
```

进入这个分支后首先判断了 `selector` 是否是类似于 `<[\w]>` 这样的结构，这通常是要创建元素，否则的话就会进行后续的正则匹配，这个正则主要匹配以标签开头的内容（`<div>hello`）和 ID 选择器（`#id`），它们通过 `exec` 匹配结果形如：

```js
// <div>hello:  ["<div>hello", "<div>", undefined, index: 0, input: "<div>hello", groups: undefined]
// #id:         ["#id", undefined, "id", index: 0, input: "#id", groups: undefined]

// 而类似于 `<[\w]>` 的结构
// <div>:       [null, selector, null]
```

接下来检查匹配的结果，如果拥有匹配且匹配中第二项有值或者 `context` 不存在时再次进入一个分支，此时主要包括创建 HTML 或通过 ID 选择器选择元素两种情况，所以内部根据匹配结果中第二项的值再次进行了细分：

```js
// ...

if (match && (match[1] || !context)) {
  // HANDLE: $(html) -> $(array)
  if (match[1]) {
    // 确保 context 是原生的，以支持 $('<div>', document) 或 $('<div>', $(document)) 两种写法
    context = context instanceof jQuery ? context[0] : context

    // Option to run scripts is true for back-compat
    // Intentionally let the error be thrown if parseHTML is not present
    jQuery.merge(
      this,
      jQuery.parseHTML(
        match[1],
        context && context.nodeType ? context.ownerDocument || context : document,
        true,
      ),
    )

    // HANDLE: $(html, props)
    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
      for (match in context) {
        // 如果 jQuery 上存在该方法，那么将作为方法进行调用
        if (isFunction(this[match])) {
          this[match](context[match])
        } else {
          // 否则当作属性处理
          this.attr(match, context[match])
        }
      }
    }

    return this

    // HANDLE: $(#id)
  } else {
    elem = document.getElementById(match[2])

    if (elem) {
      // Inject the element directly into the jQuery object
      this[0] = elem
      this.length = 1
    }
    return this
  }

  // ...
}
```

根据上面对匹配结果的说明，如果匹配的第二项没有值就是需要通过选择器来查找元素，对于 ID 选择器我们可以直接使用原生的 `getElementById` 方法获取到 DOM 元素，然后将其放置到当前的 jQuery 对象上，最后直接返回该对象。

而另外一种情况要更复杂一点，首先我们需要确认接收到的 `context` 是原生的而非 jQuery 对象，通常来说 `context` 总是 `document`，不过也可以指定 `iframe` 中的 `document`，这几乎没什么用处，不过 jQuery 依然提供了支持。

接着调用了 `jQuery.parseHTML` 方法对 HTML 字符串进行处理，该方法接受三个参数（L10300）：

```js
;(function(window, noGlobal) {
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i
  var support = {}
  // 在 Safari 8 文档中，通过 document.implementation.createHTMLDocument 创建同级的兄弟表单：第二个将成为第一个的子级。
  // 因此这种情况下不应使用该方法，查看更多：https://bugs.webkit.org/show_bug.cgi?id=137337
  support.createHTMLDocument = (function() {
    var body = document.implementation.createHTMLDocument('').body
    body.innerHTML = '<form></form><form></form>'
    return body.childNodes.length === 2
  })()

  // 第一个参数应该是一个 HTML 字符串
  // 第二个参数默认是 document，将在此上下文中创建片段
  // 第三个参数决定了 HTML 字符串中的 script 标签中的内容是否被执行
  jQuery.parseHTML = function(data, context, keepScripts) {
    if (typeof data !== 'string') {
      return []
    }
    if (typeof context === 'boolean') {
      keepScripts = context
      context = false
    }

    var base, parsed, scripts

    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument('')

        // 根据当前文档地址创建了一个 base 元素，以便让包含 URL 的新建元素的地址得到正确解析 (gh-2965)
        base = context.createElement('base')
        base.href = document.location.href
        context.head.appendChild(base)
      } else {
        context = document
      }
    }

    parsed = rsingleTag.exec(data)
    scripts = !keepScripts && []

    // 单标签，包括： <div> | <div /> | <div></div>
    if (parsed) {
      return [context.createElement(parsed[1])]
    }

    parsed = buildFragment([data], context, scripts)

    // 如果第三个参数是 false，那么这里的 scripts 就是一个数组，传递到 buildFragment 中会把所有的 script 标签放在里面
    // 因此在这里我们通过这个数组移除其中的所有脚本元素
    if (scripts && scripts.length) {
      jQuery(scripts).remove()
    }

    return jQuery.merge([], parsed.childNodes)
  }
})
```

在内部处理参数时，如果没有指定上下文就会根据兼容性来确定。如果对 `document.implementation.createHTMLDocument` 支持良好就会使用通过其创建的文档，否则直接使用当前文档。

接着我们使用正则判断当前需要创建的元素是否是一个单标签，如果是的话我们就是用 `createElement` 进行创建，然后将结果放在数组中返回。如果不是呢？我们将调用 `buildFragment` 函数进行处理（L5002）：

```js
;(function(window, noGlobal) {
  var rhtml = /<|&#?\w+;/
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i

  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
      tmp,
      tag,
      wrap,
      attached,
      j,
      fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length

    for (; i < l; i++) {
      elem = elems[i]

      if (elem || elem === 0) {
        if (toType(elem) === 'object') {
          // 对于 DOM 元素（根据 nodeType 判断），直接放入 nodes 数组中
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem)

          // 对于不是 HTML 标签的字符串，创建文本节点对象（textNode），放入 nodes 数组中
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem))

          // 将 HTML 字符串转成 DOM 元素，放入 nodes 数组中
        } else {
          // q: 为什么要创建一个 div 元素充当容器？
          tmp = tmp || fragment.appendChild(context.createElement('div'))

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ['', ''])[1].toLowerCase()
          wrap = wrapMap[tag] || wrapMap._default
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2]

          // 获取我们真正需要创建的内容
          j = wrap[0]
          while (j--) {
            tmp = tmp.lastChild
          }

          // 将结果放入 nodes 数组中
          jQuery.merge(nodes, tmp.childNodes)

          // 目前，从 HTML 字符串创建的元素有一个 parentNode 属性，而事实上它应该是孤立的
          // 所以，我们移除文档片段中的内容以确保创建的节点是孤立的 (#12392)
          tmp = fragment.firstChild
          tmp.textContent = ''
        }
      }
    }

    // Remove wrapper from fragment
    fragment.textContent = ''

    i = 0
    while ((elem = nodes[i++])) {
      // 跳过上下文集合中已有的元素 (trac-4087)，并将其放置到 ignored 数组中
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem)
        }
        continue
      }

      attached = isAttached(elem)

      // Append to fragment
      tmp = getAll(fragment.appendChild(elem), 'script')

      // Preserve script evaluation history
      if (attached) {
        setGlobalEval(tmp)
      }

      // Capture executables
      if (scripts) {
        j = 0
        while ((elem = tmp[j++])) {
          // q: ???
          if (rscriptType.test(elem.type || '')) {
            scripts.push(elem)
          }
        }
      }
    }

    return fragment
  }
})
```

进入 `buildFragment` 函数内部，根据传递进来的每一项的内容分成三种情况进行处理，其中对于第三种（HTML 字符串）的处理相对比较复杂。首先我们通过正则拿到了将要创建的元素标签。

接着由于在 DIV 元素下创建表格元素将会被忽略，因此我们对于表格相关的元素需要手动拼接上正确的结构，为此我们创建了一个 `wrapMap` 对象，里面记录了需要处理的元素和其应该具备的结构：

```js
;(function(window, noGlobal) {
  // 对于文档中缺少的部分，HTML 可以自动补充，但 XHTML 不会，为此我们必须正确的关闭下列标签以支持 XHTML (#13200)
  var wrapMap = {
    thead: [1, '<table>', '</table>'],
    col: [2, '<table><colgroup>', '</colgroup></table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],

    _default: [0, '', ''],
  }
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead
  wrapMap.th = wrapMap.td
  // Support: IE <=9 only
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", '</select>']
  }
})
```

在拼接的过程中我们还使用了 `htmlPrefilter` 方法对标签作进一步处理，不过就目前而言它什么也没做（L6161）：

```js
;(function(window, noGlobal) {
  jQuery.extend({
    htmlPrefilter: function(html) {
      return html
    },
  })
})
```

如此一来，拼接的结果相对于我们真正需要的内容增加了一些额外的结构，如何拿到我们最初需要的内容呢？这里 jQuery 非常巧妙的在 `wrapMap` 的值中记录了元素所在的层次，所以通过紧接着的 `while` 循环就能顺利得到我们想要的。

那么上面为什么要先创建一个 DIV 元素呢？因为我们为了接住了 `innerHTML` 属性让 HTML 字符串变为真的元素，而空白文档并不具备。

现在我们已经将创建好的元素放置到了一个数组中，再接下来的处理中我们跳过了已存在于上下文中的元素，通过 `jQuery.inArray` 方法（L414）：

```js
;(function(window, noGlobal) {
  jQuery.exend({
    inArray: function(elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i)
    },
  })
})
```

然后判断元素是否是游离状态，根据 `isAttached` 函数：

```js
;(function(window, noGlobal) {
  var isAttached = function(elem) {
    // 检测一个元素是否包含另一个元素。不支持文档、文本和注释节点。
    return jQuery.contains(elem.ownerDocument, elem)
  }
})
```

此函数内部直接调用了 `jQuery.contains` 方法，而该方法实际上就是 Sizzle 上的 `contains` 方法，对 Sizzle 的部分这里我们先不做展开，需要知道的就是这里如果元素还在文档中，那么将会返回 `true`。

接着我们将元素添加到空白文档片段中，同时将元素交给了 `getAll` 函数以获取其中的脚本元素（L4961）：

```js
;(function(window, noGlobal) {
  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
  }

  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (#15151)
    var ret

    if (typeof context.getElementsByTagName !== 'undefined') {
      ret = context.getElementsByTagName(tag || '*')
    } else if (typeof context.querySelectorAll !== 'undefined') {
      ret = context.querySelectorAll(tag || '*')
    } else {
      ret = []
    }

    // q: ???
    if (tag === undefined || (tag && nodeName(context, tag))) {
      return jQuery.merge([context], ret)
    }

    return ret
  }
})
```

~~然后将根据上面 `isAttached` 函数的判断，在非游离状态说明将调用 `setGlobalEval` 函数（其内主要涉及数据的存储部分，在此不做扩展）将相应的脚本元素设置为已经执行过了。~~

而且，如果第三个参数存在就继续将脚本元素添加到这个对象中，最后返回整个文档片段。

是时候回到 `jQuery.parseHTML` 方法了，当我们 `keepScripts` 为假时我们需要移除文档片段中的脚本元素，而这里脚本元素已经在 `buildFragment` 函数中添加到 `scripts` 元素中了，具体的移除途径涉及到了数据存储模块，所以这里不进行展开，可以简单的理解为使用的是 `Node.removeChild` 方法。

最后我们返回了 `jQuery.merge` 方法对文档片段中节点集合处理后得到一个节点数组。

再进一步，我们回到 `init` 方法中，现在我们拿到了 `jQuery.parseHTML` 方法处理后的结果，接着再交给 `jQuery.merge` 方法进行处理，现在其中的元素都会被放置到当前的 jQuery 对象上。

事实上到目前为止，在这个分支中对元素的创建部分已经完成了，不过针对于单标签的情况，jQuery 还支持在创建时同时指定一些属性（也不完全是）：

```js
$('<li></li>', {
  title: 'Hello', // 设置属性
  html: 'World', // jQuery 对象存在该方法会当作方法进行调用
})
```

设置属性时使用到了 `jQuery.attr` 方法，其中涉及内容这里先不进行展开，目前可以简单的理解为 `Element.setAttribute()` 方法。

胜利在望了，让我们再回一层到选择器为字符串时的剩余两种情况，这里主要对上下文做了判断，到最后其实两者都会变成调用 jQuery 对象的 `find` 方法。

```js
$('ul').find('li') // jQuery(document).find('li');
$('ul', $(document)).find('li') // jQuery(document).find('li');
$('ul', document).find('li') //jQuery(document).find('li');
```

由于 `find` 方法又涉及到了 Sizzle 部分，所以这里就不进行展开了，目前我们可以简单的认为它的行为和 `$.makeArray(document.querySelectorAll(selector), $())` 类似。

好吧，到此终于算告一个段落了。

## 附录

- DOMImplementation 对象提供了不依赖于任何 `document` 的方法，通过它执行的操作独立于文档对象模型的任何特定实例。
- `Node.ownerDocument` 只读属性会返回当前节点的顶层的 `document` 对象，如果在文档节点自身上使用此属性则结果是 `null`。
- `Node.compareDocumentPosition()` 可以比较当前节点与任意文档中的另一个节点的位置关系。
- `Node.contains()` 返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点（对自身也会返回 true）。
