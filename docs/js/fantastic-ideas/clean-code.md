# Clean your JavaScript code

- 按条件给变量赋值

```js
a > b ? (foo = 'value1') : (foo = 'value2')

// better
foo = a > b ? 'value1' : 'value2'
```

- 按条件给属性赋值

```js
a > b ? (foo.prop1 = 'value') : (foo.prop2 = 'value')

// better
foo[a > b ? 'prop1' : 'prop2'] = 'value'
```

- 利用解构赋值

```js
let a = foo.prop1
let b = foo.prop2

// better
let { prop1: a, prop2: b } = foo

// ---

let c = bar[0]
let d = bar[1]

// better
let [c, d] = bar
```

- 获取多个 DOM 引用

```js
let a = document.querySelector('selector1')
let b = document.querySelector('selector2')
let c = document.querySelector('selector3')

// better
let [a, b, c] = ['selector1', 'selector2', 'selector3'].map(item => document.querySelector(item))
```

- 按条件执行

```js
if (foo) {
  doSomething()
}

// better
foo && doSomething()
```

- 使用科学计数法

```js
const MAX_VALUE = 9900000000

// better
const MAX_VALUE = 99e8
```

- 对于参数可能是 T 或者 T[] 类型时内容可以将接受到的 T 变为 T[] 这样内部只需要处理一种情况

```js
function demo(strArr) {
  if (!Array.isArray(strArr)) {
    strArr = [strArr]
  }

  // do something
}
```

- 针对一个变量的值在多重情况下做同以操作时，可以借助数组

```js
function demo(p) {
  /*
  if (p === "case1" || p === "case2" || p === "case3") {
  }
  */

  const cases = ['case1', 'case2', 'case3']
  if (~cases.indexOf(p)) {
  }
}
```

- 在获取数组的值时，如果这个值可能不存在，我们可以提供一个备用数组来提供默认值

```js
/**
 * 获取小数点后的的位数
 */
function getDecimalLen(val) {
  // 可能这并不是一个好的例子，不过只是为了说明做法，比如还可以使用在获取正则 match 匹配的结果
  return (val.toString().split('.') || [, ''])[1].length
}
```

- 按条件在数组中添加值

```js
if (foo) {
  config.push({})
}

// better
const config = [foo && {}].filter(Boolean)
```

- 申明初始具有多项值的字符串数组

```js
const supportExt = ['ext1', 'ext2', 'ext3']

// better
const supportExt = 'ext1 ext2 ext3'.split(/\s+/)
```

- 按条件调用不同的方法进行处理

```js
function demo(type) {
  if (type === 'a') {
    a()
  }
  if (type === 'b') {
    a()
  }
  if (type === 'c') {
    a()
  }
}

// better
function demo(type) {
  ;({
    a() {},
    b() {},
    c() {},
  }[type]())
}
```
