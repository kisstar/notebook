# YDKJS-高级异步模式

现在，我们将要探索构建在已有理解和功能之上的其他高级异步模式，并了解 `asynquence` 如何让这些高级异步技术在我们的程序中更易于混用和匹配而无需分立的多个库。

## 可迭代序列

回忆一下：

```js
var domready = ASQ.iterable()
// ..
domready.val(function() {
  // DOM就绪
})
// ..
document.addEventListener('DOMContentLoaded', domready.next)
```

现在，让我们把一个多步骤序列定义为可迭代序列：

```js
var steps = ASQ.iterable()
steps
  .then(function STEP1(x) {
    return x * 2
  })
  .steps(function STEP2(x) {
    return x + 3
  })
  .steps(function STEP3(x) {
    return x * 4
  })
steps.next(8).value // 16
steps.next(16).value // 19
steps.next(19).value // 76
steps.next().done // true
```

可迭代序列的有趣之处在于它们从本质上可以看作是一个生成器或 Promise 链的替身，但其灵活性却更高。

```js
// 支持序列的 ajax
var request = ASQ.wrap(ajax)
ASQ('http://some.url.1')
  .runner(
    ASQ.iterable()
      .then(function STEP1(token) {
        var url = token.messages[0]
        return request(url)
      })
      .then(function STEP2(resp) {
        return ASQ().gate(
          request('http://some.url.2/?v=' + resp),
          request('http://some.url.3/?v=' + resp),
        )
      })
      .then(function STEP3(r1, r2) {
        return r1 + r2
      }),
  )
  .val(function(msg) {
    console.log(msg)
  })
```

## 可迭代序列扩展

生成器、普通 `asynquence` 序列以及 Promise 链都是及早求值（eagerly evaluated）——不管最初的流程控制是什么，都会执行这个固定的流程。

然而，可迭代序列是惰性求值（lazily evaluated），这意味着在可迭代序列的执行过程中，如果需要的话可以用更多的步骤扩展这个序列。

举例来说，可以查看 Ajax 请求的响应，如果它指出还需要更多的数据，就有条件地向可迭代序列中插入更多的步骤来发出更多的请求。或者你也可以有条件地在 Ajax 处理结尾处增加一个值格式化的步骤。

```js
var steps = ASQ.iterable()
  .then(function STEP1(token) {
    var url = token.messages[0].url
    // 提供了额外的格式化步骤了吗？
    if (token.messages[0].format) {
      steps.then(token.messages[0].format)
    }
    return request(url)
  })
  .then(function STEP2(resp) {
    // 向区列中添加一个Ajax请求吗？
    if (/x1/.test(resp)) {
      steps.then(function STEP5(text) {
        return request('http://some.url.4/?v=' + text)
      })
    }
    return ASQ().gate(
      request('http://some.url.2/?v=' + resp),
      request('http://some.url.3/?v=' + resp),
    )
  })
  .then(function STEP3(r1, r2) {
    return r1 + r2
  })
```

未完，待续 ......
