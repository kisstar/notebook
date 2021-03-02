# 解析 URL

**例题**：编写一个 `queryURLParameter()` 函数，实现把一个 URL 地址问号传参部分的信息获取到，并且解析成对象键值对的形式。

```js
const url = 'https://www.baidu.com/s?wd=javascript&rsv_spt=1'
```

解析后的结果：

```js
const result = { wd: 'javascript', rev_spt: 1 }
```

方案一：利用字符串方法，把地址进行拆分，最后获取需要的信息。

```js
function queryURLParameter(url) {
  let result = {},
    tmp,
    index
  if (~(index = url.indexOf('?'))) {
    url
      .slice(index + 1)
      .split('&')
      .forEach(item => {
        tmp = item.split('=')
        result[tmp[0]] = tmp[1]
      })
  }
  return result
}
```

方案二：利用正则进行解析，提取所需要的信息。

```js
function queryURLParameter(url) {
  let result = {},
    rMap = /([^?&=]+)=([^?&=]+)/g
  if (~url.indexOf('?')) {
    url.replace(rMap, function(_, key, value) {
      result[key] = value
    })
  }
  return result
}
```

**例题**：在输入框中如何判断输入的是一个正确的网址？

```js
const url = 'https://www.baidu.com:8080/s?wd=javascript&rsv_spt=1#hash=test'
```

可参考 <https://github.com/any86/any-rule>。

```js
const rRUL = /^(?:((?:ht|f)tps)?:\/\/)?((?:\w+\.)+\w+)(?:\:(\d{1,5}))?(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i

console.log(rRUL.exec(url))
```
