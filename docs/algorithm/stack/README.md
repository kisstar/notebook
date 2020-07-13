# 栈

栈（英语：stack）又称为堆栈或堆叠，是一种只能在一端进行插入和删除操作的特殊线性表。

它按照后进先出（LIFO）的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据。

## 栈的操作

- `push(element)`：添加新元素到栈顶位置
- `pop()`：移除栈顶的元素，同时返回被移除的元素
- `peek()`：返回栈顶的元素，不对栈做任何修改
- `isEmpty()`：如果栈里没有任何元素就返回 `true`，否则返回 `false`
- `clear()`：移除栈里的所有元素
- `size()`：返回栈里的元素个数
- `print()`：打印栈内元素

## 栈的实现

```javascript
class Stack {
  constructor() {
    this._list = []
  }

  push(...items) {
    this._list.push(...items)
  }

  pop() {
    return this._list.pop()
  }

  peek() {
    return this._list[this._list.length - 1]
  }

  size() {
    return this._list.length
  }

  isEmpty() {
    return this._list.length === 0
  }

  clear() {
    this._list.length = 0
  }

  toString() {
    this._list.toString()
  }

  print() {
    console.log(this.toString())
  }
}
```

## 栈的使用

利用栈对十进制数字进行任意进制转换：

```javascript
/**
 * 利用栈对十进制数字进行任意进制转换
 * @param {number} num 被转换的数
 * @param {number} base 基数
 */
function _parseInt(num = 0, base = 10) {
  const stack = new Stack()
  const digits = '0123456789ABCDEF'
  let ret = ''
  while (num > 0) {
    stack.push(Math.floor(num % base))
    num = Math.floor(num / base)
  }
  while (!stack.isEmpty()) {
    ret += digits[stack.pop()]
  }
  return +ret || 0
}

_parseInt(100, 2) // 1100100
```

## 参考

- [coderwhy - 简书](https://www.jianshu.com/u/02cd0bc8c45e)
