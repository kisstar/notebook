# 耳目一新

## 模仿数组的 filter 方法

来自 jQuery v3.5.1 （L434），奇妙之处在于同时对参数 `invert` 和回调函数取反，不仅得到了两者的布尔值，同时保证了结果的一致性，可谓一举两得。

```js
function grep(elems, callback, invert /* 是否对指定的条件取反 */) {
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
}
```
