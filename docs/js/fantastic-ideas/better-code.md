# 代码优化

罗列一些日常使用和遇到的一些好的 Case。

## 循环

循环可以将代码块执行指定的次数，此过程中很可能出现一些重复的工作，如果可以应该尽可能的避免。

### 尽早的退出循环

对于一些超大循环往往会占用很长的时间，你可以用 `break` 关键字和 `continue` 关键字来该尽早退出这些循环，从而编写更高效的代码。

```js
const arr = new Array(1000000).fill(0)
arr[999] = 'found'

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 'found') {
    // do something
    break
  }
}
```

在上面的示例中，如果你没有使用 `break` 从循环中退出，则你的代码将循环运行一百万次，而显然从数组 `1000` 项开始所有的遍历都是毫无意义的。

再看下面的例子，循环将会执行百万次，但是通过 `continue` 关键字，我们仅在数组元素处于偶数位置时处理它，这样的好处是我们不仅避免了一些无意义代码的执行，还让代码逻辑更加清晰。

```js
const arr = new Array(1000000).fill(0)
arr[999] = 'found'

for (let i = 0; i < arr.length; i++) {
  if (i % 2 != 0) {
    continue
  }
  // very complicated calculations ...
}
```

### 减少重复的计算

在一些循环中，可能会出现很多重复的计算，而且它们的结果总是一致的，那么就需要考虑提取这部分的逻辑以提高性能。

```js
const arr = new Array(1000000).fill(0)
const len = arr.length

for (let i = 0; i < len; i++) {
  // do something
}
```

在上面的示例中，我们提取了获取数组长度的逻辑，这在很多情况下都是可用的（如果循环期间没有改变其长度），特别是在遍历一个 DOM 的时候。

## 变量

变量是用于存储信息的"容器"。

### 减少变量查找次数

在 JavaScript 中，当你访问一个变量时会从作用域链的前端开始沿着作用域链一级一级地搜索，直至找到标识符或到达全局作用域为止。

比如，当你在一个函数函数中多次访问一个全局对象时，它可能会多次重复这样的工作。此时，不妨将该全局变量的只直接定义在局部中，这可能更好。

```js
window.config = {}

function doSome() {
  const { config } = window

  // use `config` instead `window.config`
}
```

### 最小化变量计算的次数

在下面的示例中，每次执行 `getTyep` 函数时，变量 `minList` 和 `maxList` 都会导致不必要的内存重分配。如果这两个数组很大的话，就会导致占用过多的空间。

```js
function getTyep(num) {
  const minList = [1, 2, 3]
  const maxList = [4, 5, 6]

  return minList.includes(num) ? 'Min' : maxList.includes(num) ? 'Max' : 'uknow'
}
```

借助闭包可以让内部函数有权访问外部作用域的变量，即使在返回外部函数之后也是如此。如此以来我们可以创建一个新的函数来实现上面的功能：

```js
function getTyepFn() {
  const minList = [1, 2, 3]
  const maxList = [4, 5, 6]

  return num => (minList.includes(num) ? 'Min' : maxList.includes(num) ? 'Max' : 'uknow')
}

const getTyep = getTyepFn()
```

现在，当我们每次执行 `getTyep` 函数时，都无需再次实例化常量。

## 扩展阅读

- [4. Algorithms and Flow Control - High Performance JavaScript [Book]](https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/ch04.html)
- [JavaScript Closures - Bret](https://medium.com/@prashantramnyc/javascript-closures-simplified-d0d23fa06ba4)
