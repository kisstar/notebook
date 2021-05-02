# 数组扁平化

将多维数组扁平化，原生的 `flat` 最方便：

```js
function flat(arr) {
  return arr.flat(Infinity)
}
```

其它方案：

```js
function flat(arr) {
  return arr
    .toString()
    .split(',')
    .map(Number)
}
```

```js
function flat(arr) {
  return JSON.stringify(arr)
    .replace(/[\[\]]/g, '')
    .split(',')
    .map(Number)
}
```

```js
function flat(arr) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr)
  }
  return arr
}
```

```js
function flat(arr) {
  let result = [],
    item

  ;(function _flat(arr) {
    for (var i = 0; i < arr.length; i++) {
      item = arr[i]
      if (Array.isArray(item)) {
        _flat(item)
      } else {
        result.push(item)
      }
    }
  })(arr)

  return result
}
```

```js
function flat(arr) {
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      prev.push(...flat(cur))
    } else {
      prev.push(cur)
    }

    return prev
  }, [])
}
```
