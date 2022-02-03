# Chrome DevTools Snippets

谷歌浏览器提供了一个 Snippets 功能，可以让您运行、编辑和保存 JavaScript 代码段。下面是收集的一些常用案例，它们可以在任何浏览器控制台中使用。

<img :src="$withBase('/images/chrome/devtools/snippets.png')" alt="snippets">

## 自动加载 jQuery

```js
;(function() {
  if (!window.jQuery) {
    var dollarUsed =
      !!window.$ && !/\[native code\]/.test(Function.prototype.toString.call(window.$))
    var s = document.createElement('script')

    s.setAttribute('src', 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js')
    s.addEventListener('load', function() {
      console.info(
        'jQuery enabled! The version number used in the current period is v' +
          jQuery().jquery +
          '.',
      )

      if (dollarUsed) {
        jQuery.noConflict()
        console.warn('`$` already in use; use `jQuery`')
      }
    })

    document.body.appendChild(s)
  } else {
    console.info(
      'jQuery enabled! The version number used in the current period is v' + jQuery().jquery + '.',
    )
  }
})()
```

## 获取自定链接上的 Query 参数

```js
;(function() {
  var sources = window.__qs ? new URL(window.__qs) : location
  // normal route
  var url = sources
  var querystring = sources.search.slice(1)
  var tab = getTab(querystring)
  // hash route
  var hash = sources.hash
  var hashQuerystring = hash.split('?')[1]
  var hashTab = getTab(hashQuerystring)

  console.group('Querystring Values')
  console.log('URL: ' + url + '\nQS:  ' + (querystring || '--'))
  tab && console.table(tab)
  console.log('') // separate rows
  console.log('HASH: ' + (hash || '--') + '\nQS:  ' + (hashQuerystring || '--'))
  hashTab && console.table(hashTab)
  console.groupEnd('Querystring Values')

  function getTab(querystring) {
    if (!querystring) {
      return
    }

    return querystring.split('&').map(function(qs) {
      return {
        Key: qs.split('=')[0],
        Value: qs.split('=')[1],
        'Pretty Value': decodeURIComponent(qs.split('=')[1]),
      }
    })
  }
})()
```

## 参考

- [DevTools Snippets](https://bgrins.github.io/devtools-snippets/)
