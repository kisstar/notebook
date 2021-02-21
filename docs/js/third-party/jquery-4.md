# jQuery 中的 DOM 操作

文中涉及到 jQuery 暴露的接口：

- jQuery.fn.find
- jQuery.find（模拟核心功能）
- jQuery.fn.filter
- jQuery.fn.not
- jQuery.filter
- jQuery.contains
- jQuery.uniqueSort（未作详细说明）
- jQuery.unique
- jQuery.fn.is
- jQuery.fn.has
- jQuery.fn.closest
- jQuery.fn.index
- jQuery.parent
- jQuery.parents
- jQuery.parentsUntil
- jQuery.next
- jQuery.prev
- jQuery.nextAll
- jQuery.prevAll
- jQuery.nextUntil
- jQuery.prevUntil
- jQuery.siblings
- jQuery.children
- jQuery.contents

其它私有函数：

- contains
- winnow
- dir
- sibling
- siblings

前面我们在理解 `jQuery()` 函数是如何工作时遇到了 Sizzle 模块，并对相关的函数进行了模拟，不过相对来说有些简陋，接下里我们再具体一点，当然依旧是模拟其核心功能。

在 `jQuery()` 函数 中，有用到一个原型上的 `find` 方法来选择元素，接下来我们看看它是怎么工作的（L3077）：

```js
jQuery.fn.extend({
  find: function(selector) {
    var i,
      ret,
      len = this.length,
      self = this

    if (typeof selector !== 'string') {
      return this.pushStack(
        // 可处理单个 element 元素、jQuery 对象、类数组等情况
        jQuery(selector).filter(function() {
          for (i = 0; i < len; i++) {
            // 如果 jQuery(selector) 中的某一项被 self 中的某一项所包含的话，将会出现在结果中
            if (jQuery.contains(self[i], this)) {
              return true
            }
          }
        }),
      )
    }

    // 栈内，在当前 jQuery 对象上创建一个新的 jQuery 对象
    ret = this.pushStack([])

    for (i = 0; i < len; i++) {
      // 遍历元素集合在每一项下查找与选择器匹配的元素，并将结果放置到 ret 对象中
      jQuery.find(selector, self[i], ret)
    }

    // 如果结果中的数量大于 1 就进行排序并移除重复的 DOM 元素
    return len > 1 ? jQuery.uniqueSort(ret) : ret
  },
})
```

可以看到它的内部主要是组织其它方法来完成工作，除了前面介绍过的 `pushStack` 方法，其它几个方法都比较陌生，首先是原型上的 `filter` 方法，用来对选中的元素进行过滤（L3100）：

```js
jQuery.fn.extend({
  filter: function(selector) {
    return this.pushStack(winnow(this, selector || [], false))
  },
})
```

这里引出了一个新的私有函数 `winnow`，事实上它也是原型上 `not` 方法的核心，区别只在于传递的第二个参数（L3103）：

```js
jQuery.fn.extend({
  not: function(selector) {
    return this.pushStack(winnow(this, selector || [], true))
  },
})
```

接下里看看它是如何工作的（L3035）：

```js
var arr = []
var indexOf = arr.indexOf

function winnow(elements, qualifier, not) {
  if (isFunction(qualifier)) {
    return jQuery.grep(elements, function(elem, i) {
      // 通过 !! 将函数执行结果转为布尔值，再与 not 进行比较决定是否取反（如果 not 为 false 则取反）
      return !!qualifier.call(elem, i, elem) !== not
    })
  }

  // 处理 qualifier 是单个元素的情况
  // Handle: $("div").filter(document.getElementById("box"))
  if (qualifier.nodeType) {
    return jQuery.grep(elements, function(elem) {
      return (elem === qualifier) !== not
    })
  }

  // 如果 qualifier 是个数组，则返回包含在其中的元素
  // Arraylike of elements (jQuery, arguments, Array)
  if (typeof qualifier !== 'string') {
    return jQuery.grep(elements, function(elem) {
      return indexOf.call(qualifier, elem) > -1 !== not
    })
  }

  // 处理 CSS 选择器
  return jQuery.filter(qualifier, elements, not)
}
```

逻辑看起来很清晰，整体主要分为 4 个部分，每个部分都会根据最后一个参数来决定是否取反，所以 `filter` 和 `not` 方法的区别在这里一目了然。

最后在处理 CSS 选择器选择器的时候还用到了静态方法 `jQuery.filter()`，接下来看看它是怎么处理的（L3060）：

```js
jQuery.filter = function(expr, elems, not) {
  var elem = elems[0]

  // CSS 选择器的取反操作我们可以直接通过 :not 选择器来实现
  if (not) {
    expr = ':not(' + expr + ')'
  }

  if (elems.length === 1 && elem.nodeType === 1) {
    return jQuery.find.matchesSelector(elem, expr) ? [elem] : []
  }

  return jQuery.find.matches(
    expr,
    /* 仅对 element 元素进行处理 */
    jQuery.grep(elems, function(elem) {
      return elem.nodeType === 1
    }),
  )
}
```

其中主要使用了 Sizzle 上的 `matchesSelector` 和 `matches` 方法，它们的功能很类似，前者用于判断给定元素是否与选择器匹配，而后者则是获取给定数组中与给定选择器匹配的元素。

事实上，已经存在的 `Element.matches()` 就可以完成上面的基本功能，所以我们这里对这两个方面进行简单的模拟。前面我们已经对 `jQuery.find()` 进行简单模拟，这里一并改进以下：

```js
function Sizzle(
  selector,
  context,
  results,
  /*
    为假则尝试在 HTML 文档中使用快捷方式查找操作（如：getElementById, getElementsByTagName, getElementsByClassName）
    通常都会走向这个逻辑，所以这里我们直接使用 querySelectorAll 方法来模拟
  */
  seed,
) {
  context = context || document
  results = results || []
  var all = jQuery.makeArray(context.querySelectorAll(selector))
  results.push(...all)
  return results
}

// 数组中与给定选择器匹配的元素
Sizzle.matches = function(expr /* CSS 选择器 */, elements /* DOMElement[] */) {
  var self = this
  return jQuery.map(elements, function() {
    if (self.matchesSelector(this, expr)) {
      return item
    }
  })
}

// 判断给定元素是否与选择器匹配
Sizzle.matchesSelector = function(elem /* DOMElement */, expr /* CSS 选择器 */) {
  return elem.matches(expr)
}

jQuery.find = Sizzle
```

接下来就是 `contains` 方法了，它主要用于判断一个 DOM 元素是否是另一个 DOM 元素的后代（此方法已被标记为 Deprecated，所以下面仅展示其核心原理）。

类似的功能在原生中已经提供了 `Node.contains()` 方法和 `Node.compareDocumentPosition()` 方法，所以在 jQuery 内部也会优先使用原生方法进行处理：

```js
var docElem = document.documentElement,
  rnative = /^[^{]+\{\s*\[native \w/,
  hasCompare = rnative.test(docElem.compareDocumentPosition),
  // 判断 a 是否包含 b，并返回一个布尔值
  contains =
    // 判断是否支持原生方法，如果是则优先采用
    hasCompare || rnative.test(docElem.contains)
      ? function(a, b) {
          var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode // 不包含自身
          return (
            a === bup ||
            !!(
              bup &&
              /* 只支持 element 节点 */
              bup.nodeType === 1 &&
              (adown.contains
                ? adown.contains(bup)
                : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16)
            )
          )
        }
      : function(a, b) {
          if (b) {
            while ((b = b.parentNode)) {
              if (b === a) {
                return true
              }
            }
          }
          return false
        }
```

内部的处理其实并不复杂，主要是需要对 `Node.contains()` 方法和 `Node.compareDocumentPosition()` 方法有所了解，可查看文末参考链接查看更多信息。

最后一个方法也是 jQuery 的一个静态方法 `jQuery.uniqueSort()`，它将对 DOM 元素数组进行排序，删除重复的元素（L2983）。此方内部内部其实使用的是 Sizzle 模块上的方法：

```js
// Deprecated
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort
```

加上现在已不被推荐，所以这里我们便不展开说明了。

接下来步入正轨，开始了解更多相关的 DOM 操作方法。与前面 `winnow` 相关的方法还有 `is`，它负责查看选择的元素是否匹配选择器，并返回一个布尔值（L3106）：

```js
// 匹配一些与位置和相对关系的选择器
var whitespace = '[\\x20\\t\\r\\n\\f]',
  rneedsContext = new RegExp(
    '^' +
      whitespace +
      '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
      whitespace +
      '*((?:-\\d)?\\d*)' +
      whitespace +
      '*\\)|)(?=[^-]|$)',
    'i',
  )

jQuery.fn.extend({
  is: function(selector) {
    return !!winnow(
      this,

      // 当选择器被 rneedsContext 所匹配那么就会向 winnow 传入一个由 selector 产生的 jQuery 对象
      // 如果不这么做可能会出现误判，比如当文档中仅存在两个 p 元素时 $("p:first").is("p:last") 将会返回 true
      typeof selector === 'string' && rneedsContext.test(selector)
        ? jQuery(selector)
        : selector || [],
      false,
    ).length
  },
})
```

可见其内部仅仅是根据 `winnow` 的返回的集合中的元素个数来返回一个布尔值，唯一需要说明的就是像 `:first`、`:last` 这样的位置和关系选择器（非标准，在 Sizzle 模块中实现的）在传递时要增加一层处理，否则会出现误判。

接着是 `jQuery.fn.has()` 方法，该方法返回拥有匹配指定选择器的一个或多个元素在其内的所有元素（L3250）：

```js
jQuery.fn.extend({
  has: function(target) {
    var targets = jQuery(target, this), // this.find(target)
      l = targets.length

    // 此处 filter 加上 for 两层循环，判断如果上面通过 targe 选择中任何一项被 this 中的任何一项所包含的话则会出现在结果集中
    return this.filter(function() {
      var i = 0
      for (; i < l; i++) {
        if (jQuery.contains(this, targets[i])) {
          return true
        }
      }
    })
  },
})
```

再然后是 `jQuery.fn.closest()` 方法，该方法从当前元素（也就是说包括自身）向上遍历，直至文档根元素的所有路径，来查找与所传递的表达式相匹配的第一个单一祖先（L3264）：

```js
jQuery.fn.extend({
  closest: function(selectors, context) {
    var cur,
      i = 0,
      l = this.length, // 当前选中元素的个数
      matched = [], // 最终匹配的元素
      targets = typeof selectors !== 'string' && jQuery(selectors)

    // Positional selectors never match, since there's no _selection_ context
    if (!rneedsContext.test(selectors)) {
      // 遍历当前选中元素
      for (; i < l; i++) {
        // 从每个当前选中的元素开始，判断其是否被指定的表达式所匹配，并通过 .parentNode 属性遍历祖先
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          // Always skip document fragments（文档片段的 nodeType 等于 11）
          if (
            cur.nodeType < 11 &&
            (targets
              ? targets.index(cur) > -1
              : // Don't pass non-elements to Sizzle
                cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))
          ) {
            matched.push(cur)
            break
          }
        }
      }
    }

    // 如果最后的结果数量大于 1 则需要进行去重，就像下面这种情况：
    /*
    <ul>
      <li></li>
      <li></li>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </ul>

    console.log($("li").closest("ul").length);
    */
    return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
  },
})
```

主要逻辑就是通过 `.parentNode` 属性遍历祖先，获取其中包含在指定的表达式、元素或 jQuery 对象中的第一个元素，这里的 `context` 则是指定了搜索祖先元素的范围，它必须是一个 DOM 元素。

接下来的 `jQuery.fn.index()` 方法中的 `jQuery.fn.prevAll()` 方法尚未介绍到，现在先来看看下面这两个方法（L3315）：

```js
jQuery.fn.extend({
  add: function(selector, context) {
    return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))))
  },

  addBack: function(selector) {
    return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector))
  },
})
```

这两个方法主要和之前介绍的与栈相关的方法相关联，前者将当前集合中的元素和新选中的元素组成新的结合放置到栈顶，而后者则是默认将下一层的元素与将当前集合中的元素组成新的结合放置到栈顶。

在后面的这个 DOM 操作方法就比较常见了（L3335）：

```js
var rparentsprev = /^(?:parents|prev(?:Until|All))/,
  // Methods guaranteed to produce a unique set when starting from a unique set
  guaranteedUnique = {
    children: true,
    contents: true,
    next: true,
    prev: true,
  }

jQuery.each(
  {
    parent: function(elem) {
      var parent = elem.parentNode
      return parent && parent.nodeType !== 11 ? parent : null
    },
    parents: function(elem) {
      return dir(elem, 'parentNode')
    },
    parentsUntil: function(elem, _i, until) {
      return dir(elem, 'parentNode', until)
    },
    next: function(elem) {
      return sibling(elem, 'nextSibling')
    },
    prev: function(elem) {
      return sibling(elem, 'previousSibling')
    },
    nextAll: function(elem) {
      return dir(elem, 'nextSibling')
    },
    prevAll: function(elem) {
      return dir(elem, 'previousSibling')
    },
    nextUntil: function(elem, _i, until) {
      return dir(elem, 'nextSibling', until)
    },
    prevUntil: function(elem, _i, until) {
      return dir(elem, 'previousSibling', until)
    },
    siblings: function(elem) {
      return siblings((elem.parentNode || {}).firstChild, elem)
    },
    children: function(elem) {
      return siblings(elem.firstChild)
    },
    contents: function(elem) {
      if (
        elem.contentDocument != null &&
        // Support: IE 11+
        // <object> elements with no `data` attribute has an object
        // `contentDocument` with a `null` prototype.
        getProto(elem.contentDocument)
      ) {
        return elem.contentDocument
      }

      // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.
      if (nodeName(elem, 'template')) {
        elem = elem.content || elem
      }

      return jQuery.merge([], elem.childNodes)
    },
  },
  function(name, fn) {
    jQuery.fn[name] = function(until, selector) {
      var matched = jQuery.map(this, fn, until /* 作为 fn 的第三个参数 */)

      // 模拟函数重载，取得正确的选择器
      if (name.slice(-5) !== 'Until') {
        selector = until
      }

      // 通过选择器对前面获取到的匹配结果进行过滤
      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched)
      }

      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched)
        }

        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          matched.reverse()
        }
      }

      return this.pushStack(matched)
    }
  },
)
```

可见它们中大部分使用到了 `dir()` 和 `sibling()` 两个工具函数，所以我们先对这两个函数进行分析，首先是 `dir()` 函数（L2992）：

```js
var dir = function(
  elem /* DOM 元素 */,
  dir /* 元素的属性 */,
  until /* 终止的条件，在其内查找匹配的 DOM 元素 */,
) {
  var matched = [],
    truncate = until !== undefined

  while ((elem = elem[dir]) && elem.nodeType !== 9) {
    if (elem.nodeType === 1) {
      if (truncate && jQuery(elem).is(until)) {
        break
      }
      matched.push(elem)
    }
  }
  return matched
}
```

函数内会根据给定的属性从当前元素开始开始循环获取元素，如果指定了终止条件，在达到终止条件时并退出循环。

```js
// Gecko 内核的浏览器会在源代码中标签内部有空白符的地方插入一个文本结点到文档中
// 因此，使用诸如 Node.firstChild 和 Node.previousSibling 之类的方法可能会引用到一个空白符文本节点，而不是使用者所预期得到的节点
// 这里使用 nodeType 来保证得到的是一个元素节点
function sibling(cur, dir) {
  while ((cur = cur[dir]) && cur.nodeType !== 1) {}
  return cur
}
```

可以看到 `sibling()` 函数在获得一个结果后并会直接退出循环，所以得到的总是单个的值。与此相对应的另一个函数是 `siblings()`（L3008）：

```js
var siblings = function(n, elem) {
  var matched = []

  for (; n; n = n.nextSibling) {
    if (n.nodeType === 1 && n !== elem) {
      matched.push(n)
    }
  }

  return matched
}
```

它类似与上面的 `dir()` 函数，不过它的属性参数固定为 `nextSibling`，而且接受的终止条件必须是一个 DOM 元素。

`siblings()` 函数正是上面 `jQuery.siblings()` 方法和 `jQuery.children()` 方法的核心，区别在于传递的参数。首先前者接受了两个参数，第一个参数决定选取的是兄弟元素（后者则是子元素），而第二个参数也就决定了结果中是不包括自身的。

与 `jQuery.children()` 方法相对应的则是后面的 `jQuery.contents()` 方法，前者结果中只包括元素，而后者结果中包含其子级的所有内容（文本、注释等）。

最后，再回到我们之前提到的 `jQuery.fn.index()` 方法，它从匹配的元素中搜索给定元素的索引值（L3295）：

```js
jQuery.fn.extend({
  index: function(elem) {
    if (!elem) {
      // 默认返回和兄弟元素构成的集合中的索引
      return this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }

    // 如果接受到的参数是一个字符串，那么将会从这个字符串产生的对象中查找元素
    if (typeof elem === 'string') {
      return indexOf.call(jQuery(elem), this[0])
    }

    // 否则将查找指定对象在当前选中集合中的索引
    return indexOf.call(
      this,

      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem,
    )
  },
})
```

## 参考

- [Node.compareDocumentPosition - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)
- [Node.contains - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)
- [jQuery 技术内幕：深入解析 jQuery 架构设计与实现原理. 3.10 　工具方法-阿里云开发者社区](https://developer.aliyun.com/article/81695)
