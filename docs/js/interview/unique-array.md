# 数组去重

去除给定数组中的重复数据。

## Example_0

```javascript
// input: [0, 4, 3, 4, 5, 0, 8, 8]
// output: [0, 4, 3, 5, 8]
```

- **基础的 FOR 循环**

```javascript
function unique(arr) {
  var arrLen = arr.length,
    result = [],
    resLen = 0,
    i = 0,
    j = 0

  for (; i < arrLen; i++) {
    for (j = 0, resLen = result.length; j < resLen; j++) {
      if (arr[i] === result[j]) {
        break
      }
    }
    if (j === resLen) {
      result.push(arr[i])
    }
  }
  return result
}
```

- **借助对象**

```javascript
// ES6
function unique(arr) {
  const obj = {},
    len = arr.length
  let i = 0

  for (; i < len; i++) {
    obj[arr[i]] = arr[i]
  }

  return Object.values(obj)
}

// ES5
function unique(arr) {
  let obj = {}
  let i = arr.length,
    item = 0

  // 采用正向遍历时注意数组塌陷
  // 也可以使用 reduceRight 来完成同样的工作，但同时需要注意传入初始值来保证第一项参与比较
  for (; i >= 0; i--) {
    item = arr[i]
    if (obj.hasOwnProperty(item)) {
      // arr.splice(i, 1)
      // 上面的操作（删除当前项）会导致后续元素在内存中的地址都要向前移动
      // 一种优化方案时将当前项替换末尾项，然后删除末尾项
      // 将会改变数组的顺序
      arr[i] = arr[arr.length - 1]
      arr.pop()
      continue
    }
    obj[item] = true
  }

  obj = null // 释放内存

  return arr
}
```

- **ES6 Set**

```javascript
function unique(arr) {
  return [...new Set(arr)]
}
```
