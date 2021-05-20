# 交换数组中的两项

```js
/**
 * @file 交换数组中的两项
 *
 * example:
 *  var arr = [1, 2, 3, 4, 5];
 *  swap(arr, 2, 3);
 * expect:
 *  console.log(arr); // [1, 2, 4, 3, 5]
 */

// 方法一
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]

  return arr
}

// 方法二
function swap(arr, i, j) {
  var tmp = arr[i]

  arr[i] = arr[j]
  arr[j] = tmp

  return arr
}

// 方法三
function swap(arr, i, j) {
  arr.splice(j, 1, ...arr.splice(i, 1, arr[j]))

  return arr
}
```
