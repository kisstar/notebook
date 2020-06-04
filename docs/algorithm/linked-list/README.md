# 链表

链表存储有序的元素集合。

在大多数语言中，数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。

不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

## 链表的操作

- `append(element)`：向列表尾部添加一个新项
- `insert(position, element)`：向列表的指定位置插入一个新项
- `remove(element)`：从列表中移除一项
- `removeAt(position)`：从列表的特定位置移除一项
- `indexOf(element)`：返回元素在列表中的索引。如果列表中没有该元素则返回 -1
- `getHead()`：返回当前头节点
- `isEmpty()`： 如果链表中不包含任何元素， 返回 true， 如果链表长度大于 0 则返回 false
- `size()`：返回链表包含的元素个数
- `print ()`：遍历整个链表

## 链表的实现

```javascript
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  append(element) {
    let current = this.head;
    const node = new Node(element);

    if (!current) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.length++;
  }

  print() {
    let str = '';
    let current = this.head;

    while (current) {
      str = str ? `${str}->${current.element}` : `${current.element}`;
      current = current.next;
    }

    console.log(str);
  }
}

const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.print(); // 1 -> 2 -> 3 -> 4
```

`insert` 方法：

```javascript
class LinkedList {
  // ...
  insert(position, element) {
    if (0 > position || position > this.length) {
      // 越界检查
      return;
    }

    const node = new Node(element);
    let current = this.head,
      index = 0;
    if (0 === position) {
      node.next = current;
      this.head = node;
    } else {
      while (++index < position) {
        current = current.next;
      }
      node.next = current.next;
      current.next = node;
    }

    this.length++;
  }
}
const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.insert(0, 0);
ll.insert(2, 1.5);
ll.print(); // 0 -> 1 -> 1.5 -> 2 -> 3 -> 4
```

`removeAt` 方法：

```javascript
class LinkedList {
  removeAt(position) {
    if (0 > position || position >= this.length) {
      return;
    }

    let current = this.head,
      index = 0;
    if (0 === position) {
      this.head = current.next;
    } else {
      while (++index < position) {
        current = current.next;
      }
      current.next = current.next.next;
    }

    this.length--;
  }
}
const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.insert(0, 0);
ll.removeAt(3);
ll.print(); // 0 -> 1 -> 2 -> 4
```

`remove` 方法：

```javascript
class LinkedList {
  remove(element) {
    let current = this.head,
      previous = null;

    if (current.element === element) {
      this.head = current.next;
      this.length--;
    } else {
      while (current) {
        if (current.element === element) {
          previous.next = current.next;
          this.length--;
          break;
        } else {
          previous = current;
          current = current.next;
        }
      }
    }
  }
}
const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.insert(0, 0);
ll.remove(2);
ll.print(); // 0 -> 1 -> 3 -> 4
```

`indexOf` 方法：

```javascript
class LinkedList {
  indexOf(element) {
    let index = 0,
      current = this.head;

    while (current) {
      if (current.element === element) {
        return index;
      } else {
        current = current.next;
        index++;
      }
    }

    return -1;
  }
}
const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.insert(0, 0);
console.log(ll.indexOf(3)); // 3
```

其它方法：

```javascript
class LinkedList {
  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  getHead() {
    return this.head;
  }
}
```
