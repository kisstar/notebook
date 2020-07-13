# 队列

队列是遵循 FIFO（First In First Out）原则的一组有序的项。 队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

## 队列的操作

- `enqueue(item(s))`：向队列尾部添加一个（或多个）新的项
- `dequeue()`：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素
- `front()`：返回队列中第一个元素
- `isEmpty()`：如果队列中不包含任何元素，返回 `true`，否则返回 `false`
- `size()`：返回队列包含的元素个数
- `print()`：打印队列元素

## 队列的实现

```javascript
class Queue {
  constructor() {
    this._list = []
  }

  enqueue(...items) {
    this._list.push(...items)
  }

  dequeue() {
    return this._list.shift()
  }

  front() {
    return this._list[0]
  }

  size() {
    return this._list.length
  }

  isEmpty() {
    return this._list.length === 0
  }

  toString() {
    this._list.toString()
  }

  print() {
    console.log(this.toString())
  }
}
```

## 队列的使用

击鼓传花：

班里所有学生围成一圈，一个人负责击鼓。然后从某位同学手里开始向旁边的同学传一束花。鼓声停下的一刻，花落在谁手里，谁就出来表演节目。

修改游戏规则:

几个朋友围成一圈玩一个游戏，从某个人开始数数，数到某个数字的人自动淘汰，最后剩下的一个人会获得胜利，请问最后剩下的是原来在哪一个位置上的人？

```javascript
function hotPotato(nameList, num) {
  const queue = new Queue()
  queue.enqueue(...nameList)

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    queue.dequeue()
  }

  return queue.dequeue()
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const winner = hotPotato(names, 7)
console.log(`The winner is: ${winner}`) // The winner is: John
```

## 优先队列

在优先队列中，元素的添加和移除是基于优先级的。

优先队列可以简单的分为最小优先队列，其优先级的值较小的元素被放置在队列最前面（壹代表更高的优先级）；最大优先队列则与之相反，把优先级的值较大的元素放置在队列最前面。

实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们。这里我们使用前面一种方式，其它的方法都不用改变，现在来修改一下入列方法。

```javascript
class QueueElement {
  constructor(element, priority) {
    this.element = element
    this.priority = priority
  }
}

class PriorityQueue extends Queue {
  enqueue(element, priority) {
    const queueElement = new QueueElement(element, priority)
    const isInserted = this._list.some((item, index) => {
      // 数字越小, 优先级越高
      if (queueElement.priority < item.priority) {
        this._list.splice(index, 0, queueElement)
        return true
      }
      return false
    })

    if (!isInserted) {
      this._list.push(queueElement)
    }
  }

  print() {
    this._list.forEach(item => console.log(`${item.element} - ${item.priority}`))
  }
}

const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.print()
// Jack -       1
// Camila -       1
// John -       2
```
