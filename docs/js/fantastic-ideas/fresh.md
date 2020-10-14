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

## 按需添加配置

来自 [react scripts][react_scripts]，在数组中想要根据条件增加一些项时，可以结合 `[].fileter()` 方法来让代码更简洁：

```js
var addPlugin1 = true,
  addPlugin2 = false
var plugin1 = {},
  plugin2 = {}

var config = {
  plugins: [addPlugin1 && pugin1, addPlugin2 && pugin2].filter(Boolean),
}
```

## 求和函数

```js
function sum(...args) {
  return eval(args.join('+')) // 此操作别开生面，但注意 eval 并不被推荐，下面是更常规的做法
  // return args.reduce((total, cur) => total + cur, 0)
}
```

[react_scripts]: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js#L592
