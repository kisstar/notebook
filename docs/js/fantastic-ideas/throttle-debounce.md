# 节流和防抖

节流是指定函数可以超时的最大次数，而防抖则是指定自上次执行相同函数以来再次运行该函数的最短持续时间。

## 节流

浏览器中某些计算和 DOM 处理要比其他的昂贵很多，连续尝试进行过多的 DOM 相关操作可能会导致浏览器挂起，有时候甚至会崩溃。

比如，在 `onresize` 事件处理程序内部如果尝试进行 DOM 操作，其高频率的更改可能会让浏览器崩溃。

为了绕开这个问题，可以使用定时器对该函数进行节流，其基本思想就是某些代码不可以在没有间断的情况连续重复执行。所以第一次调用函数时就设置一个定时器，只在指定时间后才能调用第二次。

```javascript
/**
 * @param method {string} 回调函数
 * @param context {object} 执行环境
 * @param delay {number} 间隔时间
 */
function throttle(method, context, delay) {
  let wait = false
  return function() {
    if (!wait) {
      method.apply(context)
      wait = true
      setTimeout(() => {
        wait = false
      }, delay)
    }
  }
}
```

## 防抖

和节流函数相似，对于触发高频事件后 N 秒内函数只会执行一次，期间重复触发则会重新计算时间。

```js
/**
 * @param method {function} 要执行的函数
 * @param context {obj} 执行环境
 */
function debounce(method, context) {
  return function() {
    clearTimeout(method.tId)
    method.tId = setTimeout(function() {
      method.call(context)
    }, 100)
  }
}
```

## 扩展阅读

- [The Difference Between Throttling and Debouncing | CSS-Tricks](https://css-tricks.com/the-difference-between-throttling-and-debouncing/)
